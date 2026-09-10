document.addEventListener("DOMContentLoaded", () => {
    const sectionTable = document.getElementById("sectionTable");
    const searchInput = document.getElementById("searchInput");
    const gradeFilter = document.getElementById("gradeFilter");
    const statusFilter = document.getElementById("statusFilter");
    const exportBtn = document.getElementById("exportBtn");

    const addSectionBtn = document.getElementById("addSectionBtn");

    const sectionFormModal = document.getElementById("sectionFormModal");
    const sectionViewModal = document.getElementById("sectionViewModal");

    const closeFormModal = document.getElementById("closeFormModal");
    const cancelFormModal = document.getElementById("cancelFormModal");
    const closeViewModal = document.getElementById("closeViewModal");
    const closeViewModalBtn = document.getElementById("closeViewModalBtn");

    const sectionForm = document.getElementById("sectionForm");
    const formModalTitle = document.getElementById("formModalTitle");

    const sectionName = document.getElementById("sectionName");
    const sectionGrade = document.getElementById("sectionGrade");
    const sectionAdviser = document.getElementById("sectionAdviser");
    const sectionSchoolYear = document.getElementById("sectionSchoolYear");
    const sectionStudents = document.getElementById("sectionStudents");
    const sectionCapacity = document.getElementById("sectionCapacity");
    const sectionStatus = document.getElementById("sectionStatus");

    const viewSectionName = document.getElementById("viewSectionName");
    const viewSectionGrade = document.getElementById("viewSectionGrade");
    const viewSectionAdviser = document.getElementById("viewSectionAdviser");
    const viewSectionSchoolYear = document.getElementById("viewSectionSchoolYear");
    const viewSectionStudents = document.getElementById("viewSectionStudents");
    const viewSectionCapacity = document.getElementById("viewSectionCapacity");
    const viewSectionStatus = document.getElementById("viewSectionStatus");

    const pagination = document.getElementById("pagination");
    const paginationInfo = document.getElementById("paginationInfo");

    const totalSections = document.getElementById("totalSections");
    const activeSections = document.getElementById("activeSections");
    const enrolledStudents = document.getElementById("enrolledStudents");
    const availableSlots = document.getElementById("availableSlots");

    const rowsPerPage = 5;

    let currentPage = 1;
    let editingRow = null;

    function getRows() {
        return Array.from(sectionTable.querySelectorAll(".section-row"));
    }

    function getFilteredRows() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const selectedGrade = gradeFilter.value;
        const selectedStatus = statusFilter.value;

        return getRows().filter((row) => {
            const section = row.dataset.section.toLowerCase();
            const grade = row.dataset.grade;
            const adviser = row.dataset.adviser.toLowerCase();
            const schoolYear = row.dataset.schoolYear.toLowerCase();

            const matchesSearch =
                !searchValue ||
                section.includes(searchValue) ||
                adviser.includes(searchValue) ||
                grade.toLowerCase().includes(searchValue) ||
                schoolYear.includes(searchValue);

            const matchesGrade =
                !selectedGrade || grade === selectedGrade;

            const matchesStatus =
                !selectedStatus || row.dataset.status === selectedStatus;

            return matchesSearch && matchesGrade && matchesStatus;
        });
    }

    function updateStats() {
        const rows = getRows();

        let totalStudents = 0;
        let totalCapacity = 0;
        let activeCount = 0;

        rows.forEach((row) => {
            const students = Number(row.dataset.students) || 0;
            const capacity = Number(row.dataset.capacity) || 0;

            totalStudents += students;
            totalCapacity += capacity;

            if (row.dataset.status === "Active") {
                activeCount++;
            }
        });

        totalSections.textContent = rows.length;
        activeSections.textContent = activeCount;
        enrolledStudents.textContent = totalStudents;
        availableSlots.textContent = Math.max(totalCapacity - totalStudents, 0);
    }

    function renderPagination(totalItems) {
        const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        pagination.innerHTML = "";

        const previousButton = document.createElement("button");
        previousButton.type = "button";
        previousButton.textContent = "Previous";
        previousButton.className =
            "rounded-lg border border-slate-200 px-3 py-2 text-sm transition";

        if (currentPage === 1) {
            previousButton.disabled = true;
            previousButton.classList.add("cursor-not-allowed", "text-slate-400");
        } else {
            previousButton.classList.add(
                "text-slate-600",
                "hover:bg-slate-50"
            );

            previousButton.addEventListener("click", () => {
                currentPage--;
                renderTable();
            });
        }

        pagination.appendChild(previousButton);

        for (let page = 1; page <= totalPages; page++) {
            const pageButton = document.createElement("button");

            pageButton.type = "button";
            pageButton.textContent = page;

            if (page === currentPage) {
                pageButton.className =
                    "rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white";
            } else {
                pageButton.className =
                    "rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50";
            }

            pageButton.addEventListener("click", () => {
                currentPage = page;
                renderTable();
            });

            pagination.appendChild(pageButton);
        }

        const nextButton = document.createElement("button");

        nextButton.type = "button";
        nextButton.textContent = "Next";
        nextButton.className =
            "rounded-lg border border-slate-200 px-3 py-2 text-sm transition";

        if (currentPage === totalPages) {
            nextButton.disabled = true;
            nextButton.classList.add("cursor-not-allowed", "text-slate-400");
        } else {
            nextButton.classList.add(
                "text-slate-600",
                "hover:bg-slate-50"
            );

            nextButton.addEventListener("click", () => {
                currentPage++;
                renderTable();
            });
        }

        pagination.appendChild(nextButton);
    }

    function renderTable() {
        const rows = getRows();
        const filteredRows = getFilteredRows();

        rows.forEach((row) => {
            row.classList.add("hidden");
        });

        const totalItems = filteredRows.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, totalItems);

        filteredRows.slice(startIndex, endIndex).forEach((row) => {
            row.classList.remove("hidden");
        });

        if (totalItems === 0) {
            paginationInfo.textContent = "Showing 0 of 0 sections";
        } else {
            paginationInfo.innerHTML =
                `Showing <span class="font-semibold text-slate-700">${startIndex + 1}–${endIndex}</span> of <span class="font-semibold text-slate-700">${totalItems}</span> sections`;
        }

        renderPagination(totalItems);
    }

    function updateStatusBadge(row) {
        const badge = row.querySelector(".status-badge");

        if (!badge) {
            return;
        }

        const status = row.dataset.status;

        if (status === "Active") {
            badge.className =
                "status-badge inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600";

            badge.innerHTML =
                '<span class="h-2 w-2 rounded-full bg-emerald-500"></span>Active';
        } else {
            badge.className =
                "status-badge inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600";

            badge.innerHTML =
                '<span class="h-2 w-2 rounded-full bg-rose-500"></span>Inactive';
        }
    }

    function updateRow(row, data) {
        row.dataset.section = data.section;
        row.dataset.grade = data.grade;
        row.dataset.adviser = data.adviser;
        row.dataset.students = data.students;
        row.dataset.capacity = data.capacity;
        row.dataset.status = data.status;
        row.dataset.schoolYear = data.schoolYear;

        const cells = row.children;

        cells[0].innerHTML = `
            <p class="font-semibold text-slate-900">${escapeHtml(data.section)}</p>
            <p class="text-xs text-slate-500">SY ${escapeHtml(data.schoolYear)}</p>
        `;

        cells[1].textContent = data.grade;
        cells[2].textContent = data.adviser;

        cells[3].innerHTML = `
            <span class="font-semibold text-slate-700">${data.students}</span>
            <span class="text-slate-400">/ ${data.capacity}</span>
        `;

        cells[4].textContent =
            `${Math.max(Number(data.capacity) - Number(data.students), 0)} slots`;

        updateStatusBadge(row);
    }

    function createRow(data) {
        const row = document.createElement("tr");

        row.className = "section-row transition hover:bg-slate-50";

        row.dataset.section = data.section;
        row.dataset.grade = data.grade;
        row.dataset.adviser = data.adviser;
        row.dataset.students = data.students;
        row.dataset.capacity = data.capacity;
        row.dataset.status = data.status;
        row.dataset.schoolYear = data.schoolYear;

        row.innerHTML = `
            <td class="px-6 py-5">
                <p class="font-semibold text-slate-900">${escapeHtml(data.section)}</p>
                <p class="text-xs text-slate-500">SY ${escapeHtml(data.schoolYear)}</p>
            </td>

            <td class="px-6 py-5 text-slate-600">
                ${escapeHtml(data.grade)}
            </td>

            <td class="px-6 py-5 text-slate-600">
                ${escapeHtml(data.adviser)}
            </td>

            <td class="px-6 py-5">
                <span class="font-semibold text-slate-700">${data.students}</span>
                <span class="text-slate-400">/ ${data.capacity}</span>
            </td>

            <td class="px-6 py-5 text-slate-600">
                ${Math.max(Number(data.capacity) - Number(data.students), 0)} slots
            </td>

            <td class="px-6 py-5">
                <span class="status-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
                    <span class="h-2 w-2 rounded-full"></span>
                    ${escapeHtml(data.status)}
                </span>
            </td>

            <td class="px-6 py-5 text-right">
                <button
                    type="button"
                    data-action="view"
                    class="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                >
                    <i data-lucide="eye" class="h-5 w-5"></i>
                </button>

                <button
                    type="button"
                    data-action="edit"
                    class="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                >
                    <i data-lucide="pencil" class="h-5 w-5"></i>
                </button>
            </td>
        `;

        updateStatusBadge(row);

        return row;
    }

    function openFormModal(mode, row = null) {
        editingRow = row;

        sectionForm.reset();

        if (mode === "edit" && row) {
            formModalTitle.textContent = "Edit Section";

            sectionName.value = row.dataset.section;
            sectionGrade.value = row.dataset.grade;
            sectionAdviser.value = row.dataset.adviser;
            sectionSchoolYear.value = row.dataset.schoolYear;
            sectionStudents.value = row.dataset.students;
            sectionCapacity.value = row.dataset.capacity;
            sectionStatus.value = row.dataset.status;
        } else {
            formModalTitle.textContent = "Add Section";
            sectionStatus.value = "Active";
        }

        sectionFormModal.classList.remove("hidden");
        sectionFormModal.classList.add("flex");

        setTimeout(() => {
            sectionName.focus();
        }, 50);
    }

    function closeForm() {
        sectionFormModal.classList.add("hidden");
        sectionFormModal.classList.remove("flex");
        editingRow = null;
        sectionForm.reset();
    }

    function openViewModal(row) {
        viewSectionName.textContent = row.dataset.section;
        viewSectionGrade.textContent = row.dataset.grade;
        viewSectionAdviser.textContent = row.dataset.adviser;
        viewSectionSchoolYear.textContent = row.dataset.schoolYear;
        viewSectionStudents.textContent = `${row.dataset.students} students`;
        viewSectionCapacity.textContent = `${row.dataset.capacity} students`;

        if (row.dataset.status === "Active") {
            viewSectionStatus.innerHTML = `
                <span class="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                    Active
                </span>
            `;
        } else {
            viewSectionStatus.innerHTML = `
                <span class="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                    <span class="h-2 w-2 rounded-full bg-rose-500"></span>
                    Inactive
                </span>
            `;
        }

        sectionViewModal.classList.remove("hidden");
        sectionViewModal.classList.add("flex");
    }

    function closeView() {
        sectionViewModal.classList.add("hidden");
        sectionViewModal.classList.remove("flex");
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function exportSections() {
        const rows = getFilteredRows();

        const headers = [
            "Section",
            "Grade Level",
            "Adviser",
            "Students",
            "Capacity",
            "Available Slots",
            "Status",
            "School Year"
        ];

        const csvRows = [headers];

        rows.forEach((row) => {
            csvRows.push([
                row.dataset.section,
                row.dataset.grade,
                row.dataset.adviser,
                row.dataset.students,
                row.dataset.capacity,
                Math.max(
                    Number(row.dataset.capacity) - Number(row.dataset.students),
                    0
                ),
                row.dataset.status,
                row.dataset.schoolYear
            ]);
        });

        const csvContent = csvRows
            .map((row) =>
                row
                    .map((value) => `"${String(value).replaceAll('"', '""')}"`)
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "sections.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    }

    searchInput.addEventListener("input", () => {
        currentPage = 1;
        renderTable();
    });

    gradeFilter.addEventListener("change", () => {
        currentPage = 1;
        renderTable();
    });

    statusFilter.addEventListener("change", () => {
        currentPage = 1;
        renderTable();
    });

    addSectionBtn.addEventListener("click", () => {
        openFormModal("add");
    });

    sectionTable.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-action]");

        if (!button) {
            return;
        }

        const row = button.closest(".section-row");

        if (!row) {
            return;
        }

        if (button.dataset.action === "view") {
            openViewModal(row);
        }

        if (button.dataset.action === "edit") {
            openFormModal("edit", row);
        }
    });

    sectionForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!sectionForm.checkValidity()) {
            sectionForm.reportValidity();
            return;
        }

        const students = Number(sectionStudents.value);
        const capacity = Number(sectionCapacity.value);

        if (students > capacity) {
            sectionStudents.setCustomValidity(
                "Students cannot be greater than capacity."
            );

            sectionStudents.reportValidity();
            sectionStudents.setCustomValidity("");
            return;
        }

        const data = {
            section: sectionName.value.trim(),
            grade: sectionGrade.value,
            adviser: sectionAdviser.value.trim(),
            schoolYear: sectionSchoolYear.value.trim(),
            students,
            capacity,
            status: sectionStatus.value
        };

        if (editingRow) {
            updateRow(editingRow, data);
        } else {
            sectionTable.appendChild(createRow(data));
        }

        updateStats();
        currentPage = 1;
        renderTable();
        closeForm();

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    });

    exportBtn.addEventListener("click", exportSections);

    closeFormModal.addEventListener("click", closeForm);
    cancelFormModal.addEventListener("click", closeForm);

    closeViewModal.addEventListener("click", closeView);
    closeViewModalBtn.addEventListener("click", closeView);

    sectionFormModal.addEventListener("click", (event) => {
        if (event.target === sectionFormModal) {
            closeForm();
        }
    });

    sectionViewModal.addEventListener("click", (event) => {
        if (event.target === sectionViewModal) {
            closeView();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") {
            return;
        }

        if (!sectionFormModal.classList.contains("hidden")) {
            closeForm();
        }

        if (!sectionViewModal.classList.contains("hidden")) {
            closeView();
        }
    });

    updateStats();
    renderTable();

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});