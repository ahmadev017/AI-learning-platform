import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SelectedItemIndexContext } from "@/context/SelectedItemIndexContext";
import { useParams } from "next/navigation";
import { CheckCircle, FilmIcon, Loader, Loader2, X } from "lucide-react";
import YouTube from "react-youtube";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function Content() {
  const { courseId } = useParams();
  const [enrollContent, setEnrollContent] = useState([]);

  const { indexx } = useContext(SelectedItemIndexContext);
   const [completedChapters,setCompletedChapters] = useState([])
   const [loading, setLoading] =useState(false)
   const[completeLoading,setCompleteLoading] = useState(false)
   const[incompleteLoading,setInCompleteLoading] = useState(false)
let completedChapter=enrollContent?.EnrollCourses?.completedChapters??[]


  useEffect(() => {
    if (courseId) getEnrollCourse();
  }, [courseId]);

  const getEnrollCourse = async () => {
    try {
      const result = await axios.post("/api/getEnrollCourse", {
        courseId,
      });

      const data = result.data;

      if (
        data?.courses?.courseContent &&
        typeof data.courses.courseContent === "string"
      ) {
        try {
          data.courses.courseContent = JSON.parse(data.courses.courseContent);
          console.log("Parsed courseContent:", data.courses.courseContent);
        } catch (parseError) {
          console.error("Failed to parse courseContent JSON:", parseError);
        }
      }

      setEnrollContent(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching enroll course", error);
      setLoading(false);
    }
  };


const markAsCompleted = async () => {
  const updatedChapters = [...completedChapter, indexx];

  try {
    setCompleteLoading(true)
    await axios.put("/api/chapter-completed", {
      completedChapter: updatedChapters,
      courseId: courseId,
    });

    // Update local state to re-render UI
    setEnrollContent((prev) => ({
      ...prev,
      EnrollCourses: {
        ...prev.EnrollCourses,
        completedChapters: updatedChapters,
      },
    }));
     setCompleteLoading(false)
    toast.success("Chapter Marked Completed");
  } catch (err) {
    toast.error("Failed to mark as completed");
    console.error(err);
  }
};

  const markAsInCompleted = async () => {
  const updatedChapters = completedChapter.filter((item) => item !== indexx);

  try {
    setInCompleteLoading(true)
    await axios.put("/api/chapter-completed", {
      completedChapter: updatedChapters,
      courseId: courseId,
    });

    // Update local state to re-render UI
    setEnrollContent((prev) => ({
      ...prev,
      EnrollCourses: {
        ...prev.EnrollCourses,
        completedChapters: updatedChapters,
      },
    }));
   setInCompleteLoading(false)
    toast.success("Chapter Marked Incomplete");
  } catch (err) {
    toast.error("Failed to mark as incomplete");
    console.error(err);
  }
};


   
console.log("setcompleted",completedChapters)

  const chapters = enrollContent?.courses?.courseJson?.course?.chapters || [];
  const videoData =
    enrollContent?.courses?.courseContent?.[indexx]?.youtubeVideos || [];
  const contentData =
    enrollContent?.courses?.courseContent?.[indexx]?.courseData || [];
  return (
    <div className="p-4 sm:p-10">
      {chapters.map((chapter, i) =>
      ( i === indexx) ? (
          <div key={i}>
            
            <div className="flex justify-between">
              <h2 className="font-bold text-2xl">{chapter.chapterName}</h2>{
                !completedChapter?.includes(indexx)?
                <Button onClick={()=>markAsCompleted()} >{
                  completeLoading?
                  <Loader2 className="animate-spin"/>:
                  <CheckCircle/>
                }
                Mark as Completed</Button>:
                <Button onClick={markAsInCompleted} variant="outline">
                  {incompleteLoading?
                   <Loader2 className="animate-spin"/>:
                    <X/>
                }
                  Mark InComplete</Button>
              }
               
            </div>
            <h2 className="flex items-center gap-2 my-4 text-xl font-semibold text-red-900">
              Related Videos <FilmIcon />
            </h2>
            {Array.isArray(videoData) && videoData.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-4">
                {videoData.slice(0, 2).map((video, index) => (
                  <div key={index} className="flex-1 min-w-[300px] max-w-[48%]">
                    <YouTube
                      videoId={video.videoId}
                      opts={{
                        width: "100%",
                        height: "350",
                        playerVars: {
                          modestbranding: 1,
                          rel: 0,
                        },
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No videos found</p>
            )}
            <div className="px-2 sm:px-6 lg:px-8"> {/* Wrapper for mobile padding */}
  {contentData?.topics?.length > 0 && (
    <div className="mt-6 space-y-4">
      <h3 className="text-xl font-semibold">Topics</h3>

      {contentData.topics.map((topicItem, idx) => (
        <div
          key={idx}
          className="border p-4 rounded-2xl bg-secondary w-full max-w-full overflow-x-auto sm:max-w-3xl lg:max-w-5xl mx-auto"
        >
          <h4 className="font-bold text-lg mb-2 text-primary">
            {topicItem.topic}
          </h4>
          <div dangerouslySetInnerHTML={{ __html: topicItem.content }} />
        </div>
      ))}
    </div>
  )}
</div>

          </div>
        ) : null
      )}
    </div>
  );
}

export default Content;
