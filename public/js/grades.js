document.addEventListener("DOMContentLoaded", function () {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const searchInput =
        document.getElementById("gradeSearch");

    const gradeLevelFilter =
        document.getElementById("gradeLevelFilter");

    const schoolYearFilter =
        document.getElementById("schoolYearFilter");

    const exportGradesBtn =
        document.getElementById("exportGradesBtn");

    const printTorBtn =
        document.getElementById("printTorBtn");

    const rows =
        Array.from(
            document.querySelectorAll(".grade-student-row")
        );

    const emptyState =
        document.getElementById("emptyState");

    const showingRange =
        document.getElementById("showingRange");

    const totalFiltered =
        document.getElementById("totalFiltered");

    const prevPageBtn =
        document.getElementById("prevPageBtn");

    const nextPageBtn =
        document.getElementById("nextPageBtn");

    const paginationNumbers =
        document.getElementById("paginationNumbers");


    const rowsPerPage = 5;

    let currentPage = 1;

    let filteredRows = [...rows];

    function filterStudents() {

        const search =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";

        const grade =
            gradeLevelFilter
                ? gradeLevelFilter.value
                : "";

        filteredRows = rows.filter(function (row) {

            const name =
                (row.dataset.name || "")
                    .toLowerCase();

            const studentId =
                row.children[1]
                    ? row.children[1].textContent
                        .toLowerCase()
                        .trim()
                    : "";

            const rowGrade =
                row.dataset.grade || "";

            const matchesSearch =
                name.includes(search) ||
                studentId.includes(search);

            const matchesGrade =
                !grade ||
                rowGrade === grade;

            return (
                matchesSearch &&
                matchesGrade
            );

        });

        currentPage = 1;

        renderTable();

    }

    function renderTable() {

        rows.forEach(function (row) {
            row.style.display = "none";
        });

        const total =
            filteredRows.length;

        const totalPages =
            Math.max(
                1,
                Math.ceil(total / rowsPerPage)
            );

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        const start =
            (currentPage - 1) *
            rowsPerPage;

        const end =
            Math.min(
                start + rowsPerPage,
                total
            );

        const visibleRows =
            filteredRows.slice(start, end);

        visibleRows.forEach(function (row) {
            row.style.display = "";
        });

        if (emptyState) {

            if (total === 0) {
                emptyState.classList.remove("hidden");
            } else {
                emptyState.classList.add("hidden");
            }

        }


        if (showingRange) {

            if (total === 0) {
                showingRange.textContent = "0";
            } else {
                showingRange.textContent =
                    `${start + 1}–${end}`;
            }

        }

        if (totalFiltered) {
            totalFiltered.textContent = total;
        }

        if (prevPageBtn) {

            prevPageBtn.disabled =
                currentPage <= 1 ||
                total === 0;

        }

        if (nextPageBtn) {

            nextPageBtn.disabled =
                currentPage >= totalPages ||
                total === 0;

        }


        renderPagination(totalPages);

    }

    function renderPagination(totalPages) {

        if (!paginationNumbers) return;

        paginationNumbers.innerHTML = "";

        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            const button =
                document.createElement("button");

            button.type = "button";

            button.textContent = page;

            button.className =
                page === currentPage
                    ? "rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                    : "rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50";

            button.addEventListener(
                "click",
                function () {

                    currentPage = page;

                    renderTable();

                }
            );

            paginationNumbers.appendChild(button);

        }

    }

    if (prevPageBtn) {

        prevPageBtn.addEventListener(
            "click",
            function () {

                if (currentPage > 1) {

                    currentPage--;

                    renderTable();

                }

            }
        );

    }

    if (nextPageBtn) {

        nextPageBtn.addEventListener(
            "click",
            function () {

                const totalPages =
                    Math.max(
                        1,
                        Math.ceil(
                            filteredRows.length /
                            rowsPerPage
                        )
                    );

                if (currentPage < totalPages) {

                    currentPage++;

                    renderTable();

                }

            }
        );

    }

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterStudents
        );

    }

    if (gradeLevelFilter) {

        gradeLevelFilter.addEventListener(
            "change",
            filterStudents
        );

    }

    if (schoolYearFilter) {

        schoolYearFilter.addEventListener(
            "change",
            function () {

                filterStudents();

            }
        );

    }

    const gradeModal =
        document.getElementById("gradeModal");

    const closeGradeModalBtn =
        document.getElementById("closeGradeModalBtn");

    const modalCloseBtn =
        document.getElementById("modalCloseBtn");

    const modalPrintBtn =
        document.getElementById("modalPrintBtn");

    const modalStudentName =
        document.getElementById("modalStudentName");

    const modalStudentId =
        document.getElementById("modalStudentId");

    const modalGrade =
        document.getElementById("modalGrade");

    const modalSection =
        document.getElementById("modalSection");

    const modalAverage =
        document.getElementById("modalAverage");

    const modalStatus =
        document.getElementById("modalStatus");

    const modalRemarks =
        document.getElementById("modalRemarks");


    let selectedStudent = {
        name: "",
        id: "",
        grade: "",
        section: "",
        average: "",
        status: ""
    };

    function openGradeModal(button) {

        selectedStudent = {
            name: button.dataset.name || "",
            id: button.dataset.id || "",
            grade: button.dataset.grade || "",
            section: button.dataset.section || "",
            average: button.dataset.average || "",
            status: button.dataset.status || ""
        };


        if (modalStudentName) {
            modalStudentName.textContent =
                selectedStudent.name;
        }

        if (modalStudentId) {
            modalStudentId.textContent =
                selectedStudent.id;
        }

        if (modalGrade) {
            modalGrade.textContent =
                selectedStudent.grade;
        }

        if (modalSection) {
            modalSection.textContent =
                selectedStudent.section;
        }

        if (modalAverage) {
            modalAverage.textContent =
                selectedStudent.average;
        }

        if (modalStatus) {

            modalStatus.textContent =
                selectedStudent.status;

            if (
                selectedStudent.status === "Passed"
            ) {

                modalStatus.className =
                    "mt-1 font-semibold text-emerald-600";

            } else {

                modalStatus.className =
                    "mt-1 font-semibold text-rose-600";

            }

        }

        if (modalRemarks) {

            modalRemarks.textContent =
                selectedStudent.status === "Passed"
                    ? "Passed / Promoted"
                    : "Needs Review";

            if (
                selectedStudent.status === "Passed"
            ) {

                modalRemarks.className =
                    "mt-2 text-xl font-bold text-emerald-700";

            } else {

                modalRemarks.className =
                    "mt-2 text-xl font-bold text-rose-700";

            }

        }


        if (gradeModal) {

            gradeModal.classList.remove("hidden");

            gradeModal.classList.add("flex");

            document.body.classList.add("overflow-hidden");

        }

    }

    function closeGradeModal() {

        if (gradeModal) {

            gradeModal.classList.add("hidden");

            gradeModal.classList.remove("flex");

            document.body.classList.remove("overflow-hidden");

        }

    }

    document
        .querySelectorAll(".viewGradesBtn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    openGradeModal(this);

                }
            );

        });

    if (closeGradeModalBtn) {

        closeGradeModalBtn.addEventListener(
            "click",
            closeGradeModal
        );

    }

    if (modalCloseBtn) {

        modalCloseBtn.addEventListener(
            "click",
            closeGradeModal
        );

    }

    if (gradeModal) {

        gradeModal.addEventListener(
            "click",
            function (event) {

                if (event.target === gradeModal) {
                    closeGradeModal();
                }

            }
        );

    }

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                gradeModal &&
                !gradeModal.classList.contains("hidden")
            ) {

                closeGradeModal();

            }

        }
    );

    function printTOR() {

        const printStudentName =
            document.getElementById("printStudentName");

        const printStudentId =
            document.getElementById("printStudentId");

        const printGrade =
            document.getElementById("printGrade");

        const printSection =
            document.getElementById("printSection");

        const printAverage =
            document.getElementById("printAverage");

        const printRemarks =
            document.getElementById("printRemarks");


        if (printStudentName) {
            printStudentName.textContent =
                selectedStudent.name ||
                "All Students";
        }

        if (printStudentId) {
            printStudentId.textContent =
                selectedStudent.id ||
                "—";
        }

        if (printGrade) {
            printGrade.textContent =
                selectedStudent.grade ||
                "—";
        }

        if (printSection) {
            printSection.textContent =
                selectedStudent.section ||
                "—";
        }

        if (printAverage) {
            printAverage.textContent =
                selectedStudent.average ||
                "—";
        }

        if (printRemarks) {
            printRemarks.textContent =
                selectedStudent.status === "Passed"
                    ? "Passed / Promoted"
                    : selectedStudent.status ||
                      "—";
        }

        window.print();

    }


    if (printTorBtn) {

        printTorBtn.addEventListener(
            "click",
            function () {

                printTOR();

            }
        );

    }


    if (modalPrintBtn) {

        modalPrintBtn.addEventListener(
            "click",
            function () {

                printTOR();

            }
        );

    }

    if (exportGradesBtn) {

        exportGradesBtn.addEventListener(
            "click",
            function () {

                exportGradesToCSV();

            }
        );

    }


    function exportGradesToCSV() {

        if (filteredRows.length === 0) {
            return;
        }

        const header = [
            "Student Name",
            "Student ID",
            "Grade Level",
            "Section",
            "General Average",
            "Status"
        ];


        const data =
            filteredRows.map(function (row) {

                return [

                    row.dataset.name || "",

                    row.children[1]
                        ? row.children[1]
                            .textContent
                            .trim()
                        : "",

                    row.dataset.grade || "",

                    row.dataset.section || "",

                    row.dataset.average || "",

                    row.dataset.status || ""

                ];

            });


        const csvRows = [
            header,
            ...data
        ];


        const csv =
            csvRows
                .map(function (row) {

                    return row
                        .map(function (value) {

                            return `"${String(value)
                                .replace(/"/g, '""')}"`;

                        })
                        .join(",");

                })
                .join("\n");


        const blob =
            new Blob(
                [csv],
                {
                    type: "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "student-grades-2026-2027.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    }

    renderTable();
  

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

});