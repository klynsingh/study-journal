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