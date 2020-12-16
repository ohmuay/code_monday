const express = require("express");

require("./db/mongoose.js");
const app = express();
const courseRouter = require('./routers/course')
const teacherRouter = require('./routers/teacher')
app.use(express.json());
app.use(courseRouter,teacherRouter)

module.exports = app
