const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  weight: Number,
  waterIntake: Number,
  workoutCompleted: { type: Boolean, default: false },
  caloriesConsumed: Number,
  sleepHours: Number,
  energyLevel: { type: String, default: 'High' }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: function() { 
      return this.authProvider === 'local'; 
    } 
  },
  googleId: { type: String, default: null },
  avatar: { type: String, default: null },
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
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
    precautions: [String],
    workoutPlan: Object,
    dietPlan: Object,
    citations: [{
      id: String,
      sourceId: String
    }],
    generatedAt: { type: Date, default: Date.now }
  },
  progressLogs: [ProgressSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
