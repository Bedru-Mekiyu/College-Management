# College Management System (CMS)

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://www.mongodb.com/mern-stack)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-v18-61dafb.svg)](https://reactjs.org)
[![Express](https://img.shields.io/badge/Express-v4-000000.svg)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A full-stack MERN (MongoDB, Express, React, Node.js) web application designed to streamline academic administrative operations for educational institutions. The platform delivers secure role-based portals for **Administrators**, **Faculty Members**, and **Students** to manage profiles, study materials, timetables, notices, branches, subjects, and examination marks.

---

## Table of Contents

- [Features](#features)
  - [Administrator Role](#administrator-role)
  - [Faculty Role](#faculty-role)
  - [Student Role](#student-role)
- [Tech Stack](#tech-stack)
- [Architecture & Design](#architecture--design)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Seeding](#database-seeding)
  - [Running Locally](#running-locally)
- [API Overview](#api-overview)
- [CI/CD & Quality Assurance](#cicd--quality-assurance)
- [License](#license)

---

## Features

### Administrator Role
- **Faculty & Student Management**: Add, update, view, and delete faculty profiles and student records.
- **Academic Hierarchy Management**: Create and organize branches and subject courses categorized by semester.
- **Notice Board Management**: Publish institution-wide announcements and notices with target audience filters.
- **Timetable Uploads**: Upload and manage department/branch timetables for various academic terms.
- **Account Settings**: Update administrator credentials and security preferences.

### Faculty Role
- **Material Sharing**: Upload course materials, notes, assignments, and syllabus documents.
- **Timetable Access**: View and publish updated class schedules and timetables.
- **Student Lookup**: Search student records by enrollment number, name, or semester.
- **Marks Management**: Input and edit student examination marks per subject.
- **Announcements**: Review institutional notices.

### Student Role
- **Academic Profile**: Access enrollment details, enrolled branch, semester, and personal contact info.
- **Course Materials**: Browse and download study materials uploaded by faculty members.
- **Schedules**: View and download class timetables.
- **Internal Marks**: Check semester examination and assessment marks.
- **Announcements**: Stay informed with institutional notices.

---

## Tech Stack

| Domain | Technology |
|---|---|
| **Frontend** | React (v18), Redux, React Router (v6), Tailwind CSS, React Hot Toast, Axios |
| **Backend** | Node.js, Express.js, Mongoose ODM |
| **Database** | MongoDB |
| **Authentication & Security** | JWT (JSON Web Tokens), Bcrypt.js, Helmet, Express Rate Limit, Cors |
| **File Handling** | Multer |
| **Email Services** | Nodemailer |

---

## Architecture & Design

The application uses a decoupled client-server architecture:
1. **Frontend**: React single-page application (SPA) state-managed with Redux and styled using Tailwind CSS. API calls are encapsulated via custom Axios instances.
2. **Backend**: RESTful API powered by Express.js with structured controllers, routes, Mongoose schema models, middleware verification (JWT token validation), and centralized response formatting.

---

## Repository Structure

```
.
├── backend/
│   ├── controllers/            # Route controllers for all resource entities
│   │   └── details/            # User-specific (Admin, Faculty, Student) controllers
│   ├── Database/               # MongoDB connection logic
│   ├── middlewares/            # Auth, validation, and file upload middlewares
│   ├── models/                 # Mongoose schemas (Notice, Timetable, Subject, Branch, Marks, etc.)
│   ├── routes/                 # Express REST endpoint routes
│   ├── utils/                  # Helper utilities (ApiResponse, SendMail)
│   ├── admin-seeder.js         # Script to seed initial admin account
│   ├── app.js                  # Express app initialization
│   ├── index.js                # Server entry point
│   └── package.json            # Backend dependencies and scripts
│
├── frontend/
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Loading, DeleteConfirm, etc.)
│   │   ├── redux/              # Redux store, actions, and reducers
│   │   ├── Screens/            # Views for Admin, Faculty, Student, and Auth screens
│   │   ├── utils/              # Axios wrapper and frontend utilities
│   │   ├── App.jsx             # Main React root component
│   │   └── index.js            # React entry point
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   └── package.json            # Frontend dependencies and scripts
│
└── .github/
    └── workflows/              # GitHub Actions CI/CD workflows
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **MongoDB**: Local instance running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd College-Management-System
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install --legacy-peer-deps
   ```

### Environment Variables

#### Backend Configuration (`backend/.env`)
Create a `.env` file in the `backend/` directory (refer to `backend/.env.sample`):
```env
MONGODB_URI=mongodb://127.0.0.1:27017/College-Management-System
PORT=4000
FRONTEND_API_LINK=http://localhost:3000
JWT_SECRET=your_jwt_secret_key_here

NODEMAILER_EMAIL=your_email@example.com
NODEMAILER_PASS=your_email_password
```

#### Frontend Configuration (`frontend/.env`)
Create a `.env` file in the `frontend/` directory (refer to `frontend/.env.sample`):
```env
REACT_APP_APILINK=http://localhost:4000/api
REACT_APP_MEDIA_LINK=http://localhost:4000/media
```

### Database Seeding

To create an initial administrator account, run the seeder script from the `backend/` directory:
```bash
cd backend
npm run seed
```

Default Admin Credentials created by seeder:
- **Employee ID**: `123456`
- **Password**: `admin123`
- **Email**: `admin@gmail.com`

### Running Locally

1. **Start the Backend Server**:
   ```bash
   cd backend
   npm run dev     # Starts with nodemon on http://localhost:4000
   ```

2. **Start the Frontend Application**:
   ```bash
   cd frontend
   npm start       # Starts React app on http://localhost:3000
   ```

---

## API Overview

The backend exposes the following primary REST endpoint groups under `/api`:

| Resource | Base Endpoint | Description |
|---|---|---|
| **Admin Details** | `/api/admin-details` | Admin authentication and profile management |
| **Faculty Details** | `/api/faculty-details` | Faculty authentication, profile management, and student search |
| **Student Details** | `/api/student-details` | Student authentication and profile management |
| **Branch** | `/api/branch` | Branch creation and lookup |
| **Subject** | `/api/subject` | Subject and course management by branch/semester |
| **Notice** | `/api/notice` | Announcement posting and fetching |
| **Timetable** | `/api/timetable` | Timetable upload and retrieval |
| **Material** | `/api/material` | Study material uploads and file sharing |
| **Marks** | `/api/marks` | Exam marks entry and view |
| **Exam** | `/api/exam` | Examination schedule management |

---

## CI/CD & Quality Assurance

This repository includes continuous integration workflows using GitHub Actions (`.github/workflows/ci.yml`):
- **Backend Validation**: Verifies dependencies and performs JavaScript syntax checks (`node --check index.js`).
- **Frontend Build & Test**: Runs automated tests and executes production build verification (`npm run build`).

To run frontend builds locally:
```bash
cd frontend
npm run build
```

To run frontend tests locally:
```bash
cd frontend
npm test -- --watchAll=false --passWithNoTests
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
