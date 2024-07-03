const eventUrlAliasNotExists = async (email) => {

    const user = await User.findOne({
       email: email
   }).exec();
   //console.log(user);
   return user==null?false:true;


}    