const userModel = require("../models/userModel")
const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')



// REGISTER
const registerController= async(req, resp)=>{
    try {
    const exisiting= await userModel.findOne({email: req.body.email})
    if(exisiting){
        return resp.status(200).send({
            success: false,
            message:'User is Already Existing'
        })
    }
    // hash the password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword= await bcrypt.hash(req.body.password, salt)
    req.body.password= hashedPassword

    // new user
    const user= new userModel(req.body)
    await user.save();
    return resp.status(200).send({
        success: true,
        message:'User Register successfully',
        user
    })

    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message:'Error in Register API',
            error
        })
        
    }
}

// LOGIN

const loginController= async(req, resp)=>{
    try {
        const exisiting= await userModel.findOne({email: req.body.email})
        if(!exisiting){
            return resp.status(404).send({
                success: false,
                message: 'Email not exist'
            })
        }
        if(exisiting.role !== req.body.role){
            return resp.status(500).send({
                success: false, 
                message:'Role doesnot match'
            })
        }
        // compare password
        const comparePassword= await bcrypt.compare(req.body.password, exisiting.password)
        if(!comparePassword){
            return resp.status(500).send({
                success: false,
                message:'Password Incorrect'
            })
        }

        const token= jwt.sign({userId: exisiting._id}, process.env.JWT_SECRET,{expiresIn: '1d'})  

        return resp.status(200).send({
            success: true,
            message:"Login Successfully",
            token,
            exisiting
        })
    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message:'Error in Login API',
            error
        })
        
    }
}

const currentUserController= async(req, resp)=>{
    try {
        const user= await userModel.findOne({_id: req.body.userId})
        return resp.status(200).send({
            success: true,
            message:'User Fetched Successfully',
            user
        })
    } catch (error) {
        console.log(error)
        return resp.status(500).send({
            success: false,
            message:'Error in Get user API'
        })
    }
}
module.exports= {registerController, loginController, currentUserController}