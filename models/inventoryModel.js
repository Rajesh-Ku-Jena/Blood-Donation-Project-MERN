const mongoose= require('mongoose')

const inventorySchema= new mongoose.Schema({
    inventoryType:{type:String, required:[true, 'Inventory Type is required'], enum:['in','out']},
    bloodGroup:{type: String, required:[true, 'Blood Group is required'], enum:['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']},
    quantity:{type:Number, required:[true, 'Quantity is required'] },
    organisation:{type: mongoose.Schema.Types.ObjectId, ref:'user', required:[true, 'Organisation is require']},
    hospital:{type: mongoose.Schema.Types.ObjectId, ref:'user', required: function () {
        return this.invertoryType === 'out'
    }},
    donar:{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: function(){
        return this.invertoryType === 'in'
    }}
},{timestamps: true})

module.exports= mongoose.model('inventory', inventorySchema)