import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // If using axios for API calls
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";
import NavHeader from "../../layouts/NavHeader";
import Back from "../../components/Back";
import RolePlayCards from "../Role-play/components/RolePlayCards";
import difficultbg from "../../assets/img/dashboards/rolePlay/difficult-bg.png";
import difficult from "../../assets/img/dashboards/rolePlay/difficult-convo.png";
import difficulticon from "../../assets/img/dashboards/rolePlay/music.svg";
import activebg from "../../assets/img/dashboards/rolePlay/active-bg.png";
import active from "../../assets/img/dashboards/rolePlay/active-listen.png";
import activeicon from "../../assets/img/dashboards/rolePlay/chat.svg";

import givingbg from "../../assets/img/dashboards/rolePlay/giving-bg.png";
import giving from "../../assets/img/dashboards/rolePlay/giving.png";
import givingicon from "../../assets/img/dashboards/rolePlay/giving-icon.svg";

const CourseLessons = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const { loading, getCourseLessons, setCourseId } = useAuth();
  const [lessons, setLessons] = useState(null);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchLessons = async () => {
  //     const data = await getCourseLessons(courseId);
  //     setLessons(data?.data); // Set the fetched data
  //   };

  //   fetchLessons();
  // }, [courseId]);
  useEffect(() => {
    setCourseId(courseId); // Store courseId in AuthContext

    if (courseId) {
      getCourseLessons(courseId).then((data) => {
        setLessons(data?.data); // Update local state
      });
    }
  }, [courseId]);
  console.log("Fetched Lessons:", lessons);
  const imageConfigs = [
    {
      bgImg: difficult,
      colorBg: difficultbg,
      icon: difficulticon,
      polygon: "polygon-1",
      btnStyle: "text-tint-orange !text-[10px] font-bold",
      shadowStyle: "shadow-2xl shadow-tint-orange font-bold",
    },
    {
      bgImg: active,
      colorBg: activebg,
      icon: activeicon,
      polygon: "polygon-2",
      btnStyle: "text-shade-green text-xs font-bold",
      shadowStyle: "shadow-2xl shadow-shade-green font-bold",
    },
    {
      bgImg: giving,
      colorBg: givingbg,
      icon: givingicon,
      polygon: "polygon-3",
      btnStyle: "text-shade-purple text-xs font-bold",
      shadowStyle: "shadow-2xl shadow-shade-purple font-bold",
    },
  ];
  // const handleStartLesson = () => {
  //   navigate("/courses/chapters/", { state: { lessons } }); // Pass lessons data
  // };
  return (
    <div className="h-full w-full overflow-hidden !py-4 scrollbar-hide  no-scrollbar ">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        {loading && (
          <div>
            <Loader2 />
          </div>
        )}
        <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
          <NavHeader header={"Courses Lessons"} />
        </div>
        <div className="!px-10">
          <Back route={"/courses"} />
        </div>
        <div className="flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !mt-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide !px-10">
          {lessons ? (
            lessons.map((items) =>
              items?.chapters.map((lesson, index) =>
                lesson.videos.map((video) => (
                  <RolePlayCards
                    key={video.id} // Use video ID as key
                    bgImg={imageConfigs[index % imageConfigs.length].bgImg}
                    icon={imageConfigs[index % imageConfigs.length].icon}
                    shadowStyle={
                      imageConfigs[index % imageConfigs.length].shadowStyle
                    }
                    text1={lesson.title}
                    text2={lesson.description}
                    time={video.duration} // Show video-specific duration
                    chapter={` ${lesson.chapterNumber}`}
                    btntext="Start Lesson"
                    btnStyle={
                      imageConfigs[index % imageConfigs.length].btnStyle
                    }
                    polygon={imageConfigs[index % imageConfigs.length].polygon}
                    route={`/courses/chapters/${lesson.id}/video/${video.id}`}
                    // onCLick={handleStartLesson}
                    override="!mx-2 text-sm"
                    smallTxt="text-xs"
                    textStyle={"w-60"}
                  />
                ))
              )
            )
          ) : (
            <p>No modules available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseLessons;
