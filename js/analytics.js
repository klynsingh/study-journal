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
Get Total Minutes
=========================================
*/

function getTotalMinutes(sessions) {

    return sessions.reduce((total, session) => {

        return total + session.durationMinutes;

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

    return [...sessions]
        .sort((a, b) => {

            return new Date(b.createdAt) - new Date(a.createdAt);

        })
        .slice(0, limit);

}
