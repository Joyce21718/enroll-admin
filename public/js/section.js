
    lucide.createIcons();

    function filterSections() {

      const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

      const grade = document
        .getElementById("gradeFilter")
        .value;

      const status = document
        .getElementById("statusFilter")
        .value;

      const rows = document.querySelectorAll(".section-row");

      rows.forEach(row => {

        const text = row.innerText.toLowerCase();
        const rowGrade = row.dataset.grade;
        const rowStatus = row.dataset.status;

        const matchesSearch = text.includes(search);
        const matchesGrade = !grade || rowGrade === grade;
        const matchesStatus = !status || rowStatus === status;

        row.style.display =
          matchesSearch &&
          matchesGrade &&
          matchesStatus
            ? ""
            : "none";

      });
    }

    function addSection() {
      alert("Add Section form will open here.");
    }

    function viewSection(section) {
      alert("Viewing section: " + section);
    }

    function editSection(section) {
      alert("Editing section: " + section);
    }

    function exportSections() {
      alert("Section records will be exported.");
    }
