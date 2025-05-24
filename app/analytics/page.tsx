"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  AlertCircle,
  Calendar,
  Download,
  Droplet,
  RefreshCcw,
  Users,
  Lightbulb,
  TrendingUp,
  Brain,
  FileText,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { SupportChat } from "@/components/support/support-chat";
import ClientLayout from "@/components/layout/clientLayout";
import { OverviewCard } from "@/components/analytics/overview-card";
import { InventoryStatus } from "@/components/analytics/inventory-status";
import { DonationTrends } from "@/components/analytics/donation-trends";
import { DonorRetention } from "@/components/analytics/donor-retention";
import { InventoryUsage } from "@/components/analytics/inventory-usage";
import {
  demoOverviewData,
  demoInventory,
  demoDonationTrends,
  demoDonorRetention,
  demoInventoryUsage,
} from "@/app/data/analytics/demo-data";

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [period, setPeriod] = useState("month");
  const [isLoading, setIsLoading] = useState(true);
  const [summaryData, setSummaryData] = useState<any>(null);
  const [donationTrends, setDonationTrends] = useState<any[]>([]);
  const [donorRetention, setDonorRetention] = useState<any>(null);
  const [inventoryUsage, setInventoryUsage] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [predictions, setPredictions] = useState<any>(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [predictionsLoading, setPredictionsLoading] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const fetchSummaryData = async () => {
    try {
      const response = await fetch("/api/analytics/summary");
      const data = await response.json();
      if (data.success) {
        setSummaryData(data.data);
      }
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  const fetchDonationTrends = async () => {
    try {
      const response = await fetch(
        `/api/analytics/donation-trends?period=${period}&limit=12`
      );
      const data = await response.json();
      if (data.success) {
        setDonationTrends(data.data);
      }
    } catch (error) {
      console.error("Error fetching donation trends:", error);
    }
  };

  const fetchDonorRetention = async () => {
    try {
      const response = await fetch(
        `/api/analytics/donor-retention?period=${period}&limit=12`
      );
      const data = await response.json();
      if (data.success) {
        setDonorRetention(data.data);
      }
    } catch (error) {
      console.error("Error fetching donor retention:", error);
    }
  };

  const fetchInventoryUsage = async () => {
    try {
      const response = await fetch(
        `/api/analytics/inventory-usage?period=${period}&limit=12`
      );
      const data = await response.json();
      if (data.success) {
        setInventoryUsage(data.data);
      }
    } catch (error) {
      console.error("Error fetching inventory usage:", error);
    }
  };

  const fetchAiInsights = async () => {
    setInsightsLoading(true);
    try {
      const response = await fetch(
        `/api/analytics/ai-insights?period=${period}`
      );
      const data = await response.json();
      if (data.success) {
        setAiInsights(data.data.insights);
        setShowInsights(true);
      }
    } catch (error) {
      console.error("Error fetching AI insights:", error);
    } finally {
      setInsightsLoading(false);
    }
  };

  const fetchPredictions = async () => {
    setPredictionsLoading(true);
    try {
      const response = await fetch(`/api/analytics/predictions`);
      const data = await response.json();
      if (data.success) {
        setPredictions(data.data.predictions);
      }
    } catch (error) {
      console.error("Error fetching predictions:", error);
    } finally {
      setPredictionsLoading(false);
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    await Promise.all([
      fetchSummaryData(),
      fetchDonationTrends(),
      fetchDonorRetention(),
      fetchInventoryUsage(),
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllData();
  }, [period]);

  // Format period label for display
  const formatPeriodLabel = (periodKey: string) => {
    if (periodKey.includes("-W")) {
      // Week format: 2023-W1 -> Week 1, 2023
      const [year, week] = periodKey.split("-W");
      return `Week ${week}, ${year}`;
    } else if (periodKey.includes("-")) {
      // Month format: 2023-01 -> Jan 2023
      const [year, month] = periodKey.split("-");
      const date = new Date(
        Number.parseInt(year),
        Number.parseInt(month) - 1,
        1
      );
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } else {
      // Year format: 2023 -> 2023
      return periodKey;
    }
  };

  // Colors for charts
  const BLOOD_TYPE_COLORS: Record<string, string> = {
    "A+": "#ef4444", // red-500
    "A-": "#f87171", // red-400
    "B+": "#3b82f6", // blue-500
    "B-": "#60a5fa", // blue-400
    "AB+": "#8b5cf6", // violet-500
    "AB-": "#a78bfa", // violet-400
    "O+": "#f97316", // orange-500
    "O-": "#fb923c", // orange-400
  };

  const DEFAULT_COLORS = [
    "#ef4444", // red-500
    "#3b82f6", // blue-500
    "#8b5cf6", // violet-500
    "#f97316", // orange-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#6366f1", // indigo-500
    "#ec4899", // pink-500
  ];

  // Mock data for initial render
  const mockDonationTrends = [
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

  const mockDonorRetention = {
    existingDonors: 1200,
    retentionByPeriod: [
      {
        period: "2023-01",
        activeDonors: 300,
        newDonors: 50,
        retentionRate: 25,
      },
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
      {
        period: "2023-05",
        activeDonors: 360,
        newDonors: 55,
        retentionRate: 30,
      },
      {
        period: "2023-06",
        activeDonors: 380,
        newDonors: 65,
        retentionRate: 31.67,
      },
    ],
  };

  const mockInventoryUsage = {
    usageByPeriod: [
      {
        period: "2023-01",
        total: 100,
        byBloodType: { "A+": 25, "O+": 35, "B+": 20, "AB+": 10, "O-": 10 },
        byPurpose: {
          Surgery: 40,
          Trauma: 30,
          "Cancer Treatment": 20,
          Other: 10,
        },
      },
      {
        period: "2023-02",
        total: 110,
        byBloodType: { "A+": 30, "O+": 35, "B+": 25, "AB+": 10, "O-": 10 },
        byPurpose: {
          Surgery: 45,
          Trauma: 25,
          "Cancer Treatment": 25,
          Other: 15,
        },
      },
      {
        period: "2023-03",
        total: 130,
        byBloodType: { "A+": 35, "O+": 40, "B+": 30, "AB+": 15, "O-": 10 },
        byPurpose: {
          Surgery: 50,
          Trauma: 35,
          "Cancer Treatment": 30,
          Other: 15,
        },
      },
    ],
    currentInventory: {
      "A+": { total: 120, byStatus: { Adequate: 120 } },
      "A-": { total: 45, byStatus: { Low: 45 } },
      "B+": { total: 80, byStatus: { Adequate: 80 } },
      "B-": { total: 15, byStatus: { Critical: 15 } },
      "AB+": { total: 50, byStatus: { Adequate: 50 } },
      "AB-": { total: 10, byStatus: { Critical: 10 } },
      "O+": { total: 90, byStatus: { Low: 90 } },
      "O-": { total: 25, byStatus: { Critical: 25 } },
    },
  };

  const mockAiInsights = {
    insights: [
      {
        title: "O+ Donations Increasing",
        description:
          "O+ blood donations have shown a consistent upward trend over the last 6 months, increasing by 15%.",
        category: "Donations",
      },
      {
        title: "Critical Shortage of B- Blood Type",
        description:
          "B- blood type inventory is at critical levels with only 15 units available. Urgent donor recruitment needed for this rare blood type.",
        category: "Inventory",
      },
      {
        title: "Donor Retention Improving",
        description:
          "Donor retention rate has improved from 25% to 31.67% over the last 6 months, indicating successful engagement strategies.",
        category: "Donors",
      },
    ],
    recommendations: [
      {
        title: "Target B- and AB- Donors",
        description:
          "Launch a targeted campaign to recruit donors with B- and AB- blood types to address critical shortages.",
        priority: "High",
      },
      {
        title: "Optimize Appointment Scheduling",
        description:
          "Increase appointment availability during peak donation times based on historical data.",
        priority: "Medium",
      },
    ],
    predictedTrends: [
      {
        title: "Seasonal Donation Decrease",
        description:
          "Expect a 10-15% decrease in donations during summer months based on historical patterns.",
        confidence: "High",
      },
    ],
  };

  const mockPredictions = {
    predictions: [
      {
        month: "May 2024",
        bloodTypeNeeds: {
          "A+": { units: 150, trend: "Stable" },
          "A-": { units: 50, trend: "Increasing" },
          "B+": { units: 90, trend: "Stable" },
          "B-": { units: 30, trend: "Increasing" },
          "AB+": { units: 40, trend: "Decreasing" },
          "AB-": { units: 20, trend: "Increasing" },
          "O+": { units: 180, trend: "Increasing" },
          "O-": { units: 60, trend: "Increasing" },
        },
        totalNeeded: 620,
        criticalTypes: ["B-", "AB-", "O-"],
      },
      {
        month: "June 2024",
        bloodTypeNeeds: {
          "A+": { units: 145, trend: "Decreasing" },
          "A-": { units: 55, trend: "Increasing" },
          "B+": { units: 85, trend: "Decreasing" },
          "B-": { units: 35, trend: "Increasing" },
          "AB+": { units: 35, trend: "Decreasing" },
          "AB-": { units: 25, trend: "Increasing" },
          "O+": { units: 190, trend: "Increasing" },
          "O-": { units: 65, trend: "Increasing" },
        },
        totalNeeded: 635,
        criticalTypes: ["AB-", "O-"],
      },
    ],
    seasonalFactors: [
      "Summer travel",
      "Increased accident rates",
      "Fewer regular donors due to vacations",
    ],
    confidenceLevel: "Medium",
  };

  return (
    <ClientLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Reporting</h1>
            <p className="text-muted-foreground">
              Track donation trends, donor retention, and inventory usage
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Weekly</SelectItem>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={fetchAllData}
              disabled={isLoading}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button
              variant="default"
              className="bg-purple-600 hover:bg-purple-700"
              onClick={fetchAiInsights}
              disabled={insightsLoading}
            >
              {insightsLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Brain className="mr-2 h-4 w-4" />
              )}
              <span>AI Insights</span>
            </Button>
          </div>
        </div>

        {/* AI Insights Section */}
        {showInsights && (
          <Card className="mb-6 border-purple-200 bg-purple-50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Brain className="h-5 w-5 text-purple-600 mr-2" />
                  <CardTitle className="text-purple-800">
                    AI-Generated Insights
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setShowInsights(false)}
                >
                  <span className="sr-only">Close</span>
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {(aiInsights?.insights || mockAiInsights.insights).map(
                  (insight: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg border border-purple-100 shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-purple-600" />
                        <h3 className="font-medium text-sm text-purple-800">
                          {insight.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {insight.description}
                      </p>
                      <Badge className="mt-2 bg-purple-100 text-purple-800 hover:bg-purple-200">
                        {insight.category}
                      </Badge>
                    </div>
                  )
                )}
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-sm text-purple-800 mb-2">
                  Recommendations
                </h3>
                <div className="space-y-2">
                  {(
                    aiInsights?.recommendations ||
                    mockAiInsights.recommendations
                  ).map((rec: any, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <Badge
                        className={
                          rec.priority === "High"
                            ? "bg-red-100 text-red-800 hover:bg-red-200"
                            : rec.priority === "Medium"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }
                      >
                        {rec.priority}
                      </Badge>
                      <div>
                        <p className="font-medium text-sm">{rec.title}</p>
                        <p className="text-sm text-gray-600">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                  onClick={fetchPredictions}
                  disabled={predictionsLoading}
                >
                  {predictionsLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <TrendingUp className="mr-2 h-4 w-4" />
                  )}
                  <span>Generate Predictions</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Predictions Section */}
        {predictions && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                  <CardTitle className="text-blue-800">
                    AI Predictions: Future Donation Needs
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setPredictions(null)}
                >
                  <span className="sr-only">Close</span>
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="text-blue-600">
                Confidence Level:{" "}
                {predictions.confidenceLevel || mockPredictions.confidenceLevel}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {(predictions.predictions || mockPredictions.predictions).map(
                  (prediction: any, index: number) => (
                    <Card key={index} className="border-blue-100">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          {prediction.month}
                        </CardTitle>
                        <CardDescription>
                          Estimated total need:{" "}
                          <span className="font-bold">
                            {prediction.totalNeeded} units
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(prediction.bloodTypeNeeds).map(
                            ([bloodType, data]: [string, any]) => (
                              <div
                                key={bloodType}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                                    style={{
                                      backgroundColor:
                                        BLOOD_TYPE_COLORS[bloodType] + "20",
                                      color: BLOOD_TYPE_COLORS[bloodType],
                                    }}
                                  >
                                    {bloodType}
                                  </div>
                                  <span className="text-sm font-medium">
                                    {bloodType}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm">
                                    {data.units} units
                                  </span>
                                  <Badge
                                    className={
                                      data.trend === "Increasing"
                                        ? "bg-red-100 text-red-800"
                                        : data.trend === "Decreasing"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-blue-100 text-blue-800"
                                    }
                                  >
                                    {data.trend === "Increasing" && (
                                      <ChevronUp className="h-3 w-3 mr-1" />
                                    )}
                                    {data.trend === "Decreasing" && (
                                      <ChevronDown className="h-3 w-3 mr-1" />
                                    )}
                                    {data.trend}
                                  </Badge>
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        {prediction.criticalTypes.length > 0 && (
                          <Alert className="mt-4 bg-red-50 border-red-200">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertTitle className="text-red-800">
                              Critical Blood Types
                            </AlertTitle>
                            <AlertDescription className="text-red-600">
                              {prediction.criticalTypes.join(", ")} will be in
                              critical demand
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  )
                )}
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-blue-800 mb-2">
                  Seasonal Factors
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {(
                    predictions.seasonalFactors ||
                    mockPredictions.seasonalFactors
                  ).map((factor: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600">
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Download Full Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-[600px] grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">Donation Trends</TabsTrigger>
            <TabsTrigger value="donors">Donor Retention</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Usage</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <OverviewCard
                title="Total Donations"
                value={demoOverviewData.totalDonations}
                description="Total blood donations received"
                icon={Droplet}
                iconColor="text-red-500"
              />
              <OverviewCard
                title="Active Donors"
                value={demoOverviewData.activeDonors}
                description="Registered active donors"
                icon={Users}
                iconColor="text-blue-500"
              />
              <OverviewCard
                title="Upcoming Appointments"
                value={demoOverviewData.upcomingAppointments}
                description="Scheduled donations"
                icon={Calendar}
                iconColor="text-green-500"
              />
              <OverviewCard
                title="Critical Requests"
                value={demoOverviewData.criticalRequests}
                description="Urgent blood requests"
                icon={AlertTriangle}
                iconColor="text-yellow-500"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <InventoryStatus inventory={demoInventory} />
              <DonationTrends trends={demoDonationTrends} period="month" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <DonorRetention
                existingDonors={demoDonorRetention.existingDonors}
                retentionByPeriod={demoDonorRetention.retentionByPeriod}
              />
              <InventoryUsage
                usageByPeriod={demoInventoryUsage.usageByPeriod}
              />
            </div>
          </TabsContent>

          {/* Donation Trends Tab */}
          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation Volume Trends</CardTitle>
                <CardDescription>
                  {period === "week"
                    ? "Weekly"
                    : period === "month"
                    ? "Monthly"
                    : "Yearly"}{" "}
                  donation volume over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={
                        donationTrends.length > 0
                          ? donationTrends
                          : mockDonationTrends
                      }
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="period"
                        tickFormatter={formatPeriodLabel}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} units`, "Donations"]}
                        labelFormatter={formatPeriodLabel}
                      />
                      <Legend />
                      <Bar
                        dataKey="total"
                        fill="#ef4444"
                        name="Total Donations"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donations by Blood Type</CardTitle>
                <CardDescription>
                  Distribution of donations across different blood types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={
                        donationTrends.length > 0
                          ? donationTrends
                          : mockDonationTrends
                      }
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="period"
                        tickFormatter={formatPeriodLabel}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} units`, "Donations"]}
                        labelFormatter={formatPeriodLabel}
                      />
                      <Legend />
                      {Object.keys(BLOOD_TYPE_COLORS).map(
                        (bloodType, index) => (
                          <Bar
                            key={bloodType}
                            dataKey={`byBloodType.${bloodType}`}
                            stackId="a"
                            fill={
                              BLOOD_TYPE_COLORS[bloodType] ||
                              DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                            }
                            name={bloodType}
                          />
                        )
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Blood Type Distribution</CardTitle>
                  <CardDescription>
                    Percentage of each blood type collected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={
                            donationTrends.length > 0
                              ? Object.entries(
                                  donationTrends[donationTrends.length - 1]
                                    ?.byBloodType || {}
                                ).map(([bloodType, units]) => ({
                                  bloodType,
                                  units,
                                }))
                              : Object.entries(
                                  mockDonationTrends[
                                    mockDonationTrends.length - 1
                                  ]?.byBloodType || {}
                                ).map(([bloodType, units]) => ({
                                  bloodType,
                                  units,
                                }))
                          }
                          dataKey="units"
                          nameKey="bloodType"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ bloodType }) => bloodType}
                        >
                          {Object.keys(BLOOD_TYPE_COLORS).map(
                            (bloodType, index) => (
                              <Cell
                                key={`cell-${bloodType}`}
                                fill={
                                  BLOOD_TYPE_COLORS[bloodType] ||
                                  DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                                }
                              />
                            )
                          )}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} units`, "Quantity"]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Donation Growth Rate</CardTitle>
                  <CardDescription>
                    Month-over-month growth in donation volume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={
                          donationTrends.length > 1
                            ? donationTrends
                                .map((current, index, array) => {
                                  const previous =
                                    index > 0 ? array[index - 1] : null;
                                  const growthRate = previous
                                    ? ((current.total - previous.total) /
                                        previous.total) *
                                      100
                                    : 0;
                                  return {
                                    period: current.period,
                                    growthRate:
                                      Math.round(growthRate * 100) / 100,
                                  };
                                })
                                .filter((_, index) => index > 0)
                            : mockDonationTrends
                                .map((current, index, array) => {
                                  const previous =
                                    index > 0 ? array[index - 1] : null;
                                  const growthRate = previous
                                    ? ((current.total - previous.total) /
                                        previous.total) *
                                      100
                                    : 0;
                                  return {
                                    period: current.period,
                                    growthRate:
                                      Math.round(growthRate * 100) / 100,
                                  };
                                })
                                .filter((_, index) => index > 0)
                        }
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="period"
                          tickFormatter={formatPeriodLabel}
                        />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Growth Rate"]}
                          labelFormatter={formatPeriodLabel}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="growthRate"
                          stroke="#10b981"
                          activeDot={{ r: 8 }}
                          name="Growth Rate (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Donor Retention Tab */}
          <TabsContent value="donors" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Donor Retention Rate</CardTitle>
                  <CardDescription>
                    Percentage of donors who continue to donate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={
                          donorRetention?.retentionByPeriod ||
                          mockDonorRetention.retentionByPeriod
                        }
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="period"
                          tickFormatter={formatPeriodLabel}
                        />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Retention Rate"]}
                          labelFormatter={formatPeriodLabel}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="retentionRate"
                          stroke="#3b82f6"
                          activeDot={{ r: 8 }}
                          name="Retention Rate (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active vs. New Donors</CardTitle>
                  <CardDescription>
                    Comparison of active returning donors vs. new donors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={
                          donorRetention?.retentionByPeriod ||
                          mockDonorRetention.retentionByPeriod
                        }
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="period"
                          tickFormatter={formatPeriodLabel}
                        />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [`${value} donors`, ""]}
                          labelFormatter={formatPeriodLabel}
                        />
                        <Legend />
                        <Bar
                          dataKey="activeDonors"
                          fill="#3b82f6"
                          name="Active Donors"
                        />
                        <Bar
                          dataKey="newDonors"
                          fill="#10b981"
                          name="New Donors"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Donor Activity Metrics</CardTitle>
                <CardDescription>
                  Key metrics about donor activity and retention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Total Donors</h3>
                    <div className="text-3xl font-bold">
                      {summaryData?.totalDonors || 0}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Registered donors in the system
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Active Donors</h3>
                    <div className="text-3xl font-bold">
                      {summaryData?.activeDonors || 0}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Donated in the last 6 months
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Retention Rate</h3>
                    <div className="text-3xl font-bold">
                      {summaryData?.donorRetentionRate || 0}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Overall donor retention
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Average Donations</h3>
                    <div className="text-3xl font-bold">
                      {summaryData?.totalDonors && summaryData?.totalDonations
                        ? (
                            summaryData.totalDonations / summaryData.totalDonors
                          ).toFixed(1)
                        : "0.0"}
                    </div>
                    <p className="text-sm text-muted-foreground">Per donor</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">New Donors</h3>
                    <div className="text-3xl font-bold">
                      {donorRetention?.retentionByPeriod
                        ? donorRetention.retentionByPeriod.reduce(
                            (sum: number, period: any) =>
                              sum + period.newDonors,
                            0
                          )
                        : 0}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      In selected period
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Donor Growth</h3>
                    <div className="text-3xl font-bold text-green-600">
                      {donorRetention?.retentionByPeriod &&
                      donorRetention.retentionByPeriod.length > 0
                        ? `+${donorRetention.retentionByPeriod.reduce(
                            (sum: number, period: any) =>
                              sum + period.newDonors,
                            0
                          )}`
                        : "+0"}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      New donors in period
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donor Demographics</CardTitle>
                <CardDescription>
                  Breakdown of donors by age group and gender
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium mb-4">
                      Age Distribution
                    </h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { ageGroup: "18-24", count: 120 },
                            { ageGroup: "25-34", count: 250 },
                            { ageGroup: "35-44", count: 180 },
                            { ageGroup: "45-54", count: 140 },
                            { ageGroup: "55+", count: 90 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="ageGroup" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`${value} donors`, "Count"]}
                          />
                          <Bar dataKey="count" fill="#8b5cf6" name="Donors" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-4">
                      Gender Distribution
                    </h3>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { gender: "Male", count: 450 },
                              { gender: "Female", count: 380 },
                              { gender: "Other", count: 30 },
                            ]}
                            dataKey="count"
                            nameKey="gender"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={({ gender, percent }) =>
                              `${gender}: ${(percent * 100).toFixed(0)}%`
                            }
                          >
                            <Cell fill="#3b82f6" />
                            <Cell fill="#ec4899" />
                            <Cell fill="#8b5cf6" />
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value} donors`, "Count"]}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Donor Engagement Analysis</CardTitle>
                <CardDescription>
                  Donor engagement metrics and patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      outerRadius={150}
                      data={[
                        { metric: "First-time Donors", value: 70 },
                        { metric: "Repeat Donors", value: 85 },
                        { metric: "Appointment Adherence", value: 92 },
                        { metric: "Response to Campaigns", value: 65 },
                        { metric: "Social Media Engagement", value: 58 },
                        { metric: "Event Participation", value: 72 },
                      ]}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Engagement Score"
                        dataKey="value"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.6}
                      />
                      <Legend />
                      <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Usage Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Usage Over Time</CardTitle>
                <CardDescription>
                  {period === "week"
                    ? "Weekly"
                    : period === "month"
                    ? "Monthly"
                    : "Yearly"}{" "}
                  blood usage patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={
                        inventoryUsage?.usageByPeriod ||
                        mockInventoryUsage.usageByPeriod
                      }
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="period"
                        tickFormatter={formatPeriodLabel}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} units`, "Usage"]}
                        labelFormatter={formatPeriodLabel}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#ef4444"
                        fill="#fee2e2"
                        name="Total Usage"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Usage by Blood Type</CardTitle>
                  <CardDescription>
                    Distribution of blood usage by type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={
                            inventoryUsage?.usageByPeriod &&
                            inventoryUsage.usageByPeriod.length > 0
                              ? Object.entries(
                                  inventoryUsage.usageByPeriod[
                                    inventoryUsage.usageByPeriod.length - 1
                                  ]?.byBloodType || {}
                                ).map(([bloodType, units]) => ({
                                  bloodType,
                                  units,
                                }))
                              : Object.entries(
                                  mockInventoryUsage.usageByPeriod[
                                    mockInventoryUsage.usageByPeriod.length - 1
                                  ]?.byBloodType || {}
                                ).map(([bloodType, units]) => ({
                                  bloodType,
                                  units,
                                }))
                          }
                          dataKey="units"
                          nameKey="bloodType"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ bloodType }) => bloodType}
                        >
                          {Object.keys(BLOOD_TYPE_COLORS).map(
                            (bloodType, index) => (
                              <Cell
                                key={`cell-${bloodType}`}
                                fill={
                                  BLOOD_TYPE_COLORS[bloodType] ||
                                  DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                                }
                              />
                            )
                          )}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} units`, "Usage"]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage by Purpose</CardTitle>
                  <CardDescription>
                    Distribution of blood usage by medical purpose
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={
                            inventoryUsage?.usageByPeriod &&
                            inventoryUsage.usageByPeriod.length > 0
                              ? Object.entries(
                                  inventoryUsage.usageByPeriod[
                                    inventoryUsage.usageByPeriod.length - 1
                                  ]?.byPurpose || {}
                                ).map(([purpose, units]) => ({
                                  purpose,
                                  units,
                                }))
                              : Object.entries(
                                  mockInventoryUsage.usageByPeriod[
                                    mockInventoryUsage.usageByPeriod.length - 1
                                  ]?.byPurpose || {}
                                ).map(([purpose, units]) => ({
                                  purpose,
                                  units,
                                }))
                          }
                          dataKey="units"
                          nameKey="purpose"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ purpose }) => purpose}
                        >
                          {(inventoryUsage?.usageByPeriod &&
                          inventoryUsage.usageByPeriod.length > 0
                            ? Object.keys(
                                inventoryUsage.usageByPeriod[
                                  inventoryUsage.usageByPeriod.length - 1
                                ]?.byPurpose || {}
                              )
                            : Object.keys(
                                mockInventoryUsage.usageByPeriod[
                                  mockInventoryUsage.usageByPeriod.length - 1
                                ]?.byPurpose || {}
                              )
                          ).map((purpose, index) => (
                            <Cell
                              key={`cell-${purpose}`}
                              fill={
                                DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} units`, "Usage"]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Supply vs. Demand Analysis</CardTitle>
                <CardDescription>
                  Comparison of blood collection vs. usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      data={
                        donationTrends.length > 0
                          ? donationTrends
                          : mockDonationTrends
                      }
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="period"
                        tickFormatter={formatPeriodLabel}
                        allowDuplicatedCategory={false}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`${value} units`, ""]}
                        labelFormatter={formatPeriodLabel}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#3b82f6"
                        name="Donations"
                      />
                      <Line
                        data={
                          inventoryUsage?.usageByPeriod ||
                          mockInventoryUsage.usageByPeriod
                        }
                        type="monotone"
                        dataKey="total"
                        stroke="#ef4444"
                        name="Usage"
                        // Use this to map external data to the chart
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Inventory Status</CardTitle>
                <CardDescription>
                  Current blood inventory levels by type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    inventoryUsage?.currentInventory ||
                      mockInventoryUsage.currentInventory
                  ).map(([bloodType, data]: [string, any]) => {
                    const status =
                      data.total < 20
                        ? "Critical"
                        : data.total < 50
                        ? "Low"
                        : "Adequate";
                    const level =
                      data.total < 20 ? 20 : data.total < 50 ? 50 : 75;
                    const color =
                      status === "Critical"
                        ? "bg-red-600"
                        : status === "Low"
                        ? "bg-amber-600"
                        : "bg-green-600";

                    return (
                      <div key={bloodType} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-2">
                              {bloodType}
                            </div>
                            <span className="font-medium">{bloodType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{data.total} units</span>
                            <Badge
                              className={
                                status === "Critical"
                                  ? "bg-red-600"
                                  : status === "Low"
                                  ? "bg-amber-600"
                                  : "bg-green-600"
                              }
                            >
                              {status}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={level} className={color} />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Efficiency Metrics</CardTitle>
                <CardDescription>
                  Key metrics about inventory management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Inventory Turnover</h3>
                    <div className="text-3xl font-bold">4.2x</div>
                    <p className="text-sm text-muted-foreground">
                      Average monthly turnover rate
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Expiration Rate</h3>
                    <div className="text-3xl font-bold">2.1%</div>
                    <p className="text-sm text-muted-foreground">
                      Units expired before use
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Fulfillment Rate</h3>
                    <div className="text-3xl font-bold">96.8%</div>
                    <p className="text-sm text-muted-foreground">
                      Requests successfully fulfilled
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Support Chat Component */}
        <SupportChat />
      </div>
    </ClientLayout>
  );
}
