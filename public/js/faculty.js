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
        Array.from(document.querySelectorAll(".faculty-row"));

    const emptyState =
        document.getElementById("emptyFacultyState");

    const showingRange =
        document.getElementById("showingRange");

    const totalFaculty =
        document.getElementById("totalFaculty");

    const prevPageBtn =
        document.getElementById("prevPageBtn");

    const nextPageBtn =
        document.getElementById("nextPageBtn");

    const paginationNumbers =
        document.getElementById("paginationNumbers");

    const exportFacultyBtn =
        document.getElementById("exportFacultyBtn");

    const addFacultyBtn =
        document.getElementById("addFacultyBtn");


    /* =====================================================
       VIEW FACULTY MODAL
    ===================================================== */

    const facultyModal =
        document.getElementById("facultyModal");

    const closeFacultyModalBtn =
        document.getElementById("closeFacultyModalBtn");

    const modalCloseBtn =
        document.getElementById("modalCloseBtn");

    const modalInitials =
        document.getElementById("modalInitials");

    const modalName =
        document.getElementById("modalName");

    const modalId =
        document.getElementById("modalId");

    const modalEmail =
        document.getElementById("modalEmail");

    const modalContact =
        document.getElementById("modalContact");

    const modalDepartment =
        document.getElementById("modalDepartment");

    const modalPosition =
        document.getElementById("modalPosition");

    const modalStatusBadge =
        document.getElementById("modalStatusBadge");


    const addFacultyModal =
        document.getElementById("addFacultyModal");

    const closeAddFacultyModalBtn =
        document.getElementById("closeAddFacultyModalBtn");

    const cancelAddFacultyBtn =
        document.getElementById("cancelAddFacultyBtn");

    const addFacultyForm =
        document.getElementById("addFacultyForm");



    const rowsPerPage = 5;

    let currentPage = 1;

    let filteredRows = [...rows];


    function openAddFacultyModal() {

        if (!addFacultyModal) {
            return;
        }

        addFacultyModal.classList.remove("hidden");
        addFacultyModal.classList.add("flex");

        document.body.classList.add("overflow-hidden");

        const nameInput =
            document.getElementById("facultyName");

        if (nameInput) {
            setTimeout(function () {
                nameInput.focus();
            }, 100);
        }
    }


    function closeAddFacultyModal() {

        if (!addFacultyModal) {
            return;
        }

        addFacultyModal.classList.add("hidden");
        addFacultyModal.classList.remove("flex");

        document.body.classList.remove("overflow-hidden");
    }


    if (addFacultyBtn) {

        addFacultyBtn.addEventListener(
            "click",
            openAddFacultyModal
        );

    }

    if (closeAddFacultyModalBtn) {

        closeAddFacultyModalBtn.addEventListener(
            "click",
            closeAddFacultyModal
        );

    }


    if (cancelAddFacultyBtn) {

        cancelAddFacultyBtn.addEventListener(
            "click",
            closeAddFacultyModal
        );

    }

    if (addFacultyModal) {

        addFacultyModal.addEventListener(
            "click",
            function (event) {

                if (event.target === addFacultyModal) {
                    closeAddFacultyModal();
                }

            }
        );

    }

    function openFacultyModal(button) {

        if (!facultyModal || !button) {
            return;
        }

        const name =
            button.dataset.name || "Faculty Member";

        const id =
            button.dataset.id || "-";

        const email =
            button.dataset.email || "-";

        const contact =
            button.dataset.contact || "-";

        const department =
            button.dataset.department || "-";

        const position =
            button.dataset.position || "-";

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

        if (modalName) {
            modalName.textContent = name;
        }

        if (modalId) {
            modalId.textContent = id;
        }

        if (modalEmail) {
            modalEmail.textContent = email;
        }

        if (modalContact) {
            modalContact.textContent = contact;
        }

        if (modalDepartment) {
            modalDepartment.textContent = department;
        }

        if (modalPosition) {
            modalPosition.textContent = position;
        }


        /* Status */
        if (modalStatusBadge) {

            modalStatusBadge.textContent = status;

            modalStatusBadge.className =
                "inline-flex rounded-full px-3 py-1 text-xs font-semibold";

            if (status === "Active") {

                modalStatusBadge.classList.add(
                    "bg-emerald-50",
                    "text-emerald-600"
                );

            } else {

                modalStatusBadge.classList.add(
                    "bg-rose-50",
                    "text-rose-600"
                );

            }

        }


        facultyModal.classList.remove("hidden");
        facultyModal.classList.add("flex");

        document.body.classList.add("overflow-hidden");
    }


    function closeFacultyModal() {

        if (!facultyModal) {
            return;
        }

        facultyModal.classList.add("hidden");
        facultyModal.classList.remove("flex");

        document.body.classList.remove("overflow-hidden");
    }


    document
        .querySelectorAll(".viewFacultyBtn")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {
                    openFacultyModal(this);
                }
            );

        });

    if (closeFacultyModalBtn) {

        closeFacultyModalBtn.addEventListener(
            "click",
            closeFacultyModal
        );

    }


    if (modalCloseBtn) {

        modalCloseBtn.addEventListener(
            "click",
            closeFacultyModal
        );

    }

    if (facultyModal) {

        facultyModal.addEventListener(
            "click",
            function (event) {

                if (event.target === facultyModal) {
                    closeFacultyModal();
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
                facultyModal &&
                !facultyModal.classList.contains("hidden")
            ) {
                closeFacultyModal();
            }

            if (
                addFacultyModal &&
                !addFacultyModal.classList.contains("hidden")
            ) {
                closeAddFacultyModal();
            }

        }
    );


    function filterFaculty() {

        const search =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";

        const department =
            departmentFilter
                ? departmentFilter.value
                : "";

        const status =
            statusFilter
                ? statusFilter.value
                : "";


        filteredRows =
            rows.filter(function (row) {

                const name =
                    (row.dataset.name || "").toLowerCase();

                const id =
                    (row.dataset.id || "").toLowerCase();

                const email =
                    (row.dataset.email || "").toLowerCase();

                const rowDepartment =
                    row.dataset.department || "";

                const rowStatus =
                    row.dataset.status || "";


                const matchesSearch =
                    name.includes(search) ||
                    id.includes(search) ||
                    email.includes(search);


                const matchesDepartment =
                    !department ||
                    rowDepartment === department;


                const matchesStatus =
                    !status ||
                    rowStatus === status;


                return (
                    matchesSearch &&
                    matchesDepartment &&
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

            showingRange.textContent =
                total === 0
                    ? "0"
                    : `${start + 1}–${end}`;

        }

        if (totalFaculty) {
            totalFaculty.textContent = total;
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
                    "rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white";

            } else {

                button.className =
                    "rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50";

            }


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

    if (addFacultyForm) {

        addFacultyForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById("facultyName");

                const facultyIdInput =
                    document.getElementById("facultyId");

                const emailInput =
                    document.getElementById("facultyEmail");

                const departmentInput =
                    document.getElementById("facultyDepartment");

                const positionInput =
                    document.getElementById("facultyPosition");

                const contactInput =
                    document.getElementById("facultyContact");

                const statusInput =
                    document.getElementById("facultyStatus");


                const name =
                    nameInput.value.trim();

                const facultyId =
                    facultyIdInput.value.trim();

                const email =
                    emailInput.value.trim();

                const department =
                    departmentInput.value;

                const position =
                    positionInput.value.trim();

                const contact =
                    contactInput.value.trim();

                const status =
                    statusInput.value;


                if (
                    !name ||
                    !facultyId ||
                    !email ||
                    !department ||
                    !position ||
                    !contact
                ) {
                    return;
                }


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


                const row =
                    document.createElement("tr");

                row.className =
                    "faculty-row transition hover:bg-slate-50";


                row.dataset.name =
                    name;

                row.dataset.id =
                    facultyId;

                row.dataset.email =
                    email;

                row.dataset.department =
                    department;

                row.dataset.position =
                    position;

                row.dataset.contact =
                    contact;

                row.dataset.status =
                    status;


                row.innerHTML = `

                    <td class="px-6 py-5">

                        <div class="flex items-center gap-3">

                            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                                ${initials.toUpperCase()}
                            </div>

                            <div>

                                <p class="font-semibold text-slate-900">
                                    ${escapeHtml(name)}
                                </p>

                                <p class="text-xs text-slate-500">
                                    ${escapeHtml(email)}
                                </p>

                            </div>

                        </div>

                    </td>


                    <td class="px-6 py-5 font-medium text-slate-700">
                        ${escapeHtml(facultyId)}
                    </td>


                    <td class="px-6 py-5 text-slate-600">
                        ${escapeHtml(department)}
                    </td>


                    <td class="px-6 py-5 text-slate-600">
                        ${escapeHtml(position)}
                    </td>


                    <td class="px-6 py-5 text-slate-600">
                        ${escapeHtml(contact)}
                    </td>


                    <td class="px-6 py-5">

                        <span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            status === "Active"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-rose-50 text-rose-600"
                        }">

                            ${escapeHtml(status)}

                        </span>

                    </td>


                    <td class="px-6 py-5 text-right">

                        <button
                            type="button"
                            class="viewFacultyBtn rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                            data-name="${escapeHtml(name)}"
                            data-id="${escapeHtml(facultyId)}"
                            data-email="${escapeHtml(email)}"
                            data-department="${escapeHtml(department)}"
                            data-position="${escapeHtml(position)}"
                            data-contact="${escapeHtml(contact)}"
                            data-status="${escapeHtml(status)}"
                            title="View Faculty"
                        >
                            <i data-lucide="eye" class="h-5 w-5"></i>
                        </button>

                    </td>

                `;


                const tbody =
                    document.querySelector(
                        "tbody"
                    );


                if (tbody) {

                    tbody.insertBefore(
                        row,
                        emptyState
                    );

                    rows.push(row);

                }


                /* Rebind View Button */
                const viewButton =
                    row.querySelector(
                        ".viewFacultyBtn"
                    );


                if (viewButton) {

                    viewButton.addEventListener(
                        "click",
                        function () {
                            openFacultyModal(this);
                        }
                    );

                }


                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }


                /* Close and reset */
                addFacultyForm.reset();

                closeAddFacultyModal();

                filteredRows = [...rows];

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

    if (exportFacultyBtn) {

        exportFacultyBtn.addEventListener(
            "click",
            function () {

                if (filteredRows.length === 0) {
                    return;
                }


                const headers = [
                    "Faculty Name",
                    "Faculty ID",
                    "Email",
                    "Department",
                    "Position",
                    "Contact",
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
                            row.dataset.email || "",
                            row.dataset.department || "",
                            row.dataset.position || "",
                            row.dataset.contact || "",
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
                    "faculty-records-2026.csv";


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