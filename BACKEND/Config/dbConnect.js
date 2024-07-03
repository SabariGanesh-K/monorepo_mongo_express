const mongoose = require("mongoose");
const dotenv = require('dotenv').config()

MONGO_URI =
  process.env.ENVIRONMENT=="development" ? process.env.MONGO_LOCAL_URI : process.env.MONGO_PROD_URI;

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   useFindAndModify: false,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = dbConnect;
