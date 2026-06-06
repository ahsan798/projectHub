# ProjectHub — Project & Task Management Dashboard

A production-ready, full-stack Next.js application built for managing projects, tracking tasks via a drag-and-drop Kanban board, and visualizing team productivity.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Drag & Drop**: [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/) (configured with mock interceptors)

## ✨ Features & Bonus Implementations

- **Modern UI & Animations**: Smooth page transitions, count-up stats, modal animations, and staggered list renders.
- **Dark/Light Mode**: Full CSS-variable driven theme system that respects user preference and persists to `localStorage`.
- **Drag & Drop Kanban**: Interactive task board with optimistic UI updates via Redux.
- **Role-Based Access**: Mock `admin` vs `member` roles. Admins can delete any project/task; members are restricted to their own assignments.
- **Comprehensive Validation**: Client-side validation for all forms (Auth, Projects, Tasks) using Zod schemas.
- **Error Boundaries & Loading States**: Skeleton loaders for data fetching simulation and global/route-level error catchers.
- **Responsive Design**: Mobile-first approach with a collapsible sidebar and fluid grid layouts.
- **Mock API Layer**: Axios interceptors simulate network latency (300-800ms) and handle JWT token injection/validation, making it trivial to swap in a real backend later.

## 📁 Project Structure

```
.
├── app/
│   ├── (auth)/             # Route group: Login, Register, Forgot Password
│   ├── (dashboard)/        # Route group: Dashboard, Projects, Tasks
│   ├── globals.css         # Global styles & Tailwind tokens
│   ├── layout.tsx          # Root layout (Redux & Theme Providers)
│   └── page.tsx            # Redirects to /dashboard
├── src/
│   ├── components/
│   │   ├── dashboard/      # Stats cards, charts, recent activity
│   │   ├── layout/         # Sidebar, Topbar, ThemeToggle
│   │   ├── projects/       # Project cards, forms
│   │   ├── tasks/          # Task cards, Kanban board, forms
│   │   └── ui/             # Reusable primitives (Button, Input, Modal, etc.)
│   ├── lib/
│   │   ├── axios.ts        # Axios instance + mock interceptors
│   │   ├── mockData.ts     # Seed data
│   │   └── validators.ts   # Zod schemas
│   ├── store/              # Redux slices (auth, projects, tasks)
│   ├── types/              # TypeScript interfaces
│   └── utils/              # Helper functions (date formatting, class merging)
└── middleware.ts           # Next.js Edge Middleware for route protection
```

## 🛠️ Setup Instructions

1. **Clone the repository** (if applicable):

   ```bash
   git clone <repo-url>
   cd project-management
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open the app**:
   Navigate to [http://localhost:3000] in your browser.

## 🔐 Demo Credentials

This project uses an in-memory mock backend with preconfigured demo accounts.

| Role   | Email                 | Password |
|--------|-----------------------|----------|
| Admin  | test@test.com         | password |
| Admin  | alice@projecthub.com  | password |
| Member | sara@projecthub.com   | password |
| Member | bob@projecthub.com    | password |

> Note: Data is stored in memory and resets when the application is refreshed or restarted.
