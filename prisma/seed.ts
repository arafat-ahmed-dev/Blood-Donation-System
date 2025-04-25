import { PrismaClient, BloodType } from "@prisma/client";
import { locationList } from "../src/lib/data";

const prisma = new PrismaClient();

// Helper function to generate random date within a range
function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Blood types (use the BloodType enum)
const bloodTypes = [
  BloodType.O_POSITIVE,
  BloodType.O_NEGATIVE,
  BloodType.A_POSITIVE,
  BloodType.A_NEGATIVE,
  BloodType.B_POSITIVE,
  BloodType.B_NEGATIVE,
  BloodType.AB_POSITIVE,
  BloodType.AB_NEGATIVE,
];

// City coordinates for location diversity
const cityCoordinates = locationList.flatMap((cityData) => 
  cityData.upazilas.map((upazila, index) => ({
    city: cityData.city,
    upazila: upazila,
    address: `${upazila} Road #${index + 1}`,
  }))
);

async function main() {
  console.log(`Start seeding ...`);

  // Clear existing data
  await prisma.notification.deleteMany({});
  await prisma.donation.deleteMany({});
  await prisma.bloodRequest.deleteMany({});
  await prisma.user.deleteMany({});

  // ======== DONORS ========
  // Create 50 donors
  const donors = await Promise.all(
    Array.from({ length: 100 }, (_, i) => {
      const firstName = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'James', 'Jennifer', 'Robert', 'Jessica'][i % 10];
      const lastName = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'][Math.floor(i / 5) % 10];
      const gender = i % 3 === 0 ? 'Male' : i % 3 === 1 ? 'Female' : 'Other';
      const bloodType = bloodTypes[i % bloodTypes.length]; // Use BloodType enum
      const location = cityCoordinates[i % cityCoordinates.length];

      // 70% of donors are eligible
      const eligibility = Math.random() < 0.7;
      const nextEligibleDate = eligibility
        ? null
        : randomDate(
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
          );

      return prisma.user.create({
        data: {
          userId: `donor-${(i + 1).toString().padStart(3, '0')}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@example.com`,
          phoneNumber: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          firstName,
          lastName,
          dateOfBirth: randomDate(new Date(1970, 0, 1), new Date(2000, 11, 31)),
          gender,
          role: 'donor',
          bloodType, // Use enum value
          location: {
            create: {
              city: location.city,
              upazila: location.upazila,
              address: location.address,
            }
          },
          eligibility,
          nextEligibleDate,
        },
      });
    })
  );

  // ======== RECIPIENTS ========
  // Create 15 hospitals/blood banks
  const medicalFacilities = await Promise.all(
    Array.from({ length: 30 }, (_, i) => {
      const isHospital = i < 10; // First 10 are hospitals, rest are blood banks
      const firstName = isHospital
        ? ['Mercy', 'Central', 'Memorial', 'General', 'University', 'Regional', 'Community', 'Saint', 'Valley', 'Metro'][i % 10]
        : ['National', 'Regional', 'Community', 'American', 'United'][i % 5];

      const lastName = isHospital
        ? ['Hospital', 'Medical Center', 'Health', 'Healthcare', 'Medical'][i % 5]
        : ['Blood Bank', 'Blood Services', 'Blood Center', 'Blood Alliance', 'Blood Donation Center'][i % 5];

      const location = cityCoordinates[i % cityCoordinates.length];
      const bloodType = BloodType.O_NEGATIVE; // Universal receiver

      return prisma.user.create({
        data: {
          userId: isHospital ? `hospital-${(i + 1).toString().padStart(3, '0')}` : `bloodbank-${(i - 9).toString().padStart(3, '0')}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(' ', '')}${i + 1}@example.com`,
          phoneNumber: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          firstName,
          lastName,
          dateOfBirth: randomDate(new Date(1950, 0, 1), new Date(1990, 11, 31)),
          gender: 'Other',
          role: 'recipient',
          bloodType, // Use enum value
          location: {
            create: {
              city: location.city,
              upazila: location.upazila,
              address: location.address,
            }
          },
          eligibility: true,
          nextEligibleDate: null,
        },
      });
    })
  );

  // Create 20 individual patients
  const patients = await Promise.all(
    Array.from({ length: 30 }, (_, i) => {
      const firstName = ['Robert', 'Patricia', 'Thomas', 'Barbara', 'Christopher', 'Elizabeth', 'Daniel', 'Jennifer', 'Paul', 'Maria'][i % 10];
      const lastName = ['Anderson', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker'][i % 10];
      const gender = i % 3 === 0 ? 'Male' : i % 3 === 1 ? 'Female' : 'Other';
      const bloodType = bloodTypes[i % bloodTypes.length]; // Use BloodType enum
      const location = cityCoordinates[i % cityCoordinates.length];

      return prisma.user.create({
        data: {
          userId: `patient-${(i + 1).toString().padStart(3, '0')}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 100}@example.com`,
          phoneNumber: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          firstName,
          lastName,
          dateOfBirth: randomDate(new Date(1950, 0, 1), new Date(2005, 11, 31)),
          gender,
          role: 'recipient',
          bloodType, // Use BloodType enum
          location: {
            create: {
              city: location.city,
              upazila: location.upazila,
              address: location.address,
            }
          },
          eligibility: true,
          nextEligibleDate: null,
        },
      });
    })
  );

  // Combine all recipients
  const recipients = [...medicalFacilities, ...patients];

  // ======== BLOOD REQUESTS ========
  // Create 40 blood requests
  const requests = await Promise.all(
    Array.from({ length: 40 }, (_, i) => {
      const recipient = recipients[i % recipients.length];
      const bloodType = i < 5 ? recipient.bloodType : bloodTypes[i % bloodTypes.length]; // Use BloodType enum
      const urgencyLevels = ['low', 'medium', 'high', 'critical'];
      const urgency = urgencyLevels[Math.floor(Math.random() * urgencyLevels.length)];

      const unitsRequired = Math.floor(Math.random() * 5) + 1;
      // For variety in statuses
      const unitsReceived =
        Math.random() < 0.6
          ? Math.floor(Math.random() * unitsRequired)
          : Math.random() < 0.2
          ? unitsRequired
          : 0;

      let status;
      if (unitsReceived === 0) {
        status = 'pending';
      } else if (unitsReceived < unitsRequired) {
        status = 'in-progress';
      } else {
        status = 'completed';
      }

      // For time variety: some in past, some in future
      const dayOffset = Math.floor(Math.random() * 20) - 5; // -5 to +14 days
      const requiredBy =
        dayOffset < 0
          ? new Date(Date.now() + dayOffset * 24 * 60 * 60 * 1000)
          : new Date(Date.now() + (dayOffset + 1) * 24 * 60 * 60 * 1000);

      return prisma.bloodRequest.create({
        data: {
          requestId: `req-${(i + 1).toString().padStart(3, '0')}`,
          bloodType, // Use enum value
          unitsRequired,
          unitsReceived,
          urgency,
          status,
          requiredBy,
          recipientId: recipient.id,
        },
      });
    })
  );

  // ======== DONATIONS ========
  // Create 60 donations (mix of completed, scheduled, and canceled)
  const donations = await Promise.all(
    Array.from({ length: 60 }, (_, i) => {
      const donor = donors[i % donors.length];
      const bloodType = donor.bloodType; // Use BloodType enum
      const units = 1; // Standard donation amount

      // Status distribution: 60% completed, 30% scheduled, 10% canceled
      const statusRandom = Math.random();
      const status = statusRandom < 0.6 ? 'completed' : statusRandom < 0.9 ? 'scheduled' : 'canceled';

      // Determine if this donation will be associated with a request
      const hasRequest = Math.random() < 0.7; // 70% have a request

      // For variety in dates
      const dayOffset =
        status === 'completed' || status === 'canceled'
          ? -Math.floor(Math.random() * 30) // Completed/canceled in past
          : Math.floor(Math.random() * 14) + 1; // Scheduled in future

      const appointmentDate = new Date(Date.now() + dayOffset * 24 * 60 * 60 * 1000);

      // Only completed donations have completion dates
      const completionDate =
        status === 'completed'
          ? new Date(appointmentDate.getTime() + (Math.random() * 3 + 1) * 60 * 60 * 1000) // 1-4 hours after appointment
          : null;

      // Find a compatible request if needed
      let requestId = null;
      if (hasRequest && status !== 'canceled') {
        const compatibleRequests = requests.filter(
          (req) =>
            req.bloodType === bloodType &&
            req.status !== 'completed' &&
            (status === 'completed'
              ? req.requiredBy && new Date(req.requiredBy) > appointmentDate // For completed donations, request due date must be after appointment
              : true) // For scheduled donations, any non-completed request is valid
        );

        if (compatibleRequests.length > 0) {
          const request = compatibleRequests[Math.floor(Math.random() * compatibleRequests.length)];
          requestId = request.id;
        }
      }

      return prisma.donation.create({
        data: {
          donationId: `don-${(i + 1).toString().padStart(3, '0')}`,
          units,
          bloodType, // Use BloodType enum
          status,
          appointmentDate,
          completionDate,
          donorId: donor.id,
          requestId,
        },
      });
    })
  );

  // ======== NOTIFICATIONS ========
  // Create 100 notifications
  await Promise.all(
    Array.from({ length: 100 }, (_, i) => {
      // Decide who gets the notification
      const userPool = [...donors, ...recipients];
      const user = userPool[Math.floor(Math.random() * userPool.length)];

      // Types of notifications
      const notificationTypes = [
        { type: 'donation', title: 'Donation Reminder', message: 'You have an upcoming donation appointment.' },
        { type: 'donation', title: 'Donation Complete', message: 'Thank you for your recent blood donation!' },
        { type: 'request', title: 'Blood Request Update', message: 'Your blood request status has been updated.' },
        { type: 'request', title: 'Urgent Blood Need', message: 'There is an urgent need for your blood type in your area.' },
        { type: 'system', title: 'Profile Updated', message: 'Your profile information has been updated successfully.' },
        { type: 'system', title: 'Eligibility Status', message: 'Your donation eligibility status has been updated.' },
        { type: 'alert', title: 'Critical Blood Shortage', message: 'Critical shortage of blood in your area. Please consider donating.' },
        { type: 'reminder', title: 'Next Eligible Date', message: 'You will be eligible to donate blood again soon.' },
      ];

      const notificationType = notificationTypes[i % notificationTypes.length];

      // 60% of notifications are read
      const isRead = Math.random() < 0.6;

      // Notification date - random in the past 30 days
      const daysAgo = Math.floor(Math.random() * 30);
      const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

      return prisma.notification.create({
        data: {
          title: notificationType.title,
          message: notificationType.message,
          type: notificationType.type,
          isRead,
          createdAt,
          userId: user.id,
        },
      });
    })
  );

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });