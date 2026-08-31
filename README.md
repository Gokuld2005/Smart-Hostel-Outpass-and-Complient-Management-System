# Smart Hostel Outpass and Complaint Management System

A **hostel outpass request & approval** and **complaint management** system built for students, faculty (class incharge), wardens, and security staff. Built using the MERN stack (MongoDB, Express, React, Node.js).

## 📌 Features

- **Role based login** — Student, Faculty (Class Incharge), Warden, Security, Admin
- **Outpass workflow** — Student submits an outpass request → Class Incharge approval → Warden approval → QR code is generated
- **QR based entry/exit** — Security staff can scan the QR code to register a student's out-time/in-time
- **Complaint management** — Students can raise complaints (Hostel related, Food related, Maintenance related), and the Warden can resolve or reject them
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

### 2. Install backend dependencies
```bash
npm install
```

### 3. Install frontend dependencies
```bash
cd frontend
npm install
cd ..
```

### 4. Set environment variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 5. Run the app

**Run backend + frontend together (development):**
```bash
npm run dev
```

**Run backend only:**
```bash
npm start
```

**Run frontend only:**
```bash
npm run client
```

By default, the backend runs on `http://localhost:5000` and the frontend runs on `http://localhost:3000`.

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

1. **Student** — Can request outpasses, raise complaints, and track their own outpass status
2. **Faculty (Class Incharge)** — First-level approval for student outpasses
3. **Warden** — Final outpass approval and complaint resolution
4. **Security** — Scans QR codes to track student entry/exit

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC
