// Get saved plants from browser
let plants = JSON.parse(localStorage.getItem("plants")) || [];

// Display plants when page loads
displayPlants();


function addPlant() {

    let name = document.getElementById("plantName").value;
    let date = document.getElementById("waterDate").value;
    let days = document.getElementById("days").value;

    if (name == "" || date == "" || days == "") {
        alert("Please fill all details.");
        return;
    }

    // Calculate next watering date
    let lastWatered = new Date(date);
    lastWatered.setDate(lastWatered.getDate() + Number(days));

    let nextWatering = lastWatered.toISOString().split("T")[0];

    // Create plant object
    let plant = {
        name: name,
        date: date,
        days: days,
        nextWatering: nextWatering
    };

    // Add plant to array
    plants.push(plant);

    // Save plants in browser
    localStorage.setItem("plants", JSON.stringify(plants));

    // Display plants
    displayPlants();

    // Clear input fields
    document.getElementById("plantName").value = "";
    document.getElementById("waterDate").value = "";
    document.getElementById("days").value = "";
}


// Display all saved plants
function displayPlants() {

    let plantList = document.getElementById("plantList");

    plantList.innerHTML = "";

    if (plants.length === 0) {
        plantList.innerHTML = "<p>No plants added yet.</p>";
        return;
    }

    plants.forEach(function(plant) {

        let plantDiv = document.createElement("div");
        plantDiv.className = "plant";

        plantDiv.innerHTML =
            "<h3>🌱 " + plant.name + "</h3>" +
            "<p>Last watered: " + plant.date + "</p>" +
            "<p>Water every " + plant.days + " days</p>" +
            "<p>💧 Next watering date: <b>" +
            plant.nextWatering + "</b></p>";

        plantList.appendChild(plantDiv);
    });
}