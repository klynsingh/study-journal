/*
=========================================
Study Journal
History Module
=========================================
*/


/*
=========================================
Format Duration
=========================================
*/

function formatDuration(durationMinutes) {

    const hours = Math.floor(durationMinutes / 60);

    const minutes = durationMinutes % 60;

    return `${hours} h ${minutes} min`;

}


/*
=========================================
Render History Table
=========================================
*/

function renderHistory() {

    const sessions = getSessions();

    const tableBody = document.getElementById("historyTableBody");

    const emptyState = document.getElementById("emptyState");

    const tableContainer = document.getElementById("historyTableContainer");

    const sessionCount = document.getElementById("sessionCount");

    sessionCount.textContent =
        `${sessions.length} Session${sessions.length !== 1 ? "s" : ""}`;

    tableBody.innerHTML = "";

    if (sessions.length === 0) {

        emptyState.style.display = "block";

        tableContainer.style.display = "none";

        return;

    }

    emptyState.style.display = "none";

    tableContainer.style.display = "block";


    // Newest first
    sessions.reverse().forEach(session => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${session.date}</td>
            <td>${session.category}</td>
            <td>${session.activity}</td>
            <td>${session.area}</td>
            <td>${session.topic || "-"}</td>
            <td>${formatDuration(session.durationMinutes)}</td>
            <td>
                <button class="button delete-btn">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });

}


/*
=========================================
Initialize History
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    renderHistory();

});
