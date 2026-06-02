const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper Function: Manual Calorie Calculation 
const calculateTargetCalories = (weight, height, age, gender, activityLevel, goal) => {
    const w = weight || 70;
    const h = height || 170;
    const a = age || 25;
    const g = gender || 'male';
    const act = activityLevel || 'Sedentary';

    let bmr;
    
    // BMR Calculation (Mifflin-St Jeor Equation)
    if (g.toLowerCase() === 'female') {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
    } else {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
    }

    // Activity Multipliers
    const multipliers = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        super_active: 1.9
    };
    
    const normalizedActivity = act.toLowerCase().replace(' ', '_');
    let tdee = bmr * (multipliers[normalizedActivity] || 1.2);

    // Adjusting based on goal
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
    if (user) return res.status(400).json({ error: "User already exists with this email" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    user.password = undefined; 
    res.json(user);
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

    user.password = undefined;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Save User Profile Data
exports.saveProfile = async (req, res) => {
  try {
    const { userId, profileData } = req.body;
    const user = await User.findByIdAndUpdate(userId, { ...profileData }, { new: true });
    res.json(user);
  } catch (error) { 
    res.status(500).json({ error: error.message }); 
  }
};

// 4. Log Daily Progress
exports.logProgress = async (req, res) => {
  try {
    const { userId, logData } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    user.progressLogs.push(logData);
    await user.save();
    res.json(user);
  } catch (error) { 
    res.status(500).json({ error: error.message }); 
  }
};

// 5. Generate AI Plan (Using Gemini)
exports.generatePlan = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Extract data from the nested 'profile' object
    const userProfile = user.profile || {};

    // Calculate actual calories using profile data
    const calculatedCalories = calculateTargetCalories(
        userProfile.weight, 
        userProfile.height, 
        userProfile.age, 
        userProfile.gender, 
        userProfile.activityLevel, 
        userProfile.goal
    );

    // Apply fallback values directly in the prompt
    const safeAge = userProfile.age || 25;
    const safeWeight = userProfile.weight || 70;
    const safeGoal = userProfile.goal || 'General Fitness and Health';
    const safeDiet = userProfile.dietaryPreference || 'Balanced / No specific restriction';
    const safeExperience = userProfile.experienceLevel || 'Beginner';
    const safeEquipment = userProfile.equipment || 'Full Gym';
    
    // Nayi fields for Health & Safety (Handle empty strings)
    const safeAllergies = (userProfile.allergies && userProfile.allergies.trim() !== '') ? userProfile.allergies : 'None';
    const safeMedical = (userProfile.medicalConditions && userProfile.medicalConditions.trim() !== '') ? userProfile.medicalConditions : 'None';

    const prompt = `You are an expert AI fitness coach and clinical nutritionist. 
    Create a HIGHLY PERSONALIZED and SAFE fitness and diet plan specifically tailored for this user's profile:
    - Goal: ${safeGoal}
    - Diet Preference: ${safeDiet}
    - Age: ${safeAge} years
    - Weight: ${safeWeight} kg
    - Target Calories: ${calculatedCalories} kcal
    - Experience Level: ${safeExperience}
    - Equipment Available: ${safeEquipment}
    - Allergies: ${safeAllergies}
    - Medical Conditions: ${safeMedical}
    
    CRITICAL RULES:
    1. HEALTH & SAFETY FIRST: This is paramount. If Allergies are not 'None', completely exclude those ingredients and potential cross-contaminants from the diet. If Medical Conditions are not 'None', strictly avoid exercises that cause strain related to those conditions and suggest safer alternatives.
    2. ENHANCED PRECAUTIONS: Generate a detailed 'precautions' array. Highlight exactly what to avoid in workouts and diet based on their specific medical profile. If no conditions exist, provide general safety, form, and hydration tips.
    3. PERSONALIZATION: Do not use generic templates. The exercises and meals MUST directly align with a ${safeWeight}kg person aiming for '${safeGoal}'.
    4. INDIAN FOOD SYSTEM: The diet plan MUST consist of authentic Indian meals and ingredients suitable for the user's dietary preference, strictly avoiding their allergens.
    5. METRIC SYSTEM CONVENTIONS: Use strictly Indian metric conventions. All body weights and workout weights must be in kilograms (kg). All food portions and macronutrients must be in grams (g) or standard Indian household measures (like katori/cup).
    6. WORKOUT PLAN: Create exactly a 6-day workout split (Monday to Saturday) considering their experience level and access to '${safeEquipment}', and keep Sunday STRICTLY as a "Rest" day. 
    7. FORMAT: Respond STRICTLY with a valid JSON object matching this schema. Do NOT wrap in markdown.
    {
      "precautions": [
        "string (Detailed safety and form precaution 1)",
        "string (Detailed safety precaution related to medical condition if any)",
        "string (Detailed dietary substitution or warning related to allergies if any)"
      ],
      "workoutPlan": {
        "focus": "string (e.g., Hypertrophy, Fat Loss, Endurance)",
        "weeklySplit": "6-Day Split",
        "routine": [ 
          { "day": "Monday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
          { "day": "Tuesday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
          { "day": "Wednesday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
          { "day": "Thursday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
          { "day": "Friday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
          { "day": "Saturday", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] },
          { "day": "Sunday", "focus": "Rest", "exercises": [ { "name": "Rest and Recovery", "sets": "0", "reps": "0" } ] }
        ]
      },
      "dietPlan": {
        "targetCalories": ${calculatedCalories},
        "macros": { "protein": "string (in grams)", "carbs": "string (in grams)", "fats": "string (in grams)" },
        "meals": [ { "mealName": "string", "suggestion": "string (include portion size in grams or katori)", "calories": 0 } ]
      }
    }`;

    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: {
            temperature: 0.7,
            responseMimeType: "application/json"
        }
    });

    console.log(`Generating plan for ${safeWeight}kg user with ${calculatedCalories} calories (Allergies: ${safeAllergies}, Medical: ${safeMedical})...`);
    
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
    
    const aiResponse = JSON.parse(responseText);

    user.aiPlan = aiResponse;
    await user.save();
    
    console.log("Plan generated successfully!");
    res.json(user);
  } catch (error) { 
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate AI plan" }); 
  }
};


// 6. Context-Aware AI Chatbot
exports.chatWithAI = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Extract relevant data for context
    const profileData = JSON.stringify(user.profile || {});
    // Extracting only essential plan details to save tokens and speed up response
    const planData = JSON.stringify(user.aiPlan || {});

    // Context-aware prompt for Gemini
    const prompt = `You are FitAI, a friendly, expert personal trainer and nutritionist for the user named ${user.username}.
    
    USER CONTEXT:
    Profile & Medical Data: ${profileData}
    Current AI Plan: ${planData}
    
    USER'S MESSAGE: "${message}"
    
    INSTRUCTIONS:
    1. Answer the user's question accurately based ONLY on their specific profile, medical conditions, allergies, and current AI plan.
    2. Be conversational, motivating, and highly personalized.
    3. Keep the response concise (under 150 words) and easy to read.
    4. Do not use Markdown formatting like ** or * heavily, keep it natural.`;

    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { temperature: 0.7 } 
    });

    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });

  } catch (error) { 
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Failed to get AI response" }); 
  }
};