"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Book, Clock, LoaderPinwheel, PlayCircle, TrendingUp, Wand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

function CourseInfo({ course, learnCourse }) {
  const courseLayout = course?.courseJson?.course;
  const bannerImageUrl = course?.imageUrl;
  const duration = course?.duration;
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  if (!courseLayout) {
    return <div>Loading course...</div>;
  }
const courseId=course?.cid
const generateCourseContent = async () => {
  try {
    setLoading(true);
    const result = await axios.post("/api/generate-course-content", {
      courseJson: courseLayout,
      courseName: courseLayout.name,
      courseId: courseId,
    });

    toast.success("Course generated successfully!", {
      duration: 8000,
    });

    router.replace("/workspace");
  } catch (error) {
    const status = error?.response?.status;

    if (status === 503) {
      toast.error("AI is busy. Please try again in a few minutes.", {
        duration: 8000,
      });
    } else {
      toast.error("Something went wrong. Please try again later.", {
        duration: 10000,
      });
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-2 md:p-6 shadow-xl w-full rounded-2xl bg-gray-100 flex flex-col gap-4 md:flex-row">
      {/* Left: Text content */}
      <div className="flex flex-col gap-4 w-full md:w-3/5 order-2 md:order-1">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold">{courseLayout.name}</h1>
          <p className="line-clamp-2">{courseLayout.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-2">
          <div className="p-4 flex gap-4 shadow-lg rounded-xl items-center">
            <Clock className="text-blue-500" />
            <div className="flex flex-col gap-0.5">
              <h2 className="font-bold">Duration</h2>
              <p>{duration}</p>
            </div>
          </div>
          <div className="p-4 flex gap-4 shadow-lg rounded-xl items-center">
            <Book className="text-green-500" />
            <div className="flex flex-col gap-0.5">
              <h2 className="font-bold">Chapters</h2>
              <p>{courseLayout.noOfChapters}</p>
            </div>
          </div>
          <div className="p-4 flex gap-4 shadow-lg rounded-xl items-center">
            <TrendingUp className="text-red-500" />
            <div className="flex flex-col gap-0.5">
              <h2 className="font-bold">Difficulty level</h2>
              <p>{courseLayout.level}</p>
            </div>
          </div>
        </div>
         {
          learnCourse?
         <Button
          onClick={generateCourseContent}
          disabled={loading}
          className="cursor-pointer flex flex-row gap-2 w-full md:w-lg mt-2 sm:mt-4"
        >
          {loading ? (
            <>
              <LoaderPinwheel className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand />
              Generate Content
            </>
          )}
        </Button>:
        <Link href={`/view-content/${courseId}`}><Button
          className="cursor-pointer flex flex-row gap-2 w-full md:w-lg mt-2 sm:mt-4"
        >
          <PlayCircle/>
          Continue learning
        </Button></Link>
         
         }
        
      </div>

      {/* Right: Image */}
      <div className="w-full md:w-2/5 h-auto order-1 md:order-2">
        <Image
          className="rounded-lg object-cover w-full h-auto"
          src={bannerImageUrl}
          width={1200}
          height={800}
          alt="Course Banner"
        />
      </div>
    </div>
  );
}

export default CourseInfo;
