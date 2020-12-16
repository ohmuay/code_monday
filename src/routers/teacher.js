const express = require("express");
const teacherRouter = new express.Router();
const Teacher = require("./../models/teachers");

//CREATE
teacherRouter.post("/teacher", async (req, res) => {
  const teacher = new Teacher({...req.body});
  try {
    const token = await teacher.getToken();
    teacher.tokens = teacher.tokens.concat({ token });

    await teacher.save();
    res.status(201).send({teacher,token});
  } catch (e) {
    res.status(400).send(e);
  }
});

//READ
teacherRouter.get("/teachers",async(req,res)=>{
  try{
    const teachers = await Teacher.find()
    if(!teachers){
      return res.status(404).send()
    }
    res.status(200).send(teachers)
  }catch(e){
    res.status(500).send(e)
  }
})

teacherRouter.patch('/teacher/:id',async (req,res)=>{
  const _id = req.params.id
  try{
  const teacher = await Teacher.findOneAndUpdate({_id},{...req.body},{new:true})
  await teacher.save()
  res.status(202).send(teacher)
  }catch(e){
    res.status(404).send(e)
  }
})


//DELETE
teacherRouter.delete('/teacher/:id',async (req,res)=>{
  const _id = req.params.id
  try{
    const teacher = await Teacher.findOneAndDelete({_id})
    if (!teacher) {
      return res.status(404).send();
    }
    res.status(200).send(teacher)
  }catch(e){
    res.status(500).send(e)
  }
})

module.exports = teacherRouter;