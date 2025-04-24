import type { Metadata } from "next"
import Link from "next/link"
import { Info, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Request Blood",
  description: "Request blood donation from voluntary donors in Bangladesh."
}

export default function RequestBloodPage() {
  return (
    <>
      <Header />
      <main className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Request Blood Donation</h1>
                <p className="text-muted-foreground">
                  Fill out the form below to request blood donation. Your request will be shared with potential donors in your area.
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Patient and Request Information</CardTitle>
                  <CardDescription>
                    Please provide accurate information for better results
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Emergency Request Process</p>
                      <p className="text-muted-foreground">
                        For faster results, after submitting this form, call our hotline at <span className="font-medium text-foreground">+880 1712-345678</span> to expedite your request.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Patient Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patientName">Patient Name</Label>
                        <Input id="patientName" placeholder="Full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patientAge">Patient Age</Label>
                        <Input id="patientAge" type="number" placeholder="Age in years" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Required Blood Group</Label>
                        <Select>
                          <SelectTrigger id="bloodGroup">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unitsNeeded">Units Needed</Label>
                        <Select>
                          <SelectTrigger id="unitsNeeded">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Bag</SelectItem>
                            <SelectItem value="2">2 Bags</SelectItem>
                            <SelectItem value="3">3 Bags</SelectItem>
                            <SelectItem value="4">4 Bags</SelectItem>
                            <SelectItem value="5+">5+ Bags</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Hospital Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="hospitalName">Hospital Name</Label>
                      <Input id="hospitalName" placeholder="Full hospital name" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hospitalAddress">Hospital Address</Label>
                      <Input id="hospitalAddress" placeholder="Full address" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="e.g. Dhaka" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="area">Area</Label>
                        <Input id="area" placeholder="e.g. Gulshan" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bloodRequiredBy">When is blood needed?</Label>
                      <Input id="bloodRequiredBy" type="date" />
                    </div>

                    <div className="space-y-2">
                      <Label>Is this an emergency?</Label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="emergency"
                            value="yes"
                            className="h-4 w-4 text-primary focus:ring-primary"
                          />
                          <span>Yes, urgent</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="emergency"
                            value="no"
                            className="h-4 w-4 text-primary focus:ring-primary"
                          />
                          <span>No, scheduled need</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Person Name</Label>
                        <Input id="contactName" placeholder="Full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="relationship">Relationship to Patient</Label>
                        <Input id="relationship" placeholder="e.g. Family member, Friend" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone Number</Label>
                      <div className="flex">
                        <div className="inline-flex h-10 items-center justify-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                          +880
                        </div>
                        <Input
                          id="contactPhone"
                          type="tel"
                          placeholder="1XX XXX XXXX"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="alternatePhone">Alternate Phone (Optional)</Label>
                      <div className="flex">
                        <div className="inline-flex h-10 items-center justify-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                          +880
                        </div>
                        <Input
                          id="alternatePhone"
                          type="tel"
                          placeholder="1XX XXX XXXX"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                      <textarea
                        id="additionalInfo"
                        rows={3}
                        placeholder="Any additional details that might help donors..."
                        className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="publicInfo"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="publicInfo" className="text-sm text-muted-foreground">
                      I understand that this information will be visible to registered donors
                    </label>
                  </div>

                  <Button className="w-full" size="lg">Submit Blood Request</Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    Important Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Blood Group Compatibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Remember that some blood groups are compatible with others. If you're not finding exact matches, you might be able to use compatible blood types.
                    </p>
                    <Link href="/blood-groups" className="text-sm text-primary hover:underline">
                      View blood group compatibility chart
                    </Link>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Tips for Finding Donors</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex gap-2">
                        <span className="text-primary font-medium">•</span>
                        <span>Submit your request as early as possible</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-medium">•</span>
                        <span>Provide complete and accurate information</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-medium">•</span>
                        <span>Share your request on social media</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-medium">•</span>
                        <span>Consider contacting nearby blood banks as well</span>
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Need Help?</h3>
                    <p className="text-sm text-muted-foreground">
                      If you're facing an emergency or need assistance with your request, call our 24/7 helpline.
                    </p>
                    <div className="bg-primary/10 p-3 rounded-md text-center">
                      <p className="text-sm font-medium">Rokto Shetu Helpline</p>
                      <p className="text-lg font-bold text-primary">+880 1712-345678</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

// // import React from "react";
// // import Link from "next/link";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";

// // const BecomeDonorPage = () => {
// //   return (
// //     <div className="container mx-auto px-4 py-16 max-w-5xl">
// //       <div className="text-center mb-12">
// //         <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
// //           Become a Blood Donor
// //         </h1>
// //         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
// //           Your donation can save up to three lives. Join our community of blood
// //           donors and help those in need.
// //         </p>
// //       </div>

// //       <div className="grid md:grid-cols-2 gap-8 mb-16">
// //         <div>
// //           <h2 className="text-2xl font-semibold mb-4">Why Donate Blood?</h2>
// //           <ul className="space-y-4">
// //             <li className="flex items-start">
// //               <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   className="h-4 w-4 text-red-600"
// //                   viewBox="0 0 20 20"
// //                   fill="currentColor"
// //                 >
// //                   <path
// //                     fillRule="evenodd"
// //                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
// //                     clipRule="evenodd"
// //                   />
// //                 </svg>
// //               </div>
// //               <div>
// //                 <strong className="font-medium text-gray-900">Save Lives:</strong>{" "}
// //                 <span className="text-gray-700">
// //                   One donation can save up to three lives.
// //                 </span>
// //               </div>
// //             </li>
// //             <li className="flex items-start">
// //               <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   className="h-4 w-4 text-red-600"
// //                   viewBox="0 0 20 20"
// //                   fill="currentColor"
// //                 >
// //                   <path
// //                     fillRule="evenodd"
// //                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
// //                     clipRule="evenodd"
// //                   />
// //                 </svg>
// //               </div>
// //               <div>
// //                 <strong className="font-medium text-gray-900">Health Benefits:</strong>{" "}
// //                 <span className="text-gray-700">
// //                   Donating blood reduces the risk of heart disease and cancer.
// //                 </span>
// //               </div>
// //             </li>
// //             <li className="flex items-start">
// //               <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   className="h-4 w-4 text-red-600"
// //                   viewBox="0 0 20 20"
// //                   fill="currentColor"
// //                 >
// //                   <path
// //                     fillRule="evenodd"
// //                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
// //                     clipRule="evenodd"
// //                   />
// //                 </svg>
// //               </div>
// //               <div>
// //                 <strong className="font-medium text-gray-900">Free Health Check:</strong>{" "}
// //                 <span className="text-gray-700">
// //                   Your blood is tested for various diseases before donation.
// //                 </span>
// //               </div>
// //             </li>
// //             <li className="flex items-start">
// //               <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   className="h-4 w-4 text-red-600"
// //                   viewBox="0 0 20 20"
// //                   fill="currentColor"
// //                 >
// //                   <path
// //                     fillRule="evenodd"
// //                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
// //                     clipRule="evenodd"
// //                   />
// //                 </svg>
// //               </div>
// //               <div>
// //                 <strong className="font-medium text-gray-900">Community Impact:</strong>{" "}
// //                 <span className="text-gray-700">
// //                   Be part of a lifesaving network that helps your community.
// //                 </span>
// //               </div>
// //             </li>
// //           </ul>
// //         </div>

// //         <div>
// //           <h2 className="text-2xl font-semibold mb-4">Who Can Donate?</h2>
// //           <p className="text-gray-700 mb-4">
// //             Most healthy adults can donate blood. To ensure the safety of both
// //             donors and recipients, there are some basic eligibility requirements:
// //           </p>
// //           <ul className="space-y-2 text-gray-700 list-disc list-inside">
// //             <li>Be at least 18 years old</li>
// //             <li>Weigh at least 50 kg</li>
// //             <li>Be in good health</li>
// //             <li>Have not donated blood in the last 3 months</li>
// //             <li>Not be pregnant or breastfeeding</li>
// //             <li>Not have certain medical conditions</li>
// //           </ul>
// //         </div>
// //       </div>

// //       <div className="grid md:grid-cols-3 gap-6 mb-16">
// //         <Card>
// //           <CardContent className="pt-6">
// //             <h3 className="text-xl font-semibold mb-2">Before Donation</h3>
// //             <ul className="space-y-2 text-gray-700 list-disc list-inside">
// //               <li>Get a good night's sleep</li>
// //               <li>Eat a healthy meal</li>
// //               <li>Drink plenty of fluids</li>
// //               <li>Bring ID and donor card (if you have one)</li>
// //               <li>Avoid alcohol for 24 hours before donating</li>
// //             </ul>
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardContent className="pt-6">
// //             <h3 className="text-xl font-semibold mb-2">During Donation</h3>
// //             <ul className="space-y-2 text-gray-700 list-disc list-inside">
// //               <li>The process takes about 10-15 minutes</li>
// //               <li>You'll donate about 450ml of blood</li>
// //               <li>It's safe and performed by professionals</li>
// //               <li>Relax and breathe normally</li>
// //               <li>You can read or use your phone</li>
// //             </ul>
// //           </CardContent>
// //         </Card>

// //         <Card>
// //           <CardContent className="pt-6">
// //             <h3 className="text-xl font-semibold mb-2">After Donation</h3>
// //             <ul className="space-y-2 text-gray-700 list-disc list-inside">
// //               <li>Rest for 10-15 minutes</li>
// //               <li>Have a snack and drink</li>
// //               <li>Avoid heavy lifting for 24 hours</li>
// //               <li>Drink extra fluids</li>
// //               <li>Plan to donate again in 3 months</li>
// //             </ul>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       <div className="text-center">
// //         <h2 className="text-2xl font-semibold mb-6">Ready to Save Lives?</h2>
// //         <Button size="lg" asChild>
// //           <Link href="/register">Register as a Donor</Link>
// //         </Button>
// //         <p className="mt-4 text-gray-600">
// //           Already registered?{" "}
// //           <Link href="/login" className="text-red-600 hover:underline">
// //             Login
// //           </Link>{" "}
// //           to manage your donor profile.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BecomeDonorPage;


// import React from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// const BecomeDonorPage = () => {
//   return (
//     <div className="container mx-auto px-4 py-16 max-w-5xl">
//       <div className="text-center mb-12">
//         <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
//           Become a Blood Donor
//         </h1>
//         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//           Your donation can save up to three lives. Join our community of blood
//           donors and help those in need.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8 mb-16">
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Why Donate Blood?</h2>
//           <ul className="space-y-4">
//             <li className="flex items-start">
//               <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 text-red-600"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <strong className="font-medium text-gray-900">Save Lives:</strong>{" "}
//                 <span className="text-gray-700">
//                   One donation can save up to three lives.
//                 </span>
//               </div>
//             </li>
//             <li className="flex items-start">
//               <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 text-red-600"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <strong className="font-medium text-gray-900">Health Benefits:</strong>{" "}
//                 <span className="text-gray-700">
//                   Donating blood reduces the risk of heart disease and cancer.
//                 </span>
//               </div>
//             </li>
//             <li className="flex items-start">
//               <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 text-red-600"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <strong className="font-medium text-gray-900">Free Health Check:</strong>{" "}
//                 <span className="text-gray-700">
//                   Your blood is tested for various diseases before donation.
//                 </span>
//               </div>
//             </li>
//             <li className="flex items-start">
//               <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 text-red-600"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <strong className="font-medium text-gray-900">Community Impact:</strong>{" "}
//                 <span className="text-gray-700">
//                   Be part of a lifesaving network that helps your community.
//                 </span>
//               </div>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h2 className="text-2xl font-semibold mb-4">Who Can Donate?</h2>
//           <p className="text-gray-700 mb-4">
//             Most healthy adults can donate blood. To ensure the safety of both
//             donors and recipients, there are some basic eligibility requirements:
//           </p>
//           <ul className="space-y-2 text-gray-700 list-disc list-inside">
//             <li>Be at least 18 years old</li>
//             <li>Weigh at least 50 kg</li>
//             <li>Be in good health</li>
//             <li>Have not donated blood in the last 3 months</li>
//             <li>Not be pregnant or breastfeeding</li>
//             <li>Not have certain medical conditions</li>
//           </ul>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-3 gap-6 mb-16">
//         <Card>
//           <CardContent className="pt-6">
//             <h3 className="text-xl font-semibold mb-2">Before Donation</h3>
//             <ul className="space-y-2 text-gray-700 list-disc list-inside">
//               <li>Get a good night's sleep</li>
//               <li>Eat a healthy meal</li>
//               <li>Drink plenty of fluids</li>
//               <li>Bring ID and donor card (if you have one)</li>
//               <li>Avoid alcohol for 24 hours before donating</li>
//             </ul>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <h3 className="text-xl font-semibold mb-2">During Donation</h3>
//             <ul className="space-y-2 text-gray-700 list-disc list-inside">
//               <li>The process takes about 10-15 minutes</li>
//               <li>You'll donate about 450ml of blood</li>
//               <li>It's safe and performed by professionals</li>
//               <li>Relax and breathe normally</li>
//               <li>You can read or use your phone</li>
//             </ul>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <h3 className="text-xl font-semibold mb-2">After Donation</h3>
//             <ul className="space-y-2 text-gray-700 list-disc list-inside">
//               <li>Rest for 10-15 minutes</li>
//               <li>Have a snack and drink</li>
//               <li>Avoid heavy lifting for 24 hours</li>
//               <li>Drink extra fluids</li>
//               <li>Plan to donate again in 3 months</li>
//             </ul>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="text-center">
//         <h2 className="text-2xl font-semibold mb-6">Ready to Save Lives?</h2>
//         <Button size="lg" asChild>
//           <Link href="/register">Register as a Donor</Link>
//         </Button>
//         <p className="mt-4 text-gray-600">
//           Already registered?{" "}
//           <Link href="/login" className="text-red-600 hover:underline">
//             Login
//           </Link>{" "}
//           to manage your donor profile.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default BecomeDonorPage;
