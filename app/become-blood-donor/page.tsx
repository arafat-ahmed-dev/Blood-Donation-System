import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const BecomeDonorPage = () => {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-16 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
                        Become a Blood Donor
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Your donation can save up to three lives. Join our community of blood
                        donors and help those in need.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Why Donate Blood?</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-red-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <strong className="font-medium text-gray-900">Save Lives:</strong>{" "}
                                    <span className="text-gray-700">
                                        One donation can save up to three lives.
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-red-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <strong className="font-medium text-gray-900">Health Benefits:</strong>{" "}
                                    <span className="text-gray-700">
                                        Donating blood reduces the risk of heart disease and cancer.
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-red-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <strong className="font-medium text-gray-900">Free Health Check:</strong>{" "}
                                    <span className="text-gray-700">
                                        Your blood is tested for various diseases before donation.
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-red-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <strong className="font-medium text-gray-900">Community Impact:</strong>{" "}
                                    <span className="text-gray-700">
                                        Be part of a lifesaving network that helps your community.
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Who Can Donate?</h2>
                        <p className="text-gray-700 mb-4">
                            Most healthy adults can donate blood. To ensure the safety of both
                            donors and recipients, there are some basic eligibility requirements:
                        </p>
                        <ul className="space-y-2 text-gray-700 list-disc list-inside">
                            <li>Be at least 18 years old</li>
                            <li>Weigh at least 50 kg</li>
                            <li>Be in good health</li>
                            <li>Have not donated blood in the last 3 months</li>
                            <li>Not be pregnant or breastfeeding</li>
                            <li>Not have certain medical conditions</li>
                        </ul>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold mb-2">Before Donation</h3>
                            <ul className="space-y-2 text-gray-700 list-disc list-inside">
                                <li>Get a good night's sleep</li>
                                <li>Eat a healthy meal</li>
                                <li>Drink plenty of fluids</li>
                                <li>Bring ID and donor card (if you have one)</li>
                                <li>Avoid alcohol for 24 hours before donating</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold mb-2">During Donation</h3>
                            <ul className="space-y-2 text-gray-700 list-disc list-inside">
                                <li>The process takes about 10-15 minutes</li>
                                <li>You'll donate about 450ml of blood</li>
                                <li>It's safe and performed by professionals</li>
                                <li>Relax and breathe normally</li>
                                <li>You can read or use your phone</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold mb-2">After Donation</h3>
                            <ul className="space-y-2 text-gray-700 list-disc list-inside">
                                <li>Rest for 10-15 minutes</li>
                                <li>Have a snack and drink</li>
                                <li>Avoid heavy lifting for 24 hours</li>
                                <li>Drink extra fluids</li>
                                <li>Plan to donate again in 3 months</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-6">Ready to Save Lives?</h2>
                    <Button size="lg" asChild>
                        <Link href="/auth/register">Register as a Donor</Link>
                    </Button>
                    <p className="mt-4 text-gray-600">
                        Already registered?{" "}
                        <Link href="/auth" className="text-red-600 hover:underline">
                            Login
                        </Link>{" "}
                        to manage your donor profile.
                    </p>
                </div>
            </div>
            {/* <Footer/> */}
            <Footer />
        </>
    );
};

export default BecomeDonorPage;
