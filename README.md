🎬 Video Playlist Manager
Overview
The Video Playlist Manager is a full-stack MERN web application developed for IFQ636 Software Lifecycle Management at Queensland University of Technology.
The application enables users to create and manage video playlists while providing administrators with moderation capabilities. The project demonstrates the complete software development lifecycle, including planning, design, implementation, testing, version control, CI/CD, and cloud deployment.
________________________________________
Features
User Features
•	User registration and authentication
•	Secure JWT login
•	Create playlists
•	View personal playlists
•	Update playlist information
•	Delete playlists
•	Add videos to playlists
•	Remove videos from playlists
•	Search playlists
•	Sort playlists
•	Filter playlists by category
•	Create playlists from templates
•	View notifications
Administrator Features
•	Administrator login
•	View all user playlists
•	Remove inappropriate playlists
•	Moderate system content
________________________________________
Design Patterns
The application demonstrates the implementation of multiple object-oriented design patterns.
•	Factory Pattern
•	Facade Pattern
•	Strategy Pattern
•	Prototype Pattern
•	Observer Pattern
•	Proxy Pattern
•	Chain of Responsibility Pattern
________________________________________
Object-Oriented Principles
The application demonstrates the four fundamental object-oriented programming principles.
•	Encapsulation
•	Abstraction
•	Inheritance
•	Polymorphism
________________________________________
Technology Stack
Frontend
•	React
•	React Router
•	Axios
Backend
•	Node.js
•	Express.js
•	MongoDB Atlas
•	Mongoose
•	JSON Web Tokens (JWT)
•	bcrypt
Testing
•	Mocha
•	Chai
•	Postman
DevOps
•	Git
•	GitHub
•	GitHub Actions
•	AWS EC2
•	PM2
•	Nginx
________________________________________
Project Structure
video-playlist-manager-a2
│
├── backend
│   ├── chains
│   ├── controllers
│   ├── factories
│   ├── middleware
│   ├── models
│   ├── observers
│   ├── prototypes
│   ├── proxies
│   ├── routes
│   ├── services
│   ├── strategies
│   ├── test
│   └── server.js
│
├── frontend
│   ├── components
│   ├── context
│   ├── pages
│   └── App.js
│
├── docs
│   └── postman
│
├── .github
│   └── workflows
│
└── README.md
________________________________________
Local Installation
Clone Repository
git clone https://github.com/lwolter9/video-playlist-manager-a2.git
cd video-playlist-manager-a2
Install Dependencies
npm install
npm install --prefix backend
npm install --prefix frontend
Backend Environment
Create:
backend/.env
Example:
PORT=5001
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_SECRET_KEY
Run Backend
npm run dev --prefix backend
Run Frontend
npm start --prefix frontend
________________________________________
Testing
Backend Unit Tests
npm test --prefix backend
The project includes automated unit tests covering:
•	Authentication middleware
•	Playlist service
•	Factory pattern
•	Strategy pattern
•	Prototype pattern
API Testing
A Postman collection is included in:
docs/postman/
________________________________________
Continuous Integration
GitHub Actions automatically performs:
•	Dependency installation
•	Backend unit testing
•	Frontend production build verification
Workflow location:
.github/workflows/ci.yml
________________________________________
Deployment
The application is deployed on AWS EC2 using:
•	Ubuntu Server
•	PM2
•	Nginx
•	MongoDB Atlas
Deployment URL:
Dependent on EC2 instance 
________________________________________
Administrator Access
Administrator accounts can access:
/admin
Example:
http://13.236.92.241/admin
________________________________________
Git Workflow
Development followed a feature branch workflow.
Feature branches included:
•	feature/role-access-control
•	feature/search-sort-filter
•	feature/templates-notifications
•	feature/proxy-chain-patterns
•	feature/testing-postman-ci
Development also included:
•	Pull Requests
•	Code Reviews
•	Merge Conflict Resolution
•	GitHub Actions CI Validation
________________________________________
Unit Information
IFQ636 Software Lifecycle Management
Graduate Diploma in Information Technology (Computer Science)
Queensland University of Technology
________________________________________
Authors
Leroy Wolter
Sweta Shah
Brian Spooner
Group Assignment 2 Team
