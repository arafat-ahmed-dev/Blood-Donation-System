# LifeFlow - Blood Donation Management System

LifeFlow is a comprehensive blood donation management system designed to connect blood donors with those in need. The platform facilitates blood donation appointments, manages inventory, tracks donor eligibility, and provides real-time analytics.

![LifeFlow Banner](/placeholder.svg?height=300&width=800)

---

## 🌟 Features

- **🌍 Multi-language Support**: Full support for English and Bengali.
- **🔒 OTP-based Authentication**: Secure authentication using email OTP.
- **🔗 Social Login**: Google authentication integration.
- **🩸 Donor Management**: Track donor profiles, donation history, and eligibility.
- **📅 Appointment Scheduling**: Schedule and manage blood donation appointments.
- **📦 Blood Inventory Management**: Track blood inventory across donation centers.
- **⚡ Urgent Blood Requests**: Process and fulfill urgent blood requests.
- **📊 Analytics Dashboard**: Visualize donation trends and inventory status.
- **🛠️ Admin Dashboard**: Comprehensive tools for system administrators.
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher.
- **MongoDB**: Database for storing application data.
- **Redis**: For OTP storage.
- **SMTP Server**: For email notifications.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/lifeflow.git
   cd lifeflow
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your configuration values.

4. **Set up the database**:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database**:

   ```bash
   npm run seed
   ```

6. **Start the development server**:

   ```bash
   npm run dev
   ```

7. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```plaintext
# Database Configuration
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/lifeflow?retryWrites=true&w=majority"

# Redis Configuration (for OTP)
REDIS_URL="redis://username:password@host:port"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email (SMTP)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@example.com"
SMTP_PASSWORD="your-email-password"

# AI Integration
GEMINI_API_KEY="your-gemini-api-key"

# Application Settings
NODE_ENV="development" # Change to "production" for production deployment
```

---

## 📂 Project Structure

```plaintext
lifeflow/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── admin/            # Admin dashboard pages
│   ├── auth/             # Authentication pages
│   ├── profile/          # User profile pages
│   └── ...               # Other pages
├── components/           # React components
│   ├── admin/            # Admin components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── ui/               # UI components
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and libraries
│   ├── i18n/             # Internationalization
│   ├── prisma.ts         # Prisma client
│   └── ...               # Other utilities
├── prisma/               # Prisma schema and migrations
│   ├── schema.prisma     # Database schema
│   └── ...               # Migrations
├── public/               # Static assets
└── ...                   # Configuration files
```

---

## 🛠️ Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui.
- **Backend**: Next.js API Routes, Prisma ORM.
- **Database**: MongoDB.
- **Authentication**: NextAuth.js, OTP via Email, Google OAuth.
- **Caching**: Redis for OTP storage.
- **Internationalization**: Custom i18n solution.
- **Deployment**: Vercel.

---

## 🗺️ User Roles and Responsibilities

### Donor

- **Register and Login**: Create an account and log in securely.
- **Update Profile**: Maintain personal and health information.
- **Check Eligibility**: Use the eligibility checker to determine donation readiness.
- **Schedule Appointments**: Book appointments for blood donation.
- **Track Donations**: View donation history and upcoming appointments.
- **Respond to Urgent Requests**: Get notified and respond to urgent blood requests.

### Admin

- **Manage Donors**: View and update donor profiles and eligibility.
- **Oversee Appointments**: Approve, reschedule, or cancel appointments.
- **Inventory Management**: Monitor and update blood inventory levels.
- **Handle Urgent Requests**: Process and fulfill urgent blood requests.
- **Generate Reports**: Access analytics and generate reports on donation trends.
- **System Configuration**: Manage application settings and user roles.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.
