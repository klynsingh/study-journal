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
Calculate Duration (Helper)
=========================================
*/

function calculateDurationMinutes(start, end) {

    if (!start || !end) {

        return 0;

    }

    const startDate = new Date(`2000-01-01T${start}`);
    const endDate = new Date(`2000-01-01T${end}`);

    const difference = endDate - startDate;

    if (difference <= 0) {

        return 0;

    }

    return Math.floor(difference / 60000);

}


/*
=========================================
Calculate Duration (UI)
=========================================
*/

function calculateDuration() {

    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;

    const durationField = document.getElementById("duration");

    const totalMinutes = calculateDurationMinutes(start, end);

    if (totalMinutes === 0) {

        durationField.value =
            (start && end) ? "Invalid" : "0 h 0 min";

        return;

    }

    durationField.value = formatDuration(totalMinutes);

}


/*
=========================================
Set Today's Date
=========================================
*/

function setTodayDate() {

    const today = new Date();

    document.getElementById("date").value =
        formatDateISO(today);

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

    setTodayDate();

    document
        .getElementById("startTime")
        .addEventListener("change", calculateDuration);

    document
        .getElementById("endTime")
        .addEventListener("change", calculateDuration);

    document
        .getElementById("saveBtn")
        .addEventListener("click", saveCurrentSession);

}


/*
=========================================
Generate Session ID
=========================================
*/

function generateSessionId() {

    return crypto.randomUUID();

}


/*
=========================================
Duration in Minutes
=========================================
*/

function getDurationMinutes() {

    const start =
        document.getElementById("startTime").value;

    const end =
        document.getElementById("endTime").value;

    return calculateDurationMinutes(start, end);

}


/*
=========================================
Read Form Data
=========================================
*/

function getFormData() {

    return {

        id: generateSessionId(),

        category: document.getElementById("category").value,

        activity: document.getElementById("activity").value,

        area: document.getElementById("area").value,

        topic: document.getElementById("topic").value.trim(),

        date: document.getElementById("date").value,

        startTime: document.getElementById("startTime").value,

        endTime: document.getElementById("endTime").value,

        durationMinutes: getDurationMinutes(),

        notes: document.getElementById("notes").value.trim(),

        createdAt: new Date().toISOString()

    };

}


/*
=========================================
Save Current Session
=========================================
*/

function saveCurrentSession() {

    const session = getFormData();

    if (!session.topic) {

        alert("Please enter a topic.");

        return;

    }

    if (session.durationMinutes === 0) {

        alert("Please enter a valid duration.");

        return;

    }

    saveSession(session);

    console.log("Saved:", session);

    alert("Session saved successfully!");

    window.location.href = "index.html";

}


/*
=========================================
Page Load
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeForm();

});
