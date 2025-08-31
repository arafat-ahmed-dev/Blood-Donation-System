// Client-side data store using localStorage
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  upazila: string;
  zip: string;
  bloodType: string;
  dateOfBirth: string;
  lastDonationDate?: string;
  nextEligibleDate?: string;
  donorLevel: "Bronze" | "Silver" | "Gold" | "Platinum";
  totalDonations: number;
  isAdmin: boolean;
  image?: string;
};

export type Donation = {
  id: string;
  userId: string;
  date: string;
  location: string;
  bloodType: string;
  units: number;
  status: "Scheduled" | "Completed" | "Cancelled" | "Processing";
};

export type Appointment = {
  id: string;
  userId: string;
  date: string;
  time: string;
  location: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
};

export type BloodInventory = {
  type: string;
  level: number;
  status: "Adequate" | "Low" | "Critical";
  units: number;
};

export type BloodRequest = {
  id: string;
  hospital: string;
  bloodType: string;
  units: number;
  urgency: "Critical" | "High" | "Medium" | "Low";
  requestedDate: string;
  status: "Pending" | "Processing" | "Fulfilled" | "Cancelled";
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "Appointment" | "Eligibility" | "Urgent" | "Achievement" | "System";
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
  progress?: number;
};

export type HealthRecord = {
  userId: string;
  date: string;
  hemoglobin: string;
  bloodPressure: string;
  pulse: string;
  weight: string;
  notes: string;
};

export type DonationCenter = {
  id: string;
  name: string;
  address: string;
  city: string;
  upazila: string;
  zip: string;
  phone: string;
  hours: string;
  waitTime: string;
  distance: string;
  appointments: boolean;
  walkIns: boolean;
  status: "Open Now" | "Closed";
};

// Store interface
interface StoreState {
  // Auth
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    userData: Omit<User, "id" | "isAdmin" | "donorLevel" | "totalDonations">
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;

  // Users
  users: User[];
  addUser: (user: User) => void;
  updateUser: (userId: string, userData: Partial<User>) => void;

  // Donations
  donations: Donation[];
  addDonation: (donation: Omit<Donation, "id">) => void;
  updateDonation: (donationId: string, data: Partial<Donation>) => void;
  getDonationsByUser: (userId: string) => Donation[];

  // Appointments
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id">) => void;
  updateAppointment: (
    appointmentId: string,
    data: Partial<Appointment>
  ) => void;
  getAppointmentsByUser: (userId: string) => Appointment[];

  // Blood Inventory
  bloodInventory: BloodInventory[];
  updateBloodInventory: (
    bloodType: string,
    data: Partial<BloodInventory>
  ) => void;

  // Blood Requests
  bloodRequests: BloodRequest[];
  addBloodRequest: (request: Omit<BloodRequest, "id">) => void;
  updateBloodRequest: (requestId: string, data: Partial<BloodRequest>) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "date" | "read">
  ) => void;
  markNotificationAsRead: (notificationId: string) => void;
  getUserNotifications: (userId: string) => Notification[];

  // Achievements
  achievements: Achievement[];
  updateAchievement: (
    achievementId: string,
    data: Partial<Achievement>
  ) => void;
  getUserAchievements: (userId: string) => Achievement[];

  // Health Records
  healthRecords: HealthRecord[];
  addHealthRecord: (record: HealthRecord) => void;
  getUserHealthRecords: (userId: string) => HealthRecord[];

  // Donation Centers
  donationCenters: DonationCenter[];
}

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Mock data for initial upazila
const mockBloodInventory: BloodInventory[] = [
  { type: "A+", level: 75, status: "Adequate", units: 120 },
  { type: "A-", level: 45, status: "Low", units: 45 },
  { type: "B+", level: 60, status: "Adequate", units: 80 },
  { type: "B-", level: 30, status: "Critical", units: 15 },
  { type: "AB+", level: 80, status: "Adequate", units: 50 },
  { type: "AB-", level: 25, status: "Critical", units: 10 },
  { type: "O+", level: 50, status: "Low", units: 90 },
  { type: "O-", level: 20, status: "Critical", units: 25 },
];

const mockDonationCenters: DonationCenter[] = [
  {
    id: "dc-1",
    name: "City General Hospital Blood Center",
    address: "123 Medical Drive",
    city: "Cityville",
    upazila: "State",
    zip: "12345",
    phone: "(555) 123-4567",
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
    status: "Open Now",
    waitTime: "15 min",
    appointments: true,
    walkIns: true,
    distance: "1.2 miles",
  },
  {
    id: "dc-2",
    name: "Downtown Blood Donation Clinic",
    address: "456 Central Avenue",
    city: "Cityville",
    upazila: "State",
    zip: "12345",
    phone: "(555) 987-6543",
    hours: "Mon-Sat: 9AM-7PM",
    status: "Open Now",
    waitTime: "30 min",
    appointments: true,
    walkIns: true,
    distance: "2.5 miles",
  },
  {
    id: "dc-3",
    name: "Westside Medical Center",
    address: "789 Westview Blvd",
    city: "Cityville",
    upazila: "State",
    zip: "12345",
    phone: "(555) 456-7890",
    hours: "Mon-Fri: 7AM-8PM, Sat-Sun: 8AM-4PM",
    status: "Open Now",
    waitTime: "5 min",
    appointments: true,
    walkIns: true,
    distance: "3.8 miles",
  },
];

// Create the store
export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Auth
      currentUser: null,
      isAuthenticated: false,

      login: async (email, password) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = get().users;
        const user = users.find((u) => u.email === email);

        if (user) {
          // In a real app, you'd check the password hash here
          set({ currentUser: user, isAuthenticated: true });
          return { success: true, message: "Login successful" };
        }

        return { success: false, message: "Invalid email or password" };
      },

      register: async (userData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = get().users;
        const existingUser = users.find((u) => u.email === userData.email);

        if (existingUser) {
          return { success: false, message: "Email already in use" };
        }

        const newUser: User = {
          ...userData,
          id: generateId(),
          isAdmin: false,
          donorLevel: "Bronze",
          totalDonations: 0,
        };

        set({ users: [...users, newUser] });

        // Create default achievements for the user
        const defaultAchievements: Achievement[] = [
          {
            id: generateId(),
            name: "First Time Donor",
            description: "Completed your first blood donation",
            icon: "Droplet",
            unlocked: false,
            progress: 0,
          },
          {
            id: generateId(),
            name: "Regular Donor",
            description: "Donated blood 5 times",
            icon: "Heart",
            unlocked: false,
            progress: 0,
          },
          {
            id: generateId(),
            name: "Lifesaver",
            description: "Potentially saved up to 15 lives through donations",
            icon: "Shield",
            unlocked: false,
            progress: 0,
          },
          {
            id: generateId(),
            name: "Blood Type Champion",
            description: "Donated a critical blood type when in high demand",
            icon: "Award",
            unlocked: false,
            progress: 0,
          },
          {
            id: generateId(),
            name: "Donation Streak",
            description: "Donated blood consistently for 1 year",
            icon: "CheckCircle",
            unlocked: false,
            progress: 0,
          },
        ];

        set({
          achievements: [...get().achievements, ...defaultAchievements],
        });

        return { success: true, message: "Registration successful" };
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },

      // Users
      users: [
        {
          id: "admin1",
          name: "Admin User",
          email: "admin@roktoshetu.com",
          phone: "(555) 123-4567",
          address: "123 Admin St",
          city: "Cityville",
          upazila: "State",
          zip: "12345",
          bloodType: "O+",
          dateOfBirth: "1985-01-15",
          lastDonation: "2024-04-25",
          nextEligibleDate: "2024-06-20",
          donorLevel: "Gold",
          totalDonations: 15,
          isAdmin: true,
          image: "/placeholder.svg?height=96&width=96",
        },
        {
          id: "user1",
          name: "John Smith",
          email: "john@example.com",
          phone: "(555) 987-6543",
          address: "456 Main St",
          city: "Cityville",
          upazila: "State",
          zip: "12345",
          bloodType: "O+",
          dateOfBirth: "1985-01-15",
          lastDonation: "2024-04-25",
          nextEligibleDate: "2024-06-20",
          donorLevel: "Silver",
          totalDonations: 5,
          isAdmin: false,
          image: "/placeholder.svg?height=96&width=96",
        },
      ],

      addUser: (user) => {
        set({ users: [...get().users, user] });
      },

      updateUser: (userId, userData) => {
        set({
          users: get().users.map((user) =>
            user.id === userId ? { ...user, ...userData } : user
          ),
        });
      },

      // Donations
      donations: [
        {
          id: "DON-1001",
          userId: "user1",
          date: "2024-04-25",
          location: "City General Hospital",
          bloodType: "O+",
          units: 1,
          status: "Completed",
        },
        {
          id: "DON-982",
          userId: "user1",
          date: "2024-02-15",
          location: "Downtown Blood Center",
          bloodType: "O+",
          units: 1,
          status: "Completed",
        },
        {
          id: "DON-943",
          userId: "user1",
          date: "2023-12-10",
          location: "University Hospital",
          bloodType: "O+",
          units: 1,
          status: "Completed",
        },
        {
          id: "DON-912",
          userId: "user1",
          date: "2023-10-05",
          location: "Mobile Donation Unit #2",
          bloodType: "O+",
          units: 1,
          status: "Completed",
        },
        {
          id: "DON-875",
          userId: "user1",
          date: "2023-08-01",
          location: "City General Hospital",
          bloodType: "O+",
          units: 1,
          status: "Completed",
        },
      ],

      addDonation: (donation) => {
        const newDonation = {
          ...donation,
          id: `DON-${Math.floor(1000 + Math.random() * 9000)}`,
        };

        set({ donations: [...get().donations, newDonation] });

        // Update user's total donations
        const user = get().users.find((u) => u.id === donation.userId);
        if (user && donation.status === "Completed") {
          get().updateUser(user.id, {
            totalDonations: user.totalDonations + 1,
            lastDonationDate: donation.date,
          });

          // Check and update achievements
          const userAchievements = get().getUserAchievements(user.id);

          // First Time Donor
          const firstTimeDonor = userAchievements.find(
            (a) => a.name === "First Time Donor"
          );
          if (firstTimeDonor && !firstTimeDonor.unlocked) {
            get().updateAchievement(firstTimeDonor.id, {
              unlocked: true,
              date: new Date().toISOString().split("T")[0],
              progress: 100,
            });

            // Add notification
            get().addNotification({
              userId: user.id,
              title: "Achievement Unlocked!",
              message: "You've earned the First Time Donor badge.",
              type: "Achievement",
            });
          }

          // Regular Donor
          const regularDonor = userAchievements.find(
            (a) => a.name === "Regular Donor"
          );
          if (regularDonor) {
            const progress = Math.min((user.totalDonations / 5) * 100, 100);
            const wasUnlocked = regularDonor.unlocked;

            get().updateAchievement(regularDonor.id, {
              progress,
              unlocked: user.totalDonations >= 5,
              ...(user.totalDonations >= 5 && !wasUnlocked
                ? { date: new Date().toISOString().split("T")[0] }
                : {}),
            });

            if (user.totalDonations >= 5 && !wasUnlocked) {
              get().addNotification({
                userId: user.id,
                title: "Achievement Unlocked!",
                message: "You've earned the Regular Donor badge.",
                type: "Achievement",
              });
            }
          }

          // Lifesaver
          const lifesaver = userAchievements.find(
            (a) => a.name === "Lifesaver"
          );
          if (lifesaver) {
            const progress = Math.min(
              ((user.totalDonations * 3) / 15) * 100,
              100
            );
            const wasUnlocked = lifesaver.unlocked;

            get().updateAchievement(lifesaver.id, {
              progress,
              unlocked: user.totalDonations * 3 >= 15,
              ...(user.totalDonations * 3 >= 15 && !wasUnlocked
                ? { date: new Date().toISOString().split("T")[0] }
                : {}),
            });

            if (user.totalDonations * 3 >= 15 && !wasUnlocked) {
              get().addNotification({
                userId: user.id,
                title: "Achievement Unlocked!",
                message: "You've earned the Lifesaver badge.",
                type: "Achievement",
              });
            }
          }
        }

        // Calculate next eligible date (56 days after donation)
        if (donation.status === "Completed") {
          const donationDate = new Date(donation.date);
          const nextEligibleDate = new Date(donationDate);
          nextEligibleDate.setDate(donationDate.getDate() + 56);

          get().updateUser(donation.userId, {
            nextEligibleDate: nextEligibleDate.toISOString().split("T")[0],
          });

          // Add notification for next eligible date
          get().addNotification({
            userId: donation.userId,
            title: "Thank You for Donating!",
            message: `You'll be eligible to donate again on ${nextEligibleDate.toLocaleDateString()}.`,
            type: "Eligibility",
          });
        }
      },

      updateDonation: (donationId, data) => {
        set({
          donations: get().donations.map((donation) =>
            donation.id === donationId ? { ...donation, ...data } : donation
          ),
        });
      },

      getDonationsByUser: (userId) => {
        return get().donations.filter((donation) => donation.userId === userId);
      },

      // Appointments
      appointments: [
        {
          id: "APT-2045",
          userId: "user1",
          date: "2024-05-30",
          time: "10:30 AM",
          location: "Downtown Blood Center",
          status: "Confirmed",
        },
      ],

      addAppointment: (appointment) => {
        const newAppointment = {
          ...appointment,
          id: `APT-${Math.floor(2000 + Math.random() * 9000)}`,
        };

        set({ appointments: [...get().appointments, newAppointment] });

        // Add notification
        get().addNotification({
          userId: appointment.userId,
          title: "Appointment Scheduled",
          message: `Your appointment has been scheduled for ${appointment.date} at ${appointment.time}.`,
          type: "Appointment",
        });
      },

      updateAppointment: (appointmentId, data) => {
        const appointment = get().appointments.find(
          (a) => a.id === appointmentId
        );

        set({
          appointments: get().appointments.map((appt) =>
            appt.id === appointmentId ? { ...appt, ...data } : appt
          ),
        });

        // Add notification for status change
        if (appointment && data.status && data.status !== appointment.status) {
          const messages = {
            Confirmed: "Your appointment has been confirmed.",
            Cancelled: "Your appointment has been cancelled.",
            Completed: "Thank you for completing your appointment.",
            Pending: "Your appointment is pending confirmation.",
          };

          get().addNotification({
            userId: appointment.userId,
            title: `Appointment ${data.status}`,
            message: messages[data.status],
            type: "Appointment",
          });
        }
      },

      getAppointmentsByUser: (userId) => {
        return get().appointments.filter(
          (appointment) => appointment.userId === userId
        );
      },

      // Blood Inventory
      bloodInventory: mockBloodInventory,

      updateBloodInventory: (bloodType, data) => {
        set({
          bloodInventory: get().bloodInventory.map((item) =>
            item.type === bloodType ? { ...item, ...data } : item
          ),
        });

        // If blood type becomes critical, notify eligible donors
        if (data.status === "Critical") {
          const eligibleDonors = get().users.filter(
            (user) =>
              user.bloodType === bloodType &&
              (!user.nextEligibleDate ||
                new Date(user.nextEligibleDate) <= new Date())
          );

          eligibleDonors.forEach((user) => {
            get().addNotification({
              userId: user.id,
              title: "Urgent Blood Need",
              message: `Your blood type (${bloodType}) is critically needed. Please consider donating soon.`,
              type: "Urgent",
            });
          });
        }
      },

      // Blood Requests
      bloodRequests: [
        {
          id: "REQ-1239",
          hospital: "City General Hospital",
          bloodType: "O-",
          units: 3,
          urgency: "Critical",
          requestedDate: "2024-04-25",
          status: "Pending",
        },
        {
          id: "REQ-1240",
          hospital: "Children's Medical Center",
          bloodType: "B-",
          units: 2,
          urgency: "High",
          requestedDate: "2024-04-25",
          status: "Pending",
        },
        {
          id: "REQ-1241",
          hospital: "Memorial Hospital",
          bloodType: "AB+",
          units: 1,
          urgency: "Medium",
          requestedDate: "2024-04-24",
          status: "Processing",
        },
      ],

      addBloodRequest: (request) => {
        const newRequest = {
          ...request,
          id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
        };

        set({ bloodRequests: [...get().bloodRequests, newRequest] });

        // Notify eligible donors for critical and high urgency requests
        if (request.urgency === "Critical" || request.urgency === "High") {
          const eligibleDonors = get().users.filter(
            (user) =>
              user.bloodType === request.bloodType &&
              (!user.nextEligibleDate ||
                new Date(user.nextEligibleDate) <= new Date())
          );

          eligibleDonors.forEach((user) => {
            get().addNotification({
              userId: user.id,
              title: `${request.urgency} Blood Need`,
              message: `${request.hospital} urgently needs ${request.units} units of ${request.bloodType} blood.`,
              type: "Urgent",
            });
          });
        }
      },

      updateBloodRequest: (requestId, data) => {
        set({
          bloodRequests: get().bloodRequests.map((request) =>
            request.id === requestId ? { ...request, ...data } : request
          ),
        });
      },

      // Notifications
      notifications: [
        {
          id: "notif-1",
          userId: "user1",
          title: "Welcome to roktoshetu",
          message: "Thank you for joining our blood donation platform.",
          date: "2024-04-20",
          read: true,
          type: "System",
        },
        {
          id: "notif-2",
          userId: "user1",
          title: "Upcoming Appointment",
          message:
            "You have an appointment scheduled for May 30, 2024 at 10:30 AM.",
          date: "2024-04-25",
          read: false,
          type: "Appointment",
        },
      ],

      addNotification: (notification) => {
        const newNotification = {
          ...notification,
          id: `notif-${generateId()}`,
          date: new Date().toISOString().split("T")[0],
          read: false,
        };

        set({ notifications: [...get().notifications, newNotification] });
      },

      markNotificationAsRead: (notificationId) => {
        set({
          notifications: get().notifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, read: true }
              : notification
          ),
        });
      },

      getUserNotifications: (userId) => {
        return get().notifications.filter(
          (notification) => notification.userId === userId
        );
      },

      // Achievements
      achievements: [
        {
          id: "ach-1",
          name: "First Time Donor",
          description: "Completed your first blood donation",
          icon: "Droplet",
          unlocked: true,
          date: "2023-08-01",
          progress: 100,
        },
        {
          id: "ach-2",
          name: "Regular Donor",
          description: "Donated blood 5 times",
          icon: "Heart",
          unlocked: true,
          date: "2024-04-25",
          progress: 100,
        },
        {
          id: "ach-3",
          name: "Lifesaver",
          description: "Potentially saved up to 15 lives through donations",
          icon: "Shield",
          unlocked: true,
          date: "2024-04-25",
          progress: 100,
        },
        {
          id: "ach-4",
          name: "Blood Type Champion",
          description: "Donated a critical blood type when in high demand",
          icon: "Award",
          unlocked: false,
          progress: 75,
        },
        {
          id: "ach-5",
          name: "Donation Streak",
          description: "Donated blood consistently for 1 year",
          icon: "CheckCircle",
          unlocked: false,
          progress: 60,
        },
      ],

      updateAchievement: (achievementId, data) => {
        set({
          achievements: get().achievements.map((achievement) =>
            achievement.id === achievementId
              ? { ...achievement, ...data }
              : achievement
          ),
        });
      },

      getUserAchievements: (userId) => {
        // In a real app, achievements would be linked to users
        // For this demo, we'll return all achievements for the demo user
        if (userId === "user1") {
          return get().achievements;
        }
        return [];
      },

      // Health Records
      healthRecords: [
        {
          userId: "user1",
          date: "2024-04-25",
          hemoglobin: "14.2 g/dL",
          bloodPressure: "118/78 mmHg",
          pulse: "72 bpm",
          weight: "165 lbs",
          notes:
            "All parameters normal. Eligible for next donation after June 20, 2024.",
        },
        {
          userId: "user1",
          date: "2024-02-15",
          hemoglobin: "13.8 g/dL",
          bloodPressure: "120/80 mmHg",
          pulse: "75 bpm",
          weight: "168 lbs",
          notes: "All parameters normal.",
        },
        {
          userId: "user1",
          date: "2023-12-10",
          hemoglobin: "14.0 g/dL",
          bloodPressure: "122/82 mmHg",
          pulse: "70 bpm",
          weight: "170 lbs",
          notes: "All parameters normal.",
        },
      ],

      addHealthRecord: (record) => {
        set({ healthRecords: [...get().healthRecords, record] });
      },

      getUserHealthRecords: (userId) => {
        return get().healthRecords.filter((record) => record.userId === userId);
      },

      // Donation Centers
      donationCenters: mockDonationCenters,
    }),
    {
      name: "roktoshetu-storage",
    }
  )
);
