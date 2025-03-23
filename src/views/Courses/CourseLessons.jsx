import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // If using axios for API calls

const CourseLessons = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `/course/get-lessons?courseId=${courseId}`,
          {
            headers: {
              Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Add your token here
            },
          }
        );
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  if (loading) return <p>Loading lessons...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Course Lessons</h2>
      {lessons.length > 0 ? (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id} className="p-2 border-b">
              {lesson.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No lessons available for this course.</p>
      )}
    </div>
  );
};

export default CourseLessons;
