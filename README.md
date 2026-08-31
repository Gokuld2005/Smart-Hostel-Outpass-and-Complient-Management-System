# Smart Hostel Outpass and Complaint Management System

Hostel students, faculty (class incharge), wardens, and security staff ஆகியோருக்கான **outpass request & approval** மற்றும் **hostel complaint management** system. MERN stack (MongoDB, Express, React, Node.js) la build பண்ணப்பட்டிருக்கு.

## 📌 Features

- **Role based login** — Student, Faculty (Class Incharge), Warden, Security, Admin
- **Outpass workflow** — Student outpass request pannuvanga → Class Incharge approval → Warden approval → QR code generate ஆகும்
- **QR based entry/exit** — Security staff QR code scan pannி student out-time/in-time register pannலாம்
- **Complaint management** — Students complaints (Hostel related, Food related, Maintenance related) raise pannலாம், Warden அதை resolve/reject பண்ணலாம்
- **Password reset** functionality
- **Student search & details** lookup

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Redux, React Router, React Bootstrap, MUI, Chart.js |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (jsonwebtoken), bcryptjs |
| QR Code | qrcode, qrcode.react, react-qr-scanner |

## 📁 Project Structure

```
Smart-Hostel-Outpass-and-Complient-Management-System/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Route logic (user, outpass, complaint, qr)
│   ├── middlewares/     # Auth + error handling
│   ├── models/          # Mongoose schemas (User, Outpass, Complaint, Register)
│   ├── routers/         # API routes
│   └── server.js        # Express app entry point
├── frontend/
│   ├── public/
│   └── src/
│       ├── actions/     # Redux actions
│       ├── reducers/    # Redux reducers
│       ├── components/  # Reusable UI components
│       └── screens/     # Login, Student, Faculty, Warden, Admin, Security screens
├── database_data/       # Sample MongoDB data exports (users, outpasses)
└── package.json         # Root scripts (concurrently runs backend + frontend)
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/Gokuld2005/Smart-Hostel-Outpass-and-Complient-Management-System.git
cd Smart-Hostel-Outpass-and-Complient-Management-System
```

### 2. Backend dependencies install pannunga
```bash
npm install
```

### 3. Frontend dependencies install pannunga
```bash
cd frontend
npm install
cd ..
```

### 4. Environment variables set pannunga
Root directory la `.env` file create pannunga:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 5. Run the app

**Backend + Frontend ஒரே நேரத்தில் run பண்ண (development):**
```bash
npm run dev
```

**Backend மட்டும்:**
```bash
npm start
```

**Frontend மட்டும்:**
```bash
npm run client
```

Backend default ah `http://localhost:5000` la run ஆகும், frontend `http://localhost:3000` la run ஆகும்.

### 6. Production build
```bash
npm run build
```

## 🔗 API Endpoints (Overview)

| Method | Route | Description |
|---|---|---|
| POST | `/api/users` | Register new user |
| POST | `/api/users/login` | User login |
| PUT | `/api/users/resetpassword` | Reset password |
| GET | `/api/users/details/:studentId` | Get student details |
| POST | `/api/outpass` | Create outpass request |
| GET | `/api/outpass` | Get pending outpasses (student) |
| GET | `/api/outpass/faculty` | Pending outpasses for faculty approval |
| GET | `/api/outpass/warden` | Pending outpasses for warden approval |
| PUT | `/api/outpass/:id/approve` | Approve outpass |
| PUT | `/api/outpass/:id/reject` | Reject outpass |
| GET | `/api/qr` | Scan QR code |
| PUT | `/api/qr/:id` | Register entry/exit time |
| GET | `/api/qr/entries` | Get all entries |
| POST | `/api/complaints` | Create complaint |
| GET | `/api/complaints/student` | Get student's complaints |
| GET | `/api/complaints/warden` | Get complaints for warden |
| PUT | `/api/complaints/resolve/:id` | Resolve complaint |
| PUT | `/api/complaints/reject/:id` | Reject complaint |

## 👥 User Roles

1. **Student** — Outpass request pannலாம், complaint raise pannலாம், own outpass status track pannலாம்
2. **Faculty (Class Incharge)** — Student outpass first-level approval
3. **Warden** — Final outpass approval + complaint resolution
4. **Security** — QR scan pannி student entry/exit track pannலாம்

## 🤝 Contributing

1. Repo fork pannunga
2. New branch create pannunga (`git checkout -b feature/your-feature`)
3. Changes commit pannunga
4. Branch ku push pannunga
5. Pull Request open pannunga

## 📄 License

ISC
