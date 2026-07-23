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


// Productivity

const productiveDayElement =
    document.getElementById("productive-day");

const productiveWeekElement =
    document.getElementById("productive-week");

const topCategoryElement =
    document.getElementById("top-category");

const topAreaElement =
    document.getElementById("top-area");


// Records

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

}

initializePage();



