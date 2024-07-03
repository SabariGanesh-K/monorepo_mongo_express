const Cryptr = require('cryptr');
const Event = require("../Models/EventModel")
const cryptr = new Cryptr('placexp@123');
const jwt = require("jsonwebtoken");

const {jwtSecretKey} = require('../Config/key');
const { userMailExists,userNameExists } = require('../Method/userMethods');


   const mailPwd = (req,res,next)=>{
        console.log(req.body);
        if(req.body.email && req.body.password){
            next()
        }
        else{
            res.status(400).send(JSON.stringify({
                code : 400,
                msg  : 'One or two parameters are missing'
            }))
        }
   }
    const isOwner=async(req,res,next)=>{
        const check =jwt.verify(req.query.token,jwtSecretKey);
        const event = await Event.findOne({eventid:req.body.eventid});

        if((req.query.id && check.email==req.body.email && check.email==event.email))
             next();
        else
        {
            console.log(req.session);
            res.send(JSON.stringify({
                code : 400,
                msg  : 'not admin'
            }));
        }
   }
    const checkEventUpdateData=async(req,res,next)=>{
        try{
            if('eventid' in req.body.updateData ||'organizer' in req.body.updateData  ){
                res.status(401).send({
                    code: 401,
                    msg: "UNAUTHORIZED EDIT",
                  });
            }
            else{
              next();
            }
        }
        catch(err){
            console.log(err);
            res.status(401).send({
              code: 401,
              msg: "UNAUTHORIZED ACCESS",
            });
        }
   }
  
    const newUser=async(req,res,next) =>{
        console.log("checking for new user ",req.body);
        const existsE=await userMailExists(req.body.mail);
        const existsN=await userNameExists(req.body.username);
console.log("exists",existsE,existsN)
        if(!existsE && !existsN){
            next();
        }
        else if(existsE){
            res.status(400).send(JSON.stringify({
                code : 400,
                msg  : 'Email already exist'
            }))
        }
        else {
            res.status(400).send(JSON.stringify({
                code : 400,
                msg  : 'Username already exist'
            }))
        }
   }
    const  userExist=async(req,res,next) =>{
        console.log("checking for  user ",req.body);
        const existsE=await userMailExists(req.body.email);
        // const existsN=await userNameExists(req.body.mail);

        if(existsE){
            next();
        }
      
        else {
            res.status(400).send(JSON.stringify({
                code : 400,
                msg  : 'Username not exist'
            }))
        }
   }
    const eventAddCheck=async(req,res,next)=>{
        console.log(req.body.eventid,req.body.eventid ,req.body.name ,req.body.urlAlias ,req.body.organizer ,req.body.email ,req.body.openedDate , req.body.mode ,req.body.desc, "checking url")

        if(req.body.eventid &&req.body.name &&req.body.urlAlias &&req.body.organizer &&req.body.email &&req.body.openedDate && req.body.mode &&req.body.desc  ){
            next()
        }
        else{
            res.status(400).send(JSON.stringify({
                code : 400,
                msg  : 'missing datas'
            })) 
        }
   }
    const urlAliasCheck=async(req,res,next)=>{
       try{ const event =await Event.findOne({urlAlias:req.body.urlAlias});
        console.log(event,"checking url")
        if(!event || event.length==0 ){
            next();
        }
        else{
            res.status(400).send(JSON.stringify({
                code : 400,
                msg  : 'alias exists'
            }))
        }}
        catch(err){
            console.log(err);
            res.status(400).send(JSON.stringify({
                code : 400,
                msg  : 'server error'
            }))
        }
   }
   
    const mail =async(req,res,next) =>{
        if(req.body.email)
            next()
        else{
            res.status(400).send(JSON.stringify({
                code : 400,
                msg  : 'One or two parameters are missing'
            }))
        }
   }
    const  isLoggedIn=async(req,res,next)=>{
        try{

        console.log("checking....token",req.query.token,jwtSecretKey)
        const check =jwt.verify(req.query.token,jwtSecretKey);
        if((req.query.id && check) )
             next();
        else
        {
            console.log(req.session.userid);
            res.status(400).send(JSON.stringify({
                code : 1209,
                msg  : 'Not logged In'
            }));
        }
    }
    catch(err)
    {
        res.status(400).send(JSON.stringify({
            code : 1209,
            msg  : 'Not logged In'
        }));
    }


   }

module.exports={mailPwd,isOwner,checkEventUpdateData,newUser,userExist,eventAddCheck,urlAliasCheck,mail,isLoggedIn};