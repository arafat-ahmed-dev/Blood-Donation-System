import Image from "next/image";
import Link from "next/link";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import ClientLayout from "@/components/layout/clientLayout";

export default function BlogPage() {
  const featuredArticles = [
    {
      id: 1,
      title: "The Importance of Regular Blood Donation",
      excerpt:
        "Discover why donating blood regularly can save lives and improve your health.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Dr. Sarah Johnson",
      date: "April 15, 2024",
      readTime: "5 min read",
      category: "Health",
    },
    {
      id: 2,
      title: "Understanding Different Blood Types",
      excerpt:
        "Learn about the ABO blood group system and why blood type compatibility matters.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Dr. Michael Chen",
      date: "April 10, 2024",
      readTime: "7 min read",
      category: "Education",
    },
    {
      id: 3,
      title: "New Mobile Blood Donation Centers Launched",
      excerpt:
        "Our organization has launched 5 new mobile donation centers to reach rural communities.",
      image: "/placeholder.svg?height=400&width=600",
      author: "Emma Williams",
      date: "April 5, 2024",
      readTime: "3 min read",
      category: "News",
    },
  ];

  const recentNews = [
    {
      id: 4,
      title: "Blood Drive at City University Collects 200 Units",
      excerpt:
        "Students and faculty came together for the largest campus blood drive of the year.",
      date: "April 20, 2024",
      category: "Events",
    },
    {
      id: 5,
      title: "New Research Shows Benefits of Blood Donation for Donors",
      excerpt:
        "Recent study indicates regular blood donors may have lower risk of cardiovascular issues.",
      date: "April 18, 2024",
      category: "Research",
    },
    {
      id: 6,
      title: "National Blood Donation Week Begins May 1st",
      excerpt:
        "Annual awareness campaign aims to increase donor participation across the country.",
      date: "April 16, 2024",
      category: "Announcement",
    },
    {
      id: 7,
      title: "Local Hero Donates Blood for the 100th Time",
      excerpt:
        "John Smith has potentially saved up to 300 lives through his consistent donations.",
      date: "April 12, 2024",
      category: "Community",
    },
  ];

  return (
    <ClientLayout>
      <div className="container py-8">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold">Blog & News</h1>
          <p className="text-muted-foreground">
            Stay informed with the latest articles, research, and updates
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative h-[300px]">
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  alt="Featured article"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <Badge className="w-fit mb-2 bg-red-600 hover:bg-red-700">
                    Featured
                  </Badge>
                  <h2 className="text-2xl font-bold mb-2">
                    World Blood Donor Day: Celebrating Those Who Give Life
                  </h2>
                  <p className="mb-4">
                    Join us in honoring blood donors worldwide and learn how you
                    can participate in this year's events.
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>Dr. Emily Roberts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>April 22, 2024</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>6 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Latest Updates</h2>
              <Link href="#" className="text-sm text-red-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentNews.slice(0, 3).map((news) => (
                <Card key={news.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center mb-1">
                      <Badge variant="outline">{news.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {news.date}
                      </span>
                    </div>
                    <CardTitle className="text-base">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="line-clamp-2">
                      {news.excerpt}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="articles" className="mb-8">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="articles">Featured Articles</TabsTrigger>
            <TabsTrigger value="news">Recent News</TabsTrigger>
          </TabsList>
          <TabsContent value="articles" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center mb-1">
                      <Badge variant="outline">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {article.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription className="line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="news" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {recentNews.map((news) => (
                <Card key={news.id}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-center mb-1">
                      <Badge variant="outline">{news.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {news.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardDescription>{news.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="link" className="px-0 text-red-600">
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted rounded-lg p-6 md:p-8">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-2">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground mb-4">
              Stay updated with the latest news, blood donation drives, and
              educational content.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="bg-background" />
              <Button className="bg-red-600 hover:bg-red-700">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
