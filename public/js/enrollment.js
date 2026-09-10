document.addEventListener("DOMContentLoaded", function () {

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    const applicationTable = document.getElementById("applicationTable");

    const searchInput = document.getElementById("searchInput");
    const gradeFilter = document.getElementById("gradeFilter");
    const statusFilter = document.getElementById("statusFilter");

    const rows = Array.from(document.querySelectorAll(".application-row"));

    const emptyState = document.getElementById("emptyApplicationState");
    const showingRange = document.getElementById("showingRange");
    const showingTotal = document.getElementById("showingTotal");

    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");
    const paginationNumbers = document.getElementById("paginationNumbers");

    const exportBtn = document.getElementById("exportBtn");

    const applicationModal = document.getElementById("applicationModal");
    const closeApplicationModalBtn = document.getElementById("closeApplicationModalBtn");
    const modalCloseBtn = document.getElementById("modalCloseBtn");

    const modalInitials = document.getElementById("modalInitials");
    const modalStudentName = document.getElementById("modalStudentName");
    const modalStudentId = document.getElementById("modalStudentId");
    const modalParent = document.getElementById("modalParent");
    const modalGrade = document.getElementById("modalGrade");
    const modalGender = document.getElementById("modalGender");
    const modalSection = document.getElementById("modalSection");
    const modalDate = document.getElementById("modalDate");
    const modalAddress = document.getElementById("modalAddress");
    const modalStatus = document.getElementById("modalStatus");

    const modalApproveBtn = document.getElementById("modalApproveBtn");
    const modalDeclineBtn = document.getElementById("modalDeclineBtn");

    const addApplicationBtn = document.getElementById("addApplicationBtn");
    const addApplicationModal = document.getElementById("addApplicationModal");
    const closeAddApplicationModalBtn = document.getElementById("closeAddApplicationModalBtn");
    const cancelAddApplicationBtn = document.getElementById("cancelAddApplicationBtn");
    const addApplicationForm = document.getElementById("addApplicationForm");

    const newStudentName = document.getElementById("newStudentName");
    const newStudentId = document.getElementById("newStudentId");
    const newParent = document.getElementById("newParent");
    const newGrade = document.getElementById("newGrade");
    const newGender = document.getElementById("newGender");
    const newSection = document.getElementById("newSection");
    const newAddress = document.getElementById("newAddress");

    const totalApplications = document.getElementById("totalApplications");
    const pendingApplications = document.getElementById("pendingApplications");
    const approvedApplications = document.getElementById("approvedApplications");
    const declinedApplications = document.getElementById("declinedApplications");

    const rowsPerPage = 5;

    let currentPage = 1;
    let filteredRows = [...rows];
    let selectedRow = null;

    function getInitials(name) {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(word => word.charAt(0).toUpperCase())
            .join("");
    }

    function getStatusClasses(status) {
        if (status === "Approved") {
            return {
                badge: "bg-emerald-50 text-emerald-700",
                avatar: "bg-emerald-100 text-emerald-700"
            };
        }

        if (status === "Declined") {
            return {
                badge: "bg-red-50 text-red-700",
                avatar: "bg-red-100 text-red-700"
            };
        }

        return {
            badge: "bg-amber-50 text-amber-700",
            avatar: "bg-amber-100 text-amber-700"
        };
    }

    function updateStats() {
        const allRows = Array.from(document.querySelectorAll(".application-row"));

        const total = allRows.length;

        const pending = allRows.filter(row =>
            row.dataset.status === "Pending"
        ).length;

        const approved = allRows.filter(row =>
            row.dataset.status === "Approved"
        ).length;

        const declined = allRows.filter(row =>
            row.dataset.status === "Declined"
        ).length;

        if (totalApplications) {
            totalApplications.textContent = total;
        }

        if (pendingApplications) {
            pendingApplications.textContent = pending;
        }

        if (approvedApplications) {
            approvedApplications.textContent = approved;
        }

        if (declinedApplications) {
            declinedApplications.textContent = declined;
        }
    }

    function filterApplications() {
        const search = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        const grade = gradeFilter
            ? gradeFilter.value
            : "all";

        const status = statusFilter
            ? statusFilter.value
            : "all";

        const allRows = Array.from(
            document.querySelectorAll(".application-row")
        );

        filteredRows = allRows.filter(function (row) {

            const rowSearch =
                (row.dataset.search || "").toLowerCase();

            const rowGrade =
                row.dataset.grade || "";

            const rowStatus =
                row.dataset.status || "";

            const matchesSearch =
                rowSearch.includes(search);

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

        const allRows = Array.from(
            document.querySelectorAll(".application-row")
        );

        allRows.forEach(function (row) {
            row.style.display = "none";
        });

        const total = filteredRows.length;

        const totalPages =
            Math.max(1, Math.ceil(total / rowsPerPage));

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        const start =
            (currentPage - 1) * rowsPerPage;

        const end =
            Math.min(start + rowsPerPage, total);

        const visibleRows =
            filteredRows.slice(start, end);

        visibleRows.forEach(function (row) {
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

        for (let page = 1; page <= totalPages; page++) {

            const button =
                document.createElement("button");

            button.type = "button";
            button.textContent = page;

            button.className =
                page === currentPage
                    ? "rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white"
                    : "rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50";

            button.addEventListener("click", function () {

                currentPage = page;

                renderTable();

            });

            paginationNumbers.appendChild(button);
        }
    }

    function openApplicationModal(button) {

        const data = button.dataset;

        selectedRow =
            button.closest(".application-row");

        const name =
            data.student || "";

        const status =
            data.status || "Pending";

        const statusClasses =
            getStatusClasses(status);

        if (modalInitials) {
            modalInitials.textContent =
                getInitials(name);

            modalInitials.className =
                `flex h-14 w-14 items-center justify-center rounded-2xl text-base font-bold ${statusClasses.avatar}`;
        }

        if (modalStudentName) {
            modalStudentName.textContent = name;
        }

        if (modalStudentId) {
            modalStudentId.textContent =
                `Student ID: ${data.studentId || ""}`;
        }

        if (modalParent) {
            modalParent.textContent =
                data.parent || "—";
        }

        if (modalGrade) {
            modalGrade.textContent =
                data.grade || "—";
        }

        if (modalGender) {
            modalGender.textContent =
                data.gender || "—";
        }

        if (modalSection) {
            modalSection.textContent =
                data.section || "—";
        }

        if (modalDate) {
            modalDate.textContent =
                data.date || "—";
        }

        if (modalAddress) {
            modalAddress.textContent =
                data.address || "—";
        }

        if (modalStatus) {

            modalStatus.textContent =
                status;

            modalStatus.className =
                `rounded-full px-3 py-1.5 text-[10px] font-bold ${statusClasses.badge}`;
        }

        if (modalApproveBtn) {
            modalApproveBtn.classList.toggle(
                "hidden",
                status !== "Pending"
            );
        }

        if (modalDeclineBtn) {
            modalDeclineBtn.classList.toggle(
                "hidden",
                status !== "Pending"
            );
        }

        if (applicationModal) {

            applicationModal.classList.remove("hidden");
            applicationModal.classList.add("flex");

        }
    }

    function closeApplicationModal() {

        if (!applicationModal) {
            return;
        }

        applicationModal.classList.add("hidden");
        applicationModal.classList.remove("flex");

        selectedRow = null;
    }

    function updateRowStatus(row, status) {

        if (!row) {
            return;
        }

        row.dataset.status = status;

        const statusBadge =
            row.querySelector(".status-badge");

        const statusClasses =
            getStatusClasses(status);

        if (statusBadge) {

            statusBadge.textContent = status;

            statusBadge.className =
                `status-badge rounded-full px-3 py-1.5 text-[10px] font-bold ${statusClasses.badge}`;
        }

        const actionButton =
            row.querySelector(".reviewBtn, .viewBtn");

        if (actionButton) {

            actionButton.dataset.status =
                status;

            if (status === "Pending") {

                actionButton.textContent =
                    "Review";

                actionButton.className =
                    "reviewBtn rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-100";

            } else {

                actionButton.textContent =
                    "View";

                actionButton.className =
                    "viewBtn rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200";
            }
        }

        filterApplications();
        updateStats();
    }

    function openAddApplicationModal() {

        if (!addApplicationModal) {
            return;
        }

        addApplicationModal.classList.remove("hidden");
        addApplicationModal.classList.add("flex");

        if (newStudentName) {
            newStudentName.focus();
        }
    }

    function closeAddApplicationModal() {

        if (!addApplicationModal) {
            return;
        }

        addApplicationModal.classList.add("hidden");
        addApplicationModal.classList.remove("flex");

        if (addApplicationForm) {
            addApplicationForm.reset();
        }
    }

    function createApplicationRow(data) {

        const row =
            document.createElement("tr");

        const initials =
            getInitials(data.student);

        const statusClasses =
            getStatusClasses(data.status);

        const actionClass =
            data.status === "Pending"
                ? "reviewBtn rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-100"
                : "viewBtn rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200";

        const actionText =
            data.status === "Pending"
                ? "Review"
                : "View";

        row.className =
            "application-row transition hover:bg-slate-50";

        row.dataset.search =
            `${data.student} ${data.parent}`.toLowerCase();

        row.dataset.student =
            data.student;

        row.dataset.studentId =
            data.studentId;

        row.dataset.parent =
            data.parent;

        row.dataset.grade =
            data.grade;

        row.dataset.date =
            data.date;

        row.dataset.status =
            data.status;

        row.dataset.gender =
            data.gender;

        row.dataset.section =
            data.section;

        row.dataset.address =
            data.address;

        row.innerHTML = `
            <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-full ${statusClasses.avatar} text-xs font-bold">
                        ${initials}
                    </div>

                    <div>
                        <p class="text-sm font-bold text-slate-800">
                            ${data.student}
                        </p>

                        <p class="text-xs text-slate-500">
                            Student ID: ${data.studentId}
                        </p>
                    </div>
                </div>
            </td>

            <td class="px-6 py-4 text-sm text-slate-600">
                ${data.parent}
            </td>

            <td class="px-6 py-4 text-sm font-medium text-slate-600">
                ${data.grade}
            </td>

            <td class="px-6 py-4 text-sm text-slate-500">
                ${data.date}
            </td>

            <td class="px-6 py-4">
                <span class="status-badge rounded-full px-3 py-1.5 text-[10px] font-bold ${statusClasses.badge}">
                    ${data.status}
                </span>
            </td>

            <td class="px-6 py-4">
                <button
                    type="button"
                    class="${actionClass}"
                    data-student="${data.student}"
                    data-student-id="${data.studentId}"
                    data-parent="${data.parent}"
                    data-grade="${data.grade}"
                    data-date="${data.date}"
                    data-status="${data.status}"
                    data-gender="${data.gender}"
                    data-section="${data.section}"
                    data-address="${data.address}"
                >
                    ${actionText}
                </button>
            </td>
        `;

        return row;
    }

    function exportApplications() {

        const data =
            filteredRows.map(function (row) {

                return [
                    row.dataset.student || "",
                    row.dataset.studentId || "",
                    row.dataset.parent || "",
                    row.dataset.grade || "",
                    row.dataset.date || "",
                    row.dataset.status || "",
                    row.dataset.gender || "",
                    row.dataset.section || "",
                    row.dataset.address || ""
                ];
            });

        const headers = [
            "Student",
            "Student ID",
            "Parent / Guardian",
            "Grade",
            "Date",
            "Status",
            "Gender",
            "Section",
            "Address"
        ];

        const csvRows = [
            headers,
            ...data
        ];

        const csv = csvRows
            .map(function (row) {
                return row.map(function (value) {
                    return `"${String(value).replace(/"/g, '""')}"`;
                }).join(",");
            })
            .join("\n");

        const blob =
            new Blob([csv], {
                type: "text/csv;charset=utf-8;"
            });

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;
        link.download =
            "enrollment-applications-2026.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            filterApplications
        );
    }

    if (gradeFilter) {
        gradeFilter.addEventListener(
            "change",
            filterApplications
        );
    }

    if (statusFilter) {
        statusFilter.addEventListener(
            "change",
            filterApplications
        );
    }

    if (applicationTable) {

        applicationTable.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".reviewBtn, .viewBtn"
                    );

                if (!button) {
                    return;
                }

                openApplicationModal(button);
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

                if (currentPage < totalPages) {

                    currentPage++;

                    renderTable();
                }
            }
        );
    }

    if (closeApplicationModalBtn) {
        closeApplicationModalBtn.addEventListener(
            "click",
            closeApplicationModal
        );
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener(
            "click",
            closeApplicationModal
        );
    }

    if (applicationModal) {

        applicationModal.addEventListener(
            "click",
            function (event) {

                if (event.target === applicationModal) {
                    closeApplicationModal();
                }
            }
        );
    }

    if (modalApproveBtn) {

        modalApproveBtn.addEventListener(
            "click",
            function () {

                if (!selectedRow) {
                    return;
                }

                updateRowStatus(
                    selectedRow,
                    "Approved"
                );

                closeApplicationModal();
            }
        );
    }

    if (modalDeclineBtn) {

        modalDeclineBtn.addEventListener(
            "click",
            function () {

                if (!selectedRow) {
                    return;
                }

                updateRowStatus(
                    selectedRow,
                    "Declined"
                );

                closeApplicationModal();
            }
        );
    }

    if (addApplicationBtn) {

        addApplicationBtn.addEventListener(
            "click",
            openAddApplicationModal
        );
    }

    if (closeAddApplicationModalBtn) {

        closeAddApplicationModalBtn.addEventListener(
            "click",
            closeAddApplicationModal
        );
    }

    if (cancelAddApplicationBtn) {

        cancelAddApplicationBtn.addEventListener(
            "click",
            closeAddApplicationModal
        );
    }

    if (addApplicationModal) {

        addApplicationModal.addEventListener(
            "click",
            function (event) {

                if (event.target === addApplicationModal) {
                    closeAddApplicationModal();
                }
            }
        );
    }

    if (addApplicationForm) {

        addApplicationForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const today =
                    new Date();

                const date =
                    today.toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                        }
                    );

                const data = {
                    student: newStudentName.value.trim(),
                    studentId: newStudentId.value.trim(),
                    parent: newParent.value.trim(),
                    grade: newGrade.value,
                    gender: newGender.value,
                    section: newSection.value.trim(),
                    address: newAddress.value.trim(),
                    date: date,
                    status: "Pending"
                };

                const row =
                    createApplicationRow(data);

                applicationTable.appendChild(row);

                closeAddApplicationModal();

                updateStats();

                filterApplications();
            }
        );
    }

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }

            closeApplicationModal();
            closeAddApplicationModal();
        }
    );

    if (exportBtn) {

        exportBtn.addEventListener(
            "click",
            exportApplications
        );
    }

    updateStats();
    filterApplications();

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

});