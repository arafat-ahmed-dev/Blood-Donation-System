# Rokto Shetu - Blood Donation Management System

Rokto Shetu is a modern, scalable blood donation management system built with Next.js 15, TypeScript, and MongoDB. The system helps manage blood donations, track inventory, and connect donors with hospitals efficiently.

## 🚀 Features

- **User Authentication & Authorization**

  - Secure login/signup with NextAuth.js
  - Role-based access control (Donors, Hospitals, Admins)
  - Profile management

- **Donor Management**

  - Donor registration and profiles
  - Donation history tracking
  - Health records management
  - Donation eligibility tracking

- **Blood Inventory Management**

  - Real-time blood inventory tracking
  - Blood type availability monitoring
  - Inventory status alerts (Adequate, Low, Critical)

- **Appointment System**

  - Online appointment scheduling
  - Multiple donation center support
  - Wait time tracking
  - Appointment reminders

- **Hospital Integration**

  - Hospital registration and verification
  - Blood request management
  - Usage tracking
  - Emergency request handling

- **Support System**
  - Ticket-based support system
  - Real-time messaging
  - Priority-based ticket handling
  - Support history tracking

## 🛠️ Tech Stack

- **Frontend**

  - Next.js 15
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Radix UI Components
  - React Hook Form
  - Zod Validation

- **Backend**

  - Next.js API Routes
  - Prisma ORM
  - MongoDB
  - NextAuth.js
  - Redis (Caching)

- **Development Tools**
  - TypeScript
  - ESLint
  - Prettier
  - PNPM Package Manager

## 📋 Prerequisites

- Node.js 18.x or later
- PNPM 8.x or later
- MongoDB 6.x or later
- Redis (optional, for caching)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/blood-donation-system.git
   cd blood-donation-system
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
   DATABASE_URL="mongodb://localhost:27017/blood-donation"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   REDIS_URL="redis://localhost:6379"
   ```

4. **Set up the database**

   ```bash
   pnpm prisma generate
   pnpm prisma db push
   pnpm prisma db seed
   ```

5. **Run the development server**

   ```bash
   pnpm dev
   ```

6. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

## 📁 Project Structure

```
├── app/                 # Next.js app directory
├── components/         # Reusable UI components
├── lib/               # Utility functions and configurations
├── prisma/            # Database schema and migrations
├── public/            # Static assets
├── styles/            # Global styles
└── types/             # TypeScript type definitions
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Rate limiting
- Input validation with Zod
- CORS protection
- XSS protection

## 📈 Performance Optimizations

- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Redis caching
- Database indexing
- Lazy loading components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- All contributors who have helped shape this project

## 📞 Support

For support, email support@Rokto Shetu.com or create a support ticket in the system.
