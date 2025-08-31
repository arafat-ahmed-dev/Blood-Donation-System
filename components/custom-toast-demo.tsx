"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    CustomToast,
    authToasts,
    verificationToasts,
    donationToasts,
    appointmentToasts,
    profileToasts,
    bloodRequestToasts,
    adminToasts,
    systemToasts
} from '@/lib/custom-toast';

/**
 * Demo component to showcase the Custom Toast System
 * This can be used for testing and as a reference for developers
 */
export default function CustomToastDemo() {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-center">Custom Toast System Demo</h1>

            {/* Basic Toast Types */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic Toast Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button
                            onClick={() => CustomToast.success({
                                description: "Operation completed successfully!",
                                context: 'general'
                            })}
                            variant="outline"
                            className="text-green-600"
                        >
                            Success Toast
                        </Button>

                        <Button
                            onClick={() => CustomToast.error({
                                description: "Something went wrong. Please try again.",
                                context: 'general'
                            })}
                            variant="outline"
                            className="text-red-600"
                        >
                            Error Toast
                        </Button>

                        <Button
                            onClick={() => CustomToast.warning({
                                description: "Please review your information before proceeding.",
                                context: 'general'
                            })}
                            variant="outline"
                            className="text-yellow-600"
                        >
                            Warning Toast
                        </Button>

                        <Button
                            onClick={() => CustomToast.info({
                                description: "Your session will expire in 5 minutes.",
                                context: 'general'
                            })}
                            variant="outline"
                            className="text-blue-600"
                        >
                            Info Toast
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Authentication Toasts */}
            <Card>
                <CardHeader>
                    <CardTitle>Authentication Toasts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <Button onClick={() => authToasts.loginSuccess()} variant="outline">
                            Login Success
                        </Button>
                        <Button onClick={() => authToasts.loginError()} variant="outline">
                            Login Error
                        </Button>
                        <Button onClick={() => authToasts.logoutSuccess()} variant="outline">
                            Logout Success
                        </Button>
                        <Button onClick={() => authToasts.registrationSuccess()} variant="outline">
                            Registration Success
                        </Button>
                        <Button onClick={() => authToasts.passwordReset()} variant="outline">
                            Password Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Verification Toasts */}
            <Card>
                <CardHeader>
                    <CardTitle>Email Verification Toasts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <Button onClick={() => verificationToasts.codeSent()} variant="outline">
                            Code Sent
                        </Button>
                        <Button onClick={() => verificationToasts.codeExpired()} variant="outline">
                            Code Expired
                        </Button>
                        <Button onClick={() => verificationToasts.codeInvalid()} variant="outline">
                            Code Invalid
                        </Button>
                        <Button onClick={() => verificationToasts.verificationSuccess()} variant="outline">
                            Verification Success
                        </Button>
                        <Button onClick={() => verificationToasts.tooManyAttempts()} variant="outline">
                            Too Many Attempts
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Donation Toasts */}
            <Card>
                <CardHeader>
                    <CardTitle>Donation Toasts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button onClick={() => donationToasts.scheduled()} variant="outline">
                            Donation Scheduled
                        </Button>
                        <Button onClick={() => donationToasts.completed()} variant="outline">
                            Donation Completed
                        </Button>
                        <Button onClick={() => donationToasts.cancelled()} variant="outline">
                            Donation Cancelled
                        </Button>
                        <Button onClick={() => donationToasts.eligibilityRequired()} variant="outline">
                            Eligibility Required
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Appointment Toasts */}
            <Card>
                <CardHeader>
                    <CardTitle>Appointment Toasts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button onClick={() => appointmentToasts.booked()} variant="outline">
                            Appointment Booked
                        </Button>
                        <Button onClick={() => appointmentToasts.cancelled()} variant="outline">
                            Appointment Cancelled
                        </Button>
                        <Button onClick={() => appointmentToasts.rescheduled()} variant="outline">
                            Appointment Rescheduled
                        </Button>
                        <Button onClick={() => appointmentToasts.reminder()} variant="outline">
                            Appointment Reminder
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Profile Toasts */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Toasts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Button onClick={() => profileToasts.updated()} variant="outline">
                            Profile Updated
                        </Button>
                        <Button onClick={() => profileToasts.photoUploaded()} variant="outline">
                            Photo Uploaded
                        </Button>
                        <Button onClick={() => profileToasts.preferencesUpdated()} variant="outline">
                            Preferences Updated
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Blood Request Toasts */}
            <Card>
                <CardHeader>
                    <CardTitle>Blood Request Toasts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button onClick={() => bloodRequestToasts.submitted()} variant="outline">
                            Request Submitted
                        </Button>
                        <Button onClick={() => bloodRequestToasts.approved()} variant="outline">
                            Request Approved
                        </Button>
                        <Button onClick={() => bloodRequestToasts.fulfilled()} variant="outline">
                            Request Fulfilled
                        </Button>
                        <Button onClick={() => bloodRequestToasts.urgent()} variant="outline">
                            Urgent Request
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Admin Toasts */}
            <Card>
                <CardHeader>
                    <CardTitle>Admin Toasts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Button onClick={() => adminToasts.userApproved()} variant="outline">
                            User Approved
                        </Button>
                        <Button onClick={() => adminToasts.inventoryUpdated()} variant="outline">
                            Inventory Updated
                        </Button>
                        <Button onClick={() => adminToasts.reportGenerated()} variant="outline">
                            Report Generated
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* System Toasts */}
            <Card>
                <CardHeader>
                    <CardTitle>System Toasts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button onClick={() => systemToasts.networkError()} variant="outline">
                            Network Error
                        </Button>
                        <Button onClick={() => systemToasts.serverError()} variant="outline">
                            Server Error
                        </Button>
                        <Button onClick={() => systemToasts.maintenance()} variant="outline">
                            Maintenance
                        </Button>
                        <Button onClick={() => systemToasts.updateAvailable()} variant="outline">
                            Update Available
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Loading Toast Demo */}
            <Card>
                <CardHeader>
                    <CardTitle>Loading Toast Demo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button
                        onClick={() => {
                            const loadingToast = CustomToast.loading({
                                description: "Processing your request...",
                                context: 'general'
                            });

                            // Simulate async operation
                            setTimeout(() => {
                                loadingToast.dismiss();
                                CustomToast.success({
                                    description: "Operation completed successfully!",
                                    context: 'general'
                                });
                            }, 3000);
                        }}
                        variant="outline"
                    >
                        Simulate Loading Operation
                    </Button>
                </CardContent>
            </Card>

            {/* Custom Toast with Action */}
            <Card>
                <CardHeader>
                    <CardTitle>Toast with Action</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Button
                        onClick={() => CustomToast.warning({
                            title: "Unsaved Changes",
                            description: "You have unsaved changes. Would you like to save them?",
                            context: 'general',
                            action: (
                                <Button variant="outline" size="sm" onClick={() => {
                                    CustomToast.success({
                                        description: "Changes saved successfully!",
                                        context: 'general'
                                    });
                                }}>
                                    Save Now
                                </Button>
                            ),
                        })}
                        variant="outline"
                    >
                        Toast with Action
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
