# ResuMate | AI-Powered Resume Builder 🚀

**ResuMate** is a modern, AI-driven full-stack web application designed to help job seekers and students create professional, high-impact resumes in minutes. By leveraging the power of **Google Gemini AI**, ResuMate simplifies the resume-building process—from content generation to professional formatting.

---

## 📌 Index

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation & Setup](#-installation--setup)
- [How it Works](#-how-it-works)
- [Contribution](#-contribution)
- [Developers](#-developers)

---

## ✨ Key Features

- 🤖 **AI-Powered Content**: Generate professional summaries and job descriptions using Google Gemini AI.
- 🎨 **Modern UI/UX**: A beautiful, animated landing page with smooth transitions and a sticky, blurred header.
- 🔍 **Live Preview**: See your resume take shape in real-time as you edit your details.
- 🛠️ **Full Customization**: Change theme colors, edit multiple sections (Experience, Education, Skills, Projects), and manage multiple resumes from a central dashboard.
- 🔒 **Secure Auth**: Custom JWT-based authentication system with encrypted passwords.
- 📄 **Quick Export**: Download your finalized resume as a professional PDF.

---

## 💻 Tech Stack

### Frontend

- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons**: Lucide React, Font Awesome

### Backend

- **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Authentication**: JWT & Bcrypt
- **AI Integration**: Google Generative AI (Gemini SDK)

---

## 🏗️ Architecture

ResuMate follows a clean **MVC (Model-View-Controller)** pattern on the backend and a **Feature-based** modular structure on the frontend.

- **Frontend**: Organized into `features`, `pages`, and `components`.
- **Backend**: Separated into `models`, `controllers`, `routes`, and `middleware`.
- **Database**: Relational-style document modeling with embedded schemas for resume sections.

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sahil2693/ResuMate.git
cd ResuMate
```

### 2️⃣ Environment Configuration

#### Backend (`Backend/.env`)

```plaintext
MONGODB_URI=your_mongodb_uri
PORT=5001
JWT_SECRET_KEY=your_secret_key
JWT_SECRET_EXPIRES_IN=1d
ALLOWED_SITE=http://localhost:5173
```

#### Frontend (`Frontend/.env.local`)

```plaintext
VITE_GEMENI_API_KEY=your_gemini_api_key
VITE_APP_URL=http://localhost:5001/
```

### 3️⃣ Running the Application

#### **Backend**

```bash
cd Backend
npm install
npm run dev
```

#### **Frontend**

```bash
cd Frontend
npm install
npm run dev
```

---

## 🛠️ How it Works

1. **Sign Up**: Create a secure account to save your resumes.
2. **Dashboard**: Start a new resume or edit an existing one.
3. **Edit Details**: Fill in your personal info, education, and experience.
4. **AI Magic**: Click the "Generate with AI" button to get professional content suggestions.
5. **Customize**: Pick your favorite theme color.
6. **Download**: Preview your work and download it as a PDF!

---

## 🤝 Contribution

Contributions make the open-source community an amazing place to learn, inspire, and create.

1. **Fork** the Project.
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`).
4. **Push** to the Branch (`git checkout -b feature/AmazingFeature`).
5. **Open** a Pull Request.

---

## 👨‍💻 Developers

- **Sahil Kamti** - [GitHub](https://github.com/Sahil2693) | [LinkedIn](https://www.linkedin.com/in/sahil-kamti-7a0b3a24a/)

---
