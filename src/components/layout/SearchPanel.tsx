"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SearchPanelProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
}

export default function SearchPanel({ isOpen, onOpenChange }: SearchPanelProps) {
    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex" aria-label="Search">
                    <Search className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-40">
                <div className="flex flex-col h-full justify-center items-center">
                    <div className="w-full max-w-lg space-y-4">
                        <h2 className="text-lg font-medium">Search Rokto Shetu</h2>
                        <div className="flex gap-2">
                            <Input
                                placeholder="Search for donors, blood banks, resources..."
                                className="flex-1"
                                aria-label="Search input"
                            />
                            <Button>Search</Button>
                        </div>
                        <div className="flex gap-2 text-sm text-muted-foreground">
                            <span>Quick search:</span>
                            <Link href="/donor/list?type=a_positive" className="hover:text-primary">A+</Link>
                            <Link href="/donor/list?type=o_negative" className="hover:text-primary">O-</Link>
                            <Link href="/donor/list?urgent=true" className="hover:text-primary">Urgent requests</Link>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}