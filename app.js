//jshint esversion:6
/*
imports
*/
const bodyParser = require("body-parser");
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

/*
constants
*/

const validGarages = [1,2,3,4,5];
const MAX_CARS = 15;

app.get('/cars/get', async function(req, res) {
  try{
    const data = await getCarsSql();
    
    //format output
    data.map((row) => {
      row.garagename = row.garagename.replace(/ /g,'').toLowerCase();
    })

    return res.json({success: true, data: data});
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

    //ensure db is not full already
    const existingCars = await connection.asyncQuery('select count(*) numcars from cars');
    if(existingCars[0].numcars >= MAX_CARS) return res.json({success: false, message: 'Maximum number of cars reached.'});
  
    //insert car into db
    await connection.asyncQuery('insert into cars (model, manufacturer, garageid) values($1, $2, $3)', [data.model, data.manufacturer, data.garageID]);

    return res.json({success: true, message: 'New car successfully added to your garage!'});
  }catch(err){
    console.log(new Date(), '/post error', err);
    return res.json({success: false, message: 'An error has occurred'});
  }
});

app.post('/cars/delete', async function(req, res){
  try{
    //validate id provided
    const id = +req.body?.id;
    if(!id > 0) return res.json({success: false, message: 'Invalid car ID'});

    //execute delete on db
    await connection.asyncQuery('delete from cars where carid = $1', [id]);
    return res.json({success: true, message: 'Car successfully deleted from garage!'});
  }catch(err){
    console.log(new Date(), ' /delete error ', err);
    return res.json({success: false, message: 'An error has occurred'});
  }
})

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
  return connection.asyncQuery(`select cars.carid, cars.model, cars.manufacturer, garages.garageid, garages.name garagename 
  from cars 
  inner join garages on garages.garageid = cars.garageid`);
}
