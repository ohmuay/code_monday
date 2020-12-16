const jwt = require('jsonwebtoken')
const Teacher = require('./../models/teachers')


const auth = async (req, res, next) => {
    // Get request token in header
    try{
        const token = req.header('Authorization').replace("Bearer ","")
        const decoded = jwt.verify(token,process.env.JWTKEY)

        const teacher = await Teacher.findOne({_id:decoded._id , "tokens.token":token})
        if(!teacher){
            throw new Error()
        }
        req.token = token
        req.teacher = teacher
        next()
    }catch(e){
        res.status(501).send("Please authenticate!")
    }
};


module.exports = auth