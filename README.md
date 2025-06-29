# JobHunt - Job Portal Application

A full-stack job portal application built with React.js, Node.js, and MongoDB. The application allows students to search for jobs, apply to positions, and get personalized job recommendations based on their skills.

## Features

### For Students
- **Job Search**: Browse and search for available job positions
- **Personalized Recommendations**: Get job recommendations based on your skills and experience
- **Job Applications**: Apply to jobs and track your applications
- **Profile Management**: Update your profile, skills, and resume
- **Real-time Updates**: Get notified about new job opportunities

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

### How to Use
1. **Add Skills**: Update your profile with relevant skills (e.g., "React", "Node.js", "Python")
2. **Access Recommendations**: Click on "Recommended" in the navigation or use the CTA button on the home page
3. **View Results**: Browse through personalized job recommendations
4. **Apply**: Click on job cards to view details and apply

### Features of the Recommendation System
- **Smart Matching**: Uses regex-based matching for flexible skill recognition
- **Visual Indicators**: Recommended jobs are marked with a special badge
- **Loading States**: Smooth loading animations while fetching recommendations
- **Error Handling**: Graceful fallbacks when no matches are found
- **Tips Section**: Helpful tips for improving recommendations

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

## API Endpoints

### Job Recommendations
- `GET /api/v1/job/recommended` - Get personalized job recommendations

### Authentication
- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout

### Jobs
- `GET /api/v1/job/get` - Get all jobs
- `POST /api/v1/job/post` - Post a new job
- `GET /api/v1/job/get/:id` - Get job by ID

### Applications
- `POST /api/v1/application/apply` - Apply to a job
- `GET /api/v1/application/get` - Get user applications

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

## License

This project is licensed under the MIT License.
