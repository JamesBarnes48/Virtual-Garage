//fetch elements
const addCarForm = document.getElementById("addCarForm");
const garageSelector = document.getElementById("garage");

//add listeners
addCarForm.addEventListener("submit", addNewCar);
garageSelector.addEventListener("change", showGlow);

//functionality
const validGarages = [1,2,3,4,5];

async function addNewCar(e){
    e.preventDefault();

    const options = {
        method: "POST",
        body: JSON.stringify({
            model: document.getElementById("model")?.value,
            manufacturer: document.getElementById("manufacturer")?.value,
            garage: document.getElementById("garage")?.value
        }),
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          }
    };

    const res = await fetch("/addCar", options);
}

function showGlow(){
    if(validGarages.includes(+garageSelector.value)){
        garageSelector.classList.add("glow");
    }else{
        garageSelector.classList.remove("glow");
    }
}