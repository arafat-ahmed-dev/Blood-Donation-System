# Blood Donation System - Project Tree Structure & Workflow

## 🏗️ Project Architecture Overview

This is a modern **Next.js 15** Blood Donation Management System called **"Rokto Shetu"** (Blood Bridge in Bengali), built with TypeScript, Prisma ORM, and a comprehensive set of modern web technologies.

## 📂 Project Tree Structure

```
Blood-Donation-System/
├── 📋 Configuration Files
│   ├── components.json           # Shadcn/ui configuration
│   ├── next.config.mjs          # Next.js configuration
│   ├── next-auth.d.ts           # NextAuth type definitions
│   ├── next-env.d.ts            # Next.js environment types
│   ├── package.json             # Dependencies and scripts
│   ├── pnpm-lock.yaml          # Package manager lock file
│   ├── postcss.config.mjs      # PostCSS configuration
│   ├── tailwind.config.ts      # Tailwind CSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── PROJECT_ANALYSIS.md     # Project analysis document
│   └── readme.md               # Project documentation
│
├── 🎨 Styling
│   ├── app/globals.css         # Global styles
│   └── styles/globals.css      # Additional global styles
│
├── 🌐 Application Routes (Next.js App Router)
│   └── app/
│       ├── layout.tsx          # Root layout component
│       ├── loading.tsx         # Global loading component
│       ├── page.tsx            # Home page (main landing)
│       │
│       ├── 🔐 Authentication
│       │   └── auth/
│       │       └── page.tsx    # Login/Register page
│       │
│       ├── 📄 Public Pages
│       │   ├── about/
│       │   │   └── page.tsx    # About us page
│       │   ├── blog/
│       │   │   └── page.tsx    # Blog/News page
│       │   ├── blood-education/
│       │   │   └── page.tsx    # Educational content
│       │   ├── donation-centers/
│       │   │   └── page.tsx    # Donation center locations
│       │   └── eligibility/
│       │       └── page.tsx    # Donation eligibility checker
│       │
│       ├── 🩸 Blood Services
│       │   ├── request/
│       │   │   ├── page.tsx    # Blood request form page
│       │   │   └── BloodRequestForm.tsx
│       │   ├── blood-bank/
│       │   │   ├── page.tsx    # Blood bank directory
│       │   │   └── loading.tsx
│       │   ├── urgent-request/
│       │   │   └── page.tsx    # Urgent blood requests
│       │   └── become-blood-donor/
│       │       └── page.tsx    # Donor registration
│       │
│       ├── 👤 User Features
│       │   ├── profile/
│       │   │   ├── page.tsx    # User profile page
│       │   │   ├── loading.tsx
│       │   │   └── ProfileClient.tsx
│       │   ├── appointments/
│       │   │   └── page.tsx    # Donation appointments
│       │   ├── donor/search/   # Donor search functionality
│       │   └── verify/
│       │       └── page.tsx    # Account verification
│       │
│       ├── 📊 Analytics & Reports
│       │   └── analytics/
│       │       ├── page.tsx    # Analytics dashboard
│       │       └── loading.tsx
│       │
│       ├── 👨‍💼 Admin Panel
│       │   └── admin/
│       │       └── dashboard/  # Admin dashboard components
│       │
│       ├── 📊 Data Management
│       │   └── data/
│       │       └── analytics/  # Analytics data processing
│       │
│       └── 🔌 API Routes (Backend)
│           └── api/
│               ├── 🔐 Authentication
│               │   └── auth/
│               │       ├── register/route.ts    # User registration
│               │       ├── login/route.ts       # User login
│               │       └── [...nextauth]/route.ts # NextAuth handler
│               │
│               ├── 👥 User Management
│               │   ├── user/route.ts           # User profile CRUD
│               │   ├── donors/
│               │   │   ├── route.ts            # Donors listing/search
│               │   │   └── [id]/route.ts       # Individual donor
│               │   └── health-records/route.ts # Health records
│               │
│               ├── 🩸 Blood Services
│               │   ├── requests/route.ts       # Blood requests CRUD
│               │   ├── donations/route.ts      # Donation records
│               │   ├── appointments/route.ts   # Appointment scheduling
│               │   ├── inventory/route.ts      # Blood inventory
│               │   └── blood-banks/route.ts    # Blood bank management
│               │
│               ├── 📊 Analytics & Insights
│               │   └── analytics/
│               │       ├── route.ts            # Main analytics
│               │       ├── summary/route.ts    # Analytics summary
│               │       └── ai-insights/route.ts # AI-powered insights
│               │
│               ├── 🔔 Notifications
│               │   └── notifications/route.ts  # Notification system
│               │
│               ├── 🏆 Gamification
│               │   └── achievements/route.ts   # Achievement system
│               │
│               ├── 🎯 Utilities
│               │   ├── seed/route.ts          # Database seeding
│               │   └── support/               # Support system
│               │       ├── create-ticket/route.ts
│               │       ├── get-ticket/route.ts
│               │       ├── get-tickets/route.ts
│               │       └── add-message/route.ts
│
├── 🧩 Components Architecture
│   └── components/
│       ├── 🎨 UI Components (Shadcn/ui)
│       │   └── ui/
│       │       ├── accordion.tsx, alert-dialog.tsx, alert.tsx
│       │       ├── avatar.tsx, badge.tsx, breadcrumb.tsx
│       │       ├── button.tsx, calendar.tsx, card.tsx
│       │       ├── carousel.tsx, chart.tsx, checkbox.tsx
│       │       ├── collapsible.tsx, command.tsx, context-menu.tsx
│       │       ├── dialog.tsx, drawer.tsx, dropdown-menu.tsx
│       │       ├── form.tsx, hover-card.tsx, input.tsx
│       │       ├── label.tsx, menubar.tsx, navigation-menu.tsx
│       │       ├── pagination.tsx, popover.tsx, progress.tsx
│       │       ├── radio-group.tsx, resizable.tsx, scroll-area.tsx
│       │       ├── select.tsx, separator.tsx, sheet.tsx
│       │       ├── skeleton.tsx, slider.tsx, switch.tsx
│       │       ├── table.tsx, tabs.tsx, textarea.tsx
│       │       ├── toast.tsx, toggle.tsx, tooltip.tsx
│       │       └── use-toast.ts
│       │
│       ├── 📊 Charts & Visualization
│       │   └── charts.tsx                     # Chart.js components
│       │
│       ├── 🏠 Home Page Components
│       │   └── home/
│       │       └── HowItWorksSection.tsx
│       │
│       ├── 🔐 Authentication Components
│       │   └── auth/
│       │       └── auth-form.tsx             # Login/Register forms
│       │
│       ├── 📅 Appointment Management
│       │   └── appointments/
│       │       └── appointment-form.tsx
│       │
│       ├── 👤 Profile Management
│       │   ├── profile/                      # User profile components
│       │   └── ProfileSettings.tsx
│       │
│       ├── ✅ Eligibility System
│       │   └── eligibility/                  # Donation eligibility
│       │
│       ├── 🔔 Notifications
│       │   └── notifications/                # Notification components
│       │
│       ├── 🎯 Support System
│       │   └── support/                      # Help & support
│       │
│       ├── 👨‍💼 Admin Dashboard
│       │   └── adminDashboard/
│       │       ├── Header.tsx, SideBar.tsx   # Layout components
│       │       ├── Overview.tsx              # Dashboard overview
│       │       ├── Appointments.tsx          # Appointment management
│       │       ├── Centers.tsx               # Center management
│       │       ├── Donors.tsx                # Donor management
│       │       ├── Inventory.tsx             # Inventory management
│       │       ├── Reports.tsx               # Report generation
│       │       ├── Requests.tsx              # Request management
│       │       └── Settings.tsx              # Admin settings
│       │
│       ├── 📊 Analytics Components
│       │   └── analytics/
│       │       ├── donation-trends.tsx       # Donation analytics
│       │       ├── donor-retention.tsx       # Retention metrics
│       │       ├── inventory-status.tsx      # Stock levels
│       │       ├── inventory-usage.tsx       # Usage patterns
│       │       └── overview-card.tsx         # Summary cards
│       │
│       ├── 🌐 Layout Components
│       │   ├── layout/
│       │   │   ├── clientLayout.tsx          # Client-side layout
│       │   │   └── layout/
│       │   │       ├── Pagination.tsx        # Pagination component
│       │   │       └── how-it-works.tsx      # How it works section
│       │   ├── language-switcher.tsx         # i18n language switcher
│       │   ├── Provider.tsx                  # Global providers
│       │   └── theme-provider.tsx            # Theme management
│       │
│       └── 🎨 Enhanced UI (v2 Components)
│           └── v2/
│               ├── components/
│               │   ├── 🎯 Layout
│               │   │   ├── layout/
│               │   │   │   ├── header/       # Navigation header
│               │   │   │   └── footer/       # Site footer
│               │   │   └── theme-provider.tsx
│               │   │
│               │   ├── 📄 Page Sections
│               │   │   └── sections/
│               │   │       ├── hero.tsx              # Landing hero
│               │   │       ├── statistics.tsx        # Stats display
│               │   │       ├── how-it-works.tsx      # Process explanation
│               │   │       ├── emergency-requests.tsx # Urgent needs
│               │   │       ├── featured-donors.tsx   # Donor highlights
│               │   │       ├── testimonials.tsx      # User reviews
│               │   │       ├── blood-compatibility.tsx # Blood type info
│               │   │       └── cta.tsx               # Call to action
│               │   │
│               │   └── 🎨 Enhanced UI Components
│               │       └── ui/ [Same as main ui/ but enhanced versions]
│               │
│               ├── 🎣 Custom Hooks
│               │   └── hooks/
│               │       ├── use-mobile.tsx            # Mobile detection
│               │       ├── use-toast.ts              # Toast notifications
│               │       ├── useAnalytics.ts           # Analytics tracking
│               │       ├── useOffline.ts             # Offline detection
│               │       ├── useTheme.tsx              # Theme management
│               │       ├── useTranslation.ts         # i18n hooks
│               │       ├── useTranslation.tsx        # i18n context
│               │       └── useVoiceSearch.ts         # Voice search
│               │
│               ├── 🌐 Internationalization
│               │   ├── lib/
│               │   │   ├── translations.ts           # Translation utilities
│               │   │   ├── utils.ts                  # Helper functions
│               │   │   └── translations/sections/    # Section translations
│               │   │       ├── hero.ts, statistics.ts
│               │   │       ├── how-it-works.ts, emergency-requests.ts
│               │   │       ├── featured-donors.ts, testimonials.ts
│               │   │       ├── blood-compatibility.ts, cta.ts
│               │   │       ├── header.ts, footer.ts
│               │   │       └── index.ts
│               │   │
│               │   └── translations/
│               │       ├── en.ts                     # English translations
│               │       └── bn.ts                     # Bengali translations
│               │
│               └── 🔧 Type Definitions
│                   └── types/
│                       └── speech-recognition.d.ts   # Speech API types
│
├── 🎣 Custom Hooks
│   └── hooks/
│       ├── use-mobile.tsx                    # Mobile device detection
│       ├── useAnalytics.ts                   # Analytics integration
│       ├── useAppointments.ts                # Appointment management
│       ├── useAuth.ts                        # Authentication state
│       ├── useBloodRequests.ts               # Blood request management
│       ├── useDonations.ts                   # Donation tracking
│       ├── useDonors.ts                      # Donor management
│       ├── useInventory.ts                   # Inventory management
│       ├── useNotifications.ts               # Notification system
│       └── useProfile.ts                     # User profile management
│
├── 🔧 Core Libraries & Utilities
│   └── lib/
│       ├── 🔐 Authentication & Security
│       │   ├── auth.ts                       # NextAuth configuration
│       │   ├── auth-errors.ts                # Auth error handling
│       │   ├── data-encryption-utils.ts      # Data encryption
│       │   └── otp.ts                        # OTP service
│       │
│       ├── 📊 Data Management
│       │   ├── prisma.ts                     # Prisma client
│       │   ├── data.ts                       # Data utilities
│       │   ├── adminData.ts                  # Admin-specific data
│       │   └── store.ts                      # State management
│       │
│       ├── 🌐 External Services
│       │   ├── axios.ts                      # HTTP client configuration
│       │   ├── email.ts                      # Email service
│       │   └── gemini.ts                     # AI insights (Google Gemini)
│       │
│       ├── 🛠️ Utilities
│       │   ├── utils.ts                      # General utilities
│       │   ├── constants.ts                  # App constants
│       │   ├── api-error-handler.ts          # API error handling
│       │   └── export-utils.ts               # Data export utilities
│
├── 🗄️ Database & Schema
│   └── prisma/
│       ├── schema.prisma                     # Database schema definition
│       └── seed.ts                           # Database seeding script
│
└── 🎨 Static Assets
    └── public/
        ├── logo.svg, placeholder-logo.png    # Branding assets
        ├── placeholder-logo.svg, placeholder-user.jpg
        ├── placeholder.jpg, placeholder.svg   # Placeholder images
        └── images/                           # Additional images
```

## 🔄 Application Workflow

### 1. **User Authentication Flow**

```
Registration → Email Verification → Profile Setup → Dashboard Access
     ↓              ↓                    ↓              ↓
   OTP Send → OTP Verification → Complete Profile → Home Dashboard
```

### 2. **Blood Request Process**

```
User Need → Search Donors → Contact Donor → Schedule Appointment → Donation → Record Update
     ↓           ↓              ↓               ↓              ↓           ↓
  Emergency → Find Match → Direct Contact → Meet at Center → Complete → Update Inventory
```

### 3. **Donor Registration & Management**

```
Sign Up → Health Screening → Eligibility Check → Profile Activation → Available for Requests
    ↓           ↓                ↓                ↓                    ↓
  Form → Medical History → Auto Validation → Email Verification → Listed in Search
```

### 4. **Admin Management Workflow**

```
Admin Login → Dashboard Overview → Manage Resources → Monitor Activities → Generate Reports
     ↓              ↓                    ↓               ↓               ↓
  Auth Check → View Analytics → CRUD Operations → Real-time Updates → Export Data
```

## 🛠️ Technology Stack

### **Frontend**

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Chart.js + Recharts
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation

### **Backend**

- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **Caching**: Redis (IORedis)
- **Email**: Nodemailer
- **AI Integration**: Google Gemini AI

### **Development Tools**

- **Package Manager**: PNPM
- **Type Checking**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier (implied)
- **Database**: Prisma CLI

### **Key Features Implemented**

1. **🔐 Multi-role Authentication** (Donor, Admin, Hospital)
2. **🩸 Blood Request & Donation Management**
3. **📅 Appointment Scheduling System**
4. **📊 Real-time Analytics Dashboard**
5. **🔔 Notification System**
6. **🌐 Multilingual Support** (English/Bengali)
7. **📱 Responsive Mobile-first Design**
8. **🏆 Gamification & Achievement System**
9. **🎯 AI-powered Insights**
10. **📋 Comprehensive Admin Panel**

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PNPM package manager
- MongoDB database
- Redis server (optional for caching)

### Installation & Setup

```bash
# Clone repository
git clone <repository-url>

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local

# Setup database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development server
pnpm dev
```

### Environment Variables Required

```env
# Database
DATABASE_URL="mongodb://..."
DIRECT_URL="mongodb://..."

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Redis (optional)
REDIS_URL="redis://localhost:6379"

# Email Service
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

# AI Integration
GEMINI_API_KEY="your-gemini-key"
```

## 📋 API Endpoints Overview

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET/POST /api/auth/[...nextauth]` - NextAuth handler

### User Management

- `GET/PUT /api/user` - User profile
- `GET /api/donors` - Search donors
- `GET /api/donors/[id]` - Individual donor

### Blood Services

- `GET/POST /api/requests` - Blood requests
- `GET/POST /api/donations` - Donation records
- `GET/POST /api/appointments` - Appointments
- `GET /api/inventory` - Blood inventory
- `GET /api/blood-banks` - Blood banks

### Analytics & Insights

- `GET /api/analytics` - Main analytics
- `GET /api/analytics/summary` - Summary data
- `GET /api/analytics/ai-insights` - AI insights

This architecture provides a scalable, maintainable, and feature-rich blood donation management system with modern web development practices and comprehensive functionality for all stakeholders.
