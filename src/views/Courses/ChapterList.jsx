import React, { useEffect, useRef, useState } from "react";
import ChapterCard from "./components/ChapterCard";
import profile from "../../assets/img/dashboards/profile-image.jpg";
import NavHeader from "../../layouts/NavHeader";
import TabComponent from "./components/TabComponent";
import Back from "../../components/Back";
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";
import { useNavigate, useParams } from "react-router-dom";
import GetAssessment from "./components/GetAssessments";

const ChapterList = () => {
  const { loading, getCourseLessonsVideo, getAssessmentScore } = useAuth();
  const { courseId, lessonId } = useParams();
  const isMounted = useRef(true);
  const [courseName, setCourseName] = useState([]);
  const [chapterName, setChapterName] = useState([]);
  const [isChapterLoading, setIsChapterLoading] = useState(false);

  const [videoCourseLesson, setVideoCourseLesson] = useState([]);
  const [assessmentScore, setAssessmentScore] = useState([]);
  const [hasTakenAssessment, setHasTakenAssessment] = useState(null);
  const navigate = useNavigate();
  console.log("chapterName", chapterName);
  // Fetch course lessons
  useEffect(() => {
    isMounted.current = true;
    const fetchLessons = async () => {
      if (!courseId) return;
      setIsChapterLoading(true);
      try {
        const data = await getCourseLessonsVideo(courseId);
        if (isMounted.current && data?.data?.length) {
          const course = data.data[0].course;
          const chapters = data.data[0].chapters;

          // Set state values
          setVideoCourseLesson(data.data);
          setCourseName(course);
          setChapterName(chapters);
        }
      } catch (error) {
        console.error("Error fetching course lessons:", error);
      } finally {
        if (isMounted.current) {
          setIsChapterLoading(false);
        }
      }
    };

    fetchLessons();

    return () => {
      isMounted.current = false;
    };
  }, [courseId]);

  useEffect(() => {
    const fetchAssessmentScore = async () => {
      if (!courseId) return;

      try {
        const data = await getAssessmentScore(courseId);
        if (data && data.data) {
          setAssessmentScore(data.data);
          setHasTakenAssessment(true); // Assessment exists
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setHasTakenAssessment(false); // No assessment score found
        } else {
          console.error("Error fetching assessment score:", error);
        }
      } finally {
        if (isMounted.current) {
          setIsChapterLoading(false);
        }
      }
    };

    fetchAssessmentScore();
  }, [courseId]);

  console.log("assess score", assessmentScore);
  // return (
  //   <div className="h-full w-full overflow-hidden !py-4 scroll-hide">
  //     <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
  //       {loading ? (
  //         <div>
  //           <Loader2 />
  //         </div>
  //       ) : (
  //         <div className="backdrop-blur-xs !py-4 lg:!px-10 px-4 sticky top-0 z-40">
  //           <NavHeader header={courseName?.name} />
  //           <div className="gap-10 !py-8">
  //             <h1 className="font-bebas text-2xl text-nowrap lg:hidden">
  //               {courseName?.name}
  //             </h1>
  //             <div className="lg:col-span-3 col-span-5">
  //               <Back route={"/courses"} />
  //               <TabComponent
  //                 courseName={courseName}
  //                 chapterName={chapterName}
  //                 isChapterLoading={isChapterLoading}
  //                 videoCourseLesson={videoCourseLesson}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="h-full w-full overflow-hidden !py-4 scroll-hide">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        <div className="">
          <div className="backdrop-blur-xs !py-4 lg:!px-10 px-4 sticky top-0 z-40">
            <NavHeader header={courseName?.name} />
          </div>
          <div className="relative z-10">
            {loading ? (
              <Loader2 />
            ) : hasTakenAssessment === false || assessmentScore.length === 0 ? (
              // Render the Assessment Component
              <div className="backdrop-blur-xs !py-4 lg:!px-10 px-4 sticky top-0 z-40">
                <GetAssessment
                  hasTakenAssessment={hasTakenAssessment}
                  setHasTakenAssessment={setHasTakenAssessment}
                />
              </div>
            ) : (
              // Render the Chapter List and Lessons
              <div className="backdrop-blur-xs !py-4 lg:!px-10 px-4 sticky top-0 z-40">
                {/* <NavHeader header={courseName?.name} /> */}
                <div className="gap-10 !py-8">
                  <h1 className="font-bebas text-2xl text-nowrap lg:hidden">
                    {courseName?.name}
                  </h1>
                  <div className="lg:col-span-3 col-span-5">
                    <Back route={"/courses"} />
                    <TabComponent
                      courseName={courseName}
                      chapterName={chapterName}
                      isChapterLoading={isChapterLoading}
                      videoCourseLesson={videoCourseLesson}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterList;
