const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  course_name: {
    required: true,
    type: String,
    trim: true,
  },
  course_description: {
    required: true,
    type: String,
  },
  course_length: {
    required: true,
    type: Number,
  },
  language: {
    required: true,
    type: String,
    trim: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Course = mongoose.model("Course",courseSchema)

module.exports = Course