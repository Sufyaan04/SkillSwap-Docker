# SkillSwap 🔄

> **A skill barter platform where students and professionals exchange expertise — no money, just knowledge.**

[![Made with](https://img.shields.io/badge/Made%20with-MERN%20Stack-00e5a0?style=flat-square)](https://www.mongodb.com/)
[![Auth](https://img.shields.io/badge/Auth-JWT%20%2B%20Google%20OAuth-4285F4?style=flat-square)](https://oauth.net/2/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=flat-square)]()

---

## 📌 What is SkillSwap?

SkillSwap is a full-stack web application that enables a **barter economy for skills**. Instead of paying for courses or tutors, users can trade what they know for what they want to learn.

A frontend developer can offer React lessons in exchange for UI/UX design sessions. A guitarist can swap music theory for Python programming. No monetary transactions — just pure knowledge exchange between real people.

**The core idea:** *Every person knows something someone else wants to learn.*

---

## 🚀 Live Demo

> Coming soon — deployment in progress on Render + Vercel.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, shadcn/ui |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) + Google OAuth 2.0 (Passport.js) |
| **Styling** | Custom CSS Design System + Tailwind CSS |
| **Font** | Geist (Vercel's open-source font) |
| **API** | RESTful API architecture |

---

## ✨ Features

### Core Features
- 🔐 **JWT Authentication** — Secure register/login with bcrypt password hashing
- 🌐 **Google OAuth 2.0** — One-click sign in with Google via Passport.js
- 🔍 **Skill Search** — Search users by any skill with real-time results
- 🤝 **Swap Requests** — Send, receive, accept, and reject skill exchange proposals
- 👤 **Profile Management** — Edit name, skills offered, and skills wanted
- 📊 **Dashboard** — Personal stats showing sent/received/accepted/pending requests
- 🛡️ **Protected Routes** — Private route guards for authenticated pages

### UI/UX Features
- 🎨 **shadcn/ui inspired design** — Clean, professional component system
- 📱 **Responsive sidebar layout** — Collapsible sidebar for app pages
- 🌟 **Landing page** — Marketing page with scroll animations, marquee, testimonials
- ⚡ **Optimistic UI updates** — Instant feedback on accept/reject actions
- 🔄 **Loading states** — Spinners and skeleton states throughout

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (React + Vite)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │ Landing  │  │  Login   │  │Dashboard │  │Profile │  │
│  │  Page    │  │ Register │  │Requests  │  │  Page  │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘  │
│                    Axios + JWT Interceptor               │
└─────────────────────────┬───────────────────────────────┘
                          │ HTTP/REST
┌─────────────────────────▼───────────────────────────────┐
│                  EXPRESS.JS SERVER (Port 5000)           │
│  ┌─────────────────────────────────────────────────┐    │
│  │  CORS → express.json → Session → Passport.js    │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  /auth   │  │  /users  │  │      /requests       │  │
│  └────┬─────┘  └────┬─────┘  └──────────┬───────────┘  │
│       │             │                    │               │
│  ┌────▼─────────────▼────────────────────▼───────────┐  │
│  │              authMiddleware (JWT Protect)          │  │
│  └────────────────────────┬──────────────────────────┘  │
└───────────────────────────┼─────────────────────────────┘
                            │ Mongoose ODM
┌───────────────────────────▼─────────────────────────────┐
│                     MONGODB DATABASE                     │
│   ┌─────────────────┐      ┌──────────────────────┐     │
│   │   Users         │      │   Requests           │     │
│   │ _id             │      │ _id                  │     │
│   │ name            │◄─────│ sender (ref)         │     │
│   │ email           │      │ receiver (ref)       │     │
│   │ password (hash) │      │ skillOffered         │     │
│   │ googleId        │      │ skillRequested       │     │
│   │ profilePic      │      │ status (enum)        │     │
│   │ skillsOffered[] │      │ createdAt            │     │
│   │ skillsWanted[]  │      └──────────────────────┘     │
│   └─────────────────┘                                    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔌 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | ❌ | Register new user |
| `POST` | `/login` | ❌ | Login with email/password |
| `GET` | `/google` | ❌ | Initiate Google OAuth |
| `GET` | `/google/callback` | ❌ | Google OAuth callback |

### User Routes — `/api/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/profile` | ✅ | Get own profile |
| `PUT` | `/profile` | ✅ | Update profile & skills |
| `GET` | `/search?skill=` | ✅ | Search users by skill |

### Request Routes — `/api/requests`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | ✅ | Send swap request |
| `GET` | `/sent` | ✅ | Get sent requests |
| `GET` | `/received` | ✅ | Get received requests |
| `PUT` | `/:id` | ✅ | Accept or reject request |

---

## 🔐 Authentication Flow

### Standard JWT Flow
```
Register/Login → bcrypt verify → generateToken(userId)
→ JWT stored in localStorage
→ Every request: Authorization: Bearer <token>
→ authMiddleware decodes → req.user set
```

### Google OAuth 2.0 Flow
```
Click "Sign in with Google"
→ GET /api/auth/google
→ Passport redirects to Google consent screen
→ User approves
→ Google sends code to /api/auth/google/callback
→ Passport exchanges code for profile data
→ Find or create user in MongoDB
→ Generate JWT
→ Redirect to /oauth/callback?token=<jwt>
→ Frontend stores token → redirect to /dashboard
```

---

## 📁 Project Structure

```
skillswap/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── passport.js        # Google OAuth strategy
│   ├── controllers/
│   │   ├── authController.js  # Register, Login
│   │   ├── userController.js  # Profile, Search
│   │   └── requestController.js
│   ├── middlewares/
│   │   └── authMiddleware.js  # JWT protect middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Request.js         # Request schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── requestRoutes.js
│   ├── utils/
│   │   └── generateTokens.js
│   ├── .env.example
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx        # App navigation sidebar
    │   │   └── PrivateRoute.jsx   # Auth guard + layout
    │   ├── pages/
    │   │   ├── LandingPage.jsx    # Marketing homepage
    │   │   ├── Login.jsx          # Login + Google OAuth
    │   │   ├── Register.jsx       # Registration
    │   │   ├── Dashboard.jsx      # Search + stats
    │   │   ├── Profile.jsx        # View/edit profile
    │   │   ├── Requests.jsx       # Swap requests table
    │   │   └── OAuthCallback.jsx  # OAuth token handler
    │   ├── services/
    │   │   └── api.js             # Axios + interceptors
    │   ├── App.jsx
    │   ├── index.css              # Design system
    │   └── main.jsx
    ├── tailwind.config.js
    └── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Google Cloud Console account (for OAuth)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/skillswap.git
cd skillswap
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=your_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173
```

```bash
node server.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app
```
http://localhost:5173
```

---

## 🧩 Key Technical Decisions

### Why JWT over Sessions?
JWT allows **stateless authentication** — the server doesn't need to store session data. Every request carries the token, making the API scalable and ready for future microservices architecture.

### Why Mongoose over raw MongoDB driver?
Mongoose provides **schema validation, middleware hooks, and populate()** which automatically joins related documents — e.g. fetching the sender's name and email when querying requests — without writing complex aggregation queries.

### Why separate skillsOffered and skillsWanted arrays?
This design enables **bidirectional matching** — you can search `skillsOffered` to find teachers. In a future version, a recommendation engine can automatically match users where User A's `skillsWanted` overlaps with User B's `skillsOffered` and vice versa.

---

## 🚧 Challenges & How I Solved Them

### 1. Google OAuth + JWT Coexistence
**Challenge:** OAuth uses sessions while the rest of the app uses stateless JWT. Mixing both without conflicts was tricky.

**Solution:** Used Passport.js sessions only for the OAuth handshake. Once Google confirms the user, immediately generate a JWT and redirect to the frontend with it as a URL parameter. From that point, everything runs on JWT — sessions are only needed for the 2-second OAuth dance.

### 2. Environment Variables Not Loading Before Passport.js
**Challenge:** `passport.js` was being required before `dotenv.config()` ran in `server.js`, causing `process.env.GOOGLE_CLIENT_ID` to be `undefined`.

**Solution:** Learned the critical Node.js module loading order — `dotenv.config()` must be called before ANY file that reads `process.env` is required. The fix was ensuring it is the absolute first line in `server.js`.

### 3. CORS with Credentials
**Challenge:** OAuth requires `credentials: true` in CORS, but wildcard `*` origins don't work with credentials — browser blocks it.

**Solution:** Replaced `app.use(cors())` with explicit origin config: `cors({ origin: process.env.CLIENT_URL, credentials: true })`.

### 4. Request Status Enum Typo
**Challenge:** The Request model had `"padding"` instead of `"pending"` in the status enum — causing all new requests to fail validation silently.

**Solution:** Caught during frontend integration testing when requests weren't saving. Fixed the typo and learned the importance of testing API contracts before building the UI on top.

### 5. Mongoose populate() for Related Data
**Challenge:** Requests only store ObjectId references for sender/receiver. The frontend needed names and emails, not just IDs.

**Solution:** Used Mongoose's `.populate("sender", "name email")` to automatically fetch related user data in a single query — avoiding N+1 query problems.

---

## 🗺️ Roadmap

- [ ] Real-time notifications via Socket.io
- [ ] In-app messaging between matched users
- [ ] Skill ratings and reviews after a swap
- [ ] Smart matching algorithm based on mutual skill overlap
- [ ] Email notifications via Nodemailer
- [ ] GitHub OAuth provider
- [ ] Deployment on Render + Vercel
- [ ] Mobile app with React Native

---

## 🤔 What I Learned

This project taught me far more than just writing code:

- **Full-stack thinking** — How frontend API calls, backend middleware, and database schemas all connect and affect each other
- **Authentication architecture** — The difference between session-based and token-based auth, and when to use each
- **Mongoose relationships** — Using `ref` and `populate()` to model relational-style data in MongoDB
- **OAuth 2.0 flow** — The complete redirect dance between client, server, and third-party provider
- **Debugging methodology** — Reading stack traces, isolating variables, and using `node -e` to test specific things in isolation
- **API design** — RESTful conventions, HTTP status codes, and consistent error response patterns

---

## 👨‍💻 Author

**Mohammed Sufyaan**
- 📧 mdsufyaan2006@gmail.com
- 🐙 GitHub: [@yourusername](https://github.com/yourusername)
- 💼 LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ as a learning project — from zero to full-stack in one go.**

⭐ Star this repo if you found it helpful!

</div>
#   S k i l l - S w a p  
 