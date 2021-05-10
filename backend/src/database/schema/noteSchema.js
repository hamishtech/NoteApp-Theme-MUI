const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  details: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);
