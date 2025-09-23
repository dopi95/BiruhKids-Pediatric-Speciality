# 🏥 BiruhKids Pediatric Specialty Clinic

<div align="center">
  <img src="./frontend/src/assets/logo.png" alt="BiruhKids Logo" width="200" height="200">
  
  <h3>Compassionate, Family-Centered Healthcare for Every Child</h3>
  
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
  [![React](https://img.shields.io/badge/React-19+-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
</div>

---

## 🌟 Overview

**BiruhKids Pediatric Specialty Clinic** is a comprehensive digital healthcare platform designed specifically for pediatric care. Our mission is to deliver compassionate, family-centered healthcare that helps every child grow healthy and strong through modern technology and personalized care.

### ✨ Key Features

- 🔐 **Multi-Role Authentication** - Secure access for Patients, Admins, and Super Admins
- 👶 **Pediatric-Focused Care** - Specialized features designed for children's healthcare
- 📅 **Online Appointment Booking** - Easy scheduling with doctor selection
- 👨⚕️ **Doctor Management** - Comprehensive doctor profiles with bilingual support
- 🏥 **Service Management** - Complete medical services catalog
- 💬 **AI-Powered Chatbot** - Intelligent assistant using Puter.js for healthcare queries
- 📝 **Patient Testimonials** - Review and approval system for patient feedback
- 📧 **Newsletter Subscription** - Stay updated with clinic news and health tips
- 🎥 **Educational Videos** - YouTube and TikTok integration for health education
- 📱 **Responsive Design** - Optimized for all devices and screen sizes
- 🌐 **Bilingual Support** - Full English and Amharic language support
- 🔔 **Email Notifications** - Automated notifications and OTP verification

---

## 🛠️ Technology Stack

### Frontend

- **Framework:** React 19 with Vite
- **Language:** JavaScript (ES6+)
- **Styling:** Tailwind CSS
- **UI Components:** Headless UI, Heroicons, Lucide React
- **Routing:** React Router DOM v7
- **State Management:** Context API
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Notifications:** React Toastify

### Backend

- **Framework:** Express.js
- **Language:** JavaScript (ES Modules)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT with bcryptjs
- **File Upload:** Cloudinary integration
- **Email Service:** Nodemailer
- **Security:** CORS, Rate limiting, Input validation

### AI Integration

- **AI Service:** Puter.js API
- **Chatbot:** Context-aware healthcare assistant
- **Fallback System:** Predefined responses for reliability

---

## 👥 Team Members

| Name                | Role                       |
| ------------------- | -------------------------- |
| **Bereket Eshete**  | Backend & AI Developer     |
| **Dagim Sisay**     | UI/UX & Frontend Developer |
| **Elyas Yenealem**  | Full Stack Developer       |
| **Tinbite Daniale** | Full Stack Developer       |

---

## 📁 Project Structure

```
BiruhKids-Pediatric-Speciality/
├── 📁 backend/                    # Express.js Backend API
│   ├── 📁 src/
│   │   ├── 📁 controllers/       # API Controllers
│   │   ├── 📁 models/            # MongoDB Models
│   │   ├── 📁 routes/            # API Routes
│   │   └── 📁 utils/             # Utilities
│   └── server.js                 # Main server file
├── 📁 frontend/                  # React Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 components/        # UI Components
│   │   ├── 📁 pages/             # Application pages
│   │   ├── 📁 services/          # API services
│   │   └── 📁 utils/             # Utilities
│   └── vite.config.js            # Vite configuration
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **MongoDB** (Atlas or local instance)
- **Git**

### 📥 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/BiruhKids-Pediatric-Speciality.git
   cd BiruhKids-Pediatric-Speciality
   ```

2. **Install Backend Dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Environment Variables:**

   **Backend (.env):**

   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   JWT_REFRESH_SECRET=your-refresh-secret
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-key
   CLOUDINARY_API_SECRET=your-cloudinary-secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   NODE_ENV=development
   ```

   **Frontend (.env):**

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start Development Servers:**

   **Backend:**

   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (in new terminal):**

   ```bash
   cd frontend
   npm run dev
   ```

   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

---

## 📜 Available Scripts

### Backend Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm start`   | Start production server  |
| `npm run dev` | Start development server |

### Frontend Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Lint code                |

---

## 🏗️ Key Features

- **Authentication System** - JWT-based with role-based access control
- **Doctor Management** - Bilingual profiles with photo uploads
- **Appointment Booking** - Online scheduling with email notifications
- **AI Chatbot** - Puter.js integration for healthcare queries
- **Content Management** - Video integration and testimonials
- **Admin Panel** - Complete management dashboard

---

## 🔐 Security

- JWT Authentication with refresh tokens
- Password hashing with bcryptjs
- Rate limiting and input validation
- Secure file uploads via Cloudinary

---

## 🌐 Main API Endpoints

- **Auth:** `/api/auth/*` - Authentication & user management
- **Doctors:** `/api/doctors/*` - Doctor profiles & management
- **Appointments:** `/api/appointments/*` - Booking & scheduling
- **Services:** `/api/services/*` - Medical services catalog

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Thanks to all team members for their dedication to improving pediatric healthcare
- Special thanks to the open-source community for amazing tools and libraries
- Inspired by the mission to provide better healthcare for children and families
- Puter.js team for providing free AI services for healthcare applications

---

## 📞 Contact

For questions, suggestions, or support, please contact our development team <a
              href="https://t.me/ChainTech_6/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline hover:text-blue-800 transition"
            >
Chain Tech
</a> or create an issue in this repository.

**BiruhKids Pediatric Specialty Clinic** - _Your child's health is our priority_ 👶💙
