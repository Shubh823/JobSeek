# JobHunt - Job Portal Application

A full-stack job portal application built with React.js, Node.js, and MongoDB. The application allows students to search for jobs, apply to positions, and get personalized job recommendations based on their skills.
watch live https://jobseek-frontend-ylgv.onrender.com
## Features

### For Students
- **Job Search**: Browse and search for available job positions
- **Personalized Recommendations**: Get job recommendations based on your skills and experience
- **Job Applications**: Apply to jobs and track your applications
- **Profile Management**: Update your profile, skills, and resume

### For Recruiters/Admins
- **Company Management**: Create and manage company profiles
- **Job Posting**: Post new job opportunities
- **Applicant Management**: View and manage job applications
- **Dashboard**: Admin dashboard for managing all aspects

## New Feature: Job Recommendations

### Overview
The application now includes an intelligent job recommendation system that suggests relevant jobs to students based on their skills and experience.

### How It Works
1. **Skill Matching**: The system analyzes the skills listed in your profile
2. **Job Matching**: Matches your skills with job requirements, titles, and descriptions
3. **Personalized Results**: Returns jobs that best match your skill set
4. **Fallback System**: If no direct matches are found, shows recent job postings




## Tech Stack

### Frontend
- **React.js**: UI framework
- **Redux Toolkit**: State management
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Lucide React**: Icons
- **Axios**: HTTP client

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM
- **JWT**: Authentication
- **Multer**: File uploads

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

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



## Project Structure

```
JobHunt/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── utils/
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── redux/
    │   └── utils/
    └── public/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

