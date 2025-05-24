import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Settings, Shield, Users, Database } from "lucide-react";

export default function DashboardSettings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Settings</h1>
          <p className="text-muted-foreground">
            Configure system-wide settings and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full md:w-[600px] grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* System Name */}
              <div className="space-y-2">
                <Label>System Name</Label>
                <Input defaultValue="Blood Donation System" />
              </div>

              {/* Time Zone */}
              <div className="space-y-2">
                <Label>Default Time Zone</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="UTC+6">Asia/Dhaka (UTC+6)</option>
                  <option value="UTC+5:30">Asia/Kolkata (UTC+5:30)</option>
                  <option value="UTC+5">Asia/Karachi (UTC+5)</option>
                </select>
              </div>

              {/* Date Format */}
              <div className="space-y-2">
                <Label>Date Format</Label>
                <select className="w-full p-2 border rounded-md">
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              {/* Maintenance Mode */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable access to the system
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-600 hover:bg-red-700">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure system security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Session Settings */}
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input type="number" defaultValue="30" />
              </div>

              {/* Password Policy */}
              <div className="space-y-4">
                <h3 className="font-medium">Password Policy</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Minimum Password Length</Label>
                    <Input type="number" defaultValue="8" className="w-20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Require Special Characters</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Require Numbers</Label>
                    <Switch />
                  </div>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require 2FA for Staff</Label>
                  <p className="text-sm text-muted-foreground">
                    Enforce two-factor authentication for staff accounts
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-600 hover:bg-red-700">
                Update Security Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure system-wide notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Settings */}
              <div className="space-y-4">
                <h3 className="font-medium">Email Configuration</h3>
                <div className="space-y-2">
                  <Label>SMTP Server</Label>
                  <Input placeholder="smtp.example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>SMTP Port</Label>
                    <Input placeholder="587" />
                  </div>
                  <div className="space-y-2">
                    <Label>Encryption</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="tls">TLS</option>
                      <option value="ssl">SSL</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SMS Settings */}
              <div className="space-y-4">
                <h3 className="font-medium">SMS Configuration</h3>
                <div className="space-y-2">
                  <Label>SMS Gateway</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="twilio">Twilio</option>
                    <option value="vonage">Vonage</option>
                    <option value="custom">Custom Gateway</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input type="password" placeholder="Enter API key" />
                </div>
              </div>

              {/* Notification Types */}
              <div className="space-y-4">
                <h3 className="font-medium">Enable Notifications For:</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>New Blood Requests</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Donation Appointments</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Inventory Updates</Label>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-600 hover:bg-red-700">
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Manage external service integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Maps Integration */}
              <div className="space-y-4">
                <h3 className="font-medium">Google Maps</h3>
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input
                    type="password"
                    placeholder="Enter Google Maps API key"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Enable Location Services</Label>
                  <Switch />
                </div>
              </div>

              {/* Payment Gateway */}
              <div className="space-y-4">
                <h3 className="font-medium">Payment Gateway</h3>
                <div className="space-y-2">
                  <Label>Provider</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                    <option value="square">Square</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>API Key</Label>
                  <Input
                    type="password"
                    placeholder="Enter payment gateway API key"
                  />
                </div>
              </div>

              {/* Analytics */}
              <div className="space-y-4">
                <h3 className="font-medium">Analytics</h3>
                <div className="space-y-2">
                  <Label>Google Analytics ID</Label>
                  <Input placeholder="Enter Google Analytics ID" />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Enable Analytics</Label>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-red-600 hover:bg-red-700">
                Update Integrations
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
