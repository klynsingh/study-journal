/*
=========================================
Study Journal
History Module
=========================================
*/


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
            <td>${formatDate(session.date)}</td>
            <td>${session.category}</td>
            <td>${session.activity}</td>
            <td>${session.area}</td>
            <td>${session.topic || "-"}</td>
            <td>${formatDuration(session.durationMinutes)}</td>
            <td>
                <button
                    class="button delete-btn"
                    data-id="${session.id}">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });

    attachDeleteEvents();
}

/*
=========================================
Attach Delete Events
=========================================
*/

function attachDeleteEvents() {

    const buttons = document.querySelectorAll(".delete-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const confirmed = confirm(
                "Are you sure you want to delete this session?"
            );

            if (!confirmed) {
                return;
            }

            const sessionId = button.dataset.id;

            deleteSession(sessionId);

            renderHistory();

        });

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
