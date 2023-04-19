//jshint esversion:6
/*
imports
*/
const bodyParser = require("body-parser");
const https = require("https");
const express = require("express");
const app = express();

/*
config
*/
const port = process.env.PORT || 3000;
const connection = require('./connection');

app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
routes
*/
app.listen(process.env.PORT || 3000, function() {
  console.log("running on port " + port);
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/home.html");
})

app.post("/failure", function(req, res) {
  res.redirect("/");
})

const validGarages = [1,2,3,4,5];

//TODO
//once finished integrating db make sure you make a full readme!

app.get('/cars/get', async function(req, res) {
  try{
    const data = await getCarsSql();

    //if sql error then throw down stack to error handler
    if(data.err) throw new Error(data.err);
    return res.json({success: true, data: data.rows});
  }catch(err){
    console.log(new Date(), ' /cars/get error: ', err);
    return res.json({success: false, message: 'An error has occurred'});
  }
})

app.post("/cars/post", async function(req, res) {
  try{
    const data = sanitiseInput(req.body);

    const isValid = validateInput(data);
    if(!isValid.success) return res.json({success: false, message: isValid.message});
  
    //query database
    const result = await connection.asyncQuery('insert into cars (model, manufacturer, garageid) values($1, $2, $3)', [data.model, data.manufacturer, data.garageID]);

    if(result.err) throw new Error(result.err);
    return res.json({success: true, message: 'New car successfully added to your garage!'});
  }catch(err){
    console.log(new Date(), '/addCar', err);
    return res.json({success: false, message: 'An error has occurred'});
  }
});

/*
static functions
*/
function validateInput(data){
  //validate user has filled out all fields
  if(Object.values(data).some((element) => {return !element})){
    return {success: false, message: "Ensure you have provided values for all three fields."};
  }

  //ensure valid garage
  if(!validGarages.includes(+data.garageID)) return {success: false, message: 'Please provide a valid garage for your car.'};

  return {success: true};
}

function sanitiseInput(reqBody){
  return {
    model: String(reqBody.model),
    manufacturer: String(reqBody.manufacturer),
    garageID: +reqBody.garageID
  };
}

async function getCarsSql(){
  return connection.asyncQuery(`select cars.model, cars.manufacturer, garages.name garageName 
  from cars 
  inner join garages on garages.garageid = cars.garageid`);
}
