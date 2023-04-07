//jshint esversion:6
//imports
const bodyParser = require("body-parser");
const https = require("https");
const express = require("express");
const app = express();

//config
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const { Client } = require("pg");
dotenv.config();

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function() {
  console.log("running on port " + port);
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/home.html");
})

app.post("/failure", function(req, res) {
  res.redirect("/");
})

//routes
const validGarages = [1,2,3,4,5];

//TODO
//keep following the site to integrate your guide in
//once finished integrating db make sure you make a full readme!

app.post("/addCar", function(req, res) {
  const isValid = validateInput(req.body);
  if(!isValid.success) return res.json({success: false, message: isValid.message});


});

function validateInput(data){
  //validate user has filled out all fields
  if(Object.values(data).some((element) => {return !element?.length})){
    return {success: false, message: "Ensure you have provided values for all three fields."};
  }

  //ensure valid garage
  if(!validGarages.includes(+data.garage)) return {success: false, message: 'Please provide a valid garage for your car.'};
  return {success: true};
}
