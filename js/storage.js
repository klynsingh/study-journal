/*
=========================================
Study Journal
Storage Layer

This file is the ONLY file that should
communicate directly with Local Storage.
=========================================
*/

const STORAGE_KEY = "studyJournalSessions";


/*
=========================================
Get All Sessions
=========================================
*/
function getSessions() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (error) {

        console.error("Error reading sessions:", error);

        return [];
    }

}


/*
=========================================
Save Session
=========================================
*/
function saveSession(session) {

    const sessions = getSessions();

    sessions.push(session);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(sessions)
    );

}


/*
=========================================
Delete Session
=========================================
*/
function deleteSession(id) {

    const sessions = getSessions();

    const updatedSessions = sessions.filter(session => session.id !== id);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedSessions)
    );

}


/*
=========================================
Clear All Sessions
=========================================
*/
function clearSessions() {

    localStorage.removeItem(STORAGE_KEY);

}


/*
=========================================
Get Total Session Count

Useful for Dashboard later.
=========================================
*/
function getSessionCount() {

    return getSessions().length;

}
