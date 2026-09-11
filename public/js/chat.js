document.addEventListener('DOMContentLoaded', () => {
    const teachers = {
        'teacher-1': {
            id: 'teacher-1',
            name: 'Juan Dela Cruz',
            initials: 'JD',
            role: 'Faculty Member',
            status: 'Active now',
            online: true,
            facultyId: 'FAC-001',
            department: 'Information Technology',
            avatarClass: 'bg-blue-100 text-blue-700',
            messages: [
                {
                    sender: 'teacher',
                    text: 'Hello! How are you today?',
                    time: '10:30 AM'
                },
                {
                    sender: 'admin',
                    text: 'I am doing well. How about you?',
                    time: '10:32 AM'
                },
                {
                    sender: 'teacher',
                    text: 'I am good. I just wanted to follow up on the latest update.',
                    time: '10:35 AM'
                },
                {
                    sender: 'admin',
                    text: 'Thank you for the update.',
                    time: '10:42 AM'
                }
            ]
        },
        'teacher-2': {
            id: 'teacher-2',
            name: 'Maria Santos',
            initials: 'MS',
            role: 'Senior Faculty Member',
            status: 'Active now',
            online: true,
            facultyId: 'FAC-002',
            department: 'Education',
            avatarClass: 'bg-pink-100 text-pink-700',
            messages: [
                {
                    sender: 'teacher',
                    text: 'Good morning. Can you send the report?',
                    time: '9:25 AM'
                },
                {
                    sender: 'admin',
                    text: 'Sure. I will send it shortly.',
                    time: '9:30 AM'
                }
            ]
        },
        'teacher-3': {
            id: 'teacher-3',
            name: 'Mark Reyes',
            initials: 'MR',
            role: 'Faculty Member',
            status: 'Offline',
            online: false,
            facultyId: 'FAC-003',
            department: 'Business Administration',
            avatarClass: 'bg-amber-100 text-amber-700',
            messages: [
                {
                    sender: 'teacher',
                    text: 'The meeting is scheduled for tomorrow.',
                    time: 'Yesterday'
                },
                {
                    sender: 'admin',
                    text: 'Noted. See you tomorrow.',
                    time: 'Yesterday'
                }
            ]
        },
        'teacher-4': {
            id: 'teacher-4',
            name: 'Ana Mendoza',
            initials: 'AM',
            role: 'Faculty Member',
            status: 'Active now',
            online: true,
            facultyId: 'FAC-004',
            department: 'General Education',
            avatarClass: 'bg-violet-100 text-violet-700',
            messages: [
                {
                    sender: 'teacher',
                    text: 'The meeting is confirmed.',
                    time: 'Monday'
                },
                {
                    sender: 'admin',
                    text: 'Thank you for confirming.',
                    time: 'Monday'
                }
            ]
        }
    };

    let activeTeacherId = 'teacher-1';

    const chatSearch = document.getElementById('chatSearch');
    const conversationList = document.getElementById('conversationList');
    const conversationCount = document.getElementById('conversationCount');
    const conversationPanel = document.getElementById('conversationPanel');
    const chatPanel = document.getElementById('chatPanel');
    const mobileChatBackBtn = document.getElementById('mobileChatBackBtn');

    const teacherAvatar = document.getElementById('teacherAvatar');
    const teacherOnlineDot = document.getElementById('teacherOnlineDot');
    const chatUserName = document.getElementById('chatUserName');
    const chatUserRole = document.getElementById('chatUserRole');
    const chatUserStatus = document.getElementById('chatUserStatus');

    const detailsTeacherAvatar = document.getElementById('detailsTeacherAvatar');
    const detailsTeacherName = document.getElementById('detailsTeacherName');
    const detailsTeacherRole = document.getElementById('detailsTeacherRole');

    const messageContainer = document.getElementById('messageContainer');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');

    const chatInfoBtn = document.getElementById('chatInfoBtn');
    const teacherInfoModal = document.getElementById('teacherInfoModal');
    const closeTeacherInfo = document.getElementById('closeTeacherInfo');
    const closeTeacherInfoBtn = document.getElementById('closeTeacherInfoBtn');

    const modalTeacherAvatar = document.getElementById('modalTeacherAvatar');
    const modalTeacherName = document.getElementById('modalTeacherName');
    const modalTeacherRole = document.getElementById('modalTeacherRole');
    const modalFacultyId = document.getElementById('modalFacultyId');
    const modalDepartment = document.getElementById('modalDepartment');

    function getActiveTeacher() {
        return teachers[activeTeacherId];
    }

    function createAvatarElement(teacher, size = 'small') {
        const avatar = document.createElement('div');

        const sizeClass = size === 'large'
            ? 'h-24 w-24 text-2xl'
            : size === 'medium'
                ? 'h-11 w-11 text-sm'
                : 'h-8 w-8 text-xs';

        avatar.className = `flex shrink-0 items-center justify-center rounded-full font-bold ${sizeClass} ${teacher.avatarClass}`;
        avatar.textContent = teacher.initials;

        return avatar;
    }

    function renderMessages() {
        const teacher = getActiveTeacher();

        messageContainer.innerHTML = '';

        const dateDivider = document.createElement('div');
        dateDivider.className = 'mb-8 flex items-center justify-center';

        const dateText = document.createElement('span');
        dateText.className = 'rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400';
        dateText.textContent = 'Today';

        dateDivider.appendChild(dateText);
        messageContainer.appendChild(dateDivider);

        teacher.messages.forEach(message => {
            const row = document.createElement('div');
            row.className = `mb-5 flex w-full ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`;

            const wrapper = document.createElement('div');
            wrapper.className = `flex max-w-[85%] items-end gap-2 sm:max-w-[70%] ${message.sender === 'admin' ? 'flex-row-reverse' : 'flex-row'}`;

            if (message.sender === 'teacher') {
                const avatar = createAvatarElement(teacher, 'small');
                wrapper.appendChild(avatar);
            }

            const content = document.createElement('div');
            content.className = `flex flex-col ${message.sender === 'admin' ? 'items-end' : 'items-start'}`;

            const bubble = document.createElement('div');
            bubble.className = message.sender === 'admin'
                ? 'rounded-2xl rounded-br-md bg-blue-600 px-4 py-3 text-sm leading-relaxed text-white shadow-sm'
                : 'rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-700';

            bubble.textContent = message.text;

            const time = document.createElement('span');
            time.className = 'mt-1 px-1 text-[10px] text-slate-400';
            time.textContent = message.time;

            content.appendChild(bubble);
            content.appendChild(time);
            wrapper.appendChild(content);
            row.appendChild(wrapper);
            messageContainer.appendChild(row);
        });

        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    function updateChatHeader() {
        const teacher = getActiveTeacher();

        teacherAvatar.className = `flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${teacher.avatarClass}`;
        teacherAvatar.textContent = teacher.initials;

        teacherOnlineDot.className = teacher.online
            ? 'absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500'
            : 'absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-slate-300';

        chatUserName.textContent = teacher.name;
        chatUserRole.textContent = teacher.role;
        chatUserStatus.textContent = teacher.status;
        chatUserStatus.className = teacher.online
            ? 'text-[10px] font-medium text-emerald-500'
            : 'text-[10px] font-medium text-slate-400';

        detailsTeacherAvatar.className = `mb-4 flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold ${teacher.avatarClass}`;
        detailsTeacherAvatar.textContent = teacher.initials;
        detailsTeacherName.textContent = teacher.name;
        detailsTeacherRole.textContent = teacher.role;

        modalTeacherAvatar.className = `mb-4 flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold ${teacher.avatarClass}`;
        modalTeacherAvatar.textContent = teacher.initials;
        modalTeacherName.textContent = teacher.name;
        modalTeacherRole.textContent = teacher.role;
        modalFacultyId.textContent = teacher.facultyId;
        modalDepartment.textContent = teacher.department;
    }

    function updateConversationStyles() {
        const conversationItems = document.querySelectorAll('.conversation-item');

        conversationItems.forEach(item => {
            const teacher = teachers[item.dataset.teacherId];
            const isActive = item.dataset.teacherId === activeTeacherId;

            item.className = isActive
                ? 'conversation-item group flex w-full items-center gap-3 rounded-xl bg-blue-600 px-3 py-3 text-left transition'
                : 'conversation-item group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-100';

            const name = item.querySelector('.conversation-name');
            const time = item.querySelector('.conversation-time');
            const preview = item.querySelector('.conversation-preview');
            const unread = item.querySelector('.conversation-unread');

            if (name) {
                name.className = isActive
                    ? 'conversation-name truncate text-sm font-bold text-white'
                    : 'conversation-name truncate text-sm font-bold text-slate-800';
            }

            if (time) {
                time.className = isActive
                    ? 'conversation-time shrink-0 text-[10px] text-blue-100'
                    : 'conversation-time shrink-0 text-[10px] text-slate-400';
            }

            if (preview) {
                preview.className = isActive
                    ? 'conversation-preview truncate text-xs text-blue-100'
                    : 'conversation-preview truncate text-xs text-slate-400';
            }

            if (unread && teacher) {
                unread.className = isActive
                    ? 'conversation-unread hidden h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-bold text-blue-600'
                    : 'conversation-unread hidden h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[10px] font-bold text-white';
            }
        });
    }

    function selectTeacher(teacherId, showMobileChat = true) {
        if (!teachers[teacherId]) {
            return;
        }

        activeTeacherId = teacherId;

        updateChatHeader();
        updateConversationStyles();
        renderMessages();

        if (showMobileChat && window.innerWidth < 1024) {
            conversationPanel.classList.add('hidden');
            chatPanel.classList.remove('hidden');
            chatPanel.classList.add('flex');
        }

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    function filterConversations() {
        const searchValue = chatSearch.value.toLowerCase().trim();
        const items = document.querySelectorAll('.conversation-item');

        let visibleCount = 0;

        items.forEach(item => {
            const teacher = teachers[item.dataset.teacherId];
            const matches = teacher.name.toLowerCase().includes(searchValue);

            item.classList.toggle('hidden', !matches);

            if (matches) {
                visibleCount += 1;
            }
        });

        conversationCount.textContent = visibleCount;
    }

    function openTeacherInfo() {
        teacherInfoModal.classList.remove('hidden');
        teacherInfoModal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    }

    function closeTeacherInfoModal() {
        teacherInfoModal.classList.add('hidden');
        teacherInfoModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }

    function getCurrentTime() {
        return new Date().toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit'
        });
    }

    function sendMessage() {
        const text = messageInput.value.trim();

        if (!text) {
            return;
        }

        const teacher = getActiveTeacher();

        teacher.messages.push({
            sender: 'admin',
            text,
            time: getCurrentTime()
        });

        messageInput.value = '';
        messageInput.style.height = 'auto';

        renderMessages();
        updateConversationStyles();
    }

    document.querySelectorAll('.conversation-item').forEach(item => {
        item.addEventListener('click', () => {
            selectTeacher(item.dataset.teacherId);
        });
    });

    chatSearch.addEventListener('input', filterConversations);

    messageForm.addEventListener('submit', event => {
        event.preventDefault();
        sendMessage();
    });

    messageInput.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = `${Math.min(messageInput.scrollHeight, 112)}px`;
    });

    mobileChatBackBtn.addEventListener('click', () => {
        chatPanel.classList.add('hidden');
        chatPanel.classList.remove('flex');
        conversationPanel.classList.remove('hidden');
        conversationPanel.classList.add('flex');
    });

    chatInfoBtn.addEventListener('click', openTeacherInfo);
    closeTeacherInfo.addEventListener('click', closeTeacherInfoModal);
    closeTeacherInfoBtn.addEventListener('click', closeTeacherInfoModal);

    teacherInfoModal.addEventListener('click', event => {
        if (event.target === teacherInfoModal) {
            closeTeacherInfoModal();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeTeacherInfoModal();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            conversationPanel.classList.remove('hidden');
            conversationPanel.classList.add('flex');
            chatPanel.classList.remove('hidden');
            chatPanel.classList.add('flex');
        }
    });

    updateChatHeader();
    updateConversationStyles();
    renderMessages();

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});