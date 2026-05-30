const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

    const prompt = `You are an expert AI fitness coach and nutritionist. 
    Create a highly personalized fitness and diet plan for this user:
    Goal: ${user.goal}, Diet: ${user.dietaryPreference}, Age: ${user.age}, Weight: ${user.weight}kg.
    
    Respond STRICTLY with a valid JSON object matching this schema:
    {
      "workoutPlan": {
        "focus": "string",
        "weeklySplit": "string",
        "routine": [ { "day": "string", "focus": "string", "exercises": [ { "name": "string", "sets": "string", "reps": "string" } ] } ]
      },
      "dietPlan": {
        "targetCalories": "number",
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
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
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