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

    const today = new Date();

    const date = new Date(dateString);

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

    return (minutes / 60).toFixed(1);

}
