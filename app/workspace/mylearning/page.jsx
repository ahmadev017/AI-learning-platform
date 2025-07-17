"use client";
import React, { useEffect, useState } from "react";
import EnrollCourseCard from "../-components/EnrollCourseCard";
import axios from "axios";
import { Loader2 } from "lucide-react";

function MyLearning() {
  const [enrollContent, setEnrollContent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEnrollCourse();
  }, []);

  const getEnrollCourse = async () => {
    setLoading(true);
    const result = await axios.get("/api/getEnrollCourses");
    setEnrollContent(result.data);
    console.log(result.data);
    setLoading(false);
  };
  return (
    <div className=" p-10">
     {loading ? (
  <div className="flex items-center justify-center h-[70vh]">
    <Loader2 size={80} className="animate-spin text-gray-500" />
  </div>
) : (
  <div>
    <h2 className="my-5 font-bold text-2xl">Enrolled courses</h2>
    {enrollContent.length === 0 ? (
      <p className="text-gray-500 font-extrabold text-3xl p-6 border rounded-2xl bg-gradient-to-br from-green-300 to-yellow-400 shadow-2xl">You haven't enrolled in any courses yet.</p>
    ) : (
      <div className="flex flex-wrap gap-5 w-full items-start justify-start">
        {enrollContent.map((course, index) => (
          <EnrollCourseCard key={index} course={course} />
        ))}
      </div>
    )}
  </div>
)}

    </div>
  );
}

export default MyLearning;
