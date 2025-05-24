"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Shield,
  Clock,
  MapPin,
  Activity,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  Globe,
  Building2,
  Star,
  Quote,
} from "lucide-react";
import ClientLayout from "@/components/layout/clientLayout";

export default function AboutPage() {
  const stats = [
    { label: "Lives Impacted", value: "50,000+", icon: Heart },
    { label: "Active Donors", value: "10,000+", icon: Users },
    { label: "Blood Units", value: "25,000+", icon: Activity },
    { label: "Partner Hospitals", value: "100+", icon: MapPin },
  ];

  const features = [
    {
      title: "Real-time Matching",
      description:
        "Advanced algorithm to match blood donors with recipients in real-time",
      icon: Clock,
    },
    {
      title: "Secure Platform",
      description:
        "End-to-end encryption and secure data handling for donor information",
      icon: Shield,
    },
    {
      title: "Donor Management",
      description:
        "Comprehensive system to track donor eligibility and donation history",
      icon: Users,
    },
    {
      title: "Quality Assurance",
      description: "Rigorous quality checks and verification processes",
      icon: CheckCircle2,
    },
  ];

  const achievements = [
    {
      title: "Best Healthcare Innovation 2024",
      organization: "Global Health Awards",
      year: "2024",
    },
    {
      title: "Digital Impact Award",
      organization: "Tech for Good",
      year: "2023",
    },
    {
      title: "Community Service Excellence",
      organization: "Healthcare Excellence Awards",
      year: "2023",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Medical Director",
      image: "/team/sarah.jpg",
      bio: "20+ years of experience in blood banking and transfusion medicine",
    },
    {
      name: "Michael Chen",
      role: "Technical Lead",
      image: "/team/michael.jpg",
      bio: "Expert in healthcare technology and system architecture",
    },
    {
      name: "Emma Williams",
      role: "Community Outreach",
      image: "/team/emma.jpg",
      bio: "Passionate about connecting donors with those in need",
    },
    {
      name: "Dr. James Wilson",
      role: "Quality Assurance",
      image: "/team/james.jpg",
      bio: "Specialist in blood safety and quality control",
    },
  ];

  const testimonials = [
    {
      quote:
        "LifeFlow has revolutionized how we manage blood donations. Their platform is a game-changer.",
      author: "Dr. Lisa Thompson",
      role: "Hospital Administrator",
      rating: 5,
    },
    {
      quote:
        "As a regular donor, I love how easy it is to schedule donations and track my impact.",
      author: "John Smith",
      role: "Blood Donor",
      rating: 5,
    },
    {
      quote:
        "The real-time matching system has helped us save countless lives during emergencies.",
      author: "Maria Garcia",
      role: "Emergency Department Head",
      rating: 5,
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["info@lifeflow.org", "support@lifeflow.org"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: Building2,
      title: "Headquarters",
      details: ["123 Health Street", "Medical District, City 12345"],
    },
  ];

  return (
    <ClientLayout>
      <div className="container py-8">
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
          <Image
            src="/about-hero.jpg"
            alt="Blood Donation"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 flex items-center">
            <div className="max-w-2xl px-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Connecting Lives Through Blood Donation
              </h1>
              <p className="text-lg text-white/90 mb-6">
                LifeFlow is revolutionizing blood donation management through
                technology, making it easier to save lives and build stronger
                communities.
              </p>
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Join Our Mission
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-red-600" />
                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4">Our Mission</Badge>
          <h2 className="text-3xl font-bold mb-6">
            Making Blood Donation Accessible to Everyone
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We believe that access to safe blood should be a fundamental right.
            Our platform connects donors, hospitals, and blood banks to ensure
            that no one has to wait for life-saving blood transfusions.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">Learn More</Button>
            <Button className="bg-red-600 hover:bg-red-700">
              Get Involved
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <feature.icon className="w-8 h-8 mb-4 text-red-600" />
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-red-600 mb-2">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-muted rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            What People Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 mb-4 text-red-600" />
                    <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <Award className="w-8 h-8 mb-4 text-red-600" />
                    <h3 className="text-xl font-semibold mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {achievement.organization}
                    </p>
                    <Badge variant="outline">{achievement.year}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-muted rounded-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <info.icon className="w-8 h-8 mb-4 text-red-600" />
                    <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community of donors and help us save more lives. Every
            donation counts, and together we can make a significant impact.
          </p>
          <Button size="lg" className="bg-red-600 hover:bg-red-700">
            Become a Donor
          </Button>
        </div>
      </div>
    </ClientLayout>
  );
}
