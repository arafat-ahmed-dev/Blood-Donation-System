"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Send, X, Plus, User, Bot, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Ticket = {
  id: string
  subject: string
  category: string
  status: "Open" | "Pending" | "Resolved" | "Closed"
  createdAt: string
  messages: Message[]
}

type Message = {
  id: string
  content: string
  sender: "User" | "Support" | "AI"
  timestamp: string
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("tickets")
  const [newTicketOpen, setNewTicketOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Form state for new ticket
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketCategory, setTicketCategory] = useState("Technical")
  const [ticketMessage, setTicketMessage] = useState("")

  // Mock data for initial render
  useEffect(() => {
    setTickets([
      {
        id: "ticket-1",
        subject: "Cannot schedule appointment",
        category: "Technical",
        status: "Open",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        messages: [
          {
            id: "msg-1",
            content: "I'm trying to schedule a donation appointment but keep getting an error. Can you help?",
            sender: "User",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: "msg-2",
            content:
              "I'd be happy to help with your appointment scheduling issue. Could you please provide more details about the error you're seeing? A screenshot would be helpful if possible.",
            sender: "AI",
            timestamp: new Date(Date.now() - 86000000).toISOString(),
          },
        ],
      },
      {
        id: "ticket-2",
        subject: "Question about eligibility",
        category: "Medical",
        status: "Resolved",
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        messages: [
          {
            id: "msg-3",
            content: "I recently got a tattoo. How long do I need to wait before I can donate blood?",
            sender: "User",
            timestamp: new Date(Date.now() - 172800000).toISOString(),
          },
          {
            id: "msg-4",
            content:
              "Thank you for your question about blood donation eligibility after getting a tattoo. While I can provide general information, please note that specific eligibility criteria can vary by location and blood collection organization.\n\nIn many countries, including the US, you typically need to wait 3-6 months after getting a tattoo before donating blood. This waiting period is in place to reduce the risk of infections like hepatitis.\n\nHowever, if your tattoo was applied by a state-regulated entity using sterile needles and fresh ink, you might be eligible to donate without a waiting period in some locations.\n\nFor the most accurate information specific to your situation, I recommend:\n\n1. Contacting your local blood donation center directly\n2. Checking the official website of your country's blood service\n3. Using our eligibility checker tool in the app\n\nA support team member will follow up if you need more specific information.",
            sender: "AI",
            timestamp: new Date(Date.now() - 172700000).toISOString(),
          },
          {
            id: "msg-5",
            content: "Thank you for the information! I'll check with my local donation center.",
            sender: "User",
            timestamp: new Date(Date.now() - 172600000).toISOString(),
          },
          {
            id: "msg-6",
            content:
              "You're welcome! I'm glad I could help. If you have any other questions, feel free to ask. We appreciate your interest in donating blood!",
            sender: "Support",
            timestamp: new Date(Date.now() - 172500000).toISOString(),
          },
        ],
      },
    ])
  }, [])

  // Scroll to bottom of messages when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedTicket])

  const handleCreateTicket = async () => {
    if (!ticketSubject.trim() || !ticketMessage.trim()) return

    setIsLoading(true)

    try {
      // In a real implementation, this would be an API call
      // const response = await fetch("/api/support/create-ticket", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ subject: ticketSubject, category: ticketCategory, message: ticketMessage }),
      // })
      // const data = await response.json()

      // Mock response
      const newTicket: Ticket = {
        id: `ticket-${Date.now()}`,
        subject: ticketSubject,
        category: ticketCategory,
        status: "Open",
        createdAt: new Date().toISOString(),
        messages: [
          {
            id: `msg-${Date.now()}`,
            content: ticketMessage,
            sender: "User",
            timestamp: new Date().toISOString(),
          },
        ],
      }

      // Add AI response after a short delay
      setTimeout(() => {
        const updatedTickets = tickets.map((ticket) => {
          if (ticket.id === newTicket.id) {
            return {
              ...ticket,
              messages: [
                ...ticket.messages,
                {
                  id: `msg-${Date.now() + 1}`,
                  content: getAIResponse(ticketCategory),
                  sender: "AI",
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          }
          return ticket
        })

        setTickets(updatedTickets)

        if (selectedTicket?.id === newTicket.id) {
          setSelectedTicket(updatedTickets.find((t) => t.id === newTicket.id) || null)
        }
      }, 1000)

      setTickets([newTicket, ...tickets])
      setSelectedTicket(newTicket)
      setNewTicketOpen(false)
      setTicketSubject("")
      setTicketCategory("Technical")
      setTicketMessage("")
      setActiveTab("chat")
    } catch (error) {
      console.error("Error creating ticket:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      sender: "User",
      timestamp: new Date().toISOString(),
    }

    // Update the selected ticket with the new message
    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, userMessage],
    }

    // Update the tickets array
    const updatedTickets = tickets.map((ticket) => (ticket.id === selectedTicket.id ? updatedTicket : ticket))

    setTickets(updatedTickets)
    setSelectedTicket(updatedTicket)
    setNewMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        content:
          "Thank you for your message. Our support team will get back to you as soon as possible. In the meantime, is there anything else I can help you with?",
        sender: "AI",
        timestamp: new Date().toISOString(),
      }

      const ticketWithAiResponse = {
        ...updatedTicket,
        messages: [...updatedTicket.messages, aiMessage],
      }

      const ticketsWithAiResponse = updatedTickets.map((ticket) =>
        ticket.id === selectedTicket.id ? ticketWithAiResponse : ticket,
      )

      setTickets(ticketsWithAiResponse)
      setSelectedTicket(ticketWithAiResponse)
    }, 1000)
  }

  // Helper function to get AI response based on ticket category
  const getAIResponse = (category: string) => {
    switch (category) {
      case "Technical":
        return "Thank you for reporting this technical issue. I'll help you troubleshoot this problem. Could you please provide more details about what you're experiencing? If possible, please include any error messages you're seeing and the steps you're taking when the issue occurs. Our technical team will review your case as soon as possible."
      case "Medical":
        return "Thank you for your medical question. While I can provide general information about blood donation, I cannot provide specific medical advice. For your safety, I recommend consulting with a healthcare professional for personalized guidance. A member of our medical team will review your question and respond with general information soon."
      case "Donation":
        return "Thank you for your question about blood donation. We appreciate your interest in donating blood and helping save lives. I'll do my best to provide you with the information you need. A member of our donor services team will review your question and get back to you with more detailed information shortly."
      case "Other":
        return "Thank you for contacting us. I've received your message and will make sure it gets to the right team. A support representative will review your inquiry and get back to you as soon as possible. Is there anything else you'd like to add to your request in the meantime?"
      default:
        return "Thank you for your message. Our team will review your inquiry and respond as soon as possible. Is there anything else you'd like to add to your request in the meantime?"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100"
      case "Resolved":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Closed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case "User":
        return <User className="h-4 w-4" />
      case "Support":
        return <User className="h-4 w-4" />
      case "AI":
        return <Bot className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  return (
    <>
      {/* Floating chat button */}
      <Button className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg z-50" onClick={() => setIsOpen(true)}>
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 h-[600px] max-h-[80vh] flex flex-col">
          <DialogHeader className="px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle>Support Center</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 mx-4 mt-2">
              <TabsTrigger value="tickets">My Tickets</TabsTrigger>
              <TabsTrigger value="chat" disabled={!selectedTicket}>
                {selectedTicket ? "Chat" : "Select a Ticket"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tickets" className="flex-1 flex flex-col p-4 pt-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Support Tickets</h3>
                <Button size="sm" onClick={() => setNewTicketOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  New Ticket
                </Button>
              </div>

              <ScrollArea className="flex-1">
                <div className="space-y-2">
                  {tickets.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No support tickets yet</p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => setNewTicketOpen(true)}>
                        Create your first ticket
                      </Button>
                    </div>
                  ) : (
                    tickets.map((ticket) => (
                      <Card
                        key={ticket.id}
                        className={`cursor-pointer transition-colors ${
                          selectedTicket?.id === ticket.id ? "border-primary" : ""
                        }`}
                        onClick={() => {
                          setSelectedTicket(ticket)
                          setActiveTab("chat")
                        }}
                      >
                        <CardHeader className="p-3 pb-0">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-sm">{ticket.subject}</CardTitle>
                            <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                          </div>
                          <CardDescription className="text-xs flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(ticket.createdAt)}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-3 pt-2">
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {ticket.messages[ticket.messages.length - 1]?.content}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0 data-[state=active]:flex-1">
              {selectedTicket ? (
                <>
                  <div className="border-b p-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-sm">{selectedTicket.subject}</h3>
                      <Badge className={getStatusColor(selectedTicket.status)}>{selectedTicket.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs font-normal">
                        {selectedTicket.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(selectedTicket.createdAt)}</span>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {selectedTicket.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "User" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex gap-2 max-w-[80%] ${
                              message.sender === "User" ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarFallback
                                className={
                                  message.sender === "AI"
                                    ? "bg-purple-100 text-purple-600"
                                    : message.sender === "Support"
                                      ? "bg-green-100 text-green-600"
                                      : "bg-blue-100 text-blue-600"
                                }
                              >
                                {getSenderIcon(message.sender)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div
                                className={`rounded-lg p-3 text-sm ${
                                  message.sender === "User"
                                    ? "bg-primary text-primary-foreground"
                                    : message.sender === "AI"
                                      ? "bg-purple-100 text-purple-900"
                                      : "bg-muted"
                                }`}
                              >
                                {message.content.split("\n").map((line, i) => (
                                  <p key={i} className={i > 0 ? "mt-2" : ""}>
                                    {line}
                                  </p>
                                ))}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <span>{message.sender}</span>
                                <span>•</span>
                                <span>{formatDate(message.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  <div className="p-3 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center flex-col p-4">
                  <p className="text-muted-foreground mb-2">Select a ticket to view the conversation</p>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("tickets")}>
                    View Tickets
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* New ticket dialog */}
      <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Support Ticket</DialogTitle>
            <DialogDescription>
              Describe your issue or question and we'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="Brief description of your issue"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Select value={ticketCategory} onValueChange={setTicketCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical Issue</SelectItem>
                  <SelectItem value="Medical">Medical Question</SelectItem>
                  <SelectItem value="Donation">Donation Process</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Describe your issue in detail"
                rows={5}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTicketOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTicket} disabled={isLoading || !ticketSubject.trim() || !ticketMessage.trim()}>
              {isLoading ? "Creating..." : "Create Ticket"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
