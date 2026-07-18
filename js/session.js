/*
=========================================
Study Journal
Session Module
=========================================
*/

const DATA = {

    categories: [
        "Study",
        "Research",
        "Coding",
        "Reading",
        "Personal"
    ],

    activities: [
        "Lecture",
        "Revision",
        "Problem Solving",
        "Mock Test",
        "Paper Reading",
        "Literature Review",
        "Simulation",
        "Thesis Writing",
        "Coding",
        "Planning"
    ],

    areas: [
        "Organometallic Chemistry",
        "Coordination Chemistry",
        "Physical Chemistry",
        "Excited State Dynamics",
        "CH₃CN Project",
        "Study Journal",
        "Rabindra Business OS"
    ]

};


/*
=========================================
Populate Select
=========================================
*/

function populateSelect(selectId, items) {

    const select = document.getElementById(selectId);

    select.innerHTML = "";

    items.forEach(item => {

        const option = document.createElement("option");

        option.value = item;
        option.textContent = item;

        select.appendChild(option);

    });

}


/*
=========================================
Calculate Duration
=========================================
*/

function calculateDuration() {

    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;

    const durationField = document.getElementById("duration");

    if (!start || !end) {

        durationField.value = "0 h 0 min";
        return;

    }

    const startDate = new Date(`2000-01-01T${start}`);
    const endDate = new Date(`2000-01-01T${end}`);

    let difference = endDate - startDate;

    if (difference <= 0) {

        durationField.value = "Invalid";
        return;

    }

    const totalMinutes = Math.floor(difference / 60000);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    durationField.value = `${hours} h ${minutes} min`;

}


/*
=========================================
Initialize Form
=========================================
*/

function initializeForm() {

    populateSelect("category", DATA.categories);

    populateSelect("activity", DATA.activities);

    populateSelect("area", DATA.areas);

    document
        .getElementById("startTime")
        .addEventListener("change", calculateDuration);

    document
        .getElementById("endTime")
        .addEventListener("change", calculateDuration);

}


/*
=========================================
Page Load
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeForm();

});
