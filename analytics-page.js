import {
    getTotalSessions,
    getTotalStudyMinutes,
    getAverageSessionDuration,
    getStudyDaysCount,
    getAverageSessionsPerDay,
    getAverageStudyMinutesPerDay,

    getMostProductiveDay,
    getMostProductiveWeek,
    getMostProductiveCategory,
    getMostProductiveArea,

    getLongestSession,
    getShortestSession,
    getMostActiveStudyDay,

    getMonthSessions,
    getYearSessions,
    getMonthlyStudyMinutes,
    getYearlyStudyMinutes,

    getCategoryDistribution,
    getActivityDistribution,
    getAreaDistribution

} from "../analytics.js";

import {
    formatDuration
} from "../utils.js";



// Overall Statistics

const totalSessionsElement =
    document.getElementById("total-sessions");

const totalStudyTimeElement =
    document.getElementById("total-study-time");

const studyDaysElement =
    document.getElementById("study-days");

const averageSessionElement =
    document.getElementById("average-session");

const averageSessionsDayElement =
    document.getElementById("average-sessions-day");

const averageStudyDayElement =
    document.getElementById("average-study-day");


// Overall Statistics Rendering

function renderOverallStatistics() {

    totalSessionsElement.textContent =
        getTotalSessions();

    totalStudyTimeElement.textContent =
        formatDuration(getTotalStudyMinutes());

    studyDaysElement.textContent =
        getStudyDaysCount();

    averageSessionElement.textContent =
        formatDuration(getAverageSessionDuration());

    averageSessionsDayElement.textContent =
        getAverageSessionsPerDay();

    averageStudyDayElement.textContent =
        formatDuration(getAverageStudyMinutesPerDay());

}

// Productivity

function renderProductivity() {

    const productiveDay = getMostProductiveDay();

    productiveDayElement.textContent = productiveDay
        ? `${productiveDay.date} (${formatDuration(productiveDay.minutes)})`
        : "—";


    const productiveWeek = getMostProductiveWeek();

    productiveWeekElement.textContent = productiveWeek
        ? `${productiveWeek.week} (${formatDuration(productiveWeek.minutes)})`
        : "—";


    const topCategory = getMostProductiveCategory();

    topCategoryElement.textContent = topCategory
        ? `${topCategory.category} (${formatDuration(topCategory.minutes)})`
        : "—";


    const topArea = getMostProductiveArea();

    topAreaElement.textContent = topArea
        ? `${topArea.area} (${formatDuration(topArea.minutes)})`
        : "—";

}

// Render Records

function renderRecords() {

    const longest = getLongestSession();

    longestSessionElement.textContent = longest
        ? `${longest.title} (${formatDuration(longest.durationMinutes)})`
        : "—";


    const shortest = getShortestSession();

    shortestSessionElement.textContent = shortest
        ? `${shortest.title} (${formatDuration(shortest.durationMinutes)})`
        : "—";


    const activeDay = getMostActiveStudyDay();

    mostActiveDayElement.textContent = activeDay
        ? `${activeDay.date} (${activeDay.sessions} sessions)`
        : "—";

}

// Render Current Progress

function renderCurrentProgress() {

    monthSessionsElement.textContent =
        `${getMonthSessions().length} Sessions`;

    monthMinutesElement.textContent =
        formatDuration(getMonthlyStudyMinutes());


    yearSessionsElement.textContent =
        `${getYearSessions().length} Sessions`;

    yearMinutesElement.textContent =
        formatDuration(getYearlyStudyMinutes());

}

// Render Distribution

function populateDistributionTable(table, distribution) {

    table.innerHTML = "";

    for (const [name, minutes] of Object.entries(distribution)) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${name}</td>
            <td>${formatDuration(minutes)}</td>
        `;

        table.appendChild(row);

    }

}

function renderDistributionTables() {

    populateDistributionTable(
        categoryDistributionElement,
        getCategoryDistribution()
    );

    populateDistributionTable(
        activityDistributionElement,
        getActivityDistribution()
    );

    populateDistributionTable(
        areaDistributionElement,
        getAreaDistribution()
    );

}

// Records

const productiveDayElement =
    document.getElementById("productive-day");

const productiveWeekElement =
    document.getElementById("productive-week");

const topCategoryElement =
    document.getElementById("top-category");

const topAreaElement =
    document.getElementById("top-area"); 

const longestSessionElement =
    document.getElementById("longest-session");

const shortestSessionElement =
    document.getElementById("shortest-session");

const mostActiveDayElement =
    document.getElementById("most-active-day");


// Progress

const monthSessionsElement =
    document.getElementById("month-sessions");

const monthMinutesElement =
    document.getElementById("month-minutes");

const yearSessionsElement =
    document.getElementById("year-sessions");

const yearMinutesElement =
    document.getElementById("year-minutes");


// Distribution

const categoryDistributionElement =
    document.getElementById("category-distribution");

const activityDistributionElement =
    document.getElementById("activity-distribution");

const areaDistributionElement =
    document.getElementById("area-distribution");



function renderOverallStatistics() {

    totalSessionsElement.textContent =
        getTotalSessions();

    totalStudyTimeElement.textContent =
        formatDuration(getTotalStudyMinutes());

    studyDaysElement.textContent =
        getStudyDaysCount();

    averageSessionElement.textContent =
        formatDuration(getAverageSessionDuration());

    averageSessionsDayElement.textContent =
        getAverageSessionsPerDay();

    averageStudyDayElement.textContent =
        formatDuration(getAverageStudyMinutesPerDay());

}




function initializePage() {

    renderOverallStatistics();

    renderProductivity();

    renderRecords();

    renderCurrentProgress();

    renderDistributionTables();

}

initializePage();



