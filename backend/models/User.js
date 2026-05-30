const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  weight: Number,
  waterIntake: Number,
  workoutCompleted: { type: Boolean, default: false },
  caloriesConsumed: Number
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    goal: String,
    activityLevel: String,
    dietaryPreference: String,
    allergies: String,
    medicalConditions: String,
    workoutLocation: String,
    equipment: String,
    experienceLevel: String,
    schedule: String,
  },
  aiPlan: {
    workoutPlan: Object,
    dietPlan: Object
  },
  progressLogs: [ProgressSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
