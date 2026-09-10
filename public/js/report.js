document.addEventListener("DOMContentLoaded", () => {
    const generateReportBtn = document.getElementById("generateReportBtn");
    const reportButtons = document.querySelectorAll(".view-report-btn");

    const reportModal = document.getElementById("reportModal");
    const closeReportModal = document.getElementById("closeReportModal");
    const closeReportModalBtn = document.getElementById("closeReportModalBtn");

    const reportModalTitle = document.getElementById("reportModalTitle");
    const reportTableBody = document.getElementById("reportTableBody");
    const reportDate = document.getElementById("reportDate");
    const downloadReportBtn = document.getElementById("downloadReportBtn");

    let currentReport = "System Summary";

    const reportData = {
        "Enrollment Report": [
            ["Total Applications", "124", "All"],
            ["Approved Applications", "98", "Approved"],
            ["Pending Applications", "12", "Pending"],
            ["Declined Applications", "14", "Declined"]
        ],

        "Student Report": [
            ["Total Students", "248", "Registered"],
            ["Kindergarten", "24", "Active"],
            ["Grade 1", "38", "Active"],
            ["Grade 2", "42", "Active"],
            ["Grade 3", "41", "Active"],
            ["Grade 4", "39", "Active"],
            ["Grade 5", "34", "Active"],
            ["Grade 6", "30", "Active"]
        ],

        "Faculty Report": [
            ["Total Faculty", "36", "Active"],
            ["Elementary Faculty", "30", "Active"],
            ["Administrative Staff", "6", "Active"]
        ],

        "Section Report": [
            ["Total Sections", "18", "All"],
            ["Active Sections", "16", "Active"],
            ["Inactive Sections", "2", "Inactive"],
            ["Enrolled Students", "248", "Enrolled"],
            ["Available Slots", "112", "Available"]
        ],

        "Academic Year Report": [
            ["Current Academic Year", "2026–2027", "Active"],
            ["Previous Academic Year", "2025–2026", "Completed"],
            ["Enrolled This Year", "124", "Active"]
        ],

        "System Summary": [
            ["Total Students", "248", "Registered"],
            ["Total Faculty", "36", "Active"],
            ["Total Sections", "18", "All"],
            ["Enrolled This Year", "124", "Enrolled"],
            ["Pending Applications", "12", "Pending"],
            ["Available Slots", "112", "Available"]
        ]
    };

    function openModal(reportName) {
        currentReport = reportName;

        const data = reportData[reportName] || reportData["System Summary"];

        reportModalTitle.textContent = reportName;
        reportDate.textContent = new Date().toLocaleString();

        reportTableBody.innerHTML = "";

        data.forEach(([category, total, status]) => {
            const row = document.createElement("tr");

            const categoryCell = document.createElement("td");
            categoryCell.className = "px-5 py-4 font-medium text-slate-700";
            categoryCell.textContent = category;

            const totalCell = document.createElement("td");
            totalCell.className = "px-5 py-4 font-semibold text-slate-900";
            totalCell.textContent = total;

            const statusCell = document.createElement("td");
            statusCell.className = "px-5 py-4";

            const statusBadge = document.createElement("span");
            statusBadge.className =
                "inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600";
            statusBadge.textContent = status;

            statusCell.appendChild(statusBadge);

            row.appendChild(categoryCell);
            row.appendChild(totalCell);
            row.appendChild(statusCell);

            reportTableBody.appendChild(row);
        });

        reportModal.classList.remove("hidden");
        reportModal.classList.add("flex");

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    }

    function closeModal() {
        reportModal.classList.add("hidden");
        reportModal.classList.remove("flex");
    }

    function downloadReport() {
        const data = reportData[currentReport] || [];

        const rows = [
            ["Report", currentReport],
            ["Generated", new Date().toLocaleString()],
            [],
            ["Category", "Total", "Status"],
            ...data
        ];

        const csvContent = rows
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
        link.download = `${currentReport
            .toLowerCase()
            .replaceAll(" ", "-")}.csv`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    }

    generateReportBtn.addEventListener("click", () => {
        openModal("System Summary");
    });

    reportButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openModal(button.dataset.report);
        });
    });

    closeReportModal.addEventListener("click", closeModal);
    closeReportModalBtn.addEventListener("click", closeModal);

    downloadReportBtn.addEventListener("click", downloadReport);

    reportModal.addEventListener("click", (event) => {
        if (event.target === reportModal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            !reportModal.classList.contains("hidden")
        ) {
            closeModal();
        }
    });

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});