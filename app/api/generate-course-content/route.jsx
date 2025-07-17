import { NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { jsonrepair } from 'jsonrepair';

const PROMPT = `Depends on Chapter name and Topic Generate content for each topic in HTML and
give response in JSON format.
Schema:{
chapterName:<>,
{
topic:<>,
content:<>,
}
}
:UserInput:
`;

export async function POST(req) {
  const { courseJson, courseName, courseId } = await req.json();

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const model = 'gemini-2.5-pro';

  const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const GetYoutubeVideo = async (topic) => {
    const params = {
      part: 'snippet',
      q: topic,
      maxResults: 4,
      type: 'video',
      key: process.env.YOUTUBE_API_KEY
    };

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });
    return resp.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title
    }));
  };

  const cleanGeminiJSON = (text) => {
    return text
      .replace(/```json|```/gi, "")
      .replace(/[\u0000-\u001F]+/g, "")
      .replace(/[“”]/g, '"')
      .replace(/\\n/g, "")
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']')
      .trim();
  };

  try {
    const promises = courseJson?.chapters?.map(async (chapter) => {
      const contents = [
        {
          role: 'user',
          parts: [{ text: PROMPT + JSON.stringify(chapter) }],
        },
      ];

      let response;
      try {
        response = await ai.models.generateContent({
          model,
          contents,
        });
      } catch (err) {
        console.error("🔥 Gemini error:", err);
        if (err?.error?.code === 503) {
          throw new Error("Gemini is overloaded. Please try again shortly.");
        }
        throw new Error("AI content generation failed.");
      }

      const RawResp = response.candidates[0].content.parts[0].text;

      let JSONResp = {};
      try {
        const cleaned = cleanGeminiJSON(RawResp);
        const repaired = jsonrepair(cleaned);
        JSONResp = JSON.parse(repaired);
      } catch (err) {
        console.error("❌ Failed to parse JSON:", err);
        JSONResp = {
          error: "Invalid JSON format from Gemini",
          raw: RawResp,
        };
      }

      const youtubeData = await GetYoutubeVideo(chapter?.chapterName);

      return {
        youtubeVideos: youtubeData,
        courseData: JSONResp
      };
    });

    const courseContent = await Promise.all(promises);

    await db.update(coursesTable)
      .set({ courseContent: JSON.stringify(courseContent) })
      .where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
      courseContent,
      courseTitle: courseName
    });

  } catch (err) {
    console.error("❌ Course generation failed:", err.message);
    const isOverloaded = err.message.includes("Gemini is overloaded");

    return NextResponse.json({
      error: isOverloaded
        ? "AI model is currently overloaded. Please try again in a few moments."
        : "An error occurred while generating course content. Please try again.",
    }, {
      status: isOverloaded ? 503 : 500
    });
  }
}
