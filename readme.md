# রক্ত (Rokto) - Blood Donation Management System

![রক্ত Logo](./public/logo.svg)

### A Modern Blood Donation Management Platform for Bangladesh

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)](https://www.mongodb.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.8-purple)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 Overview

**রক্ত (Rokto)** is a comprehensive, real-time blood donation management system designed specifically for Bangladesh. Built with modern web technologies, it connects blood donors with those in need while providing healthcare institutions with efficient blood inventory management tools.

The platform supports Bengali language interface, making it accessible to local communities while maintaining professional healthcare standards.

## ✨ Key Features

### 🩸 **Blood Management**

- **Real-time Blood Inventory** - Track blood units across multiple types (A+, A-, B+, B-, AB+, AB-, O+, O-)
- **Emergency Request System** - Priority handling for urgent blood needs
- **Blood Compatibility Checker** - Interactive compatibility matrix
- **Inventory Alerts** - Automated notifications for low stock levels

### 👥 **Donor Management**

- **Comprehensive Donor Profiles** - Complete donor information with health records
- **Donation History Tracking** - Track all donations with dates and locations
- **Eligibility Verification** - Automated eligibility checks based on last donation
- **Donor Level System** - Bronze, Silver, Gold tier recognition
- **Achievement System** - Gamified experience to encourage regular donations

### 🏥 **Healthcare Integration**

- **Blood Bank Management** - Multi-center support with individual inventories
- **Appointment Scheduling** - Online booking system for donation appointments
- **Request Management** - Blood request handling with priority levels
- **Analytics Dashboard** - Comprehensive insights and reporting

### 👤 **User Experience**

- **Multi-language Support** - Bengali and English interface
- **Mobile-responsive Design** - Optimized for all device sizes
- **Progressive Web App** - App-like experience on mobile devices
- **Real-time Notifications** - Instant updates on requests and appointments

### 🔐 **Security & Authentication**

- **Secure Authentication** - NextAuth.js with multiple providers
- **Role-based Access Control** - Donor, Admin, and Hospital roles
- **Data Encryption** - Sensitive data protection
- **GDPR Compliance** - Privacy-first approach

## 🏗️ Technical Architecture

### **Frontend Stack**

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Charts**: Recharts for data visualization

### **Backend Stack**

- **Runtime**: Node.js with Next.js API routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **Caching**: Redis for performance optimization
- **Email**: Nodemailer for notifications
- **AI Integration**: Google Generative AI for intelligent features

### **Development Tools**

- **Package Manager**: PNPM
- **Type Checking**: TypeScript
- **Code Quality**: ESLint configuration
- **Database Management**: Prisma Studio
- **Development**: Hot reloading with Next.js

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18.x or higher
- PNPM 8.x or higher
- MongoDB 6.x or higher
- Redis (optional, for caching)

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/arafat-ahmed-dev/Blood-Donation-System.git
   cd Blood-Donation-System
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="mongodb://localhost:27017/blood-donation"

   # Authentication
   NEXTAUTH_SECRET="your-super-secret-jwt-key"
   NEXTAUTH_URL="http://localhost:3000"

   # Redis (Optional)
   REDIS_URL="redis://localhost:6379"

   # Email Configuration
   EMAIL_FROM="noreply@rokto.com"
   SMTP_HOST="your-smtp-host"
   SMTP_PORT=587
   SMTP_USER="your-smtp-user"
   SMTP_PASS="your-smtp-password"

   # Google AI (Optional)
   GOOGLE_GENERATIVE_AI_API_KEY="your-api-key"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   pnpm prisma generate

   # Push schema to database
   pnpm prisma db push

   # Seed initial data
   pnpm prisma db seed
   ```

5. **Development Server**

   ```bash
   pnpm dev
   ```

6. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### **Production Deployment**

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
blood-donation-system/
├── app/                          # Next.js App Router
│   ├── (pages)/                  # Main application pages
│   │   ├── about/               # About page
│   │   ├── appointments/        # Appointment management
│   │   ├── auth/               # Authentication pages
│   │   ├── blood-bank/         # Blood bank management
│   │   ├── donor/              # Donor-related pages
│   │   ├── profile/            # User profile management
│   │   └── request/            # Blood request forms
│   ├── admin/                   # Admin dashboard
│   │   └── dashboard/          # Admin management interface
│   ├── analytics/              # Analytics and reporting
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── donors/            # Donor management APIs
│   │   ├── inventory/         # Blood inventory APIs
│   │   ├── appointments/      # Appointment APIs
│   │   └── notifications/     # Notification system
│   └── globals.css            # Global styles
├── components/                  # Reusable UI components
│   ├── ui/                     # Basic UI components
│   ├── layout/                 # Layout components
│   ├── adminDashboard/         # Admin-specific components
│   ├── analytics/              # Analytics components
│   └── charts/                 # Chart components
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions and configs
│   ├── auth.ts                # Authentication configuration
│   ├── prisma.ts              # Database client
│   ├── utils.ts               # Helper utilities
│   └── constants.ts           # Application constants
├── prisma/                     # Database schema and seeds
│   ├── schema.prisma          # Database schema definition
│   └── seed.ts                # Database seeding script
└── public/                     # Static assets
    ├── images/                # Image assets
    └── logo.svg               # Application logo
```

## 🎯 Core Features Deep Dive

### **Dashboard Analytics**

- **Donor Statistics**: Track active donors, total registrations, and donor retention
- **Donation Trends**: Visual charts showing donation patterns over time
- **Inventory Management**: Real-time blood type availability with predictive alerts
- **Geographic Distribution**: Location-based donor and request mapping

### **Appointment System**

- **Smart Scheduling**: AI-powered slot suggestions based on donor availability
- **Multi-center Support**: Manage appointments across different donation centers
- **Automated Reminders**: Email and SMS notifications for upcoming appointments
- **Wait Time Optimization**: Queue management to minimize donor wait times

### **Emergency Response**

- **Priority Request Handling**: Urgent blood needs get immediate attention
- **Donor Notification System**: Instant alerts to eligible donors in proximity
- **Hospital Integration**: Direct connection with healthcare facilities
- **Real-time Status Updates**: Live tracking of emergency request fulfillment

## 🔒 Security Features

- **Authentication**: Multi-factor authentication with NextAuth.js
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: End-to-end encryption for sensitive information
- **API Security**: Rate limiting and input validation
- **GDPR Compliance**: Privacy controls and data deletion rights
- **Audit Logging**: Comprehensive activity tracking

## � Performance Optimizations

- **Server-Side Rendering (SSR)**: Fast initial page loads
- **Static Site Generation (SSG)**: Pre-rendered pages for better performance
- **Image Optimization**: Automatic image compression and lazy loading
- **Database Indexing**: Optimized queries for faster data retrieval
- **Redis Caching**: Reduced database load with intelligent caching
- **Code Splitting**: Minimal bundle sizes with dynamic imports

## 🌐 Deployment Options

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### **Docker Deployment**

```bash
# Build Docker image
docker build -t blood-donation-system .

# Run container
docker run -p 3000:3000 blood-donation-system
```

### **Traditional Hosting**

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📊 Monitoring & Analytics

- **Application Performance Monitoring (APM)**
- **Error Tracking and Reporting**
- **User Analytics and Behavior Tracking**
- **System Health Monitoring**
- **Database Performance Metrics**

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run integration tests
pnpm test:integration

# Run e2e tests
pnpm test:e2e

# Test coverage
pnpm test:coverage
```

## 🔧 Development Guidelines

### **Code Standards**

- Follow TypeScript best practices
- Use ESLint for code quality
- Implement proper error boundaries
- Write comprehensive JSDoc comments

### **Database Guidelines**

- Use Prisma migrations for schema changes
- Implement proper indexing strategies
- Follow data normalization principles
- Regular backup procedures

### **API Development**

- RESTful API design principles
- Proper HTTP status codes
- Comprehensive error handling
- API documentation with examples

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### **Getting Started**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Write or update tests as needed
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### **Pull Request Guidelines**

- Provide a clear description of changes
- Include relevant test cases
- Update documentation if needed
- Ensure all tests pass
- Follow the existing code style

### **Issue Reporting**

- Use the issue templates provided
- Include steps to reproduce bugs
- Provide environment details
- Add relevant screenshots or logs

## 📈 Roadmap

### **Short Term (Q1 2025)**

- [ ] Mobile application development
- [ ] Advanced analytics dashboard
- [ ] Multi-language support expansion
- [ ] Integration with government health systems

### **Medium Term (Q2-Q3 2025)**

- [ ] AI-powered donor matching
- [ ] Blockchain integration for transparency
- [ ] IoT integration for blood storage monitoring
- [ ] Advanced predictive analytics

### **Long Term (Q4 2025+)**

- [ ] Regional expansion beyond Bangladesh
- [ ] Integration with international blood banks
- [ ] Advanced machine learning for demand prediction
- [ ] Comprehensive mobile health platform

## 🛠️ Troubleshooting

### **Common Issues**

**Database Connection Issues**

```bash
# Check MongoDB connection
pnpm prisma db push

# Reset database
pnpm prisma migrate reset
```

**Build Errors**

```bash
# Clear cache
pnpm store prune

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Environment Variables**

- Ensure all required environment variables are set
- Check variable names match exactly
- Verify database connectivity

## � Support & Contact

- **Documentation**: [docs.rokto.com](https://docs.rokto.com)
- **Community Forum**: [community.rokto.com](https://community.rokto.com)
- **Email Support**: support@rokto.com
- **Emergency Contact**: emergency@rokto.com

### **Development Team**

- **Lead Developer**: [Arafat Ahmed](https://github.com/arafat-ahmed-dev)
- **Project Repository**: [Blood-Donation-System](https://github.com/arafat-ahmed-dev/Blood-Donation-System)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for complete details.

## 🙏 Acknowledgments

- **Next.js Team** - For the incredible React framework
- **Prisma Team** - For the excellent ORM and database toolkit
- **Radix UI** - For accessible and customizable UI components
- **Tailwind CSS** - For the utility-first CSS framework
- **Vercel** - For seamless deployment and hosting
- **MongoDB** - For the robust document database
- **All Contributors** - Who have helped shape this life-saving platform

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=arafat-ahmed-dev/Blood-Donation-System&type=Date)](https://star-history.com/#arafat-ahmed-dev/Blood-Donation-System&Date)

---

**Made with ❤️ for saving lives in Bangladesh**

© 2025 রক্ত (Rokto) Blood Donation System. All rights reserved.
