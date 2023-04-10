//fetch elements
const addCarForm = document.getElementById("addCarForm");
const garageSelector = document.getElementById("garage");
const addedPopup = document.getElementById("car-added-popup");

//add listeners
addCarForm.addEventListener("submit", addNewCar);
garageSelector.addEventListener("change", showGlow);

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
            model: document.getElementById("model")?.value,
            manufacturer: document.getElementById("manufacturer")?.value,
            garageID: document.getElementById("garage")?.value
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
    addCarForm.reset();
    return;
}

function carAddedPopup(response){
    //show popup and add border
    addedPopup.classList.toggle('hidden');
    if(response.success){ addedPopup.classList.add('positive-border')}
    else{ addedPopup.classList.add('negative-border') }

    //render message from server
    addedPopup.innerText = response.message || 'No response from server';

    //reset popup after set time
    window.setTimeout(function() {
        addedPopup.classList.remove('positive-border', 'negative-border');
        addedPopup.classList.toggle('hidden');
    }, 5000);
}

function showGlow(){
    if(validGarages.includes(+garageSelector.value)){
        garageSelector.classList.add("positive-border");
        garageSelector.classList.remove("negative-border");
    }else{
        garageSelector.classList.add("negative-border");
        garageSelector.classList.remove("positive-border");    }
}

function resetGlow(){
    garageSelector.classList.remove("negative-border");
    garageSelector.classList.remove("positive-border");

}