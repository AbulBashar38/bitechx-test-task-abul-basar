# BitechX Test Task - Product Management Application

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-blue)](https://bitechx-test-task-abul-basar.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-black)](https://github.com/AbulBashar38/bitechx-test-task-abul-basar)

## 📋 Description

This is an assessment task project for BitechX, showcasing a comprehensive product management application built with modern web technologies. The application features user authentication, product CRUD operations, advanced search and filtering capabilities, and an optimized infinite scroll implementation for handling large product catalogs.

## ✨ Features

### 🔐 Authentication

- User login system with JWT token management
- Protected routes with automatic redirection
- Persistent authentication state using Redux Persist

### 📦 Product Management

- **CRUD Operations**: Create, Read, Update, Delete products
- **Product Details**: Comprehensive product information display
- **Image Handling**: Smart image validation with fallback placeholders

### 🔍 Advanced Search & Filtering

- Real-time search with debounced input
- Category-based filtering
- Combined search and filter functionality
- Reset filters on new searches

### 📜 Infinite Scroll

- Efficient pagination with Intersection Observer API
- RTK Query-based caching and state management
- Duplicate prevention in merged data
- Loading states and end-of-data indicators

### 🎨 Modern UI/UX

- Responsive design for all device sizes
- Beautiful animations and transitions
- Dark/light theme support (ThemeProvider)
- Accessible components using shadcn/ui
- Gradient backgrounds and elegant shadows

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 15.5.6** - React framework with App Router
- **React 19.1.0** - UI library with hooks
- **TypeScript** - Type-safe JavaScript

### State Management

- **RTK Query** - Advanced data fetching and caching
- **Redux Toolkit** - State management with slices
- **Redux Persist** - Persistent state storage

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Commit message linting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AbulBashar38/bitechx-test-task-abul-basar.git
   cd bitechx-test-task-abul-basar
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.example .env.local
   ```

4. Update environment variables:

   ```env
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── products/          # Product-related pages
│   │   ├── [id]/         # Dynamic product details
│   │   ├── create/       # Product creation
│   │   └── page.tsx      # Products listing with infinite scroll
│   ├── login/            # Authentication
│   └── layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ErrorMessage.tsx  # Error display component
├── hooks/                # Custom React hooks
│   └── useDebounce.tsx   # Debounce hook for search
├── lib/                  # Utility functions
│   └── utils.ts          # General utilities
├── services/             # API services
│   ├── apiConfig.tsx     # RTK Query base configuration
│   └── productApi.ts     # Product API endpoints
├── state-management/     # Redux store and slices
│   ├── features/         # Redux slices
│   ├── store.ts          # Store configuration
│   └── storage.ts        # Local storage configuration
├── types/                # TypeScript type definitions
└── provider/             # Context providers
```

## 🔧 Key Implementation Details

### Infinite Scroll with RTK Query

- Uses `serializeQueryArgs` to cache by filter combination
- `merge` function appends new data without duplicates
- `forceRefetch` ensures proper cache invalidation
- Intersection Observer for performance

### Search Optimization

- Debounced search input (500ms delay)
- Automatic page reset on filter changes
- Combined search and category filtering

### Authentication Flow

- JWT token storage in localStorage
- Automatic token attachment to API requests
- Route protection with redirects

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- Desktop computers
- Tablets
- Mobile devices

## 📄 License

This project is for assessment purposes and is not licensed for commercial use.

## 👨‍💻 Author

**Abul Bashar**

- GitHub: [@AbulBashar38](https://github.com/AbulBashar38)
- LinkedIn: [Your LinkedIn Profile]

---

Built with ❤️ using Next.js and modern web technologies.
