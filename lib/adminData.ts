export const bloodInventory = [
  { type: "A+", level: 75, status: "Adequate", units: 120 },
  { type: "A-", level: 45, status: "Low", units: 45 },
  { type: "B+", level: 60, status: "Adequate", units: 80 },
  { type: "B-", level: 30, status: "Critical", units: 15 },
  { type: "AB+", level: 80, status: "Adequate", units: 50 },
  { type: "AB-", level: 25, status: "Critical", units: 10 },
  { type: "O+", level: 50, status: "Low", units: 90 },
  { type: "O-", level: 20, status: "Critical", units: 25 },
];

export const donorDetails = [
  {
    id: "D-1001",
    name: "John Smith",
    email: "john.smith@example.com",
    bloodType: "O+",
    lastDonation: "Apr 25, 2024",
    totalDonations: 12,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    bloodType: "A-",
    lastDonation: "Apr 24, 2024",
    totalDonations: 8,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1003",
    name: "Michael Chen",
    email: "m.chen@example.com",
    bloodType: "B+",
    lastDonation: "Apr 24, 2024",
    totalDonations: 5,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1004",
    name: "Emily Rodriguez",
    email: "e.rodriguez@example.com",
    bloodType: "AB-",
    lastDonation: "Apr 23, 2024",
    totalDonations: 3,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1005",
    name: "David Wilson",
    email: "d.wilson@example.com",
    bloodType: "O-",
    lastDonation: "Apr 23, 2024",
    totalDonations: 15,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1006",
    name: "Jessica Lee",
    email: "j.lee@example.com",
    bloodType: "A+",
    lastDonation: "Mar 15, 2024",
    totalDonations: 7,
    status: "Inactive",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1007",
    name: "Robert Brown",
    email: "r.brown@example.com",
    bloodType: "O-",
    lastDonation: "Feb 28, 2024",
    totalDonations: 20,
    status: "Inactive",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export const recentDonors = [
  {
    id: "D-1001",
    name: "John Smith",
    bloodType: "O+",
    donationDate: "Apr 25, 2024",
    location: "City General Hospital",
    status: "Completed",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1002",
    name: "Sarah Johnson",
    bloodType: "A-",
    donationDate: "Apr 24, 2024",
    location: "Downtown Blood Center",
    status: "Completed",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1003",
    name: "Michael Chen",
    bloodType: "B+",
    donationDate: "Apr 24, 2024",
    location: "University Hospital",
    status: "Processing",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1004",
    name: "Emily Rodriguez",
    bloodType: "AB-",
    donationDate: "Apr 23, 2024",
    location: "Westside Medical Center",
    status: "Completed",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "D-1005",
    name: "David Wilson",
    bloodType: "O-",
    donationDate: "Apr 23, 2024",
    location: "Mobile Donation Unit #2",
    status: "Processing",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export const pendingRequests = [
  {
    id: "REQ-1239",
    hospital: "City General Hospital",
    bloodType: "O-",
    units: 3,
    urgency: "Critical",
    requestedDate: "Apr 25, 2024",
    status: "Pending",
  },
  {
    id: "REQ-1240",
    hospital: "Children's Medical Center",
    bloodType: "B-",
    units: 2,
    urgency: "High",
    requestedDate: "Apr 25, 2024",
    status: "Pending",
  },
  {
    id: "REQ-1241",
    hospital: "Memorial Hospital",
    bloodType: "AB+",
    units: 1,
    urgency: "Medium",
    requestedDate: "Apr 24, 2024",
    status: "Processing",
  },
  {
    id: "REQ-1242",
    hospital: "University Hospital",
    bloodType: "A+",
    units: 4,
    urgency: "Medium",
    requestedDate: "Apr 24, 2024",
    status: "Processing",
  },
  {
    id: "REQ-1243",
    hospital: "Veterans Medical Center",
    bloodType: "O+",
    units: 2,
    urgency: "High",
    requestedDate: "Apr 23, 2024",
    status: "Processing",
  },
  {
    id: "REQ-1244",
    hospital: "St. Mary's Hospital",
    bloodType: "A-",
    units: 2,
    urgency: "Medium",
    requestedDate: "Apr 22, 2024",
    status: "Fulfilled",
  },
  {
    id: "REQ-1245",
    hospital: "County General",
    bloodType: "O+",
    units: 3,
    urgency: "High",
    requestedDate: "Apr 21, 2024",
    status: "Fulfilled",
  },
  {
    id: "REQ-1246",
    hospital: "Children's Medical Center",
    bloodType: "AB+",
    units: 1,
    urgency: "Low",
    requestedDate: "Apr 20, 2024",
    status: "Cancelled",
  },
];

export const upcomingAppointments = [
  {
    id: "APT-2001",
    donorName: "Jessica Lee",
    bloodType: "A+",
    date: "Apr 26, 2024",
    time: "10:00 AM",
    location: "Downtown Blood Center",
    status: "Confirmed",
  },
  {
    id: "APT-2002",
    donorName: "Robert Brown",
    bloodType: "O-",
    date: "Apr 26, 2024",
    time: "11:30 AM",
    location: "City General Hospital",
    status: "Confirmed",
  },
  {
    id: "APT-2003",
    donorName: "Amanda Garcia",
    bloodType: "B+",
    date: "Apr 26, 2024",
    time: "2:00 PM",
    location: "Westside Medical Center",
    status: "Pending",
  },
  {
    id: "APT-2004",
    donorName: "Thomas Wilson",
    bloodType: "AB-",
    date: "Apr 27, 2024",
    time: "9:15 AM",
    location: "University Hospital",
    status: "Confirmed",
  },
  {
    id: "APT-2005",
    donorName: "Lisa Martinez",
    bloodType: "O+",
    date: "Apr 27, 2024",
    time: "3:45 PM",
    location: "Downtown Blood Center",
    status: "Pending",
  },
];
export const DONATION_CENTERS = [
  {
    id: 1,
    name: "Central Blood Bank",
    address: "123 Medical Center Road, Dhaka",
    phone: "+880 1712-345678",
    hours: "24/7",
    status: "Active",
    staff: 12,
    lastUpdated: "2024-05-12",
  },
  {
    id: 2,
    name: "City Medical Center",
    address: "45 Hospital Zone, Chittagong",
    phone: "+880 1812-345678",
    hours: "8 AM - 10 PM",
    status: "Active",
    staff: 8,
    lastUpdated: "2024-05-11",
  },
  // Add more centers as needed
];
export const getStatusColor = (status: string) => {
  switch (status) {
    case "Adequate":
      return "text-green-600";
    case "Low":
      return "text-amber-600";
    case "Critical":
      return "text-red-600";
    default:
      return "";
  }
};

export const getProgressColor = (level: number) => {
  if (level > 60) return "bg-green-600";
  if (level > 40) return "bg-amber-600";
  return "bg-red-600";
};

export const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "Critical":
      return "bg-red-600";
    case "High":
      return "bg-amber-600";
    case "Medium":
      return "bg-blue-600";
    case "Low":
      return "bg-green-600";
    default:
      return "bg-slate-600";
  }
};

export const getAppointmentStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-600";
    case "Pending":
      return "bg-amber-600";
    case "Cancelled":
      return "bg-red-600";
    default:
      return "bg-slate-600";
  }
};

export const getDonationStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-600";
    case "Processing":
      return "bg-blue-600";
    case "Failed":
      return "bg-red-600";
    default:
      return "bg-slate-600";
  }
};

export const getRequestStatusColor = (status: string) => {
  switch (status) {
    case "Fulfilled":
      return "bg-green-600";
    case "Processing":
      return "bg-blue-600";
    case "Pending":
      return "bg-amber-600";
    case "Cancelled":
      return "bg-red-600";
    default:
      return "bg-slate-600";
  }
};
