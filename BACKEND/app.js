const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const dbConnect = require("./Config/dbConnect");
const app = express();

dbConnect();
// mongoose.set("useCreateIndex", true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    secret: "hello",
    maxAge: 24 * 60 * 60 * 1000,
  })

);
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
  
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})


app.get("/test", (req, res) => {
    res.status(201).send("yes");
  });
app.get("/", (req, res) => {
    res.status(201).send("This is crowdtix server...");
  });
app.use(require("./Controller/UserController"));
// app.use("/user",require("./Controller/UserController"))
// app.use("/event",require("./Controller/EventController"))

app.use(require("./Controller/EventController"));

  app.get("*", (req, res) => {
    res.status(404).send("Error 404");
  });
  const PORT  =process.env.PORT || 5000;
  // const host='0.0.0.0'
  app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
  
