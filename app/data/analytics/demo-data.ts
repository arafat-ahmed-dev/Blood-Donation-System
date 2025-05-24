import type { InventoryStatus } from "@/components/analytics/inventory-status";

export const demoInventory = [
  {
    bloodType: "A+",
    units: 120,
    status: "Adequate" as const,
  },
  {
    bloodType: "A-",
    units: 45,
    status: "Low" as const,
  },
  {
    bloodType: "B+",
    units: 80,
    status: "Adequate" as const,
  },
  {
    bloodType: "B-",
    units: 15,
    status: "Critical" as const,
  },
  {
    bloodType: "AB+",
    units: 50,
    status: "Adequate" as const,
  },
  {
    bloodType: "AB-",
    units: 10,
    status: "Critical" as const,
  },
  {
    bloodType: "O+",
    units: 90,
    status: "Low" as const,
  },
  {
    bloodType: "O-",
    units: 25,
    status: "Critical" as const,
  },
];

export const demoDonationTrends = [
  {
    period: "2023-01",
    total: 120,
    byBloodType: { "A+": 30, "O+": 40, "B+": 25, "AB+": 10, "O-": 15 },
  },
  {
    period: "2023-02",
    total: 135,
    byBloodType: { "A+": 35, "O+": 45, "B+": 30, "AB+": 10, "O-": 15 },
  },
  {
    period: "2023-03",
    total: 150,
    byBloodType: { "A+": 40, "O+": 50, "B+": 30, "AB+": 15, "O-": 15 },
  },
  {
    period: "2023-04",
    total: 140,
    byBloodType: { "A+": 35, "O+": 45, "B+": 30, "AB+": 15, "O-": 15 },
  },
  {
    period: "2023-05",
    total: 160,
    byBloodType: { "A+": 40, "O+": 55, "B+": 35, "AB+": 15, "O-": 15 },
  },
  {
    period: "2023-06",
    total: 170,
    byBloodType: { "A+": 45, "O+": 60, "B+": 35, "AB+": 15, "O-": 15 },
  },
];

export const demoOverviewData = {
  totalDonations: 875,
  activeDonors: 450,
  pendingRequests: 25,
  upcomingAppointments: 18,
  donorRetentionRate: 75,
  unitsCollected: 1200,
  criticalRequests: 8,
};

export const demoDonorRetention = {
  existingDonors: 1200,
  retentionByPeriod: [
    { period: "2023-01", activeDonors: 300, newDonors: 50, retentionRate: 25 },
    {
      period: "2023-02",
      activeDonors: 320,
      newDonors: 45,
      retentionRate: 26.67,
    },
    {
      period: "2023-03",
      activeDonors: 350,
      newDonors: 60,
      retentionRate: 29.17,
    },
    {
      period: "2023-04",
      activeDonors: 340,
      newDonors: 40,
      retentionRate: 28.33,
    },
    { period: "2023-05", activeDonors: 360, newDonors: 55, retentionRate: 30 },
    {
      period: "2023-06",
      activeDonors: 380,
      newDonors: 65,
      retentionRate: 31.67,
    },
  ],
};

export const demoInventoryUsage = {
  usageByPeriod: [
    {
      period: "2023-01",
      total: 100,
      byBloodType: { "A+": 25, "O+": 35, "B+": 20, "AB+": 10, "O-": 10 },
      byPurpose: { Surgery: 40, Trauma: 30, "Cancer Treatment": 20, Other: 10 },
    },
    {
      period: "2023-02",
      total: 110,
      byBloodType: { "A+": 30, "O+": 35, "B+": 25, "AB+": 10, "O-": 10 },
      byPurpose: { Surgery: 45, Trauma: 25, "Cancer Treatment": 25, Other: 15 },
    },
    {
      period: "2023-03",
      total: 130,
      byBloodType: { "A+": 35, "O+": 40, "B+": 30, "AB+": 15, "O-": 10 },
      byPurpose: { Surgery: 50, Trauma: 35, "Cancer Treatment": 30, Other: 15 },
    },
  ],
};
