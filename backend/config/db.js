const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // useNewUrlParser aur useUnifiedTopology ab default hote hain, 
    // isliye unhe hata diya hai taaki warning na aaye.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
