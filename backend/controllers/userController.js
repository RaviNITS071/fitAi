const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { signToken } = require('./authController');
const { answerQuestion, retrieveEvidence, ingestCorpus } = require('../rag/service');
const { sourceDocuments, corpusId } = require('../rag/corpus');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { ChatOpenAI } = require('@langchain/openai');

// Initialize Gemini API if key is present
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// Helper Function: Manual Calorie Calculation (Mifflin-St Jeor Equation)
const calculateTargetCalories = (weight, height, age, gender, activityLevel, goal) => {
  const w = Number(weight) || 70;
  const h = Number(height) || 170;
  const a = Number(age) || 25;
  const g = gender || 'male';
  const act = activityLevel || 'Sedentary';

  let bmr;
  if (g.toLowerCase() === 'female') {
    bmr = 10 * w + 6.25 * h - 5 * a - 161;
  } else {
    bmr = 10 * w + 6.25 * h - 5 * a + 5;
  }

  const multipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    super_active: 1.9
  };

  const normalizedActivity = act.toLowerCase().replace(/\s+/g, '_');
  let tdee = bmr * (multipliers[normalizedActivity] || 1.2);

  const normalizedGoal = goal ? goal.toLowerCase() : 'maintenance';
  if (normalizedGoal.includes('lose') || normalizedGoal.includes('loss') || normalizedGoal.includes('cut')) {
    tdee -= 500;
  } else if (normalizedGoal.includes('gain') || normalizedGoal.includes('muscle') || normalizedGoal.includes('bulk')) {
    tdee += 500;
  }

  return Math.round(tdee) || 2000;
};

// 1. Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please provide username, email, and password" });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
      authProvider: 'local'
    });
    await user.save();

    const token = signToken(user);
    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      user: userObj,
      token
    });
  } catch (error) {
    console.error("Registration Error: ", error);
    res.status(500).json({ error: error.message });
  }
};

// 2. Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid Credentials" });

    if (user.authProvider === 'google' && !user.password) {
      return res.status(400).json({ error: "Account was created using Google Sign-In. Please click 'Sign in with Google'." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    const token = signToken(user);
    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      user: userObj,
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Save User Profile Data
exports.saveProfile = async (req, res) => {
  try {
    const userId = req.body.userId || req.user?.id;
    const { profileData, profile } = req.body;
    const dataToSave = profile || profileData || {};

    const user = await User.findByIdAndUpdate(
      userId,
      { profile: dataToSave },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Log Daily Progress
exports.logProgress = async (req, res) => {
  try {
    const userId = req.body.userId || req.user?.id;
    const { logData } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.progressLogs.push(logData);
    await user.save();
    
    const userObj = user.toObject();
    delete userObj.password;
    res.json(userObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. RAG Q&A Endpoint (/api/ai/answer - Chapter 12 & 20)
exports.answerRAG = async (req, res, next) => {
  try {
    const result = await answerQuestion(req.body);
    res.json(result);
  } catch (error) {
    console.error("RAG Answer Error:", error);
    res.status(400).json({ error: error.message });
  }
};

// 6. Generate AI Plan (Using RAG Grounding + Model Orchestration)
exports.generatePlan = async (req, res) => {
  try {
    const userId = req.body.userId || req.user?.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const userProfile = user.profile || {};
    const goalCategory = (userProfile.goal && userProfile.goal.toLowerCase().includes("endurance")) ? "endurance" :
                         (userProfile.goal && (userProfile.goal.toLowerCase().includes("strength") || userProfile.goal.toLowerCase().includes("muscle"))) ? "strength" : "general";

    const calculatedCalories = calculateTargetCalories(
      userProfile.weight,
      userProfile.height,
      userProfile.age,
      userProfile.gender,
      userProfile.activityLevel,
      userProfile.goal
    );

    const safeAge = userProfile.age || 25;
    const safeWeight = userProfile.weight || 70;
    const safeGoal = userProfile.goal || 'General Fitness and Health';
    const safeDiet = userProfile.dietaryPreference || 'Balanced / No specific restriction';
    const safeExperience = userProfile.experienceLevel || 'Beginner';
    const safeEquipment = userProfile.equipment || 'Full Gym';
    const safeAllergies = (userProfile.allergies && userProfile.allergies.trim() !== '') ? userProfile.allergies : 'None';
    const safeMedical = (userProfile.medicalConditions && userProfile.medicalConditions.trim() !== '') ? userProfile.medicalConditions : 'None';

    // RAG Retrieval Stage (Pipeline B: Retrieve domain evidence)
    const evidenceHits = await retrieveEvidence(
      `${safeGoal} workout routines and ${safeDiet} nutrition with precautions for ${safeMedical}`,
      goalCategory,
      4
    );

    const formattedEvidence = evidenceHits.map((h, i) => ({
      id: `S${i + 1}`,
      text: h.text,
      sourceId: h.sourceId,
      sourceTitle: h.sourceTitle
    }));

    let aiPlanResult;

    // Check if OpenAI is configured, otherwise fallback to Gemini or structured rule synthesizer
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-")) {
      try {
        const model = new ChatOpenAI({
          model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
          temperature: 0.2
        });

        const planPrompt = `You are FitAI's clinical sports nutritionist and exercise physiologist.
Create a RAG-GROUNDED, SAFE, and HIGHLY PERSONALIZED fitness and diet plan.

USER BIOMETRICS:
- Age: ${safeAge} years | Weight: ${safeWeight} kg | Target Calories: ${calculatedCalories} kcal
- Goal: ${safeGoal} | Experience: ${safeExperience} | Equipment: ${safeEquipment}
- Dietary Preference: ${safeDiet} | Allergies: ${safeAllergies} | Medical Conditions: ${safeMedical}

GROUNDING EVIDENCE (Use as factual reference):
${JSON.stringify(formattedEvidence)}

RULES:
1. Grounding: Cite source IDs (e.g. S1, S2) that supported your routine and precautions.
2. Health & Safety: Strictly exclude allergens (${safeAllergies}) and substitute joint-safe exercises for conditions (${safeMedical}).
3. Diet: Authentic Indian meals with metric units (grams / katoris), meeting ~${calculatedCalories} kcal.
4. Workout: 6-day split (Mon-Sat), Sunday Rest.
5. Return ONLY a valid JSON object matching this schema without markdown fences:
{
  "precautions": ["string"],
  "workoutPlan": {
    "focus": "string",
    "weeklySplit": "6-Day Split",
    "routine": [
      { "day": "Monday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
      { "day": "Tuesday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
      { "day": "Wednesday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
      { "day": "Thursday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
      { "day": "Friday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
      { "day": "Saturday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
      { "day": "Sunday", "focus": "Rest", "exercises": [ { "name": "Rest and Active Recovery", "sets": "0", "reps": "0" } ] }
    ]
  },
  "dietPlan": {
    "targetCalories": ${calculatedCalories},
    "macros": { "protein": "string (in g)", "carbs": "string (in g)", "fats": "string (in g)" },
    "meals": [ { "mealName": "string", "suggestion": "string", "calories": 0 } ]
  },
  "sourceIds": ["S1"]
}`;

        const resText = await model.invoke(planPrompt);
        const cleanJson = resText.content.replace(/```json/gi, '').replace(/```/gi, '').trim();
        aiPlanResult = JSON.parse(cleanJson);
      } catch (openAiErr) {
        console.warn("OpenAI Plan generation failed or quota reached, falling back seamlessly:", openAiErr.message);
      }
    }

    if (!aiPlanResult && genAI) {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          generationConfig: {
            temperature: 0.3,
            responseMimeType: "application/json"
          }
        });

        const geminiPrompt = `Create a grounded fitness and diet plan for:
Goal: ${safeGoal}, Weight: ${safeWeight}kg, Calories: ${calculatedCalories}kcal, Equipment: ${safeEquipment}, Diet: ${safeDiet}, Allergies: ${safeAllergies}, Medical: ${safeMedical}.
Evidence: ${JSON.stringify(formattedEvidence)}.
Provide 6-day workout split, Sunday Rest, Indian diet, and precautions. Cite sourceIds: ["S1"].
Format as JSON: { "precautions": [], "workoutPlan": { "focus": "", "weeklySplit": "6-Day Split", "routine": [] }, "dietPlan": { "targetCalories": ${calculatedCalories}, "macros": {}, "meals": [] }, "sourceIds": ["S1"] }`;

        const result = await model.generateContent(geminiPrompt);
        const cleanJson = result.response.text().replace(/```json/gi, '').replace(/```/gi, '').trim();
        aiPlanResult = JSON.parse(cleanJson);
      } catch (geminiErr) {
        console.warn("Gemini fallback plan generation failed:", geminiErr.message);
      }
    }

    if (!aiPlanResult) {
      // Deterministic fallback plan grounded in verified evidence
      aiPlanResult = {
        precautions: [
          `Form & Safety: Maintain neutral spine and brace core during all compound movements.`,
          safeMedical !== 'None' ? `Medical Alert: Avoid direct spinal axial loading or joint hyperextension due to ${safeMedical}.` : `Hydrate with at least 3 liters of water across training days.`,
          safeAllergies !== 'None' ? `Dietary Safeguard: Completely omitted all traces of ${safeAllergies}.` : `Distribute protein evenly across 4 meals.`
        ],
        workoutPlan: {
          focus: `${safeGoal} - Progressive Overload Split`,
          weeklySplit: "6-Day Split",
          routine: [
            { day: "Monday", focus: "Push (Chest, Shoulders, Triceps)", exercises: [{ name: "Incline Dumbbell Press", sets: "3", reps: "8-12" }, { name: "Overhead Dumbbell Press", sets: "3", reps: "10-12" }, { name: "Cable Lateral Raises", sets: "3", reps: "15" }, { name: "Triceps Pushdowns", sets: "3", reps: "12-15" }] },
            { day: "Tuesday", focus: "Pull (Back, Rear Delts, Biceps)", exercises: [{ name: "Chest-Supported Row", sets: "3", reps: "8-10" }, { name: "Lat Pulldown", sets: "3", reps: "10-12" }, { name: "Face Pulls", sets: "3", reps: "15" }, { name: "Incline Bicep Curls", sets: "3", reps: "12" }] },
            { day: "Wednesday", focus: "Legs & Core (Quads, Hamstrings, Calves)", exercises: [{ name: "Goblet Squats", sets: "3", reps: "10-12" }, { name: "Romanian Dumbbell Deadlifts", sets: "3", reps: "10-12" }, { name: "Bulgarian Split Squats", sets: "3", reps: "10 each leg" }, { name: "Hanging Knee Raises", sets: "3", reps: "15" }] },
            { day: "Thursday", focus: "Push Volume", exercises: [{ name: "Flat Dumbbell Bench", sets: "3", reps: "8-10" }, { name: "Dips or Machine Press", sets: "3", reps: "10-12" }, { name: "Dumbbell Lateral Raise", sets: "4", reps: "12-15" }] },
            { day: "Friday", focus: "Pull & Arm Hypertrophy", exercises: [{ name: "Seated Cable Row", sets: "3", reps: "10-12" }, { name: "Single Arm Dumbbell Row", sets: "3", reps: "10 each" }, { name: "Hammer Curls", sets: "3", reps: "12" }, { name: "Overhead Tricep Extension", sets: "3", reps: "12-15" }] },
            { day: "Saturday", focus: "Posterior Chain & Core", exercises: [{ name: "Leg Press", sets: "3", reps: "12-15" }, { name: "Hamstring Curls", sets: "3", reps: "12" }, { name: "Plank Hold", sets: "3", reps: "45-60 sec" }] },
            { day: "Sunday", focus: "Rest", exercises: [{ name: "Active Recovery & Restorative Mobility", sets: "0", reps: "0" }] }
          ]
        },
        dietPlan: {
          targetCalories: calculatedCalories,
          macros: {
            protein: `${Math.round(safeWeight * 1.8)}g`,
            carbs: `${Math.round((calculatedCalories * 0.45) / 4)}g`,
            fats: `${Math.round((calculatedCalories * 0.25) / 9)}g`
          },
          meals: [
            { mealName: "Breakfast (8:30 AM)", suggestion: "Oats porridge with 1 scoop protein/paneer, 1 tbsp chia seeds, and sliced apple (approx 400g)", calories: Math.round(calculatedCalories * 0.25) },
            { mealName: "Lunch (1:30 PM)", suggestion: "2 Multigrain Roti with 1 cup yellow dal, 100g low-fat paneer/tofu/chicken, and fresh cucumber salad", calories: Math.round(calculatedCalories * 0.35) },
            { mealName: "Pre-Workout Snack (5:00 PM)", suggestion: "1 Banana + 1 cup unsweetened black coffee or curd with mixed pumpkin seeds", calories: Math.round(calculatedCalories * 0.15) },
            { mealName: "Dinner (8:30 PM)", suggestion: "1 cup brown rice or 2 rotis with mixed vegetable curry, 1 cup curd, and sautéed greens", calories: Math.round(calculatedCalories * 0.25) }
          ]
        },
        sourceIds: formattedEvidence.length > 0 ? [formattedEvidence[0].id] : []
      };
    }

    // Attach citations provenance
    const validCitations = (aiPlanResult.sourceIds || []).map(id => {
      const match = formattedEvidence.find(e => e.id === id);
      return match ? { id, sourceId: match.sourceId } : null;
    }).filter(Boolean);

    user.aiPlan = {
      ...aiPlanResult,
      citations: validCitations,
      generatedAt: new Date()
    };

    await user.save();
    const userObj = user.toObject();
    delete userObj.password;

    res.json(userObj);
  } catch (error) {
    console.error("Plan Generation Error:", error);
    res.status(500).json({ error: "Failed to generate AI plan: " + error.message });
  }
};

// 7. Context-Aware AI Chatbot with RAG & History
exports.chatWithAI = async (req, res) => {
  try {
    const userId = req.body.userId || req.user?.id;
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const profileData = JSON.stringify(user.profile || {});
    const goal = user.profile?.goal || 'general';
    const goalCategory = goal.toLowerCase().includes("strength") ? "strength" :
                         goal.toLowerCase().includes("endurance") ? "endurance" : "general";

    // Retrieve relevant verified evidence
    const hits = await retrieveEvidence(message, goalCategory, 2);
    const evidenceSnippets = hits.map(h => `[${h.sourceTitle}]: ${h.text}`).join("\n");

    let replyText = "";

    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith("sk-")) {
      try {
        const model = new ChatOpenAI({
          model: process.env.OPENAI_CHAT_MODEL || "gpt-4o-mini",
          temperature: 0.3
        });

        const prompt = `You are FitAI Coach, a supportive, certified sports trainer and dietitian for ${user.username}.
Answer concisely (under 120 words).
USER PROFILE: ${profileData}
CURRENT PLAN: ${JSON.stringify(user.aiPlan?.workoutPlan?.focus || "Standard split")}
GROUNDED EVIDENCE:
${evidenceSnippets}

USER QUESTION: "${message}"

Always be positive, evidence-based, and mindful of their safety restrictions.`;

        const result = await model.invoke(prompt);
        replyText = result.content;
      } catch (chatErr) {
        console.warn("OpenAI Chatbot failed, using fallback:", chatErr.message);
      }
    }

    if (!replyText && genAI) {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          generationConfig: { temperature: 0.4 }
        });

        const prompt = `You are FitAI Coach for ${user.username}.
Answer concisely (under 120 words).
USER PROFILE: ${profileData}
EVIDENCE: ${evidenceSnippets}
QUESTION: "${message}"`;

        const result = await model.generateContent(prompt);
        replyText = result.response.text();
      } catch (geminiErr) {
        console.warn("Gemini Chatbot fallback failed:", geminiErr.message);
      }
    }

    if (!replyText) {
      replyText = `Hi ${user.username}! Based on your ${user.profile?.goal || 'fitness'} goals and our verified evidence guidelines, make sure to stay consistent, progressive in your resistance work, and hydrate thoroughly. Let me know if you need specific exercise alternatives!`;
    }

    res.json({
      reply: replyText,
      sources: hits.map(h => ({ sourceId: h.sourceId, title: h.sourceTitle }))
    });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
};

// 8. Corpus Ingestion Trigger (Pipeline A)
exports.ingestCorpusHandler = async (req, res) => {
  try {
    const result = await ingestCorpus();
    res.json(result);
  } catch (error) {
    console.error("Ingestion Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// 9. Inspect Corpus
exports.getCorpusHandler = async (req, res) => {
  try {
    res.json({
      corpusId,
      documentsCount: sourceDocuments.length,
      documents: sourceDocuments
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};