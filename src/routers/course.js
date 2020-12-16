const express = require("express");
const courseRouter = new express.Router();
const Course = require("./../models/courses");
const Teacher = require("./../models/teachers")
const auth = require('../middleware/auth');


//CREATE

courseRouter.post("/course" ,auth,async (req, res) => {
  const course = new Course({
    ...req.body,
    teacher:req.teacher._id
  });
  try{
      await course.save();
      res.status(201).send(course)
  }catch(e){
      res.status(400).send(e)
  }
});

//READ by course name
courseRouter.get("/course/coursename/:course_name",async(req,res)=>{
  const course_name = req.params.course_name
  try{
    const course = await Course.findOne({course_name})
    if(!course){
      return res.status(404).send()
    }
    res.send(course)
  }catch(e){
    res.status(500).send()
  }
})


//READ by description
courseRouter.get("/course/coursedescription/:description",async(req,res)=>{
  const description = req.params.description
  try{
    const course = await Course.findOne({course_description:{'$regex': description}})
    if(!course){
      return res.status(404).send()
    }
    res.send(course)
  }catch(e){
    res.status(500).send()
  }
})

//READ by teacher name
courseRouter.get("/course/teacher/:teacher",async (req,res)=>{
  const searchTeacher = req.params.teacher
  const teacher = await Teacher.findOne({first_name:searchTeacher})

  try{
    const course = await Course.find({teacher:teacher._id})
    if(!course){
      return res.status(404).send()
    }
    res.send(course)
  }catch(e){
    res.status(500).send()
  }
})



//UPDATE

courseRouter.patch('/course/:id',async (req,res)=>{
  const _id = req.params.id
  try{
  const course = await Course.findOneAndUpdate({_id},{...req.body},{new:true})
  await course.save()
  res.status(202).send(course)
  }catch(e){
    res.status(404).send(e)
  }
})


//DELETE
courseRouter.delete('/course/:id',async (req,res)=>{
  const _id = req.params.id
  try{
    const course = await Course.findOneAndDelete({_id})
    if (!course) {
      return res.status(404).send();
    }
    res.status(200).send(course)
  }catch(e){
    res.status(500).send(e)
  }
})

module.exports = courseRouter;
