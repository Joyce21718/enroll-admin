document.addEventListener("DOMContentLoaded", () => {
    const reviewApplicationsBtn = document.getElementById("reviewApplicationsBtn");
    const viewReportsBtn = document.getElementById("viewReportsBtn");
    const addStudentBtn = document.getElementById("addStudentBtn");
    const batchApproveBtn = document.getElementById("batchApproveBtn");
    const exportDataBtn = document.getElementById("exportDataBtn");
    const sendNotificationBtn = document.getElementById("sendNotificationBtn");
    const viewAllActivityBtn = document.getElementById("viewAllActivityBtn");
    const gradeMenuBtn = document.getElementById("gradeMenuBtn");

    const applicationSearch = document.getElementById("applicationSearch");
    const applicationRows = Array.from(document.querySelectorAll(".application-row"));
    const applicationActions = document.querySelectorAll(".application-action-btn");

    const previousApplicationBtn = document.getElementById("previousApplicationBtn");
    const nextApplicationBtn = document.getElementById("nextApplicationBtn");
    const applicationCount = document.getElementById("applicationCount");

    const dashboardModal = document.getElementById("dashboardModal");
    const dashboardModalTitle = document.getElementById("dashboardModalTitle");
    const dashboardModalDescription = document.getElementById("dashboardModalDescription");
    const dashboardModalContent = document.getElementById("dashboardModalContent");
    const closeDashboardModal = document.getElementById("closeDashboardModal");
    const closeDashboardModalBtn = document.getElementById("closeDashboardModalBtn");

    const rowsPerPage = 5;
    let currentPage = 1;
    let filteredRows = [...applicationRows];

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function openModal(title, description, content) {
        dashboardModalTitle.textContent = title;
        dashboardModalDescription.textContent = description;
        dashboardModalContent.innerHTML = content;

        dashboardModal.classList.remove("hidden");
        dashboardModal.classList.add("flex");

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    }

    function closeModal() {
        dashboardModal.classList.add("hidden");
        dashboardModal.classList.remove("flex");
    }

    function showApplication(student) {
        const row = applicationRows.find(
            (item) => item.dataset.name.toLowerCase().includes(student.toLowerCase())
        );

        if (!row) return;

        const cells = row.querySelectorAll("td");

        const parent = cells[1]?.textContent.trim() || "";
        const grade = cells[2]?.textContent.trim() || "";
        const date = cells[3]?.textContent.trim() || "";
        const status = cells[4]?.textContent.trim() || "";
        const processedBy = cells[5]?.textContent.trim() || "";

        const statusClass = status === "Approved"
            ? "bg-emerald-50 text-emerald-700"
            : status === "Declined"
                ? "bg-red-50 text-red-700"
                : "bg-amber-50 text-amber-700";

        openModal(
            `${student} Application`,
            "Enrollment application details",
            `
                <div class="space-y-4">
                    <div class="rounded-xl bg-slate-50 p-4">
                        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Student
                        </p>
                        <p class="mt-1 text-sm font-bold text-slate-800">
                            ${escapeHtml(student)}
                        </p>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div>
                            <p class="text-xs font-semibold text-slate-400">
                                Parent/Guardian
                            </p>
                            <p class="mt-1 text-sm font-semibold text-slate-700">
                                ${escapeHtml(parent)}
                            </p>
                        </div>

                        <div>
                            <p class="text-xs font-semibold text-slate-400">
                                Grade
                            </p>
                            <p class="mt-1 text-sm font-semibold text-slate-700">
                                ${escapeHtml(grade)}
                            </p>
                        </div>

                        <div>
                            <p class="text-xs font-semibold text-slate-400">
                                Application Date
                            </p>
                            <p class="mt-1 text-sm font-semibold text-slate-700">
                                ${escapeHtml(date)}
                            </p>
                        </div>

                        <div>
                            <p class="text-xs font-semibold text-slate-400">
                                Processed By
                            </p>
                            <p class="mt-1 text-sm font-semibold text-slate-700">
                                ${escapeHtml(processedBy)}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p class="mb-2 text-xs font-semibold text-slate-400">
                            Application Status
                        </p>

                        <span class="inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusClass}">
                            ${escapeHtml(status)}
                        </span>
                    </div>
                </div>
            `
        );
    }

    function updatePagination() {
        const total = filteredRows.length;
        const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        const start = (currentPage - 1) * rowsPerPage;
        const end = Math.min(start + rowsPerPage, total);

        applicationRows.forEach((row) => {
            row.classList.add("hidden");
        });

        filteredRows.slice(start, end).forEach((row) => {
            row.classList.remove("hidden");
        });

        const displayStart = total === 0 ? 0 : start + 1;
        const displayEnd = end;

        applicationCount.innerHTML = `
            Showing
            <span class="font-bold text-slate-700">${displayStart}–${displayEnd}</span>
            of
            <span class="font-bold text-slate-700">${total}</span>
            applications
        `;

        previousApplicationBtn.disabled = currentPage === 1;
        nextApplicationBtn.disabled = currentPage === totalPages;

        previousApplicationBtn.classList.toggle("text-slate-300", currentPage === 1);
        previousApplicationBtn.classList.toggle("text-slate-700", currentPage !== 1);
        previousApplicationBtn.classList.toggle("hover:bg-slate-50", currentPage !== 1);

        nextApplicationBtn.classList.toggle("text-slate-300", currentPage === totalPages);
        nextApplicationBtn.classList.toggle("text-slate-700", currentPage !== totalPages);
        nextApplicationBtn.classList.toggle("hover:bg-slate-50", currentPage !== totalPages);
    }

    function filterApplications() {
        const query = applicationSearch.value.trim().toLowerCase();

        filteredRows = applicationRows.filter((row) => {
            const searchableText = row.dataset.name.toLowerCase();
            return searchableText.includes(query);
        });

        currentPage = 1;
        updatePagination();
    }

    function downloadCsv() {
        const rows = [
            ["Student", "Parent/Guardian", "Grade", "Date", "Status", "Processed By"]
        ];

        applicationRows.forEach((row) => {
            const cells = row.querySelectorAll("td");

            rows.push([
                cells[0]?.textContent.trim() || "",
                cells[1]?.textContent.trim() || "",
                cells[2]?.textContent.trim() || "",
                cells[3]?.textContent.trim() || "",
                cells[4]?.textContent.trim() || "",
                cells[5]?.textContent.trim() || ""
            ]);
        });

        const csv = rows
            .map((row) =>
                row
                    .map((value) => `"${String(value).replaceAll('"', '""')}"`)
                    .join(",")
            )
            .join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "enrollment-data.csv";

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    }

    reviewApplicationsBtn.addEventListener("click", () => {
        window.location.href = "/admin/enrollment";
    });

    viewReportsBtn.addEventListener("click", () => {
        window.location.href = "/admin/reports";
    });

    addStudentBtn.addEventListener("click", () => {
        window.location.href = "/admin/students";
    });

    batchApproveBtn.addEventListener("click", () => {
        openModal(
            "Batch Approve",
            "Review pending enrollment applications",
            `
                <div class="space-y-4">
                    <div class="rounded-xl bg-amber-50 p-4">
                        <div class="flex items-start gap-3">
                            <i data-lucide="clock-3" class="mt-0.5 h-5 w-5 text-amber-600"></i>

                            <div>
                                <p class="text-sm font-bold text-amber-800">
                                    24 applications are pending
                                </p>

                                <p class="mt-1 text-xs text-amber-700">
                                    Batch approval can be managed from the Enrollment page.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        id="openEnrollmentFromBatch"
                        type="button"
                        class="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Open Enrollment
                    </button>
                </div>
            `
        );

        document
            .getElementById("openEnrollmentFromBatch")
            .addEventListener("click", () => {
                window.location.href = "/admin/enrollment";
            });
    });

    exportDataBtn.addEventListener("click", downloadCsv);

    sendNotificationBtn.addEventListener("click", () => {
        window.location.href = "/admin/settings";
    });

    viewAllActivityBtn.addEventListener("click", () => {
        openModal(
            "Recent Activity",
            "Latest system activities",
            `
                <div class="space-y-3">
                    <div class="rounded-xl bg-slate-50 p-4">
                        <p class="text-sm font-semibold text-slate-800">
                            Application approved
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            5 minutes ago
                        </p>
                    </div>

                    <div class="rounded-xl bg-slate-50 p-4">
                        <p class="text-sm font-semibold text-slate-800">
                            New application received
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            18 minutes ago
                        </p>
                    </div>

                    <div class="rounded-xl bg-slate-50 p-4">
                        <p class="text-sm font-semibold text-slate-800">
                            Student record updated
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            32 minutes ago
                        </p>
                    </div>

                    <div class="rounded-xl bg-slate-50 p-4">
                        <p class="text-sm font-semibold text-slate-800">
                            Application declined
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            1 hour ago
                        </p>
                    </div>

                    <div class="rounded-xl bg-slate-50 p-4">
                        <p class="text-sm font-semibold text-slate-800">
                            Report generated
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                            2 hours ago
                        </p>
                    </div>
                </div>
            `
        );
    });

    gradeMenuBtn.addEventListener("click", () => {
        openModal(
            "Grade Distribution",
            "Current student enrollment by grade",
            `
                <div class="space-y-3">
                    <div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                        <span class="text-sm font-semibold text-slate-700">Kindergarten</span>
                        <span class="text-sm font-bold text-slate-900">120</span>
                    </div>

                    <div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                        <span class="text-sm font-semibold text-slate-700">Grade 1</span>
                        <span class="text-sm font-bold text-slate-900">160</span>
                    </div>

                    <div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                        <span class="text-sm font-semibold text-slate-700">Grade 2</span>
                        <span class="text-sm font-bold text-slate-900">145</span>
                    </div>

                    <div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                        <span class="text-sm font-semibold text-slate-700">Grade 3</span>
                        <span class="text-sm font-bold text-slate-900">130</span>
                    </div>

                    <div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                        <span class="text-sm font-semibold text-slate-700">Grade 4</span>
                        <span class="text-sm font-bold text-slate-900">110</span>
                    </div>

                    <div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                        <span class="text-sm font-semibold text-slate-700">Grade 5</span>
                        <span class="text-sm font-bold text-slate-900">96</span>
                    </div>

                    <div class="flex items-center justify-between rounded-xl bg-slate-50 p-4">
                        <span class="text-sm font-semibold text-slate-700">Grade 6</span>
                        <span class="text-sm font-bold text-slate-900">80</span>
                    </div>
                </div>
            `
        );
    });

    applicationSearch.addEventListener("input", filterApplications);

    applicationActions.forEach((button) => {
        button.addEventListener("click", () => {
            showApplication(button.dataset.student);
        });
    });

    previousApplicationBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextApplicationBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    closeDashboardModal.addEventListener("click", closeModal);
    closeDashboardModalBtn.addEventListener("click", closeModal);

    dashboardModal.addEventListener("click", (event) => {
        if (event.target === dashboardModal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !dashboardModal.classList.contains("hidden")) {
            closeModal();
        }
    });

    updatePagination();

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});