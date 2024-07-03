const {userExists}=require('../Method/userMethods');
const middleware = require('../Middleware/middleware');
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const {jwtSecretKey} = require('../Config/key');

const bcrypt = require("bcrypt");
const {mail} = require("../Method/Mailer")
const { userMailExists } = require('../Method/userMethods');
const router = require("express").Router();
// const middleware=require('../Middleware/middleware')
router.post("/user/exists", async (req, res) => {
    try {
      const email = req.body.email;
      const userExist = await userMailExists(email);
      if (userExist) {
        res.status(201).send(
          JSON.stringify({
            code: 201,
            msg: true,
          })
        );
      } else {
        res.status(201).send(
          JSON.stringify({
            code: 201,
            msg: false,
          })
        );
      }
    } catch (err) {
      const message = "Invalid Input";
      res.status(400).send(
        JSON.stringify({
          code: 400,
          msg: message,
        })
      );
    }
  });
  router.get("/user/get/:username",middleware.isLoggedIn,async(req,res)=>{
    try{
    const id = req.params.username;

      const user=await User.findOne({username:id});
      if(user){
        console.log("Sending user",user);
      res.status(201).send(user);
        
      }
      else{
        res.status(401).send("User not available")
      }
    }
    catch (err) {
      console.log(err);
      res.status(500).send(
        JSON.stringify({
          code: 500,
          msg: "Internal Server Error",
        })
      );
    }
  })
//   /signup /login 
router.post("/user/signup",middleware.newUser, async(req,res)=>{
    try{
      console.log("assed middleware")

        const { username,email,password,name }=req.body;
        const hashed= await bcrypt.hash(password,10)
        const user = new User({email:email,password_hash:hashed,events_id:[],name:name,username:username,userName:username,verified:false})
        await user.save();
        const token = jwt.sign({ email: email }, "crowdtix", {
          expiresIn: 60 * 60,
        });
        const msg = await mail("verification", email, { token });
        console.log("Reached ass")
        if (msg) {
          console.log("message sent hehe")
          const message = "Success";
          res.status(201).send(
            JSON.stringify({
              code: 201,
              msg: message,
            })
          );
        }
        else {
            const message = "Invalid Input";
            res.status(401).send(
              JSON.stringify({
                code: 400,
                msg: message,
              })
            );
          }
    }catch (err) {
        console.log(err);
        res.status(500).send(
          JSON.stringify({
            code: 500,
            msg: "Internal Server Error",
          })
        );
      }


})

router.get("/verifytoken/:token", async (req, res) => {
    try {
      const user = jwt.verify(req.params.token, "crowdtix");
      await User.updateOne({ email: user.email }, { $set: { verified: true } });
      res.status(201).send({
        code: 200,
        msg: "OK",
        data: user.email,
      });
    } catch (err) {
      const message = "Token expired";
      res.status(410).send({
        code: 410,
        msg: message,
      });
    }
  });

  router.post("/user/login",middleware.userExist ,async (req, res) => {
    try {
      console.log(req.body.email);
   
 
        const user = await User.findOne({ email: req.body.email });
        const password = user.password_hash;
        const match = await bcrypt.compare(req.body.password, password);
        if (match) {
          const token = jwt.sign(
            {
              email: user.email,
              id: user._id,
             
            },
            jwtSecretKey,
            {
              expiresIn: "7d",
            }
          );
          req.session.userid = user.id;
          req.session.email = user.email;
          console.log(req.session.userid);
          res.status(201).send({
            code: 201,
            msg: "Login Successfull",
            data: user,
            token,
          });
        } else {
            res.status(500).send({
            code: 400,
            msg: "Invalid Credential",
          });
        }
     
    } catch (err) {
      console.log(err);
      res.status(500).send(
        JSON.stringify({
          code: 500,
          msg: "Internal Server Error",
        })
      );
    }
  });

  router.post("/user/update",middleware.userExist,middleware.isLoggedIn,async(req,res)=>{
    try{
        await User.updateOne({ email: req.body.email }, { $set: { name: req.body.name } });
        res.status(201).send({
          code: 201,
          msg: "OK",
          
        });
    }
    catch{
        console.log(err);
        res.status(500).send(

          JSON.stringify({
            code: 500,
            msg: "Internal Server Error",
          })
        );
    }
  })
router.post("/user/deletehostedevent", middleware.isLoggedIn, async (req, res) => {
    try {
   
      const update = {
        $pull: {
          events_ids_h: req.body.eventid
        },
      };
  
      const post = await User.findOneAndUpdate(
        { email: req.body.email},
        update,
        { new: true }
      ).exec();
      res.status(201).send({
        code: 201,
        msg: "OK",
        
      });
  
    } catch (err) {
      console.log(err);
      res.status(401).send({
        code: 401,
        msg: "SERVER ERROR",
      });
    }
  });
  module.exports = router