const addCarForm = document.getElementById("addCarForm");
addCarForm.addEventListener("submit", addNewCar);

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