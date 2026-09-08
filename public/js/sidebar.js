document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarToggleIcon = document.getElementById("sidebarToggleIcon");
    const mobileSidebarClose = document.getElementById("mobileSidebarClose");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const sidebarTexts = document.querySelectorAll(".sidebar-text");
    const sidebarBadges = document.querySelectorAll(".sidebar-badge");
    const sidebarTitle = document.getElementById("sidebarTitle");
    const menuTitle = document.getElementById("menuTitle");
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const logoutBtn = document.getElementById("logoutBtn");

    let sidebarCollapsed = false;

    function updateDesktopSidebar() {

        if (sidebarCollapsed) {

            sidebar.classList.remove("w-64");
            sidebar.classList.add("w-20");

            sidebarTexts.forEach((element) => {
                element.classList.add("hidden");
            });

            sidebarBadges.forEach((element) => {
                element.classList.add("hidden");
            });

            sidebarTitle.classList.add("hidden");
            menuTitle.classList.add("hidden");

            sidebarLinks.forEach((link) => {
                link.classList.remove("gap-3");
                link.classList.add("justify-center");
            });

            if (logoutBtn) {
                logoutBtn.classList.remove("gap-3");
                logoutBtn.classList.add("justify-center");
            }

            sidebarToggleIcon.setAttribute(
                "data-lucide",
                "panel-left-open"
            );

            sidebarToggle.setAttribute(
                "title",
                "Expand Sidebar"
            );

        } else {

            sidebar.classList.remove("w-20");
            sidebar.classList.add("w-64");

            sidebarTexts.forEach((element) => {
                element.classList.remove("hidden");
            });

            sidebarBadges.forEach((element) => {
                element.classList.remove("hidden");
            });

            sidebarTitle.classList.remove("hidden");
            menuTitle.classList.remove("hidden");

            sidebarLinks.forEach((link) => {
                link.classList.add("gap-3");
                link.classList.remove("justify-center");
            });

            if (logoutBtn) {
                logoutBtn.classList.add("gap-3");
                logoutBtn.classList.remove("justify-center");
            }

            sidebarToggleIcon.setAttribute(
                "data-lucide",
                "panel-left-close"
            );

            sidebarToggle.setAttribute(
                "title",
                "Collapse Sidebar"
            );
        }

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    }

    if (sidebarToggle) {

        sidebarToggle.addEventListener("click", () => {

            sidebarCollapsed = !sidebarCollapsed;

            updateDesktopSidebar();

        });

    }

    function openMobileSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("-translate-x-full");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("hidden");
        }
    }

    function closeMobileSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("-translate-x-full");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("hidden");
        }
    }

    if (mobileSidebarClose) {

        mobileSidebarClose.addEventListener(
            "click",
            closeMobileSidebar
        );

    }

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeMobileSidebar
        );

    }

    sidebarLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (window.innerWidth < 1024) {
                closeMobileSidebar();
            }

        });

    });

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener(
            "click",
            openMobileSidebar
        );

    }

    window.addEventListener("resize", () => {

        if (window.innerWidth >= 1024) {

            sidebar.classList.remove(
                "-translate-x-full"
            );

            if (sidebarOverlay) {
                sidebarOverlay.classList.add("hidden");
            }

        } else {

            sidebar.classList.add(
                "-translate-x-full"
            );

        }

    });

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (confirmLogout) {
                window.location.href = "/";
            }

        });

    }

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

});