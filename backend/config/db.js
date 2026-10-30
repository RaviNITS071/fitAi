const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // useNewUrlParser aur useUnifiedTopology ab default hote hain, 
    // isliye unhe hata diya hai taaki warning na aaye.
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Neither MONGO_URI nor MONGODB_URI is defined in your environment variables (.env).");
    }
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
