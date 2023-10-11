const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONOGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.log("Error");
  }
};

module.exports = { connectDB };
