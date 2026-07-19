/*
=========================================
Study Journal
Dashboard Module
=========================================
*/


/*
=========================================
Dashboard Greeting
=========================================
*/

function updateGreeting() {

    const hour = new Date().getHours();

    let greeting = "";

    if (hour >= 5 && hour < 12) {

        greeting = "Good Morning";

    }

    else if (hour >= 12 && hour < 17) {

        greeting = "Good Afternoon";

    }

    else if (hour >= 17 && hour < 22) {

        greeting = "Good Evening";

    }

    else {

        greeting = "Good Night";

    }

    document.getElementById("greeting").textContent =
        `${greeting}, ${CONFIG.user.name}.`;

}


/*
=========================================
Today's Date
=========================================
*/

function updateTodayDate() {

    const today = new Date();

    document.getElementById("todayDate").textContent =
        today.toLocaleDateString("en-GB", {

            day: "numeric",

            month: "long",

            year: "numeric"

        });

}


/*
=========================================
Random Motivation
=========================================
*/

function updateMotivation() {

    const messages = CONFIG.motivation;

    const randomIndex =
        Math.floor(Math.random() * messages.length);

    document.getElementById("motivation").textContent =
        messages[randomIndex];

}

/*
=========================================
Today's Cards
=========================================
*/

function updateTodayCards() {

    const todaySessions = getTodaySessions();

    const studyMinutes =
        getCategoryMinutes(todaySessions, "Study");

    const researchMinutes =
        getCategoryMinutes(todaySessions, "Research");

    const codingMinutes =
        getCategoryMinutes(todaySessions, "Coding");


    document.getElementById("studyToday").textContent =
        formatDuration(studyMinutes);

    document.getElementById("researchToday").textContent =
        formatDuration(researchMinutes);

    document.getElementById("codingToday").textContent =
        formatDuration(codingMinutes);

    /*
    Streak
    Placeholder for now
    */

    document.getElementById("streakDays").textContent =
    getCurrentStreak();

}

/*
=========================================
Week's Cards
=========================================
*/

function updateWeekCards() {

    const weekSessions = getWeekSessions();

    document.getElementById("weekStudyTime").textContent =
        formatDuration(
            getCategoryMinutes(weekSessions, "Study")
        );

    document.getElementById("weekResearchTime").textContent =
        formatDuration(
            getCategoryMinutes(weekSessions, "Research")
        );

    document.getElementById("weekCodingTime").textContent =
        formatDuration(
            getCategoryMinutes(weekSessions, "Coding")
        );

}

/*
=========================================
Today's Goals
=========================================
*/

function updateGoals() {

    const todaySessions = getTodaySessions();

    const studyHours =
        (getCategoryMinutes(todaySessions, "Study") / 60).toFixed(1);

    const researchHours =
        (getCategoryMinutes(todaySessions, "Research") / 60).toFixed(1);

    const codingHours =
        (getCategoryMinutes(todaySessions, "Coding") / 60).toFixed(1);


    document.getElementById("studyGoal").textContent =
        `${studyHours} / ${CONFIG.goals.Study} hrs`;

    document.getElementById("researchGoal").textContent =
        `${researchHours} / ${CONFIG.goals.Research} hrs`;

    document.getElementById("codingGoal").textContent =
        `${codingHours} / ${CONFIG.goals.Coding} hrs`;

}

/*
=========================================
Weekly Summary
=========================================
*/

function updateWeeklySummary() {

    const weekSessions = getWeekSessions();

    const studyHours =
        (getCategoryMinutes(weekSessions, "Study") / 60).toFixed(1);

    const researchHours =
        (getCategoryMinutes(weekSessions, "Research") / 60).toFixed(1);

    const codingHours =
        (getCategoryMinutes(weekSessions, "Coding") / 60).toFixed(1);


    document.getElementById("weeklyStudy").textContent =
        `${studyHours} hrs`;

    document.getElementById("weeklyResearch").textContent =
        `${researchHours} hrs`;

    document.getElementById("weeklyCoding").textContent =
        `${codingHours} hrs`;

}

/*
=========================================
Recent Sessions
=========================================
*/

function updateRecentSessions() {

    const container =
        document.getElementById("recentSessions");

    const sessions =
        getRecentSessions(5);

    container.innerHTML = "";


    if (sessions.length === 0) {

        container.innerHTML =
            "<p>No sessions recorded yet.</p>";

        return;

    }


    sessions.forEach(session => {

        const item = document.createElement("div");

        item.className = "recent-session";

        item.innerHTML = `

            <strong>${session.activity}</strong>

            <span>${session.topic}</span>

            <small>

                ${formatDate(session.date)}
                •
                ${formatTimeRange(
                    session.startTime,
                    session.endTime
                )}
                •
                ${formatDuration(session.durationMinutes)}

            </small>

        `;

        container.appendChild(item);

    });

}

/*
=========================================
Initialize Dashboard
=========================================
*/

function initializeDashboard() {

    updateGreeting();

    updateTodayDate();

    updateMotivation();

    updateTodayCards();

    updateWeekCards();

    updateGoals();

    updateWeeklySummary();

    updateRecentSessions();

}


/*
=========================================
Page Load
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});
