const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // DEBUG: Print the URI to check for errors (Remove this line after fixing!)
    console.log("---------------------------------------------------");
    console.log("Attempting to connect with URI:", process.env.MONGO_URI);
    console.log("---------------------------------------------------");

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;