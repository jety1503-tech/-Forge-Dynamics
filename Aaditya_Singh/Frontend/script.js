// AI Employability Platform - JavaScript

// Global State
let currentUser = null;
let isDarkMode = false;
let userSkills = [];

// Mock Data
const users = {
    'user1': { password: 'pass123', name: 'John Doe', employabilityScore: 72 },
    'user2': { password: 'pass456', name: 'Jane Smith', employabilityScore: 85 }
};

const skillsDatabase = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'MongoDB',
    'HTML/CSS', 'Git', 'Docker', 'AWS', 'Machine Learning', 'Data Analysis'
];

const coursesData = [
    { id: 1, title: 'Advanced JavaScript', duration: '4 weeks', level: 'Advanced', relevance: 95 },
    { id: 2, title: 'React Mastery', duration: '6 weeks', level: 'Advanced', relevance: 90 },
    { id: 3, title: 'Python for Data Science', duration: '8 weeks', level: 'Intermediate', relevance: 85 },
    { id: 4, title: 'Cloud Deployment with AWS', duration: '5 weeks', level: 'Advanced', relevance: 88 },
    { id: 5, title: 'Web Development Bootcamp', duration: '12 weeks', level: 'Beginner', relevance: 80 }
];

const jobsData = [
    { id: 1, title: 'Full Stack Developer', company: 'Tech Corp', salary: '$100k-120k', match: 88 },
    { id: 2, title: 'React Developer', company: 'StartUp Inc', salary: '$90k-110k', match: 92 },
    { id: 3, title: 'Backend Engineer', company: 'CloudSync', salary: '$110k-130k', match: 78 },
    { id: 4, title: 'Data Analyst', company: 'DataDriven Co', salary: '$85k-105k', match: 72 },
    { id: 5, title: 'DevOps Engineer', company: 'InfraScale', salary: '$120k-140k', match: 75 }
];

// ==================== NAVIGATION ====================
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.container > div');
    pages.forEach(page => page.classList.add('hidden'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
    }
    
    // Load page-specific content
    if (pageName === 'dashboard' && currentUser) {
        loadDashboard();
    } else if (pageName === 'profile' && currentUser) {
        loadProfile();
    } else if (pageName === 'analysis' && currentUser) {
        loadSkillAnalysis();
    } else if (pageName === 'courses') {
        loadCourses();
    } else if (pageName === 'jobs') {
        loadJobs();
    }
}

// ==================== THEME TOGGLE ====================
function toggleTheme() {
    isDarkMode = !isDarkMode;
    const button = document.getElementById('theme-toggle');
    
    if (isDarkMode) {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#fff';
        document.querySelectorAll('.card').forEach(card => {
            card.style.backgroundColor = '#222';
            card.style.color = '#fff';
        });
        document.querySelectorAll('nav button').forEach(btn => {
            btn.style.backgroundColor = '#cc0000';
            btn.style.color = '#fff';
        });
        document.querySelectorAll('.card input, .card textarea').forEach(input => {
            input.style.backgroundColor = '#333';
            input.style.color = '#fff';
            input.style.borderColor = '#cc0000';
        });
        button.textContent = 'Switch to Light Mode';
    } else {
        document.body.style.backgroundColor = '#f4f6f9';
        document.body.style.color = '#000';
        document.querySelectorAll('.card').forEach(card => {
            card.style.backgroundColor = '#fff';
            card.style.color = '#000';
        });
        document.querySelectorAll('nav button').forEach(btn => {
            btn.style.backgroundColor = '#d4a574';
            btn.style.color = '#fff';
        });
        document.querySelectorAll('.card input, .card textarea').forEach(input => {
            input.style.backgroundColor = '#fff';
            input.style.color = '#000';
            input.style.border = '1px solid #ddd';
        });
        button.textContent = 'Switch to Dark Mode';
    }
}

// ==================== LOGIN ====================
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const statusEl = document.getElementById('loginStatus');
    
    if (users[username] && users[username].password === password) {
        currentUser = { username, ...users[username] };
        userSkills = ['JavaScript', 'React', 'Node.js'];
        statusEl.textContent = `Welcome, ${currentUser.name}!`;
        statusEl.style.color = 'green';
        setTimeout(() => showPage('dashboard'), 1000);
    } else {
        statusEl.textContent = 'Invalid credentials. Try user1/pass123';
        statusEl.style.color = 'red';
    }
}

// ==================== DASHBOARD ====================
function loadDashboard() {
    if (!currentUser) return;
    
    let dashboardHTML = `
        <div class="card">
            <h2>Welcome back, ${currentUser.name}!</h2>
            <p><strong>Employability Score:</strong> <span class="score">${currentUser.employabilityScore}/100</span></p>
            <div class="progress-bar" style="width: ${currentUser.employabilityScore}%; height: 20px; background: #cc0000; border-radius: 5px;"></div>
        </div>
        <div class="card">
            <h3>Your Current Skills</h3>
            <div id="current-skills" style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${userSkills.map(skill => `<span style="background: #cc0000; color: white; padding: 5px 10px; border-radius: 5px; cursor: pointer;" onclick="removeSkill('${skill}')">${skill} ✕</span>`).join('')}
            </div>
        </div>
        <div class="card">
            <h3>Statistics</h3>
            <p>Skills Matched: ${userSkills.length}</p>
            <p>Recommended Courses: ${Math.floor(12 - userSkills.length * 1.5)}</p>
            <p>Job Opportunities: ${jobsData.filter(job => job.match > 75).length}</p>
        </div>
    `;
    
    const dashboardDiv = document.getElementById('dashboard');
    if (!dashboardDiv.innerHTML.includes('id="current-skills"')) {
        dashboardDiv.innerHTML = dashboardHTML;
    }
}

// ==================== PROFILE & DRAG-DROP ====================
function loadProfile() {
    if (!currentUser) return;
    
    let profileHTML = `
        <div class="card">
            <h2>My Profile</h2>
            <p><strong>Name:</strong> ${currentUser.name}</p>
            <p><strong>Username:</strong> ${currentUser.username}</p>
            <p><strong>Employability Score:</strong> ${currentUser.employabilityScore}</p>
        </div>
        <div class="card">
            <h3>Manage Your Skills</h3>
            <p>Drag skills from the list below to add them to your profile</p>
            <div id="available-skills" style="border: 2px dashed #ccc; padding: 15px; min-height: 200px; border-radius: 5px; margin-bottom: 15px;">
                <h4>Available Skills</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px;">
                    ${skillsDatabase.map(skill => `
                        <div draggable="true" ondragstart="dragSkill(event, '${skill}')" 
                             style="background: #ddd; padding: 10px; border-radius: 5px; cursor: move; text-align: center;">
                            ${skill}
                        </div>
                    `).join('')}
                </div>
            </div>
            <div id="selected-skills" ondrop="dropSkill(event)" ondragover="allowDrop(event)" 
                 style="border: 2px solid #cc0000; padding: 15px; min-height: 150px; border-radius: 5px; background: #f9f9f9;">
                <h4>Your Skills</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px;">
                    ${userSkills.map(skill => `
                        <div style="background: #cc0000; color: white; padding: 10px; border-radius: 5px; text-align: center; cursor: pointer;" 
                             onclick="removeSkill('${skill}')">
                            ${skill} ✕
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = profileHTML;
}

function dragSkill(event, skill) {
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData('skill', skill);
}

function allowDrop(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
}

function dropSkill(event) {
    event.preventDefault();
    const skill = event.dataTransfer.getData('skill');
    if (!userSkills.includes(skill)) {
        userSkills.push(skill);
        loadProfile();
    }
}

function removeSkill(skill) {
    userSkills = userSkills.filter(s => s !== skill);
    loadProfile();
}

// ==================== SKILL ANALYSIS ====================
function loadSkillAnalysis() {
    if (!currentUser) return;
    
    const gaps = skillsDatabase.filter(skill => !userSkills.includes(skill)).slice(0, 5);
    const recommendations = coursesData
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, 3);
    
    let analysisHTML = `
        <div class="card">
            <h2>Skill Gap Analysis</h2>
            <p>Based on your current skills, here are the top gaps to fill:</p>
            <ul>
                ${gaps.map(skill => `<li>${skill} <span style="color: #cc0000; font-weight: bold;">High Priority</span></li>`).join('')}
            </ul>
        </div>
        <div class="card">
            <h2>Recommended Learning Path</h2>
            ${recommendations.map(course => `
                <div style="background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #cc0000;">
                    <h4>${course.title}</h4>
                    <p><strong>Duration:</strong> ${course.duration} | <strong>Level:</strong> ${course.level}</p>
                    <p><strong>Relevance Score:</strong> ${course.relevance}%</p>
                </div>
            `).join('')}
        </div>
    `;
    
    const analysisDiv = document.getElementById('analysis');
    analysisDiv.innerHTML = analysisHTML;
}

// ==================== COURSES ====================
function loadCourses() {
    let coursesHTML = `
        <div class="card">
            <h2>Recommended Courses</h2>
            ${coursesData.map(course => `
                <div style="background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #d4a574;">
                    <h4>${course.title}</h4>
                    <p><strong>Duration:</strong> ${course.duration}</p>
                    <p><strong>Level:</strong> ${course.level}</p>
                    <p><strong>Relevance:</strong> ${course.relevance}%</p>
                    <button class="primary" style="background: #cc0000; cursor: pointer; padding: 8px 15px; border: none; border-radius: 5px; color: white;">Enroll</button>
                </div>
            `).join('')}
        </div>
    `;
    
    const coursesDiv = document.getElementById('courses');
    coursesDiv.innerHTML = coursesHTML;
}

// ==================== JOBS ====================
function loadJobs() {
    let jobsHTML = `
        <div class="card">
            <h2>Job Opportunities</h2>
            ${jobsData.map(job => `
                <div style="background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #cc0000;">
                    <h4>${job.title}</h4>
                    <p><strong>Company:</strong> ${job.company}</p>
                    <p><strong>Salary:</strong> ${job.salary}</p>
                    <p><strong>Your Match Score:</strong> <span style="color: #cc0000; font-weight: bold;">${job.match}%</span></p>
                    <button class="primary" style="background: #cc0000; cursor: pointer; padding: 8px 15px; border: none; border-radius: 5px; color: white;">Apply Now</button>
                </div>
            `).join('')}
        </div>
    `;
    
    const jobsDiv = document.getElementById('jobs');
    jobsDiv.innerHTML = jobsHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
}); 
