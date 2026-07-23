/*
=========================================
Study Journal
Analytics Module
=========================================
*/


/*
=========================================
Get Today's Sessions
=========================================
*/

function getTodaySessions() {

    const sessions = getSessions();

    return sessions.filter(session => isToday(session.date));

}

/*
=========================================
Get This Week's Sessions
=========================================
*/

function getWeekSessions() {

    const sessions = getSessions();

    const today = new Date();

    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setHours(0, 0, 0, 0);

    // Monday = first day of week
    const day = firstDayOfWeek.getDay();
    const diff = day === 0 ? 6 : day - 1;

    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - diff);

    const endOfToday = new Date(today);

    endOfToday.setHours(23, 59, 59, 999);

    return sessions.filter(session => {

        const sessionDate = new Date(session.date);
        sessionDate.setHours(0, 0, 0, 0);

        return (
        sessionDate >= firstDayOfWeek &&
        sessionDate <= endOfToday
        );    

    });

}

/*
=========================================
Get Total Minutes
=========================================
*/

function getTotalMinutes(sessions) {

    return sessions.reduce((total, session) => {

    const minutes =
        Number(session.durationMinutes) || 0;

    return total + minutes;

    }, 0);

}


/*
=========================================
Get Category Minutes
=========================================
*/

function getCategoryMinutes(sessions, category) {

    const filteredSessions = sessions.filter(session => {

        return session.category === category;

    });

    return getTotalMinutes(filteredSessions);

}


/*
=========================================
Get Recent Sessions
=========================================
*/

function getRecentSessions(limit = 5) {

    const sessions = getSessions();

    return sortSessionsByDateTime(sessions)
        .slice(0, limit);

}

/*
=========================================
Current Study Streak
=========================================
*/

function getCurrentStreak() {

    const sessions = getSessions();

    if (sessions.length === 0) {

        return 0;

    }

    // Unique study dates
    const uniqueDates = new Set();

    sessions.forEach(session => {

        uniqueDates.add(session.date);

    });

    let streak = 0;

    let currentDate = new Date();

    while (true) {

        const dateString = formatDateISO(currentDate);

        if (uniqueDates.has(dateString)) {

            streak++;

            currentDate.setDate(currentDate.getDate() - 1);

        }

        else {

            break;

        }

    }

    return streak;

}


/*
=========================================
Analytics
=========================================
*/


/**
 * Returns the total number of recorded sessions.
 *
 * @returns {number}
 */
function getTotalSessions() {

    const sessions = getSessions();

    return sessions.length;

}


/**
 * Returns the total study time across all sessions in minutes.
 *
 * @returns {number}
 */
function getTotalStudyMinutes() {

    const sessions = getSessions();

    return sessions.reduce((total, session) => {

        return total + session.durationMinutes;

    }, 0);

}


/**
 * Returns the average duration of a study session in minutes.
 *
 * @returns {number}
 */
function getAverageSessionDuration() {

    const totalSessions = getTotalSessions();

    if (totalSessions === 0) {
        return 0;
    }

    return Math.round(getTotalStudyMinutes() / totalSessions);

}


/**
 * Returns the longest recorded study session.
 *
 * @returns {Object|null}
 */
function getLongestSession() {

    const sessions = getSessions();

    if (sessions.length === 0) {
        return null;
    }

    return sessions.reduce((longest, session) => {

        return session.durationMinutes > longest.durationMinutes
            ? session
            : longest;

    });

}


/**
 * Returns the shortest recorded study session.
 *
 * @returns {Object|null}
 */
function getShortestSession() {

    const sessions = getSessions();

    if (sessions.length === 0) {
        return null;
    }

    return sessions.reduce((shortest, session) => {

        return session.durationMinutes < shortest.durationMinutes
            ? session
            : shortest;

    });

}


/**
 * Returns all sessions from the current month.
 *
 * @returns {Array}
 */
function getMonthSessions() {

    const sessions = getSessions();

    const today = new Date();

    const currentMonth = today.getMonth();

    const currentYear = today.getFullYear();

    return sessions.filter(session => {

        const sessionDate = new Date(session.date);

        return (
            sessionDate.getMonth() === currentMonth &&
            sessionDate.getFullYear() === currentYear
        );

    });

}


/**
 * Returns all sessions from the current year.
 *
 * @returns {Array}
 */
function getYearSessions() {

    const sessions = getSessions();

    const currentYear = new Date().getFullYear();

    return sessions.filter(session => {

        const sessionDate = new Date(session.date);

        return sessionDate.getFullYear() === currentYear;

    });

}


/**
 * Returns the total study time for the current month in minutes.
 *
 * @returns {number}
 */
function getMonthlyStudyMinutes() {

    return getTotalMinutes(getMonthSessions());

}


/**
 * Returns the total study time for the current year in minutes.
 *
 * @returns {number}
 */
function getYearlyStudyMinutes() {

    return getTotalMinutes(getYearSessions());

}


/**
 * Returns total study minutes grouped by category.
 *
 * @returns {Object}
 */
function getCategoryDistribution() {

    const sessions = getSessions();

    return sessions.reduce((distribution, session) => {

        const category = session.category;

        if (!distribution[category]) {
            distribution[category] = 0;
        }

        distribution[category] += session.durationMinutes;

        return distribution;

    }, {});

}


/**
 * Returns total study minutes grouped by activity.
 *
 * @returns {Object}
 */
function getActivityDistribution() {

    const sessions = getSessions();

    return sessions.reduce((distribution, session) => {

        const activity = session.activity;

        if (!distribution[activity]) {
            distribution[activity] = 0;
        }

        distribution[activity] += session.durationMinutes;

        return distribution;

    }, {});

}


/**
 * Returns total study minutes grouped by area.
 *
 * @returns {Object}
 */
function getAreaDistribution() {

    const sessions = getSessions();

    return sessions.reduce((distribution, session) => {

        const area = session.area;

        if (!distribution[area]) {
            distribution[area] = 0;
        }

        distribution[area] += session.durationMinutes;

        return distribution;

    }, {});

}

/**
 * Returns the date with the highest total study time.
 *
 * @returns {{date: string, minutes: number}|null}
 */
function getMostProductiveDay() {

    const sessions = getSessions();

    if (sessions.length === 0) {
        return null;
    }

    const dailyMinutes = {};

    sessions.forEach(session => {

        if (!dailyMinutes[session.date]) {
            dailyMinutes[session.date] = 0;
        }

        dailyMinutes[session.date] += session.durationMinutes;

    });

    let bestDate = null;
    let bestMinutes = 0;

    for (const date in dailyMinutes) {

        if (dailyMinutes[date] > bestMinutes) {

            bestDate = date;
            bestMinutes = dailyMinutes[date];

        }

    }

    return {
        date: bestDate,
        minutes: bestMinutes
    };

}


/**
 * Returns the category with the highest study time.
 *
 * @returns {{category: string, minutes: number}|null}
 */
function getMostProductiveCategory() {

    const distribution = getCategoryDistribution();

    const categories = Object.keys(distribution);

    if (categories.length === 0) {
        return null;
    }

    let bestCategory = categories[0];
    let bestMinutes = distribution[bestCategory];

    categories.forEach(category => {

        if (distribution[category] > bestMinutes) {

            bestCategory = category;
            bestMinutes = distribution[category];

        }

    });

    return {
        category: bestCategory,
        minutes: bestMinutes
    };

}


/**
 * Returns the area with the highest study time.
 *
 * @returns {{area: string, minutes: number}|null}
 */
function getMostProductiveArea() {

    const distribution = getAreaDistribution();

    const areas = Object.keys(distribution);

    if (areas.length === 0) {
        return null;
    }

    let bestArea = areas[0];
    let bestMinutes = distribution[bestArea];

    areas.forEach(area => {

        if (distribution[area] > bestMinutes) {

            bestArea = area;
            bestMinutes = distribution[area];

        }

    });

    return {
        area: bestArea,
        minutes: bestMinutes
    };

}


/**
 * Returns total study minutes grouped by date.
 *
 * @returns {Object}
 */
function getDailyStudyMinutes() {

    const sessions = getSessions();

    return sessions.reduce((dailyMinutes, session) => {

        if (!dailyMinutes[session.date]) {
            dailyMinutes[session.date] = 0;
        }

        dailyMinutes[session.date] += session.durationMinutes;

        return dailyMinutes;

    }, {});

}


/**
 * Returns total study minutes grouped by week.
 *
 * @returns {Object}
 */
function getWeeklyStudyMinutes() {

    const sessions = getSessions();

    const weeklyMinutes = {};

    sessions.forEach(session => {

        const date = new Date(session.date);

        const year = date.getFullYear();

        const firstDay = new Date(year, 0, 1);

        const days = Math.floor((date - firstDay) / 86400000);

        const week = Math.ceil((days + firstDay.getDay() + 1) / 7);

        const key = `${year}-W${week}`;

        if (!weeklyMinutes[key]) {
            weeklyMinutes[key] = 0;
        }

        weeklyMinutes[key] += session.durationMinutes;

    });

    return weeklyMinutes;

}


/**
 * Returns total study minutes grouped by month.
 *
 * @returns {Object}
 */
function getMonthlyStudyMinutesByMonth() {

    const sessions = getSessions();

    return sessions.reduce((monthlyMinutes, session) => {

        const month = session.date.substring(0, 7);

        if (!monthlyMinutes[month]) {
            monthlyMinutes[month] = 0;
        }

        monthlyMinutes[month] += session.durationMinutes;

        return monthlyMinutes;

    }, {});

}


/**
 * Returns the average number of sessions per active study day.
 *
 * @returns {number}
 */
function getAverageSessionsPerDay() {

    const sessions = getSessions();

    if (sessions.length === 0) {
        return 0;
    }

    const uniqueDays = new Set(
        sessions.map(session => session.date)
    );

    return Number((sessions.length / uniqueDays.size).toFixed(1));

}


/**
 * Returns the average study time per active study day.
 *
 * @returns {number}
 */
function getAverageStudyMinutesPerDay() {

    const dailyMinutes = getDailyStudyMinutes();

    const days = Object.keys(dailyMinutes);

    if (days.length === 0) {
        return 0;
    }

    const totalMinutes = Object.values(dailyMinutes)
        .reduce((sum, minutes) => sum + minutes, 0);

    return Math.round(totalMinutes / days.length);

}


/**
 * Returns the most productive study week.
 *
 * @returns {{week: string, minutes: number}|null}
 */
function getMostProductiveWeek() {

    const weeklyMinutes = getWeeklyStudyMinutes();

    const weeks = Object.keys(weeklyMinutes);

    if (weeks.length === 0) {
        return null;
    }

    let bestWeek = weeks[0];
    let bestMinutes = weeklyMinutes[bestWeek];

    weeks.forEach(week => {

        if (weeklyMinutes[week] > bestMinutes) {

            bestWeek = week;
            bestMinutes = weeklyMinutes[week];

        }

    });

    return {
        week: bestWeek,
        minutes: bestMinutes
    };

}


/**
 * Returns the number of unique study days.
 *
 * @returns {number}
 */
function getStudyDaysCount() {

    const sessions = getSessions();

    const uniqueDays = new Set(
        sessions.map(session => session.date)
    );

    return uniqueDays.size;

}

/**
 * Returns the day with the highest number of study sessions.
 *
 * @returns {{date: string, sessions: number}|null}
 */
function getMostActiveStudyDay() {

    const sessions = getSessions();

    if (sessions.length === 0) {
        return null;
    }

    const sessionCounts = {};

    sessions.forEach(session => {

        if (!sessionCounts[session.date]) {
            sessionCounts[session.date] = 0;
        }

        sessionCounts[session.date]++;

    });

    let bestDate = null;
    let highestCount = 0;

    for (const date in sessionCounts) {

        if (sessionCounts[date] > highestCount) {

            bestDate = date;
            highestCount = sessionCounts[date];

        }

    }

    return {
        date: bestDate,
        sessions: highestCount
    };

}


/**
 * Returns the average study time per week in minutes.
 *
 * @returns {number}
 */
function getAverageStudyHoursPerWeek() {

    const weeklyMinutes = getWeeklyStudyMinutes();

    const weeks = Object.values(weeklyMinutes);

    if (weeks.length === 0) {
        return 0;
    }

    const totalMinutes = weeks.reduce((sum, minutes) => sum + minutes, 0);

    return Math.round(totalMinutes / weeks.length);

}
