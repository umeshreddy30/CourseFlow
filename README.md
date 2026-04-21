# CourseFlow

> **A full-stack course management platform where instructors can create, manage, and publish courses — and students can enroll, track progress, and learn.**

[![TypeScript](https://img.shields.io/badge/TypeScript-86%25-3178C6)](https://typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![Status](https://img.shields.io/badge/Status-Active-success)]()

---

## What is CourseFlow?

CourseFlow is a modern learning management system (LMS) built with a **Next.js 14** frontend and a dedicated backend API. It supports two user roles:

- **Instructors** — create courses, add video/text lessons, set pricing, publish
- **Students** — browse courses, enroll, track completion, resume where they left off

The project was built to explore full-stack TypeScript development with a clean separation between the client and server layers.

---

## Architecture

```
┌──────────────────────────────────────────────────┐
│           Next.js 14 Frontend (client/)           │
│   - App Router + Server Components                │
│   - TypeScript + Tailwind CSS                     │
│   - Geist font (Vercel)                           │
└────────────────────┬─────────────────────────────┘
                     │ REST API calls
┌────────────────────▼─────────────────────────────┐
│              Backend API (server/)                │
│   - RESTful endpoints for courses & users         │
│   - JWT Authentication                            │
│   - Course/lesson CRUD                            │
└──────────────────────────────────────────────────┘
```

---

## Features

### For Students
- Browse and search the course catalog
- Enroll in courses (free or paid)
- Track lesson-by-lesson progress
- Resume from last watched position

### For Instructors
- Create and manage courses with a rich editor
- Organize lessons into chapters/sections
- Publish/unpublish courses with one click
- View enrollment stats

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Routing | Next.js App Router + Server Components |
| Backend | Node.js REST API |
| Auth | JWT-based authentication |
| Font | Geist (next/font) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Run the Frontend

```bash
cd client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run the Backend

```bash
cd server
npm install
npm run dev
```

The API will be available at [http://localhost:5000](http://localhost:5000).

---

## Project Structure

```
CourseFlow/
├── client/                  # Next.js 14 frontend
│   ├── app/
│   │   ├── (auth)/          # Login / Register pages
│   │   ├── (dashboard)/     # Student & Instructor dashboards
│   │   ├── courses/         # Course browse & detail pages
│   │   └── layout.tsx
│   ├── components/          # Reusable UI components
│   └── lib/                 # API helpers, auth utils
│
└── server/                  # Backend API
    ├── routes/              # courses, users, enrollment
    ├── middleware/          # auth middleware
    └── index.js
```

---

## Key Design Decisions

- **App Router over Pages Router** — leverages React Server Components for better performance and simpler data fetching
- **Separated client/server** — clear boundary makes it easy to swap backends or deploy independently
- **TypeScript throughout** — strict typing reduces runtime errors and improves DX

---

## Roadmap

- [ ] Video upload and streaming support
- [ ] Payment integration (Stripe)
- [ ] Course reviews and ratings
- [ ] Student discussion forums
- [ ] Mobile-responsive improvements
