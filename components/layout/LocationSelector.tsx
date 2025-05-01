"use client"

import { useState } from "react"
import { MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function LocationSelector() {
  const [currentLocation, setCurrentLocation] = useState("Dhaka")
  const cities = ["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal", "Rangpur"]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex gap-1 text-muted-foreground hover:text-foreground ml-4"
            aria-label="Change location"
          >
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-normal">{currentLocation}</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col">
            <p className="mb-2">Select your location:</p>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setCurrentLocation(city)}
                className={`text-left px-2 py-1 hover:bg-muted ${currentLocation === city ? "font-bold" : ""}`}
              >
                {city}
              </button>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
