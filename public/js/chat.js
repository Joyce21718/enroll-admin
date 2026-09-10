document.addEventListener("DOMContentLoaded", () => {
    const chatSearch = document.getElementById("chatSearch");
    const conversationItems = document.querySelectorAll(".conversation-item");
    const messageForm = document.getElementById("messageForm");
    const messageInput = document.getElementById("messageInput");
    const messageContainer = document.getElementById("messageContainer");

    const chatUserName = document.getElementById("chatUserName");
    const chatUserRole = document.getElementById("chatUserRole");
    const chatUserStatus = document.getElementById("chatUserStatus");
    const teacherAvatar = document.getElementById("teacherAvatar");
    const teacherOnlineDot = document.getElementById("teacherOnlineDot");

    const chatInfoBtn = document.getElementById("chatInfoBtn");
    const teacherInfoModal = document.getElementById("teacherInfoModal");
    const closeTeacherInfo = document.getElementById("closeTeacherInfo");
    const closeTeacherInfoBtn = document.getElementById("closeTeacherInfoBtn");

    const modalTeacherAvatar = document.getElementById("modalTeacherAvatar");
    const modalTeacherName = document.getElementById("modalTeacherName");
    const modalTeacherRole = document.getElementById("modalTeacherRole");
    const modalFacultyId = document.getElementById("modalFacultyId");
    const modalDepartment = document.getElementById("modalDepartment");

    const teachers = {
        "teacher-1": {
            name: "Juan Dela Cruz",
            initial: "J",
            role: "Grade 1 Adviser",
            status: "Online",
            facultyId: "FAC-001",
            department: "Elementary"
        },
        "teacher-2": {
            name: "Maria Santos",
            initial: "M",
            role: "Grade 2 Adviser",
            status: "Online",
            facultyId: "FAC-002",
            department: "Elementary"
        },
        "teacher-3": {
            name: "Mark Reyes",
            initial: "M",
            role: "Grade 3 Adviser",
            status: "Offline",
            facultyId: "FAC-003",
            department: "Elementary"
        },
        "teacher-4": {
            name: "Ana Mendoza",
            initial: "A",
            role: "Grade 4 Adviser",
            status: "Offline",
            facultyId: "FAC-004",
            department: "Elementary"
        }
    };

    const messages = {
        "teacher-1": [
            {
                sender: "teacher",
                text: "Good morning, Admin. I have a question about my assigned section.",
                time: "10:35 AM"
            },
            {
                sender: "admin",
                text: "Good morning, Sir Juan. How can I help you with your section?",
                time: "10:38 AM"
            },
            {
                sender: "teacher",
                text: "I would like to request an update regarding the student list.",
                time: "10:41 AM"
            },
            {
                sender: "admin",
                text: "Sure. I will check the latest student records and update you.",
                time: "10:42 AM"
            }
        ],
        "teacher-2": [
            {
                sender: "teacher",
                text: "Good morning, Admin. Is there anything else needed for the report?",
                time: "9:12 AM"
            },
            {
                sender: "admin",
                text: "Good morning, Ma'am Maria. Please make sure the student records are updated.",
                time: "9:18 AM"
            }
        ],
        "teacher-3": [
            {
                sender: "teacher",
                text: "Good afternoon, Admin. The class list has already been updated.",
                time: "Yesterday"
            },
            {
                sender: "admin",
                text: "Thank you, Sir Mark. We will review the updated list.",
                time: "Yesterday"
            }
        ],
        "teacher-4": [
            {
                sender: "teacher",
                text: "Good morning, Admin. Can you check my assigned section?",
                time: "Sep 8"
            },
            {
                sender: "admin",
                text: "Sure, Ma'am Ana. I will check the section assignment.",
                time: "Sep 8"
            }
        ]
    };

    let selectedTeacherId = "teacher-1";

    function renderMessages(teacherId) {
        const teacherMessages = messages[teacherId] || [];

        messageContainer.innerHTML = "";

        teacherMessages.forEach((message) => {
            const wrapper = document.createElement("div");

            wrapper.className =
                message.sender === "admin"
                    ? "flex justify-end"
                    : "flex justify-start";

            const content = document.createElement("div");
            content.className = "max-w-[80%] sm:max-w-[65%]";

            const bubble = document.createElement("div");

            if (message.sender === "admin") {
                bubble.className =
                    "rounded-2xl rounded-br-md bg-indigo-600 px-4 py-3 text-white shadow-sm";
            } else {
                bubble.className =
                    "rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm";
            }

            const text = document.createElement("p");
            text.className = "text-sm leading-6";
            text.textContent = message.text;

            if (message.sender !== "admin") {
                text.classList.add("text-slate-700");
            }

            bubble.appendChild(text);

            const time = document.createElement("p");
            time.className =
                message.sender === "admin"
                    ? "mt-1 px-1 text-right text-[10px] text-slate-400"
                    : "mt-1 px-1 text-[10px] text-slate-400";

            time.textContent = message.time;

            content.appendChild(bubble);
            content.appendChild(time);
            wrapper.appendChild(content);

            messageContainer.appendChild(wrapper);
        });

        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    function updateTeacher(teacherId) {
        const teacher = teachers[teacherId];

        if (!teacher) {
            return;
        }

        selectedTeacherId = teacherId;

        conversationItems.forEach((item) => {
            item.classList.remove("bg-indigo-50");
            item.classList.add("hover:bg-slate-50");
        });

        const selectedItem = document.querySelector(
            `[data-teacher-id="${teacherId}"]`
        );

        if (selectedItem) {
            selectedItem.classList.add("bg-indigo-50");
            selectedItem.classList.remove("hover:bg-slate-50");
        }

        chatUserName.textContent = teacher.name;
        chatUserRole.textContent = teacher.role;
        chatUserStatus.textContent = teacher.status;
        teacherAvatar.textContent = teacher.initial;
        modalTeacherAvatar.textContent = teacher.initial;

        chatUserStatus.classList.toggle(
            "text-emerald-600",
            teacher.status === "Online"
        );

        chatUserStatus.classList.toggle(
            "text-slate-400",
            teacher.status !== "Online"
        );

        teacherOnlineDot.classList.toggle(
            "hidden",
            teacher.status !== "Online"
        );

        renderMessages(teacherId);
    }

    function openTeacherInfo() {
        const teacher = teachers[selectedTeacherId];

        if (!teacher) {
            return;
        }

        modalTeacherName.textContent = teacher.name;
        modalTeacherRole.textContent = teacher.role;
        modalFacultyId.textContent = teacher.facultyId;
        modalDepartment.textContent = teacher.department;
        modalTeacherAvatar.textContent = teacher.initial;

        teacherInfoModal.classList.remove("hidden");
        teacherInfoModal.classList.add("flex");

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    }

    function closeTeacherInfoModal() {
        teacherInfoModal.classList.add("hidden");
        teacherInfoModal.classList.remove("flex");
    }

    conversationItems.forEach((item) => {
        item.addEventListener("click", () => {
            updateTeacher(item.dataset.teacherId);
        });
    });

    chatSearch.addEventListener("input", () => {
        const searchValue = chatSearch.value.toLowerCase().trim();

        conversationItems.forEach((item) => {
            const text = item.textContent.toLowerCase();

            item.classList.toggle(
                "hidden",
                searchValue !== "" && !text.includes(searchValue)
            );
        });
    });

    messageForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const message = messageInput.value.trim();

        if (!message) {
            messageInput.focus();
            return;
        }

        if (!messages[selectedTeacherId]) {
            messages[selectedTeacherId] = [];
        }

        messages[selectedTeacherId].push({
            sender: "admin",
            text: message,
            time: "Just now"
        });

        messageInput.value = "";
        messageInput.style.height = "46px";

        renderMessages(selectedTeacherId);
    });

    messageInput.addEventListener("input", () => {
        messageInput.style.height = "46px";
        messageInput.style.height =
            `${Math.min(messageInput.scrollHeight, 128)}px`;
    });

    messageInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            messageForm.requestSubmit();
        }
    });

    chatInfoBtn.addEventListener("click", openTeacherInfo);

    closeTeacherInfo.addEventListener(
        "click",
        closeTeacherInfoModal
    );

    closeTeacherInfoBtn.addEventListener(
        "click",
        closeTeacherInfoModal
    );

    teacherInfoModal.addEventListener("click", (event) => {
        if (event.target === teacherInfoModal) {
            closeTeacherInfoModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            !teacherInfoModal.classList.contains("hidden")
        ) {
            closeTeacherInfoModal();
        }
    });

    updateTeacher("teacher-1");

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});