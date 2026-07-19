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

    // Validate input
    if (!session || typeof session !== "object") {

        console.error("Invalid session.");

        return;

    }

    const sessions = getSessions();

    sessions.push(session);

    // Save to Local Storage
    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(sessions)
        );

    } catch (error) {

        console.error("Unable to save session:", error);

    }

}

/*
=========================================
Delete Session
=========================================
*/
function deleteSession(id) {

    const sessions = getSessions();

    const updatedSessions = sessions.filter(session => session.id !== id);

    try {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedSessions)
    );

    } catch (error) {

        console.error("Unable to delete session:", error);

    }

}


/*
=========================================
Clear All Sessions
=========================================
*/
function clearSessions() {

    try {

    localStorage.removeItem(STORAGE_KEY);

    } catch (error) {

    console.error("Unable to clear sessions:", error);

    }

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
