import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function purgeDatabase() {
  console.log("Purging all existing data from database...");

  // Delete all records in reverse order of dependencies to avoid foreign key constraints
  await prisma.supportMessage.deleteMany({});
  await prisma.supportTicket.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.healthRecord.deleteMany({});
  await prisma.bloodUsage.deleteMany({});
  await prisma.bloodRequest.deleteMany({});
  await prisma.appointment.deleteMany({});
  await prisma.donation.deleteMany({});
  await prisma.donor.deleteMany({});
  await prisma.bloodInventory.deleteMany({});
  await prisma.hospital.deleteMany({}); // Added missing hospital deletion
  await prisma.donationCenter.deleteMany({});

  console.log("Database purged successfully!");
}

// Location data for Bangladesh
const locationList = [
  {
    city: "Sylhet",
    upazilas: [
      "Sylhet Sadar",
      "South Surma",
      "Osmani Nagar",
      "Beanibazar",
      "Golapganj",
      "Bishwanath",
      "Balaganj",
      "Kanaighat",
      "Zakiganj",
      "Jaintiapur",
      "Companiganj",
      "Gowainghat",
      "Fenchuganj",
    ],
  },
  // ... rest of the locationList remains the same
];

// Function to get a random location from Bangladesh
function getRandomLocation() {
  const cityData = faker.helpers.arrayElement(locationList);
  const city = cityData.city;
  const upazila = faker.helpers.arrayElement(cityData.upazilas);

  return { city, upazila };
}

// Blood type distribution approximating real-world frequencies
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const BLOOD_TYPE_WEIGHTS = [35, 6, 8, 2, 3, 1, 38, 7]; // Percentage distribution

// Function to get weighted random blood type
function getRandomBloodType() {
  const total = BLOOD_TYPE_WEIGHTS.reduce((a, b) => a + b, 0);
  let random = Math.random() * total;

  for (let i = 0; i < BLOOD_TYPES.length; i++) {
    if (random < BLOOD_TYPE_WEIGHTS[i]) {
      return BLOOD_TYPES[i];
    }
    random -= BLOOD_TYPE_WEIGHTS[i];
  }

  return BLOOD_TYPES[0]; // Fallback
}

// Function to calculate donor level based on donations
function calculateDonorLevel(totalDonations: number): string {
  if (totalDonations >= 20) return "Platinum";
  if (totalDonations >= 10) return "Gold";
  if (totalDonations >= 5) return "Silver";
  return "Bronze";
}

// Function to calculate next eligible donation date (3 months after last donation)
function calculateNextEligibleDate(lastDonationDate: Date | null): Date | null {
  if (!lastDonationDate) return null;

  const nextDate = new Date(lastDonationDate);
  nextDate.setMonth(nextDate.getMonth() + 3);
  return nextDate;
}

// Function to calculate age from date of birth
function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
  ) {
    age--;
  }

  return age;
}

// Generate Bangladeshi phone numbers
function generateBangladeshiPhone() {
  const operators = ["013", "014", "015", "016", "017", "018", "019"];
  const operator = faker.helpers.arrayElement(operators);
  const subscriber = faker.string.numeric(8);
  return `+880${operator}${subscriber}`;
}

// Generate Bangladeshi names
function generateBangladeshiName(gender: string): string {
  const maleFirstNames = [
    "Abul",
    "Rahim",
    "Karim",
    "Mohammad",
    "Abdullah",
    "Rahman",
    "Ahmed",
    "Ali",
    "Hasan",
    "Hussain",
    "Ismail",
    "Jamal",
    "Kabir",
    "Mahmud",
    "Mehedi",
    "Nasir",
    "Omar",
    "Rafiq",
    "Saiful",
    "Tanvir",
    "Zahir",
    "Arif",
    "Fahim",
    "Imran",
  ];

  const femaleFirstNames = [
    "Afroza",
    "Amina",
    "Fatima",
    "Farzana",
    "Hasina",
    "Jahanara",
    "Khadija",
    "Laila",
    "Mumtaz",
    "Nasreen",
    "Rahima",
    "Ruksana",
    "Sadia",
    "Salma",
    "Shahnaz",
    "Tahmina",
    "Yasmin",
    "Zainab",
    "Farida",
    "Nargis",
    "Sabina",
    "Najma",
    "Khaleda",
    "Rabeya",
  ];

  const lastNames = [
    "Ahmed",
    "Ali",
    "Begum",
    "Chowdhury",
    "Das",
    "Haque",
    "Hossain",
    "Islam",
    "Khan",
    "Miah",
    "Rahman",
    "Rana",
    "Roy",
    "Sarkar",
    "Siddique",
    "Uddin",
    "Zaman",
    "Akter",
    "Khatun",
    "Sultana",
    "Choudhury",
    "Molla",
    "Sheikh",
    "Mahmud",
  ];

  const firstName =
    gender === "male"
      ? faker.helpers.arrayElement(maleFirstNames)
      : faker.helpers.arrayElement(femaleFirstNames);

  const lastName = faker.helpers.arrayElement(lastNames);

  return `${firstName} ${lastName}`;
}

async function main() {
  console.log("Starting seed for Bangladesh Blood Donation System...");
  await purgeDatabase();
  console.log("Database purged successfully!");

  // Create blood requests from Bangladesh hospitals
  const bangladeshiHospitals = [
    {
      name: "Dhaka Medical College Hospital",
      type: "Government",
      city: "Dhaka",
    },
    // ... rest of the hospital list remains the same
  ];

  // Add more hospitals in other cities
  const additionalHospitals = [
    "General Hospital",
    "District Hospital",
    "Sadar Hospital",
    "Maternity Hospital",
    "Children's Hospital",
    "Medical Center",
    "Community Clinic",
    "Health Complex",
  ];

  for (const location of locationList) {
    if (location.city !== "Dhaka") {
      // Add more hospitals to cities other than Dhaka
      for (let i = 0; i < 2; i++) {
        bangladeshiHospitals.push({
          name: `${location.city} ${faker.helpers.arrayElement(
            additionalHospitals
          )}`,
          type: faker.helpers.arrayElement([
            "Government",
            "Private",
            "Community",
          ]),
          city: location.city,
        });
      }
    }
  }

  const hospitals = [];

  for (const hospitalData of bangladeshiHospitals) {
    const location = getRandomLocation();
    // Make sure the hospital city matches with the city in location data
    const cityMatch = locationList.find(
      (loc) => loc.city === hospitalData.city
    );
    const upazila = cityMatch
      ? faker.helpers.arrayElement(cityMatch.upazilas)
      : location.upazila;

    const hospital = await prisma.hospital.create({
      data: {
        name: hospitalData.name,
        code: `H${faker.string.numeric(4)}`,
        type: hospitalData.type,
        address: faker.location.streetAddress(),
        city: hospitalData.city,
        upazila: upazila,
        zip: faker.string.numeric(4),
        phone: generateBangladeshiPhone(),
        email: faker.internet
          .email({
            firstName: hospitalData.name.toLowerCase().replace(/\s/g, ""),
            lastName: "hospital",
          })
          .toLowerCase(),
        contactPerson: generateBangladeshiName("male"),
        verified: faker.datatype.boolean(0.8), // 80% of hospitals are verified
        createdAt: faker.date.past({ years: 2 }),
        updatedAt: faker.date.recent({ days: 30 }),
      },
    });

    hospitals.push(hospital);
  }

  // Create donation centers across Bangladesh
  const donationCenters = [];
  for (let i = 0; i < 20; i++) {
    const location = getRandomLocation();
    const centerNames = [
      "Red Crescent Blood Center",
      "Community Blood Bank",
      "Medical College Blood Center",
      "General Hospital Blood Bank",
      "Life Saving Blood Donation Center",
      "District Blood Center",
      "Medical Center Blood Bank",
      "Voluntary Blood Donation Society",
      "Central Blood Collection Unit",
      "Health Complex Blood Center",
    ];

    const centerName = `${location.city} ${faker.helpers.arrayElement(
      centerNames
    )}`;

    const center = await prisma.donationCenter.create({
      data: {
        name: centerName,
        address: faker.location.streetAddress(),
        city: location.city,
        upazila: location.upazila,
        email: faker.internet
          .email({
            firstName: location.city.toLowerCase().replace(/\s/g, ""),
            lastName: "bloodcenter",
          })
          .toLowerCase(),
        zip: faker.string.numeric(4),
        phone: generateBangladeshiPhone(),
        hours: "9:00 AM - 5:00 PM",
        waitTime: `${faker.number.int({ min: 5, max: 45 })} minutes`,
        operatingHours:
          "Saturday-Thursday: 9:00 AM - 5:00 PM, Friday: 3:00 PM - 8:00 PM",
        status: faker.helpers.arrayElement(["Open Now", "Closed"]),
        appointments: true,
        walkIns: faker.datatype.boolean(),
      },
    });
    donationCenters.push(center);
  }

  // Create blood inventory for each blood type
  const inventoryItems = [];
  for (const bloodType of BLOOD_TYPES) {
    const units = faker.number.int({ min: 10, max: 100 });
    let status = "Adequate";

    if (units < 20) status = "Low";
    if (units < 10) status = "Critical";

    const inventory = await prisma.bloodInventory.create({
      data: {
        bloodType,
        units,
        status,
      },
    });
    inventoryItems.push(inventory);
  }

  // Create donors and their related records
  const donors = [];
  for (let i = 0; i < 100; i++) {
    const gender = faker.helpers.arrayElement(["male", "female"]);
    const name = generateBangladeshiName(gender);
    const location = getRandomLocation();
    const dateOfBirth = faker.date.birthdate({ min: 18, max: 65, mode: "age" });
    const age = calculateAge(dateOfBirth);
    const totalDonations = faker.number.int({ min: 0, max: 25 });
    const donorLevel = calculateDonorLevel(totalDonations);

    // Determine if this donor has donated before
    const hasDonated = totalDonations > 0;

    // Calculate last donation date if applicable
    let lastDonationDate = null;
    if (hasDonated) {
      lastDonationDate = faker.date.recent({ days: 180 });
    }

    // Calculate next eligible date
    const nextEligibleDate = calculateNextEligibleDate(lastDonationDate);

    const bloodType = getRandomBloodType();

    // Generate Bangladeshi email
    const email = faker.internet
      .email({
        firstName: name.split(" ")[0].toLowerCase(),
        lastName: name.split(" ")[1].toLowerCase(),
        provider: faker.helpers.arrayElement([
          "gmail.com",
          "yahoo.com",
          "hotmail.com",
          "outlook.com",
          "banglamail.com",
        ]),
      })
      .toLowerCase();

    const donor = await prisma.donor.create({
      data: {
        name,
        email,
        phone: generateBangladeshiPhone(),
        address: faker.location.streetAddress(),
        city: location.city,
        upazila: location.upazila,
        zip: faker.string.numeric(4),
        bloodType,
        dateOfBirth,
        age,
        gender,
        lastDonationDate,
        nextEligibleDate,
        totalDonations,
        donorLevel,
        isAdmin: i < 5, // Make the first 5 users admins
        image: faker.image.avatar(),
      },
    });

    donors.push(donor);

    // Create health records for each donor
    const healthRecordCount = faker.number.int({ min: 1, max: 5 });
    for (let j = 0; j < healthRecordCount; j++) {
      await prisma.healthRecord.create({
        data: {
          donorId: donor.id,
          date: faker.date.recent({ days: 365 }),
          hemoglobin: `${faker.number.float({
            min: 12,
            max: 17,
            fractionDigits: 1,
          })} g/dL`,
          bloodPressure:
            `${faker.number.int({ min: 90, max: 140 })}/` +
            `${faker.number.int({ min: 60, max: 90 })} mmHg`,
          pulse: `${faker.number.int({ min: 60, max: 100 })} bpm`,
          weight: `${faker.number.int({ min: 50, max: 100 })} kg`,
          notes: faker.helpers.maybe(() => faker.lorem.sentence(), {
            probability: 0.3,
          }),
        },
      });
    }

    // Create donations for donors who have donated
    if (hasDonated) {
      const donationCount = totalDonations;
      for (let j = 0; j < donationCount; j++) {
        const donationDate = faker.date.past({ years: 3 });
        const centerLocation = faker.helpers.arrayElement(donationCenters);

        await prisma.donation.create({
          data: {
            donationId: `DON-${1000 + i * 10 + j}`,
            donorId: donor.id,
            donationDate,
            location: centerLocation.name,
            bloodType: donor.bloodType,
            units: 1,
            status: faker.helpers.weightedArrayElement([
              { weight: 80, value: "Completed" },
              { weight: 10, value: "Cancelled" },
              { weight: 5, value: "Processing" },
              { weight: 5, value: "Deferred" },
            ]),
            createdAt: donationDate,
            updatedAt: donationDate,
          },
        });
      }
    }

    // Create appointments for some donors
    if (faker.datatype.boolean()) {
      const appointmentDate = faker.date.soon({ days: 30 });
      const centerLocation = faker.helpers.arrayElement(donationCenters);

      await prisma.appointment.create({
        data: {
          appointmentId: `APT-${2000 + i}`,
          donorId: donor.id,
          date: appointmentDate,
          time: faker.helpers.arrayElement([
            "9:00 AM",
            "10:30 AM",
            "1:00 PM",
            "2:30 PM",
            "4:00 PM",
          ]),
          location: centerLocation.name,
          status: faker.helpers.arrayElement(["Confirmed", "Pending"]),
          createdAt: faker.date.recent({ days: 10 }),
          updatedAt: faker.date.recent({ days: 5 }),
        },
      });
    }

    // Create notifications for each donor
    const notificationCount = faker.number.int({ min: 1, max: 5 });
    for (let j = 0; j < notificationCount; j++) {
      const notificationType = faker.helpers.arrayElement([
        "Appointment",
        "Eligibility",
        "Urgent",
        "Achievement",
        "System",
      ]);

      let title, message;
      switch (notificationType) {
        case "Appointment":
          title = "Upcoming Appointment Reminder";
          message =
            "You have an upcoming blood donation appointment. Please remember to stay hydrated and eat a healthy meal before donating.";
          break;
        case "Eligibility":
          title = "Donation Eligibility Update";
          message =
            "You are now eligible to donate blood again. Schedule your next appointment today to help save lives!";
          break;
        case "Urgent":
          title = "Urgent Need for Blood";
          message = `We currently have a critical shortage of ${donor.bloodType} blood type. Please consider donating soon if you are eligible.`;
          break;
        case "Achievement":
          title = "Donation Milestone Achieved";
          message = `Congratulations! You've reached the ${donorLevel} donor level. Thank you for your contributions to saving lives.`;
          break;
        default:
          title = "System Update Notice";
          message =
            "Our donation system has been updated with new features. Check out the changes on your next visit!";
      }

      await prisma.notification.create({
        data: {
          userId: donor.id,
          title,
          message,
          date: faker.date.recent({ days: 30 }),
          read: faker.datatype.boolean(),
          type: notificationType,
        },
      });
    }
  }

  // Create blood requests
  for (let i = 0; i < 30; i++) {
    const location = getRandomLocation();
    const hospital = faker.helpers.arrayElement(hospitals);
    const bloodType = faker.helpers.arrayElement(BLOOD_TYPES);
    const urgency = faker.helpers.arrayElement([
      "Critical",
      "High",
      "Medium",
      "Low",
    ]);
    const units =
      urgency === "Critical"
        ? faker.number.int({ min: 3, max: 10 })
        : faker.number.int({ min: 1, max: 5 });

    await prisma.bloodRequest.create({
      data: {
        requestId: `REQ-${1000 + i}`,
        hospitalId: hospital.id,
        bloodType,
        units,
        urgency,
        requestedDate: faker.date.recent({ days: 14 }),
        status: faker.helpers.arrayElement([
          "Pending",
          "Processing",
          "Fulfilled",
          "Cancelled",
        ]),
        contactName: generateBangladeshiName(
          faker.helpers.arrayElement(["male", "female"])
        ),
        contactPhone: generateBangladeshiPhone(),
        notes: faker.helpers.maybe(() => faker.lorem.sentence(), {
          probability: 0.3,
        }),
        createdAt: faker.date.recent({ days: 20 }),
        updatedAt: faker.date.recent({ days: 10 }),
      },
    });
  }

  // Create blood usage records
  // FIXED: Make sure hospitalId is provided since it's required in the schema
  for (const inventory of inventoryItems) {
    const usageCount = faker.number.int({ min: 2, max: 10 });

    for (let i = 0; i < usageCount; i++) {
      const hospital = faker.helpers.arrayElement(hospitals);

      await prisma.bloodUsage.create({
        data: {
          inventoryId: inventory.id,
          usageDate: faker.date.recent({ days: 30 }),
          units: faker.number.int({ min: 1, max: 3 }),
          purpose: faker.helpers.arrayElement([
            "Surgery",
            "Road Accident",
            "Cancer Treatment",
            "Childbirth Complications",
            "Thalassemia Patient",
            "Anemia Treatment",
            "Dengue Fever",
            "Kidney Dialysis",
            "Heart Surgery",
            "Burn Victim",
            "Emergency Transfusion",
          ]),
          hospitalId: hospital.id, // FIXED: Providing a valid hospitalId
          requestId: null, // This can remain null as it's optional in the schema
        },
      });
    }
  }

  // Create support tickets and messages
  const ticketSubjects = [
    "Unable to schedule appointment",
    "Need to update my blood type information",
    "Question about donation eligibility",
    "How to get my donation certificate",
    "Issue with donation records",
    "Need help finding the nearest donation center",
    "Donation reminder SMS not received",
    "Want to organize a blood donation camp",
    "Problem with donor registration",
    "Need urgent blood for family member",
  ];

  for (let i = 0; i < 25; i++) {
    const donor = faker.helpers.arrayElement(donors);
    const createdAt = faker.date.recent({ days: 30 });

    const ticket = await prisma.supportTicket.create({
      data: {
        userId: donor.id,
        subject: faker.helpers.arrayElement(ticketSubjects),
        message: faker.lorem.paragraph(),
        category: faker.helpers.arrayElement([
          "General",
          "Technical",
          "Donation",
          "Appointment",
          "Account",
          "Other",
        ]),
        priority: faker.helpers.arrayElement(["Low", "Medium", "High"]),
        status: faker.helpers.arrayElement([
          "Open",
          "In Progress",
          "Resolved",
          "Closed",
        ]),
        createdAt,
        updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
      },
    });

    // Add messages to the ticket
    const messageCount = faker.number.int({ min: 1, max: 5 });
    let lastMessageDate = createdAt;

    for (let j = 0; j < messageCount; j++) {
      const isStaff = j % 2 === 1; // Alternate between user and staff messages
      const messageDate = faker.date.between({
        from: lastMessageDate,
        to: new Date(),
      });

      await prisma.supportMessage.create({
        data: {
          ticketId: ticket.id,
          userId: isStaff ? donors[0].id : donor.id, // Use first donor as staff for simplicity
          message: faker.lorem.paragraph(),
          isStaff,
          createdAt: messageDate,
        },
      });

      lastMessageDate = messageDate;
    }
  }

  console.log(
    "Seed completed successfully for Bangladesh Blood Donation System!"
  );
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
