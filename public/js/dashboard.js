document.addEventListener("DOMContentLoaded", function () {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (confirmLogout) {
                window.location.href = "/";
            }

        });
    }

    const searchInput =
        document.getElementById("applicationSearch");

    const applicationRows =
        document.querySelectorAll(".application-row");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchValue =
                this.value.toLowerCase().trim();

            applicationRows.forEach(function (row) {

                const name =
                    (row.getAttribute("data-name") || "")
                    .toLowerCase();

                if (name.includes(searchValue)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            });

        });

    }
    const actionButtons =
        document.querySelectorAll(".action-btn");

    actionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const student =
                this.getAttribute("data-student");

            const action =
                this.textContent.trim();

            alert(
                action + " application for " + student
            );

        });

    });

});