document.addEventListener("DOMContentLoaded", function () {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const searchInput =
        document.getElementById("searchInput");

    const gradeFilter =
        document.getElementById("gradeFilter");

    const statusFilter =
        document.getElementById("statusFilter");

    const rows =
        document.querySelectorAll(".student-row");


    function filterStudents() {

        const search =
            searchInput.value.toLowerCase().trim();

        const grade =
            gradeFilter.value;

        const status =
            statusFilter.value;


        rows.forEach(function (row) {

            const rowSearch =
                (row.dataset.search || "").toLowerCase();

            const rowGrade =
                row.dataset.grade;

            const rowStatus =
                row.dataset.status;


            const matchesSearch =
                rowSearch.includes(search);

            const matchesGrade =
                grade === "all" ||
                rowGrade === grade;

            const matchesStatus =
                status === "all" ||
                rowStatus === status;


            if (
                matchesSearch &&
                matchesGrade &&
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
            filterStudents
        );
    }

    if (gradeFilter) {
        gradeFilter.addEventListener(
            "change",
            filterStudents
        );
    }

    if (statusFilter) {
        statusFilter.addEventListener(
            "change",
            filterStudents
        );
    }

    document
        .querySelectorAll(".viewBtn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const student =
                        this.dataset.student;

                    alert(
                        "Viewing student record for " +
                        student
                    );

                }
            );

        });

    const addStudentBtn =
        document.getElementById("addStudentBtn");

    if (addStudentBtn) {

        addStudentBtn.addEventListener(
            "click",
            function () {

                alert(
                    "Opening new student registration form..."
                );

            }
        );

    }

    const exportBtn =
        document.getElementById("exportBtn");

    if (exportBtn) {

        exportBtn.addEventListener(
            "click",
            function () {

                alert(
                    "Student records export started."
                );

            }
        );

    }

});