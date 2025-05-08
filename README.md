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
![{69400793-E69E-478C-AB31-3E342F47022D}](https://github.com/user-attachments/assets/70c17695-e0a5-4b14-b949-68923ee61004)
![{261DC089-62E6-4B60-9B22-BF92DBE7BB12}](https://github.com/user-attachments/assets/20405d98-be31-47fc-bb32-8bd032fa1950)


> - **difrent users home pages:**
> - Admin:
![{71F250A8-98AA-4652-90B2-1B76D8748DAF}](https://github.com/user-attachments/assets/3aa3eecf-438c-4c60-a13f-d8b8fdc3639e)
> - organizer:
![{2D93FD29-D67F-4AD1-803F-00BC7B23A241}](https://github.com/user-attachments/assets/b1fcd3ad-3ad7-4020-b28c-47b741c77861)
> - user:
![{3A72BEFF-2D13-49B8-AB45-9FB256B76960}](https://github.com/user-attachments/assets/253ce579-fc5e-4e04-b38b-33587bf1e6b5)




> - **Mobile Responsiveness:**

>   ![{4A55D162-A7FF-4E8E-A7F5-73F65F875E75}](https://github.com/user-attachments/assets/26c44833-c7a4-4be3-a83d-30628694361a)


---

## 📄 License

This project is built for **SWE 363 - Software Engineering**  
📍 **King Fahd University of Petroleum and Minerals (KFUPM)**  
🗓️ **Term 242** – For academic use only.

---
