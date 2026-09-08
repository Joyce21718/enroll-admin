document.addEventListener("DOMContentLoaded", function () {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }


    const searchInput =
        document.getElementById("searchInput");

    const departmentFilter =
        document.getElementById("departmentFilter");

    const statusFilter =
        document.getElementById("statusFilter");

    const rows =
        document.querySelectorAll(".faculty-row");


    function filterFaculty() {

        const search =
            searchInput.value.toLowerCase().trim();

        const department =
            departmentFilter.value;

        const status =
            statusFilter.value;


        rows.forEach(function (row) {

            const text =
                row.innerText.toLowerCase();

            const rowDepartment =
                row.dataset.department;

            const rowStatus =
                row.dataset.status;


            const matchesSearch =
                text.includes(search);

            const matchesDepartment =
                !department ||
                rowDepartment === department;

            const matchesStatus =
                !status ||
                rowStatus === status;


            if (
                matchesSearch &&
                matchesDepartment &&
                matchesStatus
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });
    }


    if (searchInput) {
        searchInput.addEventListener(
            "input",
            filterFaculty
        );
    }

    if (departmentFilter) {
        departmentFilter.addEventListener(
            "change",
            filterFaculty
        );
    }

    if (statusFilter) {
        statusFilter.addEventListener(
            "change",
            filterFaculty
        );
    }

    document
        .querySelectorAll(".viewFacultyBtn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const name =
                        this.dataset.name;

                    alert(
                        "Viewing faculty profile: " +
                        name
                    );

                }
            );

        });

    const addFacultyBtn =
        document.getElementById("addFacultyBtn");

    if (addFacultyBtn) {

        addFacultyBtn.addEventListener(
            "click",
            function () {

                alert(
                    "Add Faculty form will open here."
                );

            }
        );

    }

    const exportFacultyBtn =
        document.getElementById("exportFacultyBtn");

    if (exportFacultyBtn) {

        exportFacultyBtn.addEventListener(
            "click",
            function () {

                alert(
                    "Faculty records will be exported."
                );

            }
        );

    }

});