//fetch elements
const $addCarForm = $("#addCarForm");
const $garageSelector = $("#garage");
const $carsDisplay = $('#parent-cars-box');
const $carCount = $('#car-count-box');


//add listeners
$addCarForm.on("submit", addNewCar);
$garageSelector.on("change", showGlow);

//fetch cars in garage on page load
document.addEventListener('DOMContentLoaded', () => {return refresh()})

//constants
const VALID_GARAGES = [1,2,3,4,5];
const MAX_CARS = 15;

//request function - standardised request func
async function makeRequest(endpoint, options){
    try{
        if(!endpoint) return {success: false, message: 'Must provide an endpoint'};
        if(!options.method) return {success: false, message: 'Must provide a method for request'};
    
        return fetch(endpoint, options).then(response => {
            return response.json().then(parsedResponse => {
                return parsedResponse;
            })
        })
    }catch(err){
        console.log(new Date(), ' makeRequest error: ', err);
        return [];
    }
}

/*
page functionality
*/
async function addNewCar(e){
    e.preventDefault();

    const options = {
        method: "POST",
        body: JSON.stringify({
            model: $("#model")?.val(),
            manufacturer: $("#manufacturer")?.val(),
            garageID: $("#garage")?.val()
        }),
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }
    };

    const res = await makeRequest("/cars/post", options);

    carAddedPopup(res);
    resetGlow();
    $addCarForm.trigger('reset');
    return refresh();
}

async function refresh(){
    try{
        $carsDisplay.empty();
        const cars = await getCars();

        $carCount.text(`${cars.length}/${MAX_CARS}`);
        if(cars.length >= MAX_CARS){ toggleFullGarage(true); }
        else{ toggleFullGarage(false); }

        renderCars(cars);
    }catch(err){console.log(err)}
}

async function getCars(){
    const options = {
        method: "GET"
    };

    const response = await makeRequest('/cars/get', options);
    return response.data || [];
}

function renderCars(cars){
    if(!cars.length) return;
    Array.from(cars).forEach((car) => {
        const $carContainer = $('<div class="car-container" />').appendTo($carsDisplay);

        //apply standard car banner styling as well as dynamically assign garage-specific styling using classes
        const $bannerEl = $('<div class="car-banner"/>').addClass(car.garagename).text(fancyName(car.garagename)).appendTo($carContainer);
        $('<div class="flag-img"/>').addClass(car.garagename).appendTo($bannerEl);

        //main body of car container
        const $bodyEl = $('<div class="car-body"/>').appendTo($carContainer);
        $('<div class="manufacturer-name">').text(car.manufacturer).appendTo($bodyEl);
        $('<span class="delete-btn"><i class="fa fa-fw fa-trash"></i></span>').appendTo($bodyEl);
        $('<div class="model-name">').text(car.model).appendTo($bodyEl);
    })
}

function toggleFullGarage(isFull){
    if(isFull){
        $('#submit-new-car').css('display', 'none');
        $carCount.css('color', 'red');
    }else{
        $('#submit-new-car').css('display', 'block');
        $carCount.css('color', '#D6D6D6');
    }
}

function carAddedPopup(response){
    //show popup and add border
    const $container = $('#add-car-box');
    const $addedPopup = $('<div class="car-added-popup"></div>')
        .addClass(response.success? 'positive-border': 'negative-border')
        .text(response.message || 'No response from server')
        .appendTo($container);

    //reset popup after set time
    window.setTimeout(function() {
        $addedPopup.remove();
    }, 5000);
}

/*
misc. functionality
*/
function showGlow(){
    if(VALID_GARAGES.includes(+$garageSelector.val())){
        $garageSelector.addClass("positive-border");
        $garageSelector.removeClass("negative-border");
    }else{
        $garageSelector.addClass("negative-border");
        $garageSelector.removeClass("positive-border");    }
}

function resetGlow(){
    $garageSelector.removeClass("negative-border");
    $garageSelector.removeClass("positive-border");

}

function fancyName(garageName){
    switch(garageName){
        case 'london':
            return 'London';
        case 'tokyo':
            return 'Tokyo';
        case 'berlin':
            return 'Berlin';
        case 'losangeles':
            return 'Los Angeles';
        case 'montecarlo':
            return 'Monte Carlo'
    }
}