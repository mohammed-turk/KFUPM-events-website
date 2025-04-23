# 📅 KFUPM Events System

## 📌 Project Description

KFUPM hosts many events across colleges, clubs, and departments, including seminars, hackathons, and ceremonies. Currently, email is the main communication method, which often leads to irrelevant outreach, cluttered inboxes, and missed opportunities.

**KFUPM Events System** is a modern web application that solves this problem by offering a centralized platform to browse, organize, and register for university events. Users can find events that match their interests, and organizers can effectively reach their target audience.

---

## 🎯 Key Features

- 👥 Multiple User Roles: User, Event Organizer, Admin  
- 📝 Event Creation & Registration  
- 🗂️ Event Categorization by Type  
- 📱 Responsive Design for Desktop and Mobile  

---

## 🌐 Project Links

- 🔗 **GitHub Repo (Aljubaili Branch):**  
  [https://github.com/mohammed-turk/KFUPM-events-website/tree/Aljubaili](https://github.com/mohammed-turk/KFUPM-events-website/tree/Aljubaili)

- 🎨 **Figma Design (View Only):**  
https://www.figma.com/design/1GilhMtuSwCYXVcQJ3G0GC/Events-Website?node-id=0-1&t=Wk91alWjj49ndQ4i-1     
---

## 🛠️ Tech Stack

- **Frontend:** React.js (Create React App)
- **Routing:** React Router  
- **Version Control:** Git & GitHub  
- **Design:** Figma

---

## 📁 Folder Structure

```bash
kfupm-events-website/
├── .idea/                         # IDE settings (optional)
├── .vscode/                       # VS Code settings (optional)
├── public/                        # Static assets and index.html
│   ├── admin.jpg
│   ├── club.jpg
│   ├── event1.jpg
│   ├── event2.jpg
│   ├── member1.jpg
│   ├── member2.jpg
│   └── ...
│
├── src/
│   ├── admin/                     # Admin pages
│   │   ├── AdminAllEventList.js
│   │   ├── AdminClubPage.js
│   │   ├── AdminClubsList.js
│   │   ├── AdminProfilePage.js
│   │   ├── ClubListAdmin.js
│   │   └── HomeAdmin.js
│
│   ├── assets/                    # Images, icons
│   │   ├── BackBtn.png
│   │   ├── add.png
│   │   ├── delete.png
│   │   ├── fav.png
│   │   └── mod.png
│
│   ├── components/               # Reusable components
│   │   ├── Event&Mod.js
│   │   ├── Header.js
│   │   ├── HomePageHeader.js
│   │   ├── Member.js
│   │   └── ReturnHeader.js
│
│   ├── org/                      # Organizer pages
│   │   ├── AddEventOrganization.js
│   │   ├── AddOrgPage.js
│   │   ├── HomeOrg.js
│   │   └── OrgProfilePage.js
│
│   ├── pages/                    # Shared pages
│   │   ├── LoginPage.js
│   │   ├── SignUpPage.js
│   │   └── EventsCalendar.js
│
│   ├── shared/                   # Shared utilities or layout
│
│   ├── user/                     # User pages
│   │   ├── ClubPage.js
│   │   ├── UserAllEventList.js
│   │   ├── UserHomePage.js
│   │   └── UserProfilePage.js
│
│   ├── App.js                    # Root app file with routes
│   ├── App.css
│   ├── index.js                  # Entry point
│   ├── index.css
│   ├── reportWebVitals.js
│   └── setupTests.js
│
├── .env.example                  # Sample environment file
├── .gitignore                    # Ignore sensitive/system files
├── README.md                     # This file 😄
├── package.json                  # Project dependencies
├── package-lock.json
└── ClubsList.js                  # Club component for users/admins
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/mohammed-turk/KFUPM-events-website.git
cd KFUPM-events-website
git checkout Aljubaili
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

> App will be running at `http://localhost:3000`

---

## 🔐 Environment Variables

Create a `.env` file based on this template:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_KEY=your-firebase-key
```

✅ **Note:** Do **not** commit your `.env` file — it's excluded in `.gitignore`.

---

## 👨‍👩‍👧‍👦 Team Members

| Name                 | Student ID   | Role                  |
|----------------------|--------------|------------------------|
| Hasan Alharbi        | 202163510    | Team Leader           |
| Mohammed Alsahli     | 202167910    | Front-End Developer   |
| Ibrahim ALbahrani    | 202161410    | Git & Branching Lead  |
| Mohammed Busaleh     | 202158210    | UI/UX Designer        |
| Mohammed Aljubaili   | 202031060    | Front-End Integration |

---

## 📸 Screenshots

> - Login and Signup
> - ![signup](https://github.com/user-attachments/assets/be2d8907-f82a-42da-aaf6-82d66d5f6c35)
> - ![login](https://github.com/user-attachments/assets/e420bcb7-554a-4c58-b93d-207cbbff0c82)

> - Dashboard
> - ![home](https://github.com/user-attachments/assets/84714fc0-f7ab-4656-b18d-bcea25643233)

> - Event Calendar
> - ![calender](https://github.com/user-attachments/assets/a67016de-3b1f-47ae-8639-41a5d69411cb)

> - Mobile Responsiveness
> - ![phonelogin](https://github.com/user-attachments/assets/4fdaa8b0-7611-4402-b1f8-f5ed1bb56021)
> - ![phone](https://github.com/user-attachments/assets/d4ab1638-6381-4498-a499-51998f243840)

---

## 📄 License

This project is built for **SWE 363 - Software Engineering**  
📍 **King Fahd University of Petroleum and Minerals (KFUPM)**  
🗓️ **Term 242** – For academic use only.

---
