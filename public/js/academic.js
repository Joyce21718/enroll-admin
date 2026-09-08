
    lucide.createIcons();

    function filterYears() {
      const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

      const rows = document.querySelectorAll(".year-row");

      rows.forEach(row => {
        const text = row.innerText.toLowerCase();

        row.style.display = text.includes(search) ? "" : "none";
      });
    }

    function addAcademicYear() {
      alert("Add Academic Year form will open here.");
    }

    function viewYear(year) {
      alert("Viewing academic year: " + year);
    }

    function editYear(year) {
      alert("Editing academic year: " + year);
    }
 