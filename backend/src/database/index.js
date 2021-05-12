const mongoose = require('mongoose');
require('dotenv').config();

const connect_DB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message);
    });
};

module.exports = connect_DB;
