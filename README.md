# Taskora — Context-Aware Task Intelligence (MERN)

Taskora is a gentle productivity companion designed to reduce decision fatigue and promote sustainable productivity through an emotionally intelligent, soft-aesthetic interface.

## ✨ Features

- **Context-Aware Recommendations**: Intelligent task scoring based on your current energy and available time.
- **Decision Support**: No more choice paralysis—get the best task suggestions immediately.
- **Task Reflection (Autopsy)**: Gently reflect on completed tasks to understand your productivity patterns.
- **Procrastination Detection**: Softly flags tasks that are repeatedly postponed and suggests manageable next steps.
- **Gentle Analytics**: Insights into your energy harmony and focus patterns without the stress of traditional metrics.
- **Soft Aesthetics**: A calming UI inspired by Pinterest and modern digital planners.

## 🛠 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Icons**: Lucide React

## 🚀 Setup Instructions

### Backend (MERN)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Seed the database:
   ```bash
   node seed.js
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:8000`.
   *Note: Ensure you have MongoDB running locally at `mongodb://localhost:27017/taskora`.*

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 🌐 Deployment Instructions

### 1. GitHub
I have already initialized a local git repository and made the first commit. To push to GitHub:
1. Create a new repository on GitHub called `taskora`.
2. Run these commands in the project root:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/taskora.git
   git branch -M main
   git push -u origin main
   ```

### 2. Backend (Render / Heroku)
- Connect your GitHub repository to **Render**.
- Set the Root Directory to `backend`.
- Environment Variables:
  - `MONGODB_URI`: Your MongoDB Atlas connection string.
  - `PORT`: 8000

### 3. Frontend (Vercel / Netlify)
- Connect your GitHub repository to **Vercel**.
- Set the Root Directory to `frontend`.
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables:
  - `VITE_API_URL`: Your deployed backend URL.
