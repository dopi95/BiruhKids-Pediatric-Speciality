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
- 👨‍⚕️ **Doctor Management** - Comprehensive doctor profiles with bilingual support
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
| **Eliyas Yenealem** | Full Stack Developer       |
| **Tinbite Daniale** | Full Stack Developer       |

---

## 📁 Project Structure

```
BiruhKids-Pediatric-Speciality/
├── 📁 backend/                    # Express.js Backend API
│   ├── 📁 src/
│   │   ├── 📁 config/            # Database & Cloudinary config
│   │   ├── 📁 controllers/       # API Controllers
│   │   │   ├── authController.js
│   │   │   ├── doctorController.js
│   │   │   ├── serviceController.js
│   │   │   ├── testimonialController.js
│   │   │   └── userController.js
│   │   ├── 📁 middleware/        # Authentication & Upload middleware
│   │   ├── 📁 models/            # MongoDB Models
│   │   │   ├── User.js
│   │   │   ├── Doctor.js
│   │   │   ├── Appointment.js
│   │   │   ├── ServiceModel.js
│   │   │   ├── Testimonial.js
│   │   │   └── Video.js
│   │   ├── 📁 routes/            # API Routes
│   │   └── 📁 utils/             # Email & Token utilities
│   ├── 📁 uploads/               # File uploads storage
│   └── server.js                 # Main server file
├── 📁 frontend/                  # React Frontend Application
│   ├── 📁 public/                # Static assets
│   ├── 📁 src/
│   │   ├── 📁 assets/            # Images and logos
│   │   ├── 📁 components/        # Reusable UI Components
│   │   │   ├── 📁 profile/       # Profile management components
│   │   │   ├── Chatbot.jsx       # AI-powered chatbot
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── 📁 context/           # React Context providers
│   │   ├── 📁 layouts/           # Layout components
│   │   ├── 📁 pages/             # Application pages
│   │   │   ├── 📁 Admin/         # Admin panel pages
│   │   │   ├── 📁 Home/          # Public pages
│   │   │   └── NotFound.jsx      # Custom 404 page
│   │   ├── 📁 services/          # API service functions
│   │   └── 📁 utils/             # Utilities and helpers
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

## 🏗️ Key Features Overview

### 🔐 Authentication System

- JWT-based authentication with refresh tokens
- Role-based access control (User, Admin, Super Admin)
- OTP verification for password reset
- Granular permissions system

### 👨‍⚕️ Doctor Management

- Bilingual doctor profiles (English/Amharic)
- Photo upload with Cloudinary integration
- Search and filter functionality
- Experience and specialization tracking

### 📅 Appointment System

- Online booking with doctor selection
- Status tracking (pending, confirmed, cancelled)
- Email notifications
- Admin management interface

### 🤖 AI Chatbot

- Puter.js integration for intelligent responses
- Pediatric healthcare context awareness
- Fallback system for reliability
- Professional medical guidance

### 🎥 Content Management

- YouTube and TikTok video integration
- Bilingual content support
- Admin approval workflow
- Educational resource organization

### 📝 Testimonial System

- Patient review submission
- Admin approval workflow
- Rating system (1-5 stars)
- Image upload support

---

## 🔐 Security Features

- **JWT Authentication:** Secure token-based authentication
- **Password Hashing:** bcryptjs with salt rounds
- **Rate Limiting:** API protection against abuse
- **Input Validation:** Comprehensive data validation
- **CORS Configuration:** Secure cross-origin requests
- **File Upload Security:** Cloudinary integration with validation
- **Environment Variables:** Sensitive data protection

---

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/verify-reset-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password

### Doctors

- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create doctor (Admin)
- `PUT /api/doctors/:id` - Update doctor (Admin)
- `DELETE /api/doctors/:id` - Delete doctor (Admin)

### Appointments

- `GET /api/appointments` - Get appointments
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/:id` - Update appointment status

### Services

- `GET /api/services` - Get all services
- `POST /api/services` - Create service (Admin)
- `PUT /api/services/:id` - Update service (Admin)
- `DELETE /api/services/:id` - Delete service (Admin)

---

## 🚀 Deployment

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Backend (Railway/Render)

1. Connect GitHub repository
2. Configure environment variables
3. Set build and start commands
4. Deploy automatically on push

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit your changes:** `git commit -m 'Add amazing feature'`
4. **Push to the branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow JavaScript ES6+ best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Follow the existing code style

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
