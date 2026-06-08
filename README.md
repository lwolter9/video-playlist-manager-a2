# 🎬 Video Playlist Manager

A full-stack MERN web application developed for **IFQ636 Software Lifecycle Management**.

The application allows users to create and manage video playlists while providing administrators with moderation capabilities. The system demonstrates software lifecycle management practices including planning, version control, CI/CD integration, cloud deployment and full-stack development.

---

## ✨ Features

### User Features

- User registration
- Secure login authentication
- Create playlists
- View playlists
- Delete playlists
- Add videos to playlists
- Remove videos from playlists
- Persistent login sessions

### Administrator Features

- View all user playlists
- Monitor system content
- Remove inappropriate or unwanted playlists

---

## 🛠 Technology Stack

### Frontend

- React
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt

### DevOps / Deployment

- GitHub
- GitHub Actions CI/CD
- AWS EC2
- PM2 Process Manager

---

## 📂 Project Structure

```text
video-playlist-manager/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── App.js
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
└── README.md
```

---

## ⚙ Local Setup

### 1. Clone repository

```bash
git clone https://github.com/lwolter9/video-playlist-manager.git
```

Move into project folder:

```bash
cd video-playlist-manager
```

---

### 2. Install dependencies

Root:

```bash
npm install
```

Backend:

```bash
npm install --prefix backend
```

Frontend:

```bash
npm install --prefix frontend
```

---

### 3. Configure backend environment

Create:

```text
backend/.env
```

Example:

```env
MONGO_URI=your_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

---

### 4. Run application

Backend:

```bash
npm run dev --prefix backend
```

Frontend:

```bash
npm start --prefix frontend
```

Application:

```text
Frontend:
http://localhost:3000

Backend:
http://localhost:5001
```

---

## ☁ Deployment

Hosted using:

- AWS EC2
- PM2
- GitHub Actions CI/CD

Public deployment:

```text
YOUR_PUBLIC_IP_HERE
```

---

## 🔐 Assessment Access

Example credentials:

Email:

```text
test98@gmail.com
```

Password:

```text
test123
```

---

### Administrator Access

The application includes an administrator moderation panel.

To access the administrator dashboard:

1. Log in using an administrator account.
2. Navigate directly to:

```
/admin
```

For example:

```
http://localhost:3000/admin
```

or when deployed:

```
http://<deployment-address>/admin
```

The administrator dashboard allows authorised users to view and moderate user-created playlists.

---

## 🔄 Git Workflow

Development followed a feature branch workflow:

```text
feature/project-setup
feature/playlist-crud

↓

Pull Request

↓

Merge into main
```

Version control activities included:

- Feature branching
- Pull requests
- Merge conflict resolution
- CI/CD validation
- Incremental commits

---

## 🚀 CI/CD Pipeline

GitHub Actions automatically performs:

- Dependency installation
- Backend validation
- Frontend build verification

Pipeline configuration:

```text
.github/workflows/ci.yml
```

---

## 📚 Academic Context

Unit:

**IFQ636 – Software Lifecycle Management**

Queensland University of Technology

---

## 👨‍💻 Author

Leroy Wolter

QUT Graduate Diploma in Information Technology (Computer Science)
