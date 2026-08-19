# LearnLingo

LearnLingo is a web application that connects students with online language tutors. Users can browse a catalog of teachers, filter them by language, level and price, save favorites, and book a trial lesson.

Built as a learning project based on a provided technical specification and Figma design.

## Live Demo

🔗 [learn-lingo-five-rouge.vercel.app](https://learn-lingo-five-rouge.vercel.app/)

## Features

- Authentication (registration, login, logout) via Firebase
- Teacher catalog with pagination ("Load more")
- Filtering by language, level and price
- Favorites list for logged-in users, persisted across reloads
- Expandable teacher cards with reviews
- Trial lesson booking via validated modal form
- Protected Favorites route
- Client-side routing with React Router

## Tech Stack

- **React** (Vite)
- **React Router** — client-side routing
- **Firebase** — Authentication & Realtime Database
- **React Hook Form** + **Yup** — form handling and validation
- **React Toastify** — toast notifications
- **Sass (SCSS)** — styling

## Getting Started

```bash
git clone https://github.com/snizhana202/LearnLingo.git
cd LearnLingo
npm install
```

Create a `.env` file in the project root:

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=


Run locally:

```bash
npm run dev
```

## Author

**Snizhana** — [GitHub](https://github.com/snizhana202) · [LinkedIn](https://www.linkedin.com/in/snizhana-petrushka/)