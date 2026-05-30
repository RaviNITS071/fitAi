const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper Function: Manual Calorie Calculation (Taaki 0 calories error na aaye)
const calculateTargetCalories = (weight, height, age, gender, activityLevel, goal) => {
    // Default values if any field is missing from user profile
    const w = weight || 70;
    const h = height || 170;
    const a = age || 25;
    const g = gender || 'male';
    const act = activityLevel || 'sedentary';

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
    const normalizedGoal = goal ? goal.toLowerCase() : 'maintain';
    if (normalizedGoal.includes('lose') || normalizedGoal.includes('loss') || normalizedGoal.includes('cut')) {
        tdee -= 500; // Calorie deficit
    } else if (normalizedGoal.includes('gain') || normalizedGoal.includes('muscle') || normalizedGoal.includes('bulk')) {
        tdee += 500; // Calorie surplus
    }

    return Math.round(tdee) || 2000; // Safe fallback to 2000
};

// 1. Register User
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists with this email" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    user.password = undefined; 
    res.json(user);
  } catch (error) {
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

    // Explicitly calculate calories to fix the '0' issue
    const calculatedCalories = calculateTargetCalories(
        user.weight, 
        user.height, 
        user.age, 
        user.gender, 
        user.activityLevel, 
        user.goal
    );

    const prompt = `You are an expert AI fitness coach and nutritionist. 
    Create a highly personalized fitness and diet plan for this user:
    Goal: ${user.goal || 'Fitness'}, Diet: ${user.dietaryPreference || 'Any'}, Age: ${user.age}, Weight: ${user.weight}kg, Target Calories: ${calculatedCalories} kcal.
    
    CRITICAL RULES:
    1. WORKOUT PLAN: You MUST create exactly a 6-day workout split (Monday to Saturday) and keep Sunday STRICTLY as a "Rest" day.
    2. DIET PLAN: Use exactly ${calculatedCalories} for targetCalories.
    3. FORMAT: Respond STRICTLY with a valid JSON object matching this schema. Do NOT wrap in markdown.
    {
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
          { "day": "Sunday", "focus": "Rest", "exercises": [ { "name": "Rest and Recovery", "sets": "0", "reps": "0" } ] }
        ]
      },
      "dietPlan": {
        "targetCalories": ${calculatedCalories},
        "macros": { "protein": "string", "carbs": "string", "fats": "string" },
        "meals": [ { "mealName": "string", "suggestion": "string", "calories": "number" } ]
      }
    }`;

    // FIX: Using the newly updated model name that Google currently supports
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    console.log("Calling Gemini API...");
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    // Clean up markdown backticks sometimes returned by the AI
    responseText = responseText.replace(/```json/gi, '').replace(/```/gi, '').trim();
    
    // Parse the JSON string from Gemini
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