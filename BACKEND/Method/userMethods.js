
const User   = require('../Models/UserModel')
const userMailExists = async (email) => {

     const user = await User.findOne({
		email: email
    }).exec();
    console.log(user);
    return user==null?false:true;


}    

const userNameExists = async (username) => {

    const user = await User.findOne({
        username: username
   }).exec();
   console.log(user);
   return user==null?false:true;


}  

module.exports={userMailExists,userNameExists}