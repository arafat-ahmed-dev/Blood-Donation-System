<div align="center">
  <br />
  <a href="https://github.com/your-username/rokto-clone" target="_blank">
    <img src="https://via.placeholder.com/800x400?text=Rokto+Clone+Banner" alt="Project Banner">
  </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=next.js&color=000000" alt="Next.js" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logoColor=white&logo=prisma&color=2D3748" alt="Prisma" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="MongoDB" />
    <img src="https://img.shields.io/badge/-Redis-black?style=for-the-badge&logoColor=white&logo=redis&color=DC382D" alt="Redis" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
  </div>

  <h3 align="center">BloodConnect: A Scalable Blood Donation Management Platform</h3>

  <div align="center">
    Build and manage a secure, scalable blood donation platform with advanced features and modern architecture.
  </div>
</div>

## 📋 Table of Contents

1. 🤖 [Introduction](#-introduction)
2. ⚙️ [Technology Stack](#-technology-stack)
3. 🏗️ [Architecture Design](#-architecture-design)
4. 🔋 [Core Features](#-core-features)
5. 📂 [Project Structure](#-project-structure)
6. 🗂️ [Data Models](#-data-models)
7. 🚀 [Scaling Strategy](#-scaling-strategy)
8. 🌐 [Deployment & DevOps](#-deployment--devops)
9. 🔗 [Links](#-links)

## 🤖 Introduction

BloodConnect is a comprehensive, community-focused blood donation platform connecting donors, recipients, hospitals, and blood banks. The platform emphasizes security, real-time capabilities, and community building while implementing best practices for a scalable, reliable system.

## ⚙️ Technology Stack

- **Frontend**: Next.js (App Router + Server Components)
- **Backend**: Next.js API Routes + Express.js microservices
- **Database**: MongoDB with Prisma ORM
- **Caching/Real-time**: Redis
- **Authentication**: OTP-based (no passwords)
- **Infrastructure**: Docker, Kubernetes for scaling

## 🏗️ Architecture Design

### Multi-Database Approach

1. **Authentication DB** (Redis): OTP storage, session tokens, rate limiting.
2. **User Profile DB** (MongoDB): Basic user information and preferences.
3. **Medical Records DB** (MongoDB): Blood types, donation history, medical eligibility.
4. **Operational DB** (MongoDB): Appointments, inventory management.
5. **Analytics DB** (MongoDB): Anonymized statistics, trends, and reporting.

### Microservices Architecture

```
                   ┌─────────────────────┐
                   │     API Gateway     │
                   │  (Next.js API)      │
                   └─────────────────────┘
                            │
       ┌──────────┬─────────┼─────────┬──────────┐
       │          │         │         │          │
┌──────▼──────┐ ┌─▼───────┐ ┌─▼─────┐ ┌─▼──────┐ ┌─▼─────────┐
│   Auth      │ │ User    │ │ Blood │ │ Notif. │ │ Analytics │
│  Service    │ │ Service │ │Service│ │Service │ │ Service   │
└─────────────┘ └─────────┘ └───────┘ └────────┘ └───────────┘
       │            │          │         │            │
┌──────▼──────┐ ┌───▼─────┐ ┌──▼───────┐ ┌▼────────┐ ┌▼─────────┐
│  Redis DB   │ │ User DB │ │Medical DB│ │Redis Pub│ │Analytics │
│             │ │         │ │          │ │  /Sub   │ │    DB    │
└─────────────┘ └─────────┘ └──────────┘ └─────────┘ └──────────┘
```

### Service Communication

- **REST APIs**: For synchronous requests between services.
- **Redis Pub/Sub**: For real-time events and notifications.
- **Message Queues**: For asynchronous background processes.

## 🔋 Core Features

1. **User Management**: Multi-role system (donors, recipients, hospitals).
2. **Blood Donation Management**: Appointment scheduling, eligibility tracking.
3. **Blood Request System**: Emergency requests, geospatial matching.
4. **Inventory Management**: Real-time stock levels, expiration tracking.
5. **Community Features**: Donor groups, impact visualization, gamification.

## 📂 Project Structure

```
blood-donation-app/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── page.tsx        # Homepage
│   │   ├── auth/           # Authentication pages
│   │   ├── donate/         # Donation flow
│   │   ├── request/        # Blood request flow
│   │   ├── dashboard/      # User dashboard
│   │   └── community/      # Community features
│   ├── components/         # Reusable UI components
│   ├── lib/                # Utility functions and clients
│   ├── services/           # Business logic
│   └── api/                # API routes
├── microservices/          # Separate microservices
│   ├── auth-service/       # OTP authentication service
│   ├── matching-service/   # Donor-request matching service
│   ├── notification-service/ # Push notifications service
│   └── analytics-service/  # Data analytics service
└── docker/                 # Docker configuration
```

## 🗂️ Data Models

### Prisma Schema

```prisma
model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  userId        String    @unique
  email         String    @unique
  phoneNumber   String    @unique
  firstName     String
  lastName      String
  role          String    @default("donor")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  donorProfile  DonorProfile?
  donations     Donation[]
}

model DonorProfile {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  bloodType     String
  eligibility   Boolean   @default(true)
  user          User      @relation(fields: [userId], references: [id])
  userId        String    @unique @db.ObjectId
}

model Donation {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  bloodType     String
  units         Int       @default(1)
  donor         User      @relation(fields: [donorId], references: [id])
  donorId       String    @db.ObjectId
}
```

## 🚀 Scaling Strategy

- **Horizontal Scaling**: Use Kubernetes to scale services independently.
- **Database Optimization**: MongoDB sharding for large datasets, Redis clustering for high availability.
- **Caching**: Leverage Redis for frequently accessed data.

## 🌐 Deployment & DevOps

- **Containerization**: Use Docker for consistent deployments.
- **CI/CD**: Automate pipelines with GitHub Actions.
- **Monitoring**: Use Prometheus and Grafana for performance tracking.

## 🔗 Links

- [Project Repository](https://github.com/your-username/rokto-clone)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Redis Documentation](https://redis.io/docs/)
