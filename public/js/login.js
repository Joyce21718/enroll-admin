document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");
    const loginMessage = document.getElementById("loginMessage");

    const togglePasswordBtn = document.getElementById("togglePasswordBtn");
    const passwordIcon = document.getElementById("passwordIcon");

    const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
    const forgotPasswordModal = document.getElementById("forgotPasswordModal");
    const closeForgotPasswordBtn = document.getElementById("closeForgotPasswordBtn");
    const closeForgotPasswordBtnBottom = document.getElementById("closeForgotPasswordBtnBottom");

    function showMessage(message, type) {
        loginMessage.textContent = message;

        loginMessage.className =
            "rounded-xl border px-4 py-3 text-sm";

        if (type === "error") {
            loginMessage.classList.add(
                "border-red-200",
                "bg-red-50",
                "text-red-600"
            );
        }

        if (type === "success") {
            loginMessage.classList.add(
                "border-emerald-200",
                "bg-emerald-50",
                "text-emerald-600"
            );
        }

        loginMessage.classList.remove("hidden");
    }

    togglePasswordBtn.addEventListener("click", () => {
        const isPassword = password.type === "password";

        password.type = isPassword ? "text" : "password";

        passwordIcon.setAttribute(
            "data-lucide",
            isPassword ? "eye-off" : "eye"
        );

        togglePasswordBtn.setAttribute(
            "title",
            isPassword ? "Hide password" : "Show password"
        );

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    });

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!loginForm.checkValidity()) {
            loginForm.reportValidity();
            return;
        }

        const usernameValue = username.value.trim();
        const passwordValue = password.value;

        loginMessage.classList.add("hidden");

        loginBtn.disabled = true;
        loginBtn.classList.add("opacity-70", "cursor-not-allowed");

        loginBtn.innerHTML = `
            <i data-lucide="loader-circle" class="h-5 w-5 animate-spin"></i>
            <span>Signing In...</span>
        `;

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

        setTimeout(() => {
            if (usernameValue === "admin" && passwordValue === "admin123") {
                showMessage("Login successful. Redirecting...", "success");

                setTimeout(() => {
                    window.location.href = "/admin/dashboard";
                }, 700);

                return;
            }

            showMessage("Invalid username or password.", "error");

            loginBtn.disabled = false;
            loginBtn.classList.remove("opacity-70", "cursor-not-allowed");

            loginBtn.innerHTML = `
                <i data-lucide="log-in" class="h-5 w-5"></i>
                <span>Sign In</span>
            `;

            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }
        }, 600);
    });

    function openForgotPasswordModal() {
        forgotPasswordModal.classList.remove("hidden");
        forgotPasswordModal.classList.add("flex");
    }

    function closeForgotPasswordModal() {
        forgotPasswordModal.classList.add("hidden");
        forgotPasswordModal.classList.remove("flex");
    }

    forgotPasswordBtn.addEventListener("click", openForgotPasswordModal);
    closeForgotPasswordBtn.addEventListener("click", closeForgotPasswordModal);
    closeForgotPasswordBtnBottom.addEventListener("click", closeForgotPasswordModal);

    forgotPasswordModal.addEventListener("click", (event) => {
        if (event.target === forgotPasswordModal) {
            closeForgotPasswordModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            !forgotPasswordModal.classList.contains("hidden")
        ) {
            closeForgotPasswordModal();
        }
    });

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});