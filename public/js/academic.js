document.addEventListener("DOMContentLoaded", function () {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const yearTable = document.getElementById("yearTable");
    const searchInput = document.getElementById("searchInput");

    const emptyState = document.getElementById("emptyYearState");
    const showingRange = document.getElementById("showingRange");
    const showingTotal = document.getElementById("showingTotal");

    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");
    const paginationNumbers = document.getElementById("paginationNumbers");

    const academicYearModal =
        document.getElementById("academicYearModal");

    const closeAcademicYearModalBtn =
        document.getElementById("closeAcademicYearModalBtn");

    const modalCloseBtn =
        document.getElementById("modalCloseBtn");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalSubtitle =
        document.getElementById("modalSubtitle");

    const modalYear =
        document.getElementById("modalYear");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalStart =
        document.getElementById("modalStart");

    const modalEnd =
        document.getElementById("modalEnd");

    const modalEnrollment =
        document.getElementById("modalEnrollment");

    const modalStatus =
        document.getElementById("modalStatus");

    const addAcademicYearBtn =
        document.getElementById("addAcademicYearBtn");

    const addAcademicYearModal =
        document.getElementById("addAcademicYearModal");

    const closeAddAcademicYearModalBtn =
        document.getElementById("closeAddAcademicYearModalBtn");

    const cancelAcademicYearBtn =
        document.getElementById("cancelAcademicYearBtn");

    const academicYearForm =
        document.getElementById("academicYearForm");

    const formTitle =
        document.getElementById("formTitle");

    const yearInput =
        document.getElementById("yearInput");

    const startDateInput =
        document.getElementById("startDateInput");

    const endDateInput =
        document.getElementById("endDateInput");

    const enrollmentInput =
        document.getElementById("enrollmentInput");

    const statusInput =
        document.getElementById("statusInput");

    const descriptionInput =
        document.getElementById("descriptionInput");

    const totalYears =
        document.getElementById("totalYears");

    const activeYear =
        document.getElementById("activeYear");

    const upcomingYears =
        document.getElementById("upcomingYears");

    const rowsPerPage = 5;

    let currentPage = 1;
    let filteredRows = [];
    let editingRow = null;

    function formatDate(value) {

        if (!value) {
            return "";
        }

        const date = new Date(value + "T00:00:00");

        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    }

    function getStatusClasses(status) {

        if (status === "Active") {
            return {
                badge: "bg-emerald-50 text-emerald-600",
                dot: "bg-emerald-500"
            };
        }

        if (status === "Upcoming") {
            return {
                badge: "bg-amber-50 text-amber-600",
                dot: "bg-amber-500"
            };
        }

        return {
            badge: "bg-slate-100 text-slate-600",
            dot: "bg-slate-400"
        };
    }

    function getEnrollmentClass(enrollment) {

        return enrollment === "Open"
            ? "font-medium text-indigo-600"
            : "font-medium text-slate-500";
    }

    function updateStats() {

        const rows =
            Array.from(
                document.querySelectorAll(".year-row")
            );

        if (totalYears) {
            totalYears.textContent = rows.length;
        }

        const active =
            rows.find(
                row => row.dataset.status === "Active"
            );

        if (activeYear) {
            activeYear.textContent =
                active
                    ? active.dataset.year
                    : "None";
        }

        const upcoming =
            rows.filter(
                row => row.dataset.status === "Upcoming"
            ).length;

        if (upcomingYears) {
            upcomingYears.textContent = upcoming;
        }
    }

    function filterYears() {

        const search =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";

        const rows =
            Array.from(
                document.querySelectorAll(".year-row")
            );

        filteredRows =
            rows.filter(function (row) {

                const text = [
                    row.dataset.year,
                    row.dataset.start,
                    row.dataset.end,
                    row.dataset.enrollment,
                    row.dataset.status,
                    row.dataset.description
                ]
                    .join(" ")
                    .toLowerCase();

                return text.includes(search);
            });

        currentPage = 1;

        renderTable();
    }

    function renderTable() {

        const rows =
            Array.from(
                document.querySelectorAll(".year-row")
            );

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
            (currentPage - 1) * rowsPerPage;

        const end =
            Math.min(
                start + rowsPerPage,
                total
            );

        filteredRows
            .slice(start, end)
            .forEach(function (row) {
                row.style.display = "";
            });

        if (emptyState) {
            emptyState.classList.toggle(
                "hidden",
                total !== 0
            );
        }

        if (showingRange) {
            showingRange.textContent =
                total === 0
                    ? "0"
                    : `${start + 1}–${end}`;
        }

        if (showingTotal) {
            showingTotal.textContent = total;
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

            button.className =
                page === currentPage
                    ? "rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
                    : "rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50";

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

    function openViewModal(button) {

        const data = button.dataset;

        if (modalTitle) {
            modalTitle.textContent =
                "Academic Year Details";
        }

        if (modalSubtitle) {
            modalSubtitle.textContent =
                "View academic year information.";
        }

        if (modalYear) {
            modalYear.textContent =
                data.year || "—";
        }

        if (modalDescription) {
            modalDescription.textContent =
                data.description || "Academic Year";
        }

        if (modalStart) {
            modalStart.textContent =
                data.start || "—";
        }

        if (modalEnd) {
            modalEnd.textContent =
                data.end || "—";
        }

        if (modalEnrollment) {

            modalEnrollment.textContent =
                data.enrollment || "—";

            modalEnrollment.className =
                getEnrollmentClass(
                    data.enrollment
                );
        }

        if (modalStatus) {

            const classes =
                getStatusClasses(
                    data.status
                );

            modalStatus.className =
                `inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${classes.badge}`;

            modalStatus.innerHTML = `
                <span class="h-2 w-2 rounded-full ${classes.dot}"></span>
                ${data.status || "—"}
            `;
        }

        if (academicYearModal) {

            academicYearModal.classList.remove(
                "hidden"
            );

            academicYearModal.classList.add(
                "flex"
            );
        }
    }

    function closeViewModal() {

        if (!academicYearModal) {
            return;
        }

        academicYearModal.classList.add(
            "hidden"
        );

        academicYearModal.classList.remove(
            "flex"
        );
    }

    function openAddModal() {

        editingRow = null;

        if (formTitle) {
            formTitle.textContent =
                "Add Academic Year";
        }

        if (academicYearForm) {
            academicYearForm.reset();
        }

        if (addAcademicYearModal) {

            addAcademicYearModal.classList.remove(
                "hidden"
            );

            addAcademicYearModal.classList.add(
                "flex"
            );
        }

        if (yearInput) {
            yearInput.focus();
        }
    }

    function openEditModal(button) {

        const data = button.dataset;

        editingRow =
            button.closest(".year-row");

        if (formTitle) {
            formTitle.textContent =
                "Edit Academic Year";
        }

        if (yearInput) {
            yearInput.value =
                data.year || "";
        }

        if (startDateInput) {
            startDateInput.value =
                convertToInputDate(
                    data.start
                );
        }

        if (endDateInput) {
            endDateInput.value =
                convertToInputDate(
                    data.end
                );
        }

        if (enrollmentInput) {
            enrollmentInput.value =
                data.enrollment || "Open";
        }

        if (statusInput) {
            statusInput.value =
                data.status || "Active";
        }

        if (descriptionInput) {
            descriptionInput.value =
                data.description || "";
        }

        if (addAcademicYearModal) {

            addAcademicYearModal.classList.remove(
                "hidden"
            );

            addAcademicYearModal.classList.add(
                "flex"
            );
        }
    }

    function convertToInputDate(value) {

        if (!value) {
            return "";
        }

        const date =
            new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");

        const day =
            String(
                date.getDate()
            ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function closeAddModal() {

        if (!addAcademicYearModal) {
            return;
        }

        addAcademicYearModal.classList.add(
            "hidden"
        );

        addAcademicYearModal.classList.remove(
            "flex"
        );

        editingRow = null;

        if (academicYearForm) {
            academicYearForm.reset();
        }
    }

    function createYearRow(data) {

        const row =
            document.createElement("tr");

        row.className =
            "year-row transition hover:bg-slate-50";

        row.dataset.year =
            data.year;

        row.dataset.start =
            data.start;

        row.dataset.end =
            data.end;

        row.dataset.enrollment =
            data.enrollment;

        row.dataset.status =
            data.status;

        row.dataset.description =
            data.description;

        const statusClasses =
            getStatusClasses(
                data.status
            );

        row.innerHTML = `
            <td class="px-6 py-5">
                <p class="font-semibold text-slate-900">
                    ${data.year}
                </p>
                ${
                    data.description
                        ? `<p class="text-xs text-slate-500">${data.description}</p>`
                        : ""
                }
            </td>

            <td class="px-6 py-5 text-slate-600">
                ${data.start}
            </td>

            <td class="px-6 py-5 text-slate-600">
                ${data.end}
            </td>

            <td class="px-6 py-5">
                <span class="${getEnrollmentClass(data.enrollment)}">
                    ${data.enrollment}
                </span>
            </td>

            <td class="px-6 py-5">
                <span class="inline-flex items-center gap-2 rounded-full ${statusClasses.badge} px-3 py-1 text-xs font-semibold">
                    <span class="h-2 w-2 rounded-full ${statusClasses.dot}"></span>
                    ${data.status}
                </span>
            </td>

            <td class="px-6 py-5 text-right">

                <button
                    type="button"
                    class="viewYearBtn rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                    data-year="${data.year}"
                    data-start="${data.start}"
                    data-end="${data.end}"
                    data-enrollment="${data.enrollment}"
                    data-status="${data.status}"
                    data-description="${data.description}"
                >
                    <i data-lucide="eye" class="h-5 w-5"></i>
                </button>

                <button
                    type="button"
                    class="editYearBtn rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                    data-year="${data.year}"
                    data-start="${data.start}"
                    data-end="${data.end}"
                    data-enrollment="${data.enrollment}"
                    data-status="${data.status}"
                    data-description="${data.description}"
                >
                    <i data-lucide="pencil" class="h-5 w-5"></i>
                </button>

            </td>
        `;

        return row;
    }

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            filterYears
        );
    }

    if (yearTable) {

        yearTable.addEventListener(
            "click",
            function (event) {

                const viewButton =
                    event.target.closest(
                        ".viewYearBtn"
                    );

                const editButton =
                    event.target.closest(
                        ".editYearBtn"
                    );

                if (viewButton) {
                    openViewModal(viewButton);
                }

                if (editButton) {
                    openEditModal(editButton);
                }
            }
        );
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

                if (
                    currentPage <
                    totalPages
                ) {

                    currentPage++;

                    renderTable();
                }
            }
        );
    }

    if (closeAcademicYearModalBtn) {

        closeAcademicYearModalBtn.addEventListener(
            "click",
            closeViewModal
        );
    }

    if (modalCloseBtn) {

        modalCloseBtn.addEventListener(
            "click",
            closeViewModal
        );
    }

    if (academicYearModal) {

        academicYearModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    academicYearModal
                ) {
                    closeViewModal();
                }
            }
        );
    }

    if (addAcademicYearBtn) {

        addAcademicYearBtn.addEventListener(
            "click",
            openAddModal
        );
    }

    if (closeAddAcademicYearModalBtn) {

        closeAddAcademicYearModalBtn.addEventListener(
            "click",
            closeAddModal
        );
    }

    if (cancelAcademicYearBtn) {

        cancelAcademicYearBtn.addEventListener(
            "click",
            closeAddModal
        );
    }

    if (addAcademicYearModal) {

        addAcademicYearModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    addAcademicYearModal
                ) {
                    closeAddModal();
                }
            }
        );
    }

    if (academicYearForm) {

        academicYearForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const data = {

                    year:
                        yearInput.value.trim(),

                    start:
                        formatDate(
                            startDateInput.value
                        ),

                    end:
                        formatDate(
                            endDateInput.value
                        ),

                    enrollment:
                        enrollmentInput.value,

                    status:
                        statusInput.value,

                    description:
                        descriptionInput.value.trim()
                };

                if (editingRow) {

                    editingRow.dataset.year =
                        data.year;

                    editingRow.dataset.start =
                        data.start;

                    editingRow.dataset.end =
                        data.end;

                    editingRow.dataset.enrollment =
                        data.enrollment;

                    editingRow.dataset.status =
                        data.status;

                    editingRow.dataset.description =
                        data.description;

                    const newRow =
                        createYearRow(data);

                    editingRow.replaceWith(
                        newRow
                    );

                } else {

                    const newRow =
                        createYearRow(data);

                    yearTable.appendChild(
                        newRow
                    );
                }

                closeAddModal();

                updateStats();

                filterYears();

                if (
                    typeof lucide !== "undefined"
                ) {
                    lucide.createIcons();
                }
            }
        );
    }

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeViewModal();
                closeAddModal();
            }
        }
    );

    updateStats();
    filterYears();

});