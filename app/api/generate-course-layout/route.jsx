import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, ...formData } = await req.json();

  const PROMPT = `
Generate a Learning Course based on the following details. Include:
- Course Name
- Description
- Duration for all chapters
- Course Banner Image Prompt (Create a highly realistic, cinematic digital image for an online course about [TOPIC]. The image should reflect the essence, environment, and practical application of the subject in a compelling and professional way. Use real-world visual cues that are specific to the topic — such as tools, locations, objects, or people engaged in relevant activities. Avoid generic setups. Instead, vary the perspective and environment based on the subject matter:

For tech or digital topics, show screens, code, wireframes, or UIs in modern workspaces.

For creative or artistic topics, depict sketchpads, canvases, studios, or tools in use.

For communication, business, or leadership, show team collaboration, presentations, or confident individuals.

For personal development, wellness, or soft skills, use natural settings, reading, thinking, or calm moments.

Incorporate a modern, vibrant color palette (blues, grays, oranges, purples) and maintain depth, realism, and subtle cinematic lighting. Avoid repeating the same scene structure — adapt the composition, objects, and background to the unique context of the course. The scene should feel authentic, inspired, and tailored to the learner’s journey.)
- Chapter Name
- Topics under each chapter
- Duration for each chapter

Return the result in **JSON format only**.

Schema:
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "duration":"string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ]
      }
    ]
  }
}

User Input:
`;
  const user = await currentUser();
   const {has} = await auth()
  const hasPremiumAccess = has({ plan: 'starter' })

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: -1,
    },
    responseMimeType: "text/plain",
  };
  const model = "gemini-2.5-pro";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: PROMPT + JSON.stringify(formData),
        },
      ],
    },
  ];
  if(!hasPremiumAccess){
    const result =await db.select().from(coursesTable).where(eq(coursesTable.userEmail,user?.primaryEmailAddress.emailAddress))
    if (result.length >=1){
      return NextResponse.json({'resp':'limit exceed'})
    }
  }
  const response = await ai.models.generateContent({
    model,
    config,
    contents,
  });
  const RawResp = response.candidates[0].content.parts[0].text;
function cleanGeminiJSON(text) {
  return text
    .replace(/```json/i, "")
    .replace(/```/, "")
    .replace(/[\u0000-\u001F]+/g, "") // remove bad control characters
    .replace(/[“”]/g, '"')            // fix smart quotes
    .replace(/\\"/g, '"')             // unescape double quotes
    .trim();
}

let JSONResp = {};
try {
  const cleaned = cleanGeminiJSON(RawResp);
  JSONResp = JSON.parse(cleaned);
} catch (err) {
  console.error("❌ Failed to parse JSON:", err);
  JSONResp = {
    error: "Invalid JSON format from Gemini",
    raw: RawResp,
  };
}


  const bannerImagePrompt = JSONResp.course.bannerImagePrompt;
const imageGenrate = async (prompt) => {
  const BASE_URL = "https://aigurulab.tech";
  const result = await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: prompt,
      model: "flux", // 'flux'
      aspectRatio: "16:9", // Applicable to Flux model only
    },
    {
      headers: {
        "x-api-key": process.env.AI_LABGURU_KEY,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(result.data.image);
  return result.data.image;
};


  const bannerImageUrl =await imageGenrate(bannerImagePrompt);

  const result = await db.insert(coursesTable).values({
    ...formData,
    courseJson: JSONResp,
    cid: courseId,
    userEmail: user?.primaryEmailAddress?.emailAddress,
    imageUrl: bannerImageUrl,
    duration:JSONResp.course.duration,
  });

  return NextResponse.json(JSONResp);
}
