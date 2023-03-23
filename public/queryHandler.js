const addCarForm = document.getElementById("addCarForm");
addCarForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        model: document.getElementById("model")?.value,
        manufacturer: document.getElementById("manufacturer")?.value,
        garage: document.getElementById("garage")?.value
    };

    const res = await fetch("/addCar", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
    });
})