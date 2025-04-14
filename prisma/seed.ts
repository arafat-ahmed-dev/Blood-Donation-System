import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@example.com",
      password: "hashedpassword",
      donorProfile: {
        create: {
          bloodGroup: "O+",
          location: "Dhaka",
        },
      },
    },
  });

  await prisma.bloodRequest.create({
    data: {
      userId: user.id,
      bloodGroup: "A+",
      location: "Chittagong",
    },
  });

  console.log("Database seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
