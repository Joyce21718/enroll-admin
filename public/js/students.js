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

    const studentTable =
        document.getElementById("studentTable");

    const emptyStudentState =
        document.getElementById("emptyStudentState");

    const showingRange =
        document.getElementById("showingRange");

    const totalDisplayed =
        document.getElementById("totalDisplayed");

    const prevPageBtn =
        document.getElementById("prevPageBtn");

    const nextPageBtn =
        document.getElementById("nextPageBtn");

    const paginationNumbers =
        document.getElementById("paginationNumbers");

    const exportBtn =
        document.getElementById("exportBtn");

    const addStudentBtn =
        document.getElementById("addStudentBtn");


    const studentModal =
        document.getElementById("studentModal");

    const closeStudentModalBtn =
        document.getElementById("closeStudentModalBtn");

    const modalCloseBtn =
        document.getElementById("modalCloseBtn");

    const modalInitials =
        document.getElementById("modalInitials");

    const modalStudentName =
        document.getElementById("modalStudentName");

    const modalStudentId =
        document.getElementById("modalStudentId");

    const modalGender =
        document.getElementById("modalGender");

    const modalGrade =
        document.getElementById("modalGrade");

    const modalSection =
        document.getElementById("modalSection");

    const modalGuardian =
        document.getElementById("modalGuardian");

    const modalStatusBadge =
        document.getElementById("modalStatusBadge");


    const addStudentModal =
        document.getElementById("addStudentModal");

    const closeAddStudentModalBtn =
        document.getElementById("closeAddStudentModalBtn");

    const cancelAddStudentBtn =
        document.getElementById("cancelAddStudentBtn");

    const addStudentForm =
        document.getElementById("addStudentForm");


    /* =====================================================
       TABLE DATA
    ===================================================== */

    let rows =
        Array.from(
            document.querySelectorAll(".student-row")
        );

    let filteredRows = [...rows];

    const rowsPerPage = 5;

    let currentPage = 1;


    function openAddStudentModal() {

        if (!addStudentModal) {
            return;
        }

        addStudentModal.classList.remove("hidden");
        addStudentModal.classList.add("flex");

        document.body.classList.add("overflow-hidden");

        const nameInput =
            document.getElementById("studentName");

        if (nameInput) {

            setTimeout(function () {
                nameInput.focus();
            }, 100);

        }

    }


    function closeAddStudentModal() {

        if (!addStudentModal) {
            return;
        }

        addStudentModal.classList.add("hidden");
        addStudentModal.classList.remove("flex");

        document.body.classList.remove("overflow-hidden");
    }

    if (addStudentBtn) {

        addStudentBtn.addEventListener(
            "click",
            openAddStudentModal
        );

    }

    if (closeAddStudentModalBtn) {

        closeAddStudentModalBtn.addEventListener(
            "click",
            closeAddStudentModal
        );

    }


    if (cancelAddStudentBtn) {

        cancelAddStudentBtn.addEventListener(
            "click",
            closeAddStudentModal
        );

    }


    /* =====================================================
       ADD MODAL OUTSIDE CLICK
    ===================================================== */

    if (addStudentModal) {

        addStudentModal.addEventListener(
            "click",
            function (event) {

                if (event.target === addStudentModal) {
                    closeAddStudentModal();
                }

            }
        );

    }

    function openStudentModal(button) {

        if (!studentModal || !button) {
            return;
        }

        const name =
            button.dataset.name || "Student";

        const id =
            button.dataset.id || "-";

        const gender =
            button.dataset.gender || "-";

        const grade =
            button.dataset.grade || "-";

        const section =
            button.dataset.section || "-";

        const guardian =
            button.dataset.guardian || "-";

        const status =
            button.dataset.status || "Active";


        /* Initials */

        const nameParts =
            name.trim().split(/\s+/);

        let initials = "";

        if (nameParts.length >= 2) {

            initials =
                nameParts[0].charAt(0) +
                nameParts[nameParts.length - 1].charAt(0);

        } else {

            initials =
                name.substring(0, 2);

        }


        if (modalInitials) {
            modalInitials.textContent =
                initials.toUpperCase();
        }

        if (modalStudentName) {
            modalStudentName.textContent =
                name;
        }

        if (modalStudentId) {
            modalStudentId.textContent =
                id;
        }

        if (modalGender) {
            modalGender.textContent =
                gender;
        }

        if (modalGrade) {
            modalGrade.textContent =
                grade;
        }

        if (modalSection) {
            modalSection.textContent =
                section;
        }

        if (modalGuardian) {
            modalGuardian.textContent =
                guardian;
        }


        /* Status */

        if (modalStatusBadge) {

            modalStatusBadge.textContent =
                status;

            modalStatusBadge.className =
                "inline-flex rounded-full px-3 py-1 text-xs font-semibold";

            if (status === "Active") {

                modalStatusBadge.classList.add(
                    "bg-emerald-50",
                    "text-emerald-600"
                );

            } else {

                modalStatusBadge.classList.add(
                    "bg-red-50",
                    "text-red-600"
                );

            }

        }


        studentModal.classList.remove("hidden");
        studentModal.classList.add("flex");

        document.body.classList.add("overflow-hidden");
    }

    function closeStudentModal() {

        if (!studentModal) {
            return;
        }

        studentModal.classList.add("hidden");
        studentModal.classList.remove("flex");

        document.body.classList.remove("overflow-hidden");
    }


    function bindViewButtons() {

        document
            .querySelectorAll(".viewBtn")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openStudentModal(this);

                    }
                );

            });

    }


    bindViewButtons();


    if (closeStudentModalBtn) {

        closeStudentModalBtn.addEventListener(
            "click",
            closeStudentModal
        );

    }


    if (modalCloseBtn) {

        modalCloseBtn.addEventListener(
            "click",
            closeStudentModal
        );

    }


    /* =====================================================
       VIEW MODAL OUTSIDE CLICK
    ===================================================== */

    if (studentModal) {

        studentModal.addEventListener(
            "click",
            function (event) {

                if (event.target === studentModal) {
                    closeStudentModal();
                }

            }
        );

    }

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }

            if (
                studentModal &&
                !studentModal.classList.contains("hidden")
            ) {
                closeStudentModal();
            }

            if (
                addStudentModal &&
                !addStudentModal.classList.contains("hidden")
            ) {
                closeAddStudentModal();
            }

        }
    );


    function filterStudents() {

        const search =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";

        const grade =
            gradeFilter
                ? gradeFilter.value
                : "all";

        const status =
            statusFilter
                ? statusFilter.value
                : "all";


        filteredRows =
            rows.filter(function (row) {

                const searchText =
                    (
                        row.dataset.search ||
                        ""
                    ).toLowerCase();

                const rowGrade =
                    row.dataset.grade || "";

                const rowStatus =
                    row.dataset.status || "";


                const matchesSearch =
                    searchText.includes(search);

                const matchesGrade =
                    grade === "all" ||
                    rowGrade === grade;

                const matchesStatus =
                    status === "all" ||
                    rowStatus === status;


                return (
                    matchesSearch &&
                    matchesGrade &&
                    matchesStatus
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
                Math.ceil(
                    total / rowsPerPage
                )
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
            filteredRows.slice(
                start,
                end
            );


        visibleRows.forEach(function (row) {

            row.style.display = "";

        });



        if (emptyStudentState) {

            if (total === 0) {

                emptyStudentState.classList.remove(
                    "hidden"
                );

            } else {

                emptyStudentState.classList.add(
                    "hidden"
                );

            }

        }


        /* Range */

        if (showingRange) {

            showingRange.textContent =
                total === 0
                    ? "0"
                    : `${start + 1}–${end}`;

        }

        if (totalDisplayed) {
            totalDisplayed.textContent = total;
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

        if (!paginationNumbers) {
            return;
        }


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


            if (page === currentPage) {

                button.className =
                    "rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white";

            } else {

                button.className =
                    "rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50";

            }


            button.addEventListener(
                "click",
                function () {

                    currentPage = page;

                    renderTable();

                }
            );


            paginationNumbers.appendChild(
                button
            );

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


    if (addStudentForm) {

        addStudentForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById("studentName");

                const idInput =
                    document.getElementById("studentId");

                const genderInput =
                    document.getElementById("studentGender");

                const gradeInput =
                    document.getElementById("studentGrade");

                const sectionInput =
                    document.getElementById("studentSection");

                const guardianInput =
                    document.getElementById("studentGuardian");

                const statusInput =
                    document.getElementById("studentStatus");


                const name =
                    nameInput.value.trim();

                const id =
                    idInput.value.trim();

                const gender =
                    genderInput.value;

                const grade =
                    gradeInput.value;

                const section =
                    sectionInput.value;

                const guardian =
                    guardianInput.value.trim();

                const status =
                    statusInput.value;


                if (
                    !name ||
                    !id ||
                    !gender ||
                    !grade ||
                    !section ||
                    !guardian
                ) {
                    return;
                }


                /* Initials */

                const nameParts =
                    name.split(/\s+/);

                let initials = "";

                if (nameParts.length >= 2) {

                    initials =
                        nameParts[0].charAt(0) +
                        nameParts[nameParts.length - 1].charAt(0);

                } else {

                    initials =
                        name.substring(0, 2);

                }


                /* Create Row */

                const row =
                    document.createElement("tr");


                row.className =
                    "student-row transition hover:bg-slate-50";


                row.dataset.name =
                    name;

                row.dataset.id =
                    id;

                row.dataset.search =
                    `${name} ${guardian} ${id}`.toLowerCase();

                row.dataset.grade =
                    grade;

                row.dataset.section =
                    section;

                row.dataset.guardian =
                    guardian;

                row.dataset.gender =
                    gender;

                row.dataset.status =
                    status;


                row.innerHTML = `

                    <td class="px-6 py-4">

                        <div class="flex items-center gap-3">

                            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                                ${initials.toUpperCase()}
                            </div>

                            <div>

                                <p class="text-sm font-bold text-slate-800">
                                    ${escapeHtml(name)}
                                </p>

                                <p class="text-xs text-slate-500">
                                    ${escapeHtml(gender)}
                                </p>

                            </div>

                        </div>

                    </td>


                    <td class="px-6 py-4 text-sm text-slate-600">
                        ${escapeHtml(id)}
                    </td>


                    <td class="px-6 py-4 text-sm font-medium text-slate-600">
                        ${escapeHtml(grade)}
                    </td>


                    <td class="px-6 py-4 text-sm text-slate-600">
                        ${escapeHtml(section)}
                    </td>


                    <td class="px-6 py-4 text-sm text-slate-600">
                        ${escapeHtml(guardian)}
                    </td>


                    <td class="px-6 py-4">

                        <span class="${
                            status === "Active"
                                ? "rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700"
                                : "rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-bold text-red-700"
                        }">

                            ${escapeHtml(status)}

                        </span>

                    </td>


                    <td class="px-6 py-4">

                        <button
                            type="button"
                            class="viewBtn rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                            data-name="${escapeHtml(name)}"
                            data-id="${escapeHtml(id)}"
                            data-grade="${escapeHtml(grade)}"
                            data-section="${escapeHtml(section)}"
                            data-guardian="${escapeHtml(guardian)}"
                            data-gender="${escapeHtml(gender)}"
                            data-status="${escapeHtml(status)}"
                        >
                            View
                        </button>

                    </td>

                `;


                if (studentTable) {

                    studentTable.insertBefore(
                        row,
                        emptyStudentState
                    );

                }


                rows.push(row);


                const viewButton =
                    row.querySelector(".viewBtn");


                if (viewButton) {

                    viewButton.addEventListener(
                        "click",
                        function () {

                            openStudentModal(
                                this
                            );

                        }
                    );

                }


                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }


                addStudentForm.reset();

                closeAddStudentModal();


                filteredRows =
                    [...rows];

                currentPage = 1;

                renderTable();

            }
        );

    }

    function escapeHtml(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

    if (exportBtn) {

        exportBtn.addEventListener(
            "click",
            function () {

                if (filteredRows.length === 0) {
                    return;
                }


                const headers = [
                    "Student Name",
                    "Student ID",
                    "Gender",
                    "Grade",
                    "Section",
                    "Parent / Guardian",
                    "Status"
                ];


                const csvRows = [
                    headers.join(",")
                ];


                filteredRows.forEach(
                    function (row) {

                        const values = [

                            row.dataset.name || "",

                            row.dataset.id || "",

                            row.dataset.gender || "",

                            row.dataset.grade || "",

                            row.dataset.section || "",

                            row.dataset.guardian || "",

                            row.dataset.status || ""

                        ];


                        csvRows.push(
                            values
                                .map(function (value) {

                                    return `"${String(value).replace(/"/g, '""')}"`;

                                })
                                .join(",")
                        );

                    }
                );


                const csvContent =
                    csvRows.join("\n");


                const blob =
                    new Blob(
                        [csvContent],
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
                    "student-records-2026.csv";


                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(url);

            }
        );

    }


    renderTable();


    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

});