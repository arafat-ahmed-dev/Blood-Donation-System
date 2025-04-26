"use client"

import { useState } from "react"
import { MapPin, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function LocationSelector() {
    const [currentLocation, setCurrentLocation] = useState("Dhaka")

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
                    <p>Change your location</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}