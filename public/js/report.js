document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".settings-tab");
    const panels = document.querySelectorAll(".settings-panel");

    const profileForm = document.getElementById("profileForm");
    const passwordForm = document.getElementById("passwordForm");
    const saveNotificationBtn = document.getElementById("saveNotificationBtn");

    const profileMessage = document.getElementById("profileMessage");
    const passwordMessage = document.getElementById("passwordMessage");

    const panelMap = {
        profile: document.getElementById("profileSection"),
        security: document.getElementById("securitySection"),
        notifications: document.getElementById("notificationsSection"),
        system: document.getElementById("systemSection")
    };

    function showTab(tabName) {
        tabs.forEach((tab) => {
            const active = tab.dataset.settingsTab === tabName;

            tab.classList.toggle("bg-indigo-600", active);
            tab.classList.toggle("text-white", active);
            tab.classList.toggle("font-semibold", active);

            tab.classList.toggle("text-slate-600", !active);
            tab.classList.toggle("font-medium", !active);
            tab.classList.toggle("hover:bg-slate-50", !active);
        });

        panels.forEach((panel) => {
            panel.classList.add("hidden");
        });

        if (panelMap[tabName]) {
            panelMap[tabName].classList.remove("hidden");
        }
    }

    function showMessage(element, message, type = "success") {
        element.textContent = message;
        element.classList.remove(
            "hidden",
            "text-green-600",
            "text-red-600",
            "text-amber-600"
        );

        if (type === "error") {
            element.classList.add("text-red-600");
        } else if (type === "warning") {
            element.classList.add("text-amber-600");
        } else {
            element.classList.add("text-green-600");
        }

        setTimeout(() => {
            element.classList.add("hidden");
        }, 3000);
    }

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            showTab(tab.dataset.settingsTab);
        });
    });

    profileForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!profileForm.reportValidity()) {
            return;
        }

        showMessage(profileMessage, "Profile changes saved successfully.");
    });

    passwordForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!passwordForm.reportValidity()) {
            return;
        }

        const currentPassword = document.getElementById("currentPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (!currentPassword) {
            showMessage(passwordMessage, "Enter your current password.", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage(passwordMessage, "New passwords do not match.", "error");
            return;
        }

        if (newPassword === currentPassword) {
            showMessage(
                passwordMessage,
                "New password must be different from the current password.",
                "error"
            );
            return;
        }

        passwordForm.reset();

        showMessage(
            passwordMessage,
            "Password changed successfully."
        );
    });

    if (saveNotificationBtn) {
        saveNotificationBtn.addEventListener("click", () => {
            showMessage(
                profileMessage,
                "Notification preferences saved successfully."
            );
        });
    }

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});