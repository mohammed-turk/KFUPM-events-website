# 📅 KFUPM Events System

## 📌 Project Description

KFUPM hosts many events across colleges, clubs, and departments, including seminars, hackathons, and ceremonies. Currently, email is the main communication method, which often leads to irrelevant outreach, cluttered inboxes, and missed opportunities.

**KFUPM Events System** is a modern web application that solves this problem by offering a centralized platform to browse, organize, and register for university events. Users can find events that match their interests, and organizers can effectively reach their target audience.

---

## 🎯 Key Features

- 👥 Multiple User Roles: User, Event Organizer, Admin  
- 📝 Event Creation & favoration  
- 🗂️ clubs joining and viewing 
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
- **Backend:** mongoDB and node.js

---

## 📁 Folder Structure

```bash
kfupm-events-website/
Okay, I understand what you're looking for! You want a representation of the full folder structure we've explored, presented in a tree-like format with annotations, similar to the image you just showed.

Here's the structure based on the images you've provided:

KFUPM-events-website/
├── node_modules/
├── university-events/
│   ├── .idea/                     # IDE settings (optional)
│   ├── .vscode/                   # VS Code settings (optional)
│   ├── build/
│   ├── public/                    # Static assets and index.html
│   │   ├── admin.jpg
│   │   ├── club.jpg
│   │   ├── event1.jpg
│   │   ├── event2.jpg
│   │   ├── member1.jpg
│   │   ├── member2.jpg
│   │   └── ...
│   ├── src/                       # Main source code
│   │   ├── assets/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── ClubContainer.js
│   │   │   ├── Event&ModContainer.js
│   │   │   ├── EventContainer.js
│   │   │   ├── EventsCalendar.css
│   │   │   ├── EventsCalendar.js
│   │   │   ├── Header.js
│   │   │   ├── HomePageHeader.js
│   │   │   ├── Member.js
│   │   │   └── ReturnHeader.js
│   │   ├── pages/                 # Application views/screens
│   │   │   ├── admin/               # Admin pages
│   │   │   │   ├── AddOrgPageList.js
│   │   │   │   ├── AdminAllEventList.js
│   │   │   │   ├── AdminClubPage.js
│   │   │   │   ├── AdminClubsList.js
│   │   │   │   ├── AdminEventInfo.js
│   │   │   │   ├── AdminProfilePage.js
│   │   │   │   ├── EditClub.css
│   │   │   │   ├── EditClub.js
│   │   │   │   ├── EditEventPage.js
│   │   │   │   ├── HomeAdmin.css
│   │   │   │   └── HomeAdmin.js
│   │   │   ├── org/                 # Organization pages
│   │   │   │   ├── ClubPage.css
│   │   │   │   ├── ClubPage.js
│   │   │   │   ├── HomeOrg.css
│   │   │   │   ├── HomeOrg.js
│   │   │   │   ├── MembersList.js
│   │   │   │   ├── OrgAllEventList.js
│   │   │   │   └── OrgProfilePage.js
│   │   │   ├── shared/              # Reusable page components
│   │   │   │   ├── AddEventPage.js
│   │   │   │   ├── ClubInfo.js
│   │   │   │   ├── ClubList.css
│   │   │   │   ├── ClubList.js
│   │   │   │   ├── EventInfo.js
│   │   │   │   ├── EventList.css
│   │   │   │   ├── EventList.js
│   │   │   │   ├── LoginPage.css
│   │   │   │   └── LoginPage.js
│   │   │   ├── user/                # User pages
│   │   │   │   ├── SignUpPage.js
│   │   │   │   ├── UserAllEventList.js
│   │   │   │   ├── UserEventPage.js
│   │   │   │   ├── UserHomePage.css
│   │   │   │   ├── UserHomePage.js
│   │   │   │   └── UserProfilePage.js
│   │   ├── server/                # Backend logic
│   │   │   ├── controllers/         # Request handlers
│   │   │   │   ├── clubController.js
│   │   │   │   ├── eventController.js
│   │   │   │   ├── favController.js
│   │   │   │   ├── joinedController.js
│   │   │   │   └── userController.js
│   │   │   ├── models/              # Data models/schemas
│   │   │   │   ├── Club.js
│   │   │   │   ├── Event.js
│   │   │   │   ├── User.js
│   │   │   │   ├── UserFavEvent.js
│   │   │   │   └── UserFollowClub.js
│   │   │   └── routes/              # API endpoints
│   │   │       ├── clubEventsRoutes.js
│   │   │       ├── clubRoutes.js
│   │   │       ├── eventRoutes.js
│   │   │       ├── eventsRoutes.js
│   │   │       ├── favRoutes.js
│   │   │       ├── joinedRoutes.js
│   │   │       └── userRoutes.js
│   │   ├── utils/
│   │   ├── .env
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── server.js                # Backend entry point
│   │   ├── App.css
│   │   ├── App.js                   # Root frontend component
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js                 # Frontend entry point
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── .gitignore
│   ├── config-overrides.js
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
└── node_modules/
```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/mohammed-turk/KFUPM-events-website.git
cd KFUPM-events-website
git checkout Aljubaili
```

**FrontEnd setup:** Install dependencies and running the react app
```bash
npm install xxxx (all required packeges)
```
**Start the react app**
```bash
npm start
```

> App will be running at `http://localhost:3000`

**Backend setup:**
  1. navigate to the server folder by: cd src, then cd server 
  2. run this command: npm init -y
  3. run this command: node server.js



---

## 🔐 Environment Variables

Create a `.env` file based on this template:

```env
REACT_APP_API_URL=http://localhost:3000/api
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
> - ![login](https://github.com/user-attachments/assets/e420bcb7-554a-4c58-b93d-207cbbff0c82)

![image](https://github.com/user-attachments/assets/b92703f6-97c0-4581-b6f2-fef4031fbf0c)
![image](https://github.com/user-attachments/assets/c4c783e2-ab42-4412-b30d-dc5de6a97d62)
![image](https://github.com/user-attachments/assets/45c6f435-7e94-45a1-96c9-dd32e87b8c30)


> - Mobile Responsiveness
> - ![phonelogin](https://github.com/user-attachments/assets/4fdaa8b0-7611-4402-b1f8-f5ed1bb56021)

---

## 📄 License

This project is built for **SWE 363 - Software Engineering**  
📍 **King Fahd University of Petroleum and Minerals (KFUPM)**  
🗓️ **Term 242** – For academic use only.

---
