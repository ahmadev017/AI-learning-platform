"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Sidebar } from "@/components/ui/sidebar";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { SelectedItemIndexContext } from "@/context/SelectedItemIndexContext";

function ContentSidebar() {
  const { courseId } = useParams();
  const [enrollContent, setEnrollContent] = useState({});
  const [loading, setLoading] = useState(true);
  const {indexx, setIndexx} = useContext(SelectedItemIndexContext);
  let completedChapter=enrollContent?.EnrollCourses?.completedChapters??[]


  useEffect(() => {
    if (courseId) getEnrollCourse();
  }, [courseId]);

  const getEnrollCourse = async () => {
    try {
      const result = await axios.post("/api/getEnrollCourse", {
        courseId,
      });
      setEnrollContent(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching enroll course", error);
      setLoading(false);
    }
  };

  const chapters = enrollContent?.courses?.courseJson?.course?.chapters || [];
  console.log(indexx);
  return (
    <Sidebar className="overflow-y-auto max-h-screen [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <h2 className="text-xl font-bold my-4 p-2">
        Chapters ({chapters.length})
      </h2>
      {loading ? (
        <p className="p-4 text-gray-500"></p>
      ) : chapters.length > 0 ? (
        <Accordion type="single" collapsible className="p-2 bg-secondary">
          {chapters.map((chapter, chapterIndex) => (
            <AccordionItem
              value={`chapter-${chapterIndex}`}
              key={`chapter-${chapterIndex}`}
              onClick={() => setIndexx(chapterIndex)}
              className=''
            >
              <AccordionTrigger className={`${completedChapter.includes(chapterIndex)?'bg-green-100 text-green-900':''} px-5 font-bold text-md`}>
                {chapter.chapterName}
              </AccordionTrigger>
              <AccordionContent>
                {chapter.topics?.map((topic, topicIndex) => (
                  <div
                    className={`${completedChapter.includes(chapterIndex)?'bg-green-100 text-green-800':'bg-white'} p-2 m-2  rounded-lg`}
                    key={`chapter-${chapterIndex}-topic-${topicIndex}`}
                  >
                    {topic}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-gray-500 p-2">No chapters found</p>
      )}
    </Sidebar>
  );
}

export default ContentSidebar;
