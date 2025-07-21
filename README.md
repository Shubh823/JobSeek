# JobSeek – AI-Powered Job Portal

A modern, full-stack job portal application that leverages AI to connect students and recruiters. Built with React.js, Node.js, MongoDB, and Google Gemini API, JobSeek offers smart job search, personalized recommendations, resume analysis, and a seamless experience for both job seekers and recruiters.

---

## 🚀 Demo

- **Live Website:** [https://jobseek-frontend-ylgv.onrender.com](https://jobseek-frontend-ylgv.onrender.com)

---

## ✨ Features

### For Students
- **AI-Powered Job Search:** Use natural language or filters to find jobs with smart, Gemini-powered search.
- **Personalized Recommendations:** Get job suggestions based on your uploaded resume and listed skills.
- **Resume Upload & AI Tips:** Upload your resume (PDF), get actionable AI-powered tips to improve it for ATS and recruiters.
- **Job Applications:** Apply to jobs, track your applications, and view your application history.
- **Profile Management:** Update your profile, skills, bio, and resume.
- **Saved Jobs:** Save interesting jobs for later review.

### For Recruiters/Admins
- **Company Management:** Create and manage company profiles.
- **Job Posting:** Post, update, and manage job listings.
- **Applicant Management:** View and manage applicants for each job.
- **Admin Dashboard:** Centralized dashboard for managing companies, jobs, and applications.

### Universal
- **Modern UI/UX:** Responsive, animated, and accessible design with reusable components.
- **State Persistence:** Redux Toolkit with Redux Persist for seamless user experience.
- **Cloud Storage:** Resume and profile photo uploads via Cloudinary and Supabase.

---

## 🧠 How the AI Works

### 1. Smart Search (Gemini API)
- Converts user queries into relevant keywords using Google Gemini.
- Matches jobs by title, description, requirements, and more.

### 2. Job Recommendations
- Extracts skills, roles, and technologies from your resume using Gemini.
- Matches your profile with job requirements for personalized results.
- Fallback: If no resume is uploaded, shows recent jobs.

### 3. Resume Tips
- Analyzes your uploaded resume and provides AI-generated, actionable tips to improve your chances with ATS and recruiters.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (UI framework)
- **Redux Toolkit** (state management)
- **Redux Persist** (state persistence)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Axios** (HTTP client)

### Backend
- **Node.js** (runtime)
- **Express.js** (web framework)
- **MongoDB** (database)
- **Mongoose** (ODM)
- **JWT** (authentication)
- **Multer** (file uploads)
- **Cloudinary & Supabase** (file storage)
- **Google Gemini API** (AI features)
- **PDF-Parse** (resume parsing)

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Cloudinary, Supabase, and Gemini API credentials (see .env.example)

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🗂️ Project Structure

```
JobSeek/
├── backend/
│   ├── controllers/      # Business logic (users, jobs, companies, applications)
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routes
│   ├── middlewares/      # Auth, file upload, etc.
│   └── utils/            # Helpers (AI, cloud, DB)
└── frontend/
    ├── src/
    │   ├── components/   # React components (auth, jobs, admin, shared, UI)
    │   ├── hooks/        # Custom React hooks
    │   ├── redux/        # Redux slices
    │   └── utils/        # Constants, helpers
    └── public/           # Static assets
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request



