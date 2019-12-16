const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  name:{
      type: String,
      required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Todo', TodoSchema);