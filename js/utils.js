/*
=========================================
Study Journal
Utility Functions
=========================================
*/


/*
=========================================
Format Duration
180 -> 3 h 0 min
=========================================
*/

function formatDuration(durationMinutes) {

    if (typeof durationMinutes !== "number" || isNaN(durationMinutes)) {

        return "0 h 0 min";

    }

    const hours = Math.floor(durationMinutes / 60);

    const minutes = durationMinutes % 60;

    return `${hours} h ${minutes} min`;

}


/*
=========================================
Format Date
2026-07-19 -> 19 Jul 2026
=========================================
*/

function formatDate(dateString) {

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {

        return "";

    }

    return date.toLocaleDateString("en-GB", {

        day: "numeric",

        month: "short",

        year: "numeric"

    });

}


/*
=========================================
Is Today?
=========================================
*/

function isToday(dateString) {

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {

        return false;

    }

    const today = new Date();

    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    );

}


/*
=========================================
Convert Minutes to Hours
180 -> 3
=========================================
*/

function minutesToHours(minutes) {

    if (typeof minutes !== "number" || isNaN(minutes)) {

        return "0.0";

    }

    return (minutes / 60).toFixed(1);

}

/*
=========================================
Sort Sessions by Date & Time
=========================================
*/

function sortSessionsByDateTime(sessions) {

    return [...sessions].sort((a, b) => {

        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);

        return dateB - dateA;

    });

}

/*
=========================================
Format Date Object
to YYYY-MM-DD
=========================================
*/

function formatDateISO(date) {

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}
