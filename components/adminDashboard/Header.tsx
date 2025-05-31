import { Bell, ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function HeaderDashboard() {
  return (
    <header className="sticky top-0 z-20 flex w-full items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex lg:hidden items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={25}
          height={25}
          className="rounded-full"
        />
        <span className="text-xl font-bold">Rokto Shetu Admin</span>
      </div>
      <div className="flex items-center lg:w-full justify-between gap-4 lg:gap-6">
        <div className="relative w-full max-w-sm hidden md:flex">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8 bg-background rounded-lg border border-input"
          />
        </div>
        <div className="flex gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-600"></span>
          </Button>
          <div className="relative flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Admin"
                fill
                className="object-cover"
              />
            </div>
            <span className="hidden md:inline-block text-sm font-medium">
              {"Admin User"}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderDashboard;
