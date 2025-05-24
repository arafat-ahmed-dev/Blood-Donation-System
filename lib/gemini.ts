import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Initialize the Gemini API client with safety settings
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Configure safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Get the model with safety settings
const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
  safetySettings,
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
  },
});

/**
 * Generate insights from analytics data using Gemini AI
 */
export async function generateInsights(analyticsData: any) {
  try {
    const prompt = `
      You are an AI assistant specialized in blood donation analytics. 
      Analyze the following blood donation system data and provide insights:
      
      ${JSON.stringify(analyticsData, null, 2)}
      
      Please provide:
      1. Three key insights about donation trends, inventory status, or donor behavior
      2. Two actionable recommendations to improve blood collection or donor retention
      3. One prediction about future trends
      
      Format your response as a JSON object with the following structure:
      {
        "insights": [
          {"title": "Insight Title", "description": "Detailed explanation", "category": "Category"}
        ],
        "recommendations": [
          {"title": "Recommendation Title", "description": "Detailed explanation", "priority": "High/Medium/Low"}
        ],
        "predictedTrends": [
          {"title": "Trend Title", "description": "Detailed explanation", "confidence": "High/Medium/Low"}
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch =
      text.match(/```json\n([\s\S]*?)\n```/) || text.match(/({[\s\S]*})/);

    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    } else {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse Gemini response as JSON:", e);
        return {
          insights: [
            {
              title: "Data Analysis Complete",
              description:
                "The system has analyzed your blood donation data. Check the dashboard for visualizations.",
              category: "System",
            },
          ],
          recommendations: [],
          predictedTrends: [],
        };
      }
    }
  } catch (error) {
    console.error("Error generating insights with Gemini:", error);
    return {
      insights: [
        {
          title: "Analysis Error",
          description:
            "There was an error analyzing your data. Please try again later.",
          category: "Error",
        },
      ],
      recommendations: [],
      predictedTrends: [],
    };
  }
}

/**
 * Predict future donation needs based on historical data
 */
export async function predictFutureDonationNeeds(historicalData: any) {
  try {
    const prompt = `
      You are an AI assistant specialized in blood donation analytics and forecasting.
      Based on the following historical blood donation and usage data, predict the blood donation needs for the next 2 months:
      
      ${JSON.stringify(historicalData, null, 2)}
      
      Consider seasonal factors, trends in usage by blood type, and current inventory levels.
      
      Format your response as a JSON object with the following structure:
      {
        "predictions": [
          {
            "month": "Month Year",
            "bloodTypeNeeds": {
              "A+": {"units": number, "trend": "Increasing/Stable/Decreasing"},
              "A-": {"units": number, "trend": "Increasing/Stable/Decreasing"},
              "B+": {"units": number, "trend": "Increasing/Stable/Decreasing"},
              "B-": {"units": number, "trend": "Increasing/Stable/Decreasing"},
              "AB+": {"units": number, "trend": "Increasing/Stable/Decreasing"},
              "AB-": {"units": number, "trend": "Increasing/Stable/Decreasing"},
              "O+": {"units": number, "trend": "Increasing/Stable/Decreasing"},
              "O-": {"units": number, "trend": "Increasing/Stable/Decreasing"}
            },
            "totalNeeded": number,
            "criticalTypes": ["Blood Type", "Blood Type"]
          }
        ],
        "seasonalFactors": ["Factor 1", "Factor 2", "Factor 3"],
        "confidenceLevel": "High/Medium/Low"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch =
      text.match(/```json\n([\s\S]*?)\n```/) || text.match(/({[\s\S]*})/);

    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    } else {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse Gemini response as JSON:", e);
        return {
          predictions: [
            {
              month: "Next Month",
              bloodTypeNeeds: {
                "A+": { units: 150, trend: "Stable" },
                "A-": { units: 50, trend: "Stable" },
                "B+": { units: 90, trend: "Stable" },
                "B-": { units: 30, trend: "Stable" },
                "AB+": { units: 40, trend: "Stable" },
                "AB-": { units: 20, trend: "Stable" },
                "O+": { units: 180, trend: "Stable" },
                "O-": { units: 60, trend: "Stable" },
              },
              totalNeeded: 620,
              criticalTypes: [],
            },
          ],
          seasonalFactors: ["Based on historical data"],
          confidenceLevel: "Low",
        };
      }
    }
  } catch (error) {
    console.error("Error generating predictions with Gemini:", error);
    return {
      predictions: [
        {
          month: "Prediction Error",
          bloodTypeNeeds: {},
          totalNeeded: 0,
          criticalTypes: [],
        },
      ],
      seasonalFactors: ["Error in prediction"],
      confidenceLevel: "Low",
    };
  }
}

/**
 * Generate AI response for support tickets
 */
export async function generateSupportResponse(ticketData: any) {
  try {
    const prompt = `
      You are a helpful assistant for a blood donation system's support team.
      Please provide a helpful response to the following support ticket:
      
      Category: ${ticketData.category}
      Subject: ${ticketData.subject}
      Message: ${ticketData.message}
      
      Provide a friendly, helpful response that addresses the user's concern.
      If this is a technical issue, provide troubleshooting steps.
      If this is a medical question, remind them that you cannot provide medical advice and they should consult a healthcare professional.
      If this is a general question about blood donation, provide accurate information.
      
      Format your response as plain text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating support response with Gemini:", error);
    return "I apologize, but I'm unable to process your request at the moment. A support team member will respond to your ticket as soon as possible. Thank you for your patience.";
  }
}
