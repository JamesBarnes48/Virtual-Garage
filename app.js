//jshint esversion:6

const bodyParser = require("body-parser");
const https = require("https");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000

app.use(express.static("public"));
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

// api key = 7fe3d82b206fffcaaa0eacf9e870a33e-us17
// list id = 30038b8e4a
