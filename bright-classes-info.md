# Alpha Classes Project & Server Deployment Info

This document contains all the deployment details, server configuration, database schema, and commands needed to manage the **Alpha Classes** application.

---

## 🖥️ Server & Deployment Details

* **Server Instance**: AWS EC2 instance (HealthCoreX)
* **Instance ID**: `i-091965c3bf9b746d0`
* **Public IP Address**: `13.204.199.132`
* **Public DNS**: `ec2-13-204-199-132.ap-south-1.compute.amazonaws.com`
* **SSH Login**:
  ```bash
  ssh -i node-key.pem ec2-user@13.204.199.132
  ```
  *(The private SSH key `node-key.pem` is located locally in your `C:\Users\admin\Desktop\freelance_backend` directory).*

---

## ⚙️ Backend Application Configuration (Alpha Classes)

Alpha Classes is deployed as an isolated backend instance on the shared EC2 server.

* **Server Code Path**: `/app/alphaclasses-backend/`
* **Running Port**: `5004`
* **Database Name**: `alphaclasses`
* **API URL**: `https://institute-api.rhaitech.online/alphaclasses/api` (routed via NGINX)
* **Frontend URL**: `https://github.com/developerrhai/Bright-Classes-.git` (Deployed via Vercel)
* **Process Manager (PM2)**:
  * **App Name**: `alphaclasses-backend`
  * **Start Command**: `pm2 start server.js --name "alphaclasses-backend"`
  * **Restart Command**: `pm2 restart alphaclasses-backend`
  * **Logs**: `pm2 logs alphaclasses-backend`

---

## 🛢️ Database Configuration (MariaDB)

* **Port**: `3306` (MySQL/MariaDB)
* **Database Name**: `alphaclasses`
* **User**: `appuser` (or `root`)
* **Password**: `AppUserPassword123!` (or empty for root)
* **Connection String (.env)**:
  ```env
  DB_HOST=localhost
  DB_USER=appuser
  DB_PASSWORD=AppUserPassword123!
  DB_NAME=alphaclasses
  PORT=5004
  JWT_SECRET=supersecretkeyrhai12345
  FRONTEND_URL=your_vercel_url_here
  ```

### 📋 Database Tables
The `alphaclasses` database contains the standard institutional tables:
* `users`
* `teachers`
* `standards`
* `subjects`
* `batches`
* `boards`
* `inquiries`
* `inquiry_student`
* `attendance`
* `marks`
* `notes`
* `appointments`
* `chapters`
* `topics`
* `homework`
* `homework_status`
* `teaching_logs`
* `teacher_batches`

---

## 🛠️ Operations & Maintenance Guide

### 1. How to restart the backend:
```bash
# Log in to the server and run:
pm2 restart alphaclasses-backend
```

### 2. How to check live server logs:
```bash
pm2 logs alphaclasses-backend
```

### 3. How to backup the database:
```bash
# Log in to the server and run:
mysqldump -u root alphaclasses > /home/ec2-user/alphaclasses_backup_$(date +%F).sql
```

### 4. How to restore the database:
```bash
sudo mariadb alphaclasses < /home/ec2-user/alphaclasses_backup.sql
```

---

## 📋 Alpha Classes White-Label Summary

### Rebranding Details:
* **Brand Name**: Alpha Classes
* **Logo**: Added `BC` text logo in place of Merit Home.
* **Invoice Template**: Added specific full addresses and contact number for Alpha Classes.
* **Branches**:
  * Main Branch
  * Main Branch
* **Layout Title**: Updated browser tab to "Alpha Classes - Institute Management System"
