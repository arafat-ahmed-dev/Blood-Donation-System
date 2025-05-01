import { NextResponse } from "next/server"
import { gemini } from "@/lib/gemini"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, ticketCategory } = body

    if (!message) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 })
    }

    // Generate AI response using Gemini
    const model = gemini("gemini-pro")

    const prompt = `
      You are a helpful assistant for a blood donation system support team.
      A user has submitted the following support request in the category: ${ticketCategory || "General"}
      
      User message: "${message}"
      
      Provide a helpful, empathetic response that addresses their concern.
      If you need more information, ask specific questions.
      If this is a technical issue, provide troubleshooting steps.
      If this is a medical question, remind them to consult healthcare professionals.
      
      Keep your response concise (under 200 words) and professional.
    `

    const { text } = await model.generateText({
      prompt,
    })

    return NextResponse.json({
      success: true,
      data: {
        aiResponse: text,
      },
    })
  } catch (error) {
    console.error("Error generating AI response:", error)
    return NextResponse.json({ success: false, error: "Failed to generate AI response" }, { status: 500 })
  }
}
