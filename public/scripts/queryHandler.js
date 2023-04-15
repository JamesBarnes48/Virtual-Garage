//fetch elements
const $addCarForm = $("#addCarForm");
const $garageSelector = $("#garage");

//add listeners
$addCarForm.on("submit", addNewCar);
$garageSelector.on("change", showGlow);

//functionality
const validGarages = [1,2,3,4,5];

//request function - standardised request func
async function makeRequest(endpoint, options){
    if(!endpoint) return {success: false, message: 'Must provide an endpoint'};
    if(!options.method || !options.headers) return {success: false, message: 'Must provide a method and headers for request'};

    return fetch(endpoint, options).then(response => {
        return response.json().then(parsedResponse => {
            return parsedResponse;
        })
    })
}

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

    const res = await makeRequest("/addCar", options);

    console.log(res);

    carAddedPopup(res);
    resetGlow();
    $addCarForm.trigger('reset');
    return;
}

function carAddedPopup(response){
    //show popup and add border
    console.info(response);
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

function showGlow(){
    if(validGarages.includes(+$garageSelector.val())){
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