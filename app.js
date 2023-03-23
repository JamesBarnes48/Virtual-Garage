//jshint esversion:6

const bodyParser = require("body-parser");
const https = require("https");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000

app.use(express.static('public'));
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

app.post("/addCar", function(req, res) {
  const toAdd = req.body;

  //validate user has filled out all fields
  if(Object.values(toAdd).some((element) => {return !element?.length})){
    res.json({success: false, message: "Ensure you have provided values for all three fields."});
  }
})
