const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel")

const createInventoryController= async(req, resp)=>{
    try {
        const {email, inventoryType}= req.body
        
        const user= await userModel.findOne({email})

        if(!user){
             throw new Error("user Not found");
            
        }
        if(inventoryType === 'in' && user.role !=='donar'){
             throw new Error("Not a donar Account");
        }
        if(inventoryType ==='out' && user.role !== 'hospital'){
            throw new Error("Not a hospital");
            
        }

        const inventory= await inventoryModel(req.body)
        await inventory.save();

        return resp.status(200).send({
            success: true,
            message: 'New Blood Record added'
        })
    } catch (error) {
        console.log(error)
        return resp.status(500).send({
            success: false,
            message: 'Error in create Inverntory API',
            error
        })
        
    }
}
module.exports= {createInventoryController}