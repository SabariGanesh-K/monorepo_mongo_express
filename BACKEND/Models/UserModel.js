const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
{
    email:{type:String,unique:true},
    password_hash:String,
    events_ids_p:[String],
    events_ids_h:[String],  
    name:String,
    username:{type:String,unique:true},
    userName:{type:String},
    verified:Boolean

}
    
)
module.exports = mongoose.model("User", userSchema);
