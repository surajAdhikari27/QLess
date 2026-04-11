# QLess — Smart Queue Management System
QLess is a modern digital queue management system that eliminates physical waiting lines by allowing users to take virtual tokens and monitor queue progress in real time.

## Live Demo
https://q-less-sigma.vercel.app

## Features

### User Side
* Generate virtual tokens instantly
* View estimated waiting time
* Real-time queue dashboard
* Track current serving token

### Admin Panel
* Call next token
* Reset queue
* Clear activity logs
* View queue statistics
* Activity log tracking

### Authentication
* Google OAuth login (Appwrite)
* Role-based access (Admin/User)

## Tech Stack

### Frontend
* React (Vite)
* CSS Modules
* React Router
* Redux Toolkit

### Backend (BaaS)
* Appwrite (Authentication, Database)

### Deployment
* Vercel

## Project Structure
```
src/
│
├── AppwriteServices/   # Appwrite API services
├── Components/         # Reusable UI components
├── Pages/              # Application pages
├── store/              # Redux state management
├── assets/             # Images & static files
└── config/             # App configuration
```

## Environment Variables
Create a `.env` file in the root:
```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_TOKENS_COLLECTION_ID=your_tokens_collection_id
VITE_APPWRITE_QUEUE_META_COLLECTION_ID=your_queue_meta_collection_id
VITE_APPWRITE_USERS_COLLECTION_ID=your_users_collection_id
```

## Getting Started (Local Setup)

### 1. Clone the repo
```bash
git clone https://github.com/surajAdhikari27/QLess.git
cd QLess
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the app
```bash
npm run dev
```

App will run on:
http://localhost:5173

## Appwrite Setup
### 1. Create Project in Appwrite

### 2. Create Collections:
* Tokens
* Queue Meta
* Users

### 3. Enable Google OAuth:
* Go to **Auth → Settings**
* Enable Google provider

### 4. Add Platform:
```
q-less-sigma.vercel.app
```

### 5. Configure OAuth Redirect (Important)
Make sure your app uses dynamic redirect URLs:
const successURL = window.location.origin + "/admin";
const failureURL = window.location.origin + "/login";

### Home Page
* Clean landing UI

### Dashboard
* Real-time queue tracking

### Admin Panel
* Manage queue efficiently

## Future Improvements
* Real-time updates (Appwrite Realtime)
* Mobile optimization
* Analytics dashboard
* Notifications system
* Export logs


## License
This project is licensed under the MIT License.

## Author
**Suraj Adhikari**
* GitHub: https://github.com/surajAdhikari27



