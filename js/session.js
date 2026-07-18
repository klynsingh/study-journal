/*
=========================================
Study Journal
Session Module
=========================================
*/

/*
=========================================
Master Data
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
Populate a Select Element
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
Initialize Form
=========================================
*/

function initializeForm() {

    populateSelect("category", DATA.categories);

    populateSelect("activity", DATA.activities);

    populateSelect("area", DATA.areas);

}


/*
=========================================
Page Load
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeForm();

});
