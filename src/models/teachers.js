// first_name, last_name, date_of_birth, age, country
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

const teacherSchema = mongoose.Schema({
  first_name: {
    required: true,
    type: String,
    trim: true,
    unique:true
  },
  last_name: {
    required: true,
    type: String,
    trim:true,
  },
  date_of_birth: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
  country:{
      required:true,
      type:String
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

teacherSchema.methods.getToken = async function () {
  const teacher = this;
  const token = jwt.sign({ _id: teacher._id.toString() }, process.env.JWTKEY);
  return token;
};

const Teacher = mongoose.model("Teacher",teacherSchema)

module.exports = Teacher