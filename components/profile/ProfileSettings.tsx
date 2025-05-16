"use client"
import { useAuth } from "@/hooks/useAuth"
import { useProfile } from "@/hooks/useProfile"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button"

export function ProfileSettings({ user }: { user: any }) {
    const { updateProfile, isLoading } = useProfile()
    const { logout } = useAuth()
    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        upazila: user.upazila || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)

        const result = await updateProfile({
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            upazila: formData.upazila,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
        })

        if (result) {
            setSuccess("Profile updated successfully")
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 text-sm">
                        <p>{error}</p>
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 text-green-800 p-3 rounded-md mb-4 text-sm">
                        <p>{success}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full p-2 border rounded-md bg-gray-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="text-lg font-medium">Address</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="address" className="text-sm font-medium">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="city" className="text-sm font-medium">
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="upazila" className="text-sm font-medium">
                                        Upazila
                                    </label>
                                    <input
                                        id="upazila"
                                        name="upazila"
                                        value={formData.upazila}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="flex justify-between pt-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button type="button" variant="destructive" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
  }