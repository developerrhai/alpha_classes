# Alpha Classes - Project Information

## 🚀 Live Links
- **Website Link:** https://alpha-classes-seven.vercel.app
- **Inquiry Form:** https://alpha-classes-seven.vercel.app/inquiry-form
- **Admission Form:** https://alpha-classes-seven.vercel.app/admission-form
- **Student Login Portal:** https://alpha-classes-seven.vercel.app/student-login

---

## 🔐 Test Login Credentials

**Admin Login** (Access via "Login" button on homepage)
- **Email:** `admin@alphaclasses.com`
- **Password:** `admin123`

**Teacher Login** (Access via "Login" button on homepage)
- **Email:** `anil@alphaclasses.com`
- **Password:** `teacher123`

**Student Login** (Access via dedicated portal)
- **Email:** `rahul@example.com`
- **Password:** `student123`

---

## 💻 Server Details
- **Hosting:** AWS EC2
- **Instance IP:** `13.204.199.132`
- **SSH Key:** `node-key.pem`
- **Backend API URL:** `https://institute-api.rhaitech.online/alphaclasses/api`
- **Database:** MariaDB (Database name: `alphaclasses`)
- **PM2 Process Name:** `alphaclasses-backend` (Running on Port 5005)
- **Deployment Script:** Code is pushed from GitHub and deployed on EC2 via `/home/ec2-user/deploy_cors.sh` (or `deploy_resume.sh`) flow.

---

## ⌚ Smart Office Integration
- **Base URL:** `http://65.2.70.49`
- **API Key:** `371114072602`
- **Functionality:** Real-time background watcher polls every 30 seconds to fetch biometric punches (`/api/v2/WebAPI/GetDeviceLogs`) and triggers Firebase push notifications to students based on their batch schedules (Late/Present/Exit).
- **Service Location:** `src/services/smartOfficeWatcher.js` running inside the PM2 process.
