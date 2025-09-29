// Global Data Store with Enhanced Data
const appData = {
    currentUser: null,
    users: {
        'tutor@demo.com': { 
            password: 'demo123', 
            role: 'tutor', 
            name: 'Thomas Schmidt',
            avatar: 'TS'
        },
        'school@demo.com': { 
            password: 'demo123', 
            role: 'school', 
            name: 'Gymnasium Berlin',
            avatar: 'SA'
        },
        'admin@demo.com': { 
            password: 'demo123', 
            role: 'admin', 
            name: 'System Administrator',
            avatar: 'AD'
        }
    },
    students: [
        { 
            id: 1, 
            name: 'Emma Schmidt', 
            grade: '8', 
            subjects: 'Math & Science', 
            progress: 75, 
            lastSession: '2 days ago',
            parent: 'Anna Schmidt',
            email: 'emma.schmidt@student.edu'
        },
        { 
            id: 2, 
            name: 'Lukas Weber', 
            grade: '9', 
            subjects: 'Languages', 
            progress: 60, 
            lastSession: '1 week ago',
            parent: 'Michael Weber',
            email: 'lukas.weber@student.edu'
        },
        { 
            id: 3, 
            name: 'Sophie Müller', 
            grade: '7', 
            subjects: 'All Subjects', 
            progress: 90, 
            lastSession: '3 days ago',
            parent: 'Sarah Müller',
            email: 'sophie.mueller@student.edu'
        }
    ],
    sessions: [
        { 
            id: 1, 
            studentId: 1, 
            topic: 'Goals & Planning', 
            date: '2023-11-15', 
            duration: '45 min', 
            notes: 'Discussed algebraic concepts and set goals for next quarter.',
            aiSummary: 'Student showed strong understanding of basic algebra. Recommended focus on word problems.'
        },
        { 
            id: 2, 
            studentId: 2, 
            topic: 'Motivation', 
            date: '2023-11-14', 
            duration: '30 min', 
            notes: 'Focused on language comprehension and reading strategies.',
            aiSummary: 'Student needs additional practice with vocabulary. Suggested daily reading routine.'
        },
        { 
            id: 3, 
            studentId: 3, 
            topic: 'Progress Review', 
            date: '2023-11-12', 
            duration: '60 min', 
            notes: 'Comprehensive review of all subjects and exam preparation.',
            aiSummary: 'Excellent progress across all subjects. Well prepared for upcoming exams.'
        }
    ],
    schools: [
        { 
            id: 1, 
            name: 'Gymnasium Berlin', 
            students: 247, 
            tutors: 18, 
            subscription: 'Premium', 
            status: 'Active',
            joinDate: '2023-01-15',
            contact: 'admin@gymnasium-berlin.edu'
        },
        { 
            id: 2, 
            name: 'International School Hamburg', 
            students: 189, 
            tutors: 12, 
            subscription: 'Basic', 
            status: 'Active',
            joinDate: '2023-03-20',
            contact: 'info@international-hamburg.edu'
        },
        { 
            id: 3, 
            name: 'Munich STEM Academy', 
            students: 156, 
            tutors: 15, 
            subscription: 'Premium', 
            status: 'Active',
            joinDate: '2023-02-10',
            contact: 'contact@munich-stem.edu'
        }
    ],
    tutors: [
        { 
            id: 1, 
            name: 'Thomas Schmidt', 
            students: 8, 
            specialization: 'Math & Science', 
            status: 'Active',
            email: 'thomas.schmidt@tutor.edu',
            joinDate: '2023-01-20'
        },
        { 
            id: 2, 
            name: 'Anna Weber', 
            students: 6, 
            specialization: 'Languages', 
            status: 'Active',
            email: 'anna.weber@tutor.edu',
            joinDate: '2023-02-15'
        },
        { 
            id: 3, 
            name: 'Dr. Michael Brown', 
            students: 10, 
            specialization: 'Science', 
            status: 'Active',
            email: 'michael.brown@tutor.edu',
            joinDate: '2023-01-05'
        }
    ],
    broadcasts: [
        { 
            id: 1, 
            type: 'challenge', 
            title: 'Math Challenge Week', 
            date: '2023-11-10', 
            status: 'Active',
            participants: 45,
            description: 'Weekly math problem-solving challenge for all students.'
        },
        { 
            id: 2, 
            type: 'announcement', 
            title: 'System Maintenance', 
            date: '2023-11-05', 
            status: 'Completed',
            participants: 0,
            description: 'Scheduled system maintenance completed successfully.'
        },
        { 
            id: 3, 
            type: 'activity', 
            title: 'Science Fair Preparation', 
            date: '2023-11-08', 
            status: 'Active',
            participants: 23,
            description: 'Resources and guidelines for upcoming science fair.'
        }
    ],
    systemHealth: {
        uptime: '99.97%',
        responseTime: '142ms',
        activeUsers: 327,
        serverLoad: '24%',
        databaseStatus: 'Healthy',
        lastBackup: '2023-11-14 02:00'
    }
};

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.style.backgroundColor = type === 'success' ? 'var(--success)' : 
                                       type === 'error' ? 'var(--danger)' : 
                                       type === 'warning' ? 'var(--warning)' : 'var(--primary)';
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 4000);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function generateRandomId() {
    return Math.floor(Math.random() * 1000000) + 1;
}

// Authentication Functions
function login(email, password, role) {
    const user = appData.users[email];
    
    if (user && user.password === password && user.role === role) {
        appData.currentUser = { email, ...user };
        localStorage.setItem('currentUser', JSON.stringify(appData.currentUser));
        showNotification(`Welcome back, ${user.name}!`);
        
        // Redirect to appropriate dashboard
        setTimeout(() => {
            switch(role) {
                case 'tutor':
                    window.location.href = 'tutor-dashboard.html';
                    break;
                case 'school':
                    window.location.href = 'school-dashboard.html';
                    break;
                case 'admin':
                    window.location.href = 'admin-dashboard.html';
                    break;
            }
        }, 1000);
        
        return true;
    } else {
        showNotification('Invalid email, password, or role selection', 'error');
        return false;
    }
}

function logout() {
    appData.currentUser = null;
    localStorage.removeItem('currentUser');
    showNotification('You have been logged out successfully');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function checkAuth() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        appData.currentUser = JSON.parse(savedUser);
        
        // If we're on the main page and user is logged in, redirect to dashboard
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
            setTimeout(() => {
                redirectToDashboard(appData.currentUser.role);
            }, 500);
        }
    } else {
        // If we're on a dashboard page without authentication, redirect to login
        if (window.location.pathname.includes('dashboard')) {
            window.location.href = 'index.html';
        }
    }
}

function redirectToDashboard(role) {
    switch(role) {
        case 'tutor':
            window.location.href = 'tutor-dashboard.html';
            break;
        case 'school':
            window.location.href = 'school-dashboard.html';
            break;
        case 'admin':
            window.location.href = 'admin-dashboard.html';
            break;
    }
}

// Tutor Dashboard Functions
function initializeTutorDashboard() {
    if (!appData.currentUser || appData.currentUser.role !== 'tutor') {
        window.location.href = 'index.html';
        return;
    }

    // Update user info
    updateUserInfo();
    
    // Load dashboard data
    loadTutorStats();
    loadStudentList();
    loadSessionList();
    loadSchedule();
    loadReports();
    loadProgressCharts();
    
    // Set up event listeners
    setupTutorEventListeners();
}

function updateUserInfo() {
    const userNameElement = document.getElementById('userName');
    const userAvatarElement = document.querySelector('.user-avatar');
    
    if (userNameElement && appData.currentUser) {
        userNameElement.textContent = appData.currentUser.name;
    }
    
    if (userAvatarElement && appData.currentUser) {
        userAvatarElement.textContent = appData.currentUser.avatar || appData.currentUser.name.charAt(0);
    }
}

function loadTutorStats() {
    document.getElementById('totalStudents').textContent = appData.students.length;
    document.getElementById('sessionsThisWeek').textContent = appData.sessions.length;
    document.getElementById('avgProgress').textContent = Math.round(appData.students.reduce((sum, student) => sum + student.progress, 0) / appData.students.length) + '%';
    document.getElementById('pendingReports').textContent = appData.students.length;
}

function loadStudentList() {
    const studentList = document.getElementById('studentList');
    if (!studentList) return;

    studentList.innerHTML = appData.students.map(student => `
        <div class="list-item">
            <div class="list-item-info">
                <h4>${student.name}</h4>
                <p>Grade ${student.grade} | ${student.subjects}</p>
                <div class="progress-bar">
                    <div class="progress" style="width: ${student.progress}%"></div>
                </div>
                <small>Last session: ${student.lastSession}</small>
            </div>
            <div class="list-item-actions">
                <button class="btn btn-outline" onclick="viewStudent(${student.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-tutor" onclick="startSessionWithStudent(${student.id})">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function loadSessionList() {
    const sessionList = document.getElementById('sessionList');
    if (!sessionList) return;

    const recentSessions = appData.sessions.slice(0, 3); // Show only 3 most recent
    
    sessionList.innerHTML = recentSessions.map(session => {
        const student = appData.students.find(s => s.id === session.studentId);
        return `
            <div class="list-item">
                <div class="list-item-info">
                    <h4>${student ? student.name : 'Unknown Student'} - ${session.topic}</h4>
                    <p>${session.date} | ${session.duration}</p>
                    <p><small>${session.notes.substring(0, 60)}...</small></p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-outline" onclick="viewSessionDetails(${session.id})">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function loadSchedule() {
    const scheduleList = document.getElementById('scheduleList');
    if (!scheduleList) return;

    const todaySessions = appData.sessions.filter(session => session.date === new Date().toISOString().split('T')[0]);
    
    if (todaySessions.length === 0) {
        scheduleList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No sessions scheduled for today</p>';
    } else {
        scheduleList.innerHTML = todaySessions.map(session => {
            const student = appData.students.find(s => s.id === session.studentId);
            return `
                <div class="list-item">
                    <div class="list-item-info">
                        <h4>${student ? student.name : 'Unknown Student'}</h4>
                        <p>${session.topic} | ${session.duration}</p>
                        <p><small>${session.date}</small></p>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn btn-tutor" onclick="startSession(${session.id})">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

function loadReports() {
    const reportList = document.getElementById('reportList');
    if (!reportList) return;

    const recentReports = appData.students.slice(0, 2).map(student => ({
        student: student.name,
        type: 'Progress Report',
        date: new Date().toISOString().split('T')[0],
        status: 'Generated'
    }));

    reportList.innerHTML = recentReports.map(report => `
        <div class="list-item">
            <div class="list-item-info">
                <h4>${report.student} - ${report.type}</h4>
                <p>${report.date} | Status: ${report.status}</p>
            </div>
            <div class="list-item-actions">
                <button class="btn btn-outline">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function loadProgressCharts() {
    const progressCharts = document.getElementById('progressCharts');
    if (!progressCharts) return;

    progressCharts.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
            ${appData.students.map(student => `
                <div style="text-align: center;">
                    <h4>${student.name}</h4>
                    <div style="width: 120px; height: 120px; margin: 10px auto; border-radius: 50%; background: conic-gradient(var(--tutor) 0% ${student.progress}%, #eee ${student.progress}% 100%); position: relative;">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                            ${student.progress}%
                        </div>
                    </div>
                    <p>Grade ${student.grade}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function setupTutorEventListeners() {
    // Session management
    document.getElementById('startSessionBtn')?.addEventListener('click', openSessionModal);
    document.getElementById('quickSessionBtn')?.addEventListener('click', openSessionModal);
    document.getElementById('saveSession')?.addEventListener('click', saveSession);
    document.getElementById('cancelSession')?.addEventListener('click', () => closeModal('sessionModal'));

    // Student management
    document.getElementById('addStudentBtn')?.addEventListener('click', () => openModal('addStudentModal'));
    document.getElementById('saveStudent')?.addEventListener('click', addNewStudent);
    document.getElementById('cancelAddStudent')?.addEventListener('click', () => closeModal('addStudentModal'));

    // Calendar and reports
    document.getElementById('viewCalendarBtn')?.addEventListener('click', () => showNotification('Calendar view would open here'));
    document.getElementById('generateReportBtn')?.addEventListener('click', () => showNotification('Report generation started'));
    document.getElementById('generateReportBtn2')?.addEventListener('click', () => showNotification('Report generation started'));
    document.getElementById('syncCalendarBtn')?.addEventListener('click', () => showNotification('Calendar synchronization in progress...'));

    // AI Assistant
    document.getElementById('askAIBtn')?.addEventListener('click', handleAIQuery);

    // AI Session Features
    document.getElementById('startRecording')?.addEventListener('click', startAITranscription);
    document.getElementById('generateSummary')?.addEventListener('click', generateAISummary);
    document.getElementById('suggestActions')?.addEventListener('click', suggestAIActions);
}

// School Dashboard Functions
function initializeSchoolDashboard() {
    if (!appData.currentUser || appData.currentUser.role !== 'school') {
        window.location.href = 'index.html';
        return;
    }

    updateUserInfo();
    loadSchoolStats();
    loadTutorList();
    loadSchoolAnalytics();
    loadSchoolStatsTable();
    setupSchoolEventListeners();
}

function loadSchoolStats() {
    document.getElementById('totalStudents').textContent = appData.students.length;
    document.getElementById('activeTutors').textContent = appData.tutors.length;
    document.getElementById('completionRate').textContent = '89%';
    document.getElementById('avgRating').textContent = '4.7';

    document.getElementById('totalStudentsCount').textContent = appData.students.length;
    document.getElementById('activeStudentsCount').textContent = appData.students.length;
    document.getElementById('newThisMonth').textContent = Math.floor(appData.students.length * 0.1);
}

function loadTutorList() {
    const tutorList = document.getElementById('tutorList');
    if (!tutorList) return;

    tutorList.innerHTML = appData.tutors.map(tutor => `
        <div class="list-item">
            <div class="list-item-info">
                <h4>${tutor.name}</h4>
                <p>${tutor.specialization} | ${tutor.students} students</p>
                <p><small>Joined: ${formatDate(tutor.joinDate)}</small></p>
            </div>
            <div class="list-item-actions">
                <button class="btn btn-outline" onclick="viewTutor(${tutor.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-school" onclick="manageTutor(${tutor.id})">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function loadSchoolAnalytics() {
    const analyticsOverview = document.getElementById('analyticsOverview');
    if (!analyticsOverview) return;

    analyticsOverview.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 1.5rem; font-weight: bold; color: var(--school);">${Math.round(appData.students.reduce((sum, student) => sum + student.progress, 0) / appData.students.length)}%</div>
                <div style="font-size: 0.8rem; color: #666;">Avg. Progress</div>
            </div>
            <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 1.5rem; font-weight: bold; color: var(--school);">${appData.sessions.length}</div>
                <div style="font-size: 0.8rem; color: #666;">Total Sessions</div>
            </div>
        </div>
    `;
}

function loadSchoolStatsTable() {
    const table = document.getElementById('schoolStatsTable');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    tbody.innerHTML = `
        <tr>
            <td>Student Progress</td>
            <td>${Math.round(appData.students.reduce((sum, student) => sum + student.progress, 0) / appData.students.length)}%</td>
            <td>↑ 5%</td>
            <td>Above average</td>
            <td><button class="btn btn-outline">View Details</button></td>
        </tr>
        <tr>
            <td>Tutor Performance</td>
            <td>4.7/5.0</td>
            <td>→</td>
            <td>Consistent</td>
            <td><button class="btn btn-outline">View Details</button></td>
        </tr>
        <tr>
            <td>Session Completion</td>
            <td>94%</td>
            <td>↑ 2%</td>
            <td>Improved</td>
            <td><button class="btn btn-outline">View Details</button></td>
        </tr>
        <tr>
            <td>Parent Satisfaction</td>
            <td>4.8/5.0</td>
            <td>↑ 0.1</td>
            <td>Excellent</td>
            <td><button class="btn btn-outline">View Details</button></td>
        </tr>
    `;
}

function setupSchoolEventListeners() {
    // Import/Export
    document.getElementById('importStudentsBtn')?.addEventListener('click', () => openModal('importModal'));
    document.getElementById('importDataBtn')?.addEventListener('click', () => openModal('importModal'));
    document.getElementById('processImport')?.addEventListener('click', processDataImport);
    document.getElementById('cancelImport')?.addEventListener('click', () => closeModal('importModal'));
    document.getElementById('exportDataBtn')?.addEventListener('click', () => showNotification('Data export started. You will receive an email when ready.'));
    document.getElementById('bulkActionsBtn')?.addEventListener('click', () => showNotification('Bulk actions panel would open here'));

    // Tutor Management
    document.getElementById('addTutorBtn')?.addEventListener('click', () => openModal('addTutorModal'));
    document.getElementById('saveTutor')?.addEventListener('click', addNewTutor);
    document.getElementById('cancelAddTutor')?.addEventListener('click', () => closeModal('addTutorModal'));
    document.getElementById('manageTutorsBtn')?.addEventListener('click', () => showNotification('Tutor management panel would open here'));

    // Analytics and Reports
    document.getElementById('viewAnalyticsBtn')?.addEventListener('click', () => showNotification('Opening detailed analytics dashboard...'));
    document.getElementById('generateSchoolReportBtn')?.addEventListener('click', () => showNotification('School report generation in progress...'));

    // Privacy and Settings
    document.getElementById('privacySettingsBtn')?.addEventListener('click', () => showNotification('Privacy settings panel would open here'));
}

// Admin Dashboard Functions
function initializeAdminDashboard() {
    if (!appData.currentUser || appData.currentUser.role !== 'admin') {
        window.location.href = 'index.html';
        return;
    }

    updateUserInfo();
    loadAdminStats();
    loadSchoolList();
    loadSubscriptionOverview();
    loadSystemAnalytics();
    loadSystemStatsTable();
    loadSystemHealth();
    loadRecentBroadcasts();
    setupAdminEventListeners();
}

function loadAdminStats() {
    document.getElementById('totalSchools').textContent = appData.schools.length;
    document.getElementById('totalUsers').textContent = Object.keys(appData.users).length + appData.students.length;
    document.getElementById('systemUptime').textContent = appData.systemHealth.uptime;
    document.getElementById('revenue').textContent = '€' + (appData.schools.length * 299).toLocaleString();
}

function loadSchoolList() {
    const schoolList = document.getElementById('schoolList');
    if (!schoolList) return;

    schoolList.innerHTML = appData.schools.map(school => `
        <div class="list-item">
            <div class="list-item-info">
                <h4>${school.name}</h4>
                <p>${school.students} students, ${school.tutors} tutors</p>
                <p><small>Subscription: ${school.subscription} | Joined: ${formatDate(school.joinDate)}</small></p>
            </div>
            <div class="list-item-actions">
                <button class="btn btn-outline" onclick="viewSchool(${school.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-admin" onclick="manageSchool(${school.id})">
                    <i class="fas fa-cog"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function loadSubscriptionOverview() {
    const overview = document.getElementById('subscriptionOverview');
    if (!overview) return;

    const premiumCount = appData.schools.filter(s => s.subscription === 'Premium').length;
    const basicCount = appData.schools.filter(s => s.subscription === 'Basic').length;
    
    overview.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px;">
            <div style="font-size: 2rem; font-weight: bold; color: var(--admin);">${appData.schools.length}</div>
            <div style="font-size: 0.9rem; color: #666;">Total Schools</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="text-align: center; padding: 10px; background: #e8f5e8; border-radius: 6px;">
                <div style="font-weight: bold; color: var(--success);">${premiumCount}</div>
                <div style="font-size: 0.8rem;">Premium</div>
            </div>
            <div style="text-align: center; padding: 10px; background: #fff3cd; border-radius: 6px;">
                <div style="font-weight: bold; color: var(--warning);">${basicCount}</div>
                <div style="font-size: 0.8rem;">Basic</div>
            </div>
        </div>
    `;
}

function loadSystemAnalytics() {
    const analytics = document.getElementById('systemAnalytics');
    if (!analytics) return;

    analytics.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 1.2rem; font-weight: bold; color: var(--admin);">${appData.systemHealth.activeUsers}</div>
                <div style="font-size: 0.8rem; color: #666;">Active Users</div>
            </div>
            <div style="text-align: center; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 1.2rem; font-weight: bold; color: var(--admin);">${appData.sessions.length}</div>
                <div style="font-size: 0.8rem; color: #666;">Sessions Today</div>
            </div>
        </div>
    `;
}

function loadSystemStatsTable() {
    const table = document.getElementById('systemStatsTable');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    tbody.innerHTML = `
        <tr>
            <td>Active Schools</td>
            <td>${appData.schools.length}</td>
            <td><span style="color: var(--success);">●</span> Operational</td>
            <td>↑ 8% this quarter</td>
            <td><button class="btn btn-outline">Manage</button></td>
        </tr>
        <tr>
            <td>System Uptime</td>
            <td>${appData.systemHealth.uptime}</td>
            <td><span style="color: var(--success);">●</span> Excellent</td>
            <td>Consistent</td>
            <td><button class="btn btn-outline">Monitor</button></td>
        </tr>
        <tr>
            <td>Server Load</td>
            <td>${appData.systemHealth.serverLoad}</td>
            <td><span style="color: var(--success);">●</span> Healthy</td>
            <td>↓ 5% from last week</td>
            <td><button class="btn btn-outline">Optimize</button></td>
        </tr>
        <tr>
            <td>Database Status</td>
            <td>${appData.systemHealth.databaseStatus}</td>
            <td><span style="color: var(--success);">●</span> Optimal</td>
            <td>Stable</td>
            <td><button class="btn btn-outline">Backup</button></td>
        </tr>
    `;
}

function loadSystemHealth() {
    const systemHealth = document.getElementById('systemHealth');
    if (!systemHealth) return;

    systemHealth.innerHTML = `
        <div class="health-indicator">
            <div class="health-value">${appData.systemHealth.uptime}</div>
            <div class="health-label">Uptime</div>
        </div>
        <div class="health-indicator">
            <div class="health-value">${appData.systemHealth.responseTime}</div>
            <div class="health-label">Response Time</div>
        </div>
        <div class="health-indicator">
            <div class="health-value">${appData.systemHealth.serverLoad}</div>
            <div class="health-label">Server Load</div>
        </div>
        <div class="health-indicator">
            <div class="health-value">${appData.systemHealth.activeUsers}</div>
            <div class="health-label">Active Users</div>
        </div>
    `;
}

function loadRecentBroadcasts() {
    const broadcasts = document.getElementById('recentBroadcasts');
    if (!broadcasts) return;

    broadcasts.innerHTML = appData.broadcasts.slice(0, 2).map(broadcast => `
        <div class="list-item">
            <div class="list-item-info">
                <h4>${broadcast.title}</h4>
                <p>${broadcast.type} | ${formatDate(broadcast.date)}</p>
                <p><small>${broadcast.description}</small></p>
            </div>
            <div class="list-item-actions">
                <span class="badge" style="background: ${broadcast.status === 'Active' ? 'var(--success)' : 'var(--warning)'}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">
                    ${broadcast.status}
                </span>
            </div>
        </div>
    `).join('');
}

function setupAdminEventListeners() {
    // Broadcast System
    document.getElementById('createChallengeBtn')?.addEventListener('click', () => openBroadcastModal('challenge'));
    document.getElementById('createBroadcastBtn')?.addEventListener('click', () => openBroadcastModal('announcement'));
    document.getElementById('sendAnnouncementBtn')?.addEventListener('click', () => openBroadcastModal('announcement'));
    document.getElementById('sendBroadcast')?.addEventListener('click', sendBroadcast);
    document.getElementById('cancelBroadcast')?.addEventListener('click', () => closeModal('broadcastModal'));
    document.getElementById('viewBroadcastsBtn')?.addEventListener('click', () => showNotification('Opening broadcast management panel...'));

    // System Management
    document.getElementById('systemSettingsBtn')?.addEventListener('click', () => openModal('systemSettingsModal'));
    document.getElementById('saveSystemSettings')?.addEventListener('click', saveSystemSettings);
    document.getElementById('cancelSettings')?.addEventListener('click', () => closeModal('systemSettingsModal'));
    document.getElementById('backupSystemBtn')?.addEventListener('click', backupSystem);

    // School Management
    document.getElementById('manageSchoolsBtn')?.addEventListener('click', () => showNotification('Opening school management panel...'));
    document.getElementById('subscriptionConsoleBtn')?.addEventListener('click', () => showNotification('Opening subscription console...'));
    document.getElementById('detailedAnalyticsBtn')?.addEventListener('click', () => showNotification('Opening detailed analytics dashboard...'));
}

// Session Management Functions
function openSessionModal() {
    const modal = document.getElementById('sessionModal');
    if (!modal) return;

    const studentSelect = document.getElementById('sessionStudent');
    if (studentSelect) {
        studentSelect.innerHTML = appData.students.map(student => 
            `<option value="${student.id}">${student.name} (Grade ${student.grade})</option>`
        ).join('');
    }

    // Clear previous inputs
    document.getElementById('sessionNotes').value = '';
    document.getElementById('aiOutput').innerHTML = '';
    
    openModal('sessionModal');
}

function startSessionWithStudent(studentId) {
    openSessionModal();
    document.getElementById('sessionStudent').value = studentId;
}

function saveSession() {
    const studentId = document.getElementById('sessionStudent')?.value;
    const topic = document.getElementById('sessionTopic')?.value;
    const duration = document.getElementById('sessionDuration')?.value;
    const notes = document.getElementById('sessionNotes')?.value;

    if (studentId && topic && duration && notes) {
        const newSession = {
            id: generateRandomId(),
            studentId: parseInt(studentId),
            topic: document.getElementById('sessionTopic').options[document.getElementById('sessionTopic').selectedIndex].text,
            date: new Date().toISOString().split('T')[0],
            duration: duration + ' min',
            notes: notes,
            aiSummary: 'AI summary will be generated after session analysis.'
        };

        appData.sessions.unshift(newSession); // Add to beginning of array
        
        // Update student's last session
        const student = appData.students.find(s => s.id === parseInt(studentId));
        if (student) {
            student.lastSession = 'Just now';
        }

        showNotification('Session saved successfully!');
        closeModal('sessionModal');
        
        // Refresh the dashboard
        if (window.location.pathname.includes('tutor-dashboard')) {
            initializeTutorDashboard();
        }
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

// Student Management Functions
function addNewStudent() {
    const name = document.getElementById('studentName')?.value;
    const grade = document.getElementById('studentGrade')?.value;
    const subjects = document.getElementById('studentSubjects')?.value;
    const email = document.getElementById('studentEmail')?.value;
    const parent = document.getElementById('studentParent')?.value;

    if (name && grade && subjects) {
        const newStudent = {
            id: generateRandomId(),
            name: name,
            grade: grade,
            subjects: subjects,
            progress: 0,
            lastSession: 'Never',
            parent: parent || 'Not specified',
            email: email || ''
        };

        appData.students.push(newStudent);
        showNotification(`Student ${name} added successfully!`);
        closeModal('addStudentModal');
        
        // Clear form
        document.getElementById('studentName').value = '';
        document.getElementById('studentGrade').value = '';
        document.getElementById('studentSubjects').value = '';
        document.getElementById('studentEmail').value = '';
        document.getElementById('studentParent').value = '';
        
        // Refresh student list
        if (window.location.pathname.includes('tutor-dashboard')) {
            initializeTutorDashboard();
        }
    } else {
        showNotification('Please fill in all required fields', 'error');
    }
}

// Tutor Management Functions (School)
function addNewTutor() {
    const name = document.getElementById('tutorName')?.value;
    const email = document.getElementById('tutorEmail')?.value;
    const specialization = document.getElementById('tutorSpecialization')?.value;
    const experience = document.getElementById('tutorExperience')?.value;

    if (name && email && specialization) {
        const newTutor = {
            id: generateRandomId(),
            name: name,
            email: email,
            specialization: document.getElementById('tutorSpecialization').options[document.getElementById('tutorSpecialization').selectedIndex].text,
            students: 0,
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0],
            experience: experience
        };

        appData.tutors.push(newTutor);
        showNotification(`Tutor ${name} added successfully!`);
        closeModal('addTutorModal');
        
        // Clear form
        document.getElementById('tutorName').value = '';
        document.getElementById('tutorEmail').value = '';
        
        // Refresh tutor list
        if (window.location.pathname.includes('school-dashboard')) {
            initializeSchoolDashboard();
        }
    } else {
        showNotification('Please fill in all required fields', 'error');
    }
}

// Broadcast Management Functions
function openBroadcastModal(type) {
    const modal = document.getElementById('broadcastModal');
    if (!modal) return;

    const titleElement = document.getElementById('broadcastModalTitle');
    const typeSelect = document.getElementById('broadcastType');

    if (titleElement && typeSelect) {
        const typeTitles = {
            'challenge': 'Create Learning Challenge',
            'announcement': 'Send System Announcement',
            'activity': 'Create New Activity',
            'maintenance': 'Schedule Maintenance Notice'
        };
        
        titleElement.textContent = typeTitles[type] || 'Create New Broadcast';
        typeSelect.value = type;
    }

    // Clear form
    document.getElementById('broadcastTitle').value = '';
    document.getElementById('broadcastMessage').value = '';
    
    openModal('broadcastModal');
}

function sendBroadcast() {
    const type = document.getElementById('broadcastType')?.value;
    const title = document.getElementById('broadcastTitle')?.value;
    const message = document.getElementById('broadcastMessage')?.value;
    const target = document.getElementById('broadcastTarget')?.value;
    const schedule = document.getElementById('broadcastSchedule')?.value;

    if (title && message) {
        const newBroadcast = {
            id: generateRandomId(),
            type: type,
            title: title,
            date: new Date().toISOString().split('T')[0],
            status: schedule === 'immediate' ? 'Active' : 'Scheduled',
            participants: Math.floor(Math.random() * 100),
            description: message.substring(0, 100) + '...'
        };

        appData.broadcasts.unshift(newBroadcast);
        
        const broadcastType = type === 'challenge' ? 'Challenge' : 
                             type === 'announcement' ? 'Announcement' : 
                             type === 'activity' ? 'Activity' : 'Broadcast';
        
        showNotification(`${broadcastType} "${title}" ${schedule === 'immediate' ? 'sent' : 'scheduled'} successfully!`);
        closeModal('broadcastModal');
        
        // Refresh broadcasts list
        if (window.location.pathname.includes('admin-dashboard')) {
            initializeAdminDashboard();
        }
    } else {
        showNotification('Please fill in all required fields', 'error');
    }
}

// AI Functions
function startAITranscription() {
    const aiOutput = document.getElementById('aiOutput');
    if (!aiOutput) return;

    aiOutput.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Recording... Speak now for AI transcription.</p>';
    
    setTimeout(() => {
        const transcript = "In today's session, we discussed progress on current goals and identified areas for further development. The student showed good engagement and understanding of the concepts covered. We reviewed the homework assignments and planned the next steps for continued improvement.";
        
        aiOutput.innerHTML = `
            <p><strong>AI Transcription:</strong></p>
            <p>"${transcript}"</p>
            <p><em>Confidence: 92% | Duration: 45 minutes</em></p>
        `;
        
        // Auto-fill session notes with transcription
        document.getElementById('sessionNotes').value = transcript;
    }, 3000);
}

function generateAISummary() {
    const aiOutput = document.getElementById('aiOutput');
    if (!aiOutput) return;

    aiOutput.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Generating AI summary...</p>';
    
    setTimeout(() => {
        aiOutput.innerHTML = `
            <p><strong>AI Session Summary:</strong></p>
            <ul>
                <li>Student demonstrated strong understanding of core concepts</li>
                <li>Good progress on assigned homework (85% completion rate)</li>
                <li>Areas for improvement: application in complex scenarios</li>
                <li>Recommended focus: practical problem-solving exercises</li>
                <li>Next session: review progress and introduce advanced topics</li>
            </ul>
            <p><em>Summary generated based on session content and historical data</em></p>
        `;
    }, 2500);
}

function suggestAIActions() {
    const aiOutput = document.getElementById('aiOutput');
    if (!aiOutput) return;

    aiOutput.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Analyzing session for action suggestions...</p>';
    
    setTimeout(() => {
        aiOutput.innerHTML = `
            <p><strong>AI Recommended Actions:</strong></p>
            <div style="background: #e8f5e8; padding: 15px; border-radius: 6px; margin: 10px 0;">
                <h4 style="margin: 0 0 10px 0; color: var(--success);">✓ Immediate Actions</h4>
                <ul style="margin: 0;">
                    <li>Send progress update to parent</li>
                    <li>Schedule follow-up session in 1 week</li>
                    <li>Assign practice exercises on identified weak areas</li>
                </ul>
            </div>
            <div style="background: #fff3cd; padding: 15px; border-radius: 6px;">
                <h4 style="margin: 0 0 10px 0; color: var(--warning);">⏱️ Follow-up Actions</h4>
                <ul style="margin: 0;">
                    <li>Review progress in next session</li>
                    <li>Consider advanced materials if progress continues</li>
                    <li>Update learning plan based on results</li>
                </ul>
            </div>
        `;
    }, 2000);
}

function handleAIQuery() {
    const query = document.getElementById('aiQuery')?.value;
    const response = document.getElementById('aiResponse');
    
    if (!query || !response) return;
    
    if (query.trim() === '') {
        showNotification('Please enter a question for the AI assistant', 'warning');
        return;
    }
    
    response.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> AI assistant is thinking...</p>';
    
    setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        let aiResponse = '';
        
        if (lowerQuery.includes('progress') || lowerQuery.includes('how are my students')) {
            aiResponse = `
                <p><strong>Student Progress Overview:</strong></p>
                <p>Based on recent sessions and assessments, your students are showing excellent progress:</p>
                <ul>
                    <li><strong>Emma Schmidt:</strong> 75% progress in Math & Science, showing strong improvement in algebra</li>
                    <li><strong>Lukas Weber:</strong> 60% progress in Languages, needs focus on vocabulary building</li>
                    <li><strong>Sophie Müller:</strong> 90% progress across all subjects, excelling in all areas</li>
                </ul>
                <p><em>Recommendation: Consider challenging Sophie with advanced materials while providing additional support for Lukas.</em></p>
            `;
        } else if (lowerQuery.includes('session') || lowerQuery.includes('plan') || lowerQuery.includes('next')) {
            aiResponse = `
                <p><strong>Session Planning Suggestions:</strong></p>
                <p>Based on your students' current progress, I recommend:</p>
                <div style="background: #e3f2fd; padding: 15px; border-radius: 6px; margin: 10px 0;">
                    <h4 style="margin: 0 0 10px 0;">For Emma Schmidt:</h4>
                    <p>Focus on word problems and practical applications of algebraic concepts. Suggested duration: 45 minutes.</p>
                </div>
                <div style="background: #f3e5f5; padding: 15px; border-radius: 6px;">
                    <h4 style="margin: 0 0 10px 0;">For Lukas Weber:</h4>
                    <p>Vocabulary building exercises and reading comprehension practice. Suggested duration: 60 minutes.</p>
                </div>
            `;
        } else if (lowerQuery.includes('report') || lowerQuery.includes('parent')) {
            aiResponse = `
                <p><strong>Parent Reporting Assistance:</strong></p>
                <p>I can help you generate comprehensive parent reports. Based on recent data:</p>
                <ul>
                    <li>All students have shown positive progress this month</li>
                    <li>Parent satisfaction ratings are at 4.8/5.0</li>
                    <li>Automated reports are ready for distribution</li>
                </ul>
                <p>Would you like me to generate individual progress reports for all students?</p>
                <button class="btn btn-tutor" style="margin-top: 10px;">Generate Reports</button>
            `;
        } else {
            aiResponse = `
                <p><strong>AI Assistant Response:</strong></p>
                <p>I understand you're asking about "${query}". As your AI teaching assistant, I can help with:</p>
                <ul>
                    <li>Student progress analysis and recommendations</li>
                    <li>Session planning and content suggestions</li>
                    <li>Parent communication and report generation</li>
                    <li>Learning strategy optimization</li>
                </ul>
                <p>Could you provide more specific details about what you'd like assistance with?</p>
            `;
        }
        
        response.innerHTML = aiResponse;
    }, 2000);
}

// Data Import Function
function processDataImport() {
    const fileInput = document.getElementById('importFile');
    const privacyCheck = document.getElementById('privacyCheck');
    
    if (!fileInput.files.length) {
        showNotification('Please select a file to import', 'error');
        return;
    }
    
    if (!privacyCheck.checked) {
        showNotification('Please confirm GDPR compliance to proceed', 'error');
        return;
    }
    
    showNotification('Data import started. Processing file...');
    
    // Simulate file processing
    setTimeout(() => {
        const newStudents = [
            {
                id: generateRandomId(),
                name: 'New Imported Student',
                grade: '8',
                subjects: 'General Studies',
                progress: 50,
                lastSession: 'Never',
                parent: 'Imported Parent',
                email: 'imported@student.edu'
            }
        ];
        
        appData.students.push(...newStudents);
        showNotification(`Successfully imported ${newStudents.length} student records!`);
        closeModal('importModal');
        
        // Refresh dashboard if on school dashboard
        if (window.location.pathname.includes('school-dashboard')) {
            initializeSchoolDashboard();
        }
    }, 3000);
}

// System Management Functions
function saveSystemSettings() {
    const maintenance = document.getElementById('systemMaintenance')?.value;
    const retention = document.getElementById('dataRetention')?.value;
    const backup = document.getElementById('backupFrequency')?.value;
    const maxUsers = document.getElementById('maxUsers')?.value;
    
    showNotification('System settings saved successfully!');
    closeModal('systemSettingsModal');
}

function backupSystem() {
    showNotification('System backup initiated. You will be notified when complete.');
    
    setTimeout(() => {
        showNotification('System backup completed successfully! Backup file: system_backup_' + new Date().toISOString().split('T')[0] + '.zip');
    }, 4000);
}

// View Functions (for demonstration)
function viewStudent(studentId) {
    const student = appData.students.find(s => s.id === studentId);
    if (student) {
        showNotification(`Viewing student profile: ${student.name}`);
        // In a real app, this would open a detailed student view
    }
}

function viewSessionDetails(sessionId) {
    const session = appData.sessions.find(s => s.id === sessionId);
    if (session) {
        showNotification(`Viewing session details for session #${sessionId}`);
        // In a real app, this would open a detailed session view
    }
}

function viewTutor(tutorId) {
    const tutor = appData.tutors.find(t => t.id === tutorId);
    if (tutor) {
        showNotification(`Viewing tutor profile: ${tutor.name}`);
    }
}

function manageTutor(tutorId) {
    const tutor = appData.tutors.find(t => t.id === tutorId);
    if (tutor) {
        showNotification(`Managing tutor: ${tutor.name}`);
    }
}

function viewSchool(schoolId) {
    const school = appData.schools.find(s => s.id === schoolId);
    if (school) {
        showNotification(`Viewing school details: ${school.name}`);
    }
}

function manageSchool(schoolId) {
    const school = appData.schools.find(s => s.id === schoolId);
    if (school) {
        showNotification(`Managing school: ${school.name}`);
    }
}

function startSession(sessionId) {
    const session = appData.sessions.find(s => s.id === sessionId);
    if (session) {
        showNotification(`Starting session: ${session.topic}`);
        // In a real app, this would launch the session interface
    }
}

// Global Event Listeners Setup
function setupGlobalEventListeners() {
    // Login functionality
    const loginBtn = document.getElementById('loginBtn');
    const submitLogin = document.getElementById('submitLogin');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            document.getElementById('loginModalTitle').textContent = 'Login to Pädagogik+';
            openModal('loginModal');
        });
    }
    
    if (submitLogin) {
        submitLogin.addEventListener('click', () => {
            const email = document.getElementById('loginEmail')?.value;
            const password = document.getElementById('loginPassword')?.value;
            const role = document.getElementById('loginRole')?.value;
            
            if (email && password && role) {
                login(email, password, role);
            } else {
                showNotification('Please fill in all fields', 'error');
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Close modal buttons
    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Demo button
    const demoBtn = document.getElementById('demoBtn');
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            showNotification('Free trial started! Welcome to Pädagogik+.');
        });
    }
    
    // Signup button
    const signupBtn = document.getElementById('signupBtn');
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            showNotification('Sign up functionality would open here');
        });
    }
    
    // Portal login buttons
    const portalLoginButtons = document.querySelectorAll('.portal-login');
    portalLoginButtons.forEach(button => {
        button.addEventListener('click', function() {
            const portal = this.getAttribute('data-portal');
            document.getElementById('loginModalTitle').textContent = `Login as ${portal.charAt(0).toUpperCase() + portal.slice(1)}`;
            document.getElementById('loginRole').value = portal;
            openModal('loginModal');
        });
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status
    checkAuth();
    
    // Setup global event listeners
    setupGlobalEventListeners();
    
    // Initialize specific dashboard based on current page
    if (window.location.pathname.includes('tutor-dashboard')) {
        initializeTutorDashboard();
    } else if (window.location.pathname.includes('school-dashboard')) {
        initializeSchoolDashboard();
    } else if (window.location.pathname.includes('admin-dashboard')) {
        initializeAdminDashboard();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Make functions globally available for onclick handlers
window.viewStudent = viewStudent;
window.startSessionWithStudent = startSessionWithStudent;
window.viewSessionDetails = viewSessionDetails;
window.viewTutor = viewTutor;
window.manageTutor = manageTutor;
window.viewSchool = viewSchool;
window.manageSchool = manageSchool;
window.startSession = startSession;