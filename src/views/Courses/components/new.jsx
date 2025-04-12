// import React, { useRef, useState, useEffect } from "react";
// import { useAuth } from "../../../context/AuthContext";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import video from "../../../assets/img/dashboards/profile-image.jpg";
// import profile from "../../../assets/img/dashboards/profile-image.jpg";
// import {
//   PiCheckCircleBold,
//   PiClock,
//   PiHeart,
//   PiPause,
//   PiPlayFill,
// } from "react-icons/pi";
// import ProgressBar from "./ProgressBar";
// import ChapterCard from "./ChapterCard";
// import {
//   RiArrowGoBackLine,
//   RiFullscreenLine,
//   RiReplyAllFill,
//   RiReplyAllLine,
//   RiResetLeftLine,
//   RiResetRightLine,
//   RiVolumeUpLine,
// } from "react-icons/ri";

// const BASE_URL = "https://backend-5781.onrender.com/api/v1/last-watched";

// const CustomVideoPlayer = ({ src, poster }) => {
//   const { loading, getCourseLessonsVideo } = useAuth();
//   const videoRef = useRef(null);
//   const { courseId, lessonId } = useParams();
//   const [playing, setPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [currentTime, setCurrentTime] = useState("0:00");
//   const [duration, setDuration] = useState("0:00");
//   const [lastWatched, setLastWatched] = useState(null);
//   const [videoId, setVideoId] = useState(null);
//   const [currentLesson, setCurrentLesson] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [videoCourseLesson, setVideoCourseLesson] = useState([]);
//   const [selectedChapter, setSelectedChapter] = useState(null);
//   // const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   console.log("currrrinr lessond", currentLesson);
//   const actualLesson = currentLesson?.lesson;
//   console.log("actual less", actualLesson);
//   // Get current lesson from session storage
//   const navigate = useNavigate();
//   useEffect(() => {
//     const storedLesson = sessionStorage.getItem("currentLesson");
//     if (storedLesson) {
//       const parsedLesson = JSON.parse(storedLesson);
//       setCurrentLesson(parsedLesson);

//       const storedVideoId = parsedLesson?.lesson?.videos[0]?.id;
//       console.log("stored videoId", storedVideoId);
//       if (storedVideoId) {
//         setVideoId(storedVideoId);
//       }
//     }
//   }, [lessonId]);

//   // Fetch last watched timestamp from API
//   useEffect(() => {
//     if (videoId && courseId) {
//       axios
//         .get(`${BASE_URL}/user?courseId=${courseId}`, { withCredentials: true })
//         .then((response) => {
//           console.log("API Response:", response.data);

//           if (response.data && response.data.data.length > 0) {
//             const lastWatchedDuration = parseFloat(
//               response.data.data[0].duration
//             );

//             if (!isNaN(lastWatchedDuration) && lastWatchedDuration > 0) {
//               setLastWatched(lastWatchedDuration);
//             } else {
//               console.warn("Valid duration not found, keeping previous value.");
//             }
//           } else {
//             console.warn("No last watched data found.");
//           }
//         })
//         .catch((error) => console.error("Error fetching last watched:", error));
//     }
//   }, [videoId, courseId]);

//   useEffect(() => {
//     if (videoRef.current && lastWatched > 0) {
//       videoRef.current.currentTime = lastWatched;
//     }
//   }, [lastWatched]);
//   // Set last watched time once metadata is loaded
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     console.log("Adding loadedmetadata event listener...");

//     const handleLoadedMetadata = () => {
//       if (lastWatched !== null && lastWatched > 0) {
//         console.log(
//           `Setting video currentTime to last watched: ${videoId}`,
//           lastWatched
//         );
//         video.currentTime = lastWatched;
//       } else {
//         console.log("No last watched timestamp found, starting from 0.");
//         video.currentTime = 0;
//       }
//     };

//     video.addEventListener("loadedmetadata", handleLoadedMetadata);

//     return () => {
//       video.removeEventListener("loadedmetadata", handleLoadedMetadata);
//     };
//   }, [lastWatched]);

//   // Save last watched timestamp every 10 seconds
//   useEffect(() => {
//     if (videoId && courseId) {
//       let interval;

//       const saveProgress = () => {
//         if (videoRef.current) {
//           const timestamp = parseFloat(videoRef.current.currentTime.toFixed(2));

//           if (timestamp === 0) {
//             console.warn("Skipping save: Timestamp is zero.");
//             return;
//           }

//           console.log("Saving timestamp:", timestamp);

//           axios
//             .post(
//               `${BASE_URL}/create`,
//               { videoId, courseId, duration: String(timestamp) },
//               { withCredentials: true }
//             )
//             .then(() =>
//               console.log(
//                 `Successfully saved timestamp for videoId: ${videoId}`,
//                 timestamp
//               )
//             )
//             .catch((error) =>
//               console.error("Error saving last watched:", error)
//             );
//         }
//       };

//       interval = setInterval(saveProgress, 5000); // Save every 15 seconds

//       return () => clearInterval(interval);
//     }
//   }, [videoId, courseId]);

//   // Save last watched timestamp before page unload
//   useEffect(() => {
//     const handleBeforeUnload = () => saveLastWatched();

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       saveLastWatched();
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [videoId, courseId]);

//   // Save last watched function
//   const saveLastWatched = () => {
//     if (videoRef.current && videoId && courseId) {
//       const timestamp = parseFloat(videoRef.current.currentTime.toFixed(2));

//       console.log(
//         `Saving last watched before unload: with video id ${videoId}`,
//         timestamp,
//         "for videoId:",
//         videoId
//       );

//       axios
//         .post(
//           `${BASE_URL}/create`,
//           { videoId, courseId, duration: String(timestamp) },
//           { withCredentials: true }
//         )
//         .then(() =>
//           console.log(
//             `Successfully saved last watched on unload: ${videoId}`,
//             timestamp
//           )
//         )
//         .catch((error) =>
//           console.error(
//             "Error saving last watched on unload:",
//             error.response?.data || error
//           )
//         );
//     }
//   };

//   const togglePlay = () => {
//     if (videoRef.current.paused) {
//       videoRef.current.play();
//       setPlaying(true);
//     } else {
//       videoRef.current.pause();
//       setPlaying(false);
//     }
//   };

//   const replayVideo = () => {
//     videoRef.current.currentTime = 0;
//     videoRef.current.play();
//     setPlaying(true);
//     setShowModal(false);
//   };

//   // const handleProgress = () => {
//   //   if (videoRef.current) {
//   //     const progress =
//   //       (videoRef.current.currentTime / videoRef.current.duration) * 100;
//   //     setProgress(progress);
//   //     setCurrentTime(formatTime(videoRef.current.currentTime));
//   //   }
//   // };

//   const handleProgress = () => {
//     const video = videoRef.current;
//     if (video && video.duration > 0) {
//       const progress = (video.currentTime / video.duration) * 100;
//       setProgress(progress);
//       setCurrentTime(formatTime(video.currentTime));
//     }
//   };
//   console.log("handles progress", progress);
//   const handleSeek = (e) => {
//     const newTime = (e.target.value / 100) * videoRef.current.duration;
//     videoRef.current.currentTime = newTime;
//     setProgress(e.target.value);
//     setCurrentTime(newTime);
//   };

//   const handleVolume = (e) => {
//     const newVolume = e.target.value;
//     videoRef.current.volume = newVolume;
//     setVolume(newVolume);
//   };

//   const skipTime = (seconds) => {
//     videoRef.current.currentTime += seconds;
//     setProgress(
//       (videoRef.current.currentTime / videoRef.current.duration) * 100
//     );
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   const updateDuration = () => {
//     setDuration(formatTime(videoRef.current.duration));
//   };
//   useEffect(() => {
//     if (videoRef.current) {
//       const video = videoRef.current;

//       const updateProgress = () => {
//         const progress = (video.currentTime / video.duration) * 100;
//         setProgress(progress);
//         setCurrentTime(formatTime(video.currentTime));
//       };

//       video.addEventListener("timeupdate", updateProgress);

//       return () => {
//         video.removeEventListener("timeupdate", updateProgress);
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (videoRef.current) {
//       const video = videoRef.current;

//       const handleVideoEnd = () => {
//         video.load(); // This reloads the video, making the poster show up again
//         setPlaying(false);
//         setShowModal(true);
//       };

//       video.addEventListener("ended", handleVideoEnd);

//       return () => {
//         video.removeEventListener("ended", handleVideoEnd);
//       };
//     }
//   }, []);
//   // display video course lessons for each course
//   useEffect(() => {
//     if (courseId) {
//       getCourseLessonsVideo(courseId).then((data) => {
//         setVideoCourseLesson(data?.data || []);
//       });
//     }
//   }, [courseId]);

//   useEffect(() => {
//     const loadLessonFromUrl = () => {
//       const searchParams = new URLSearchParams(location.search);
//       const courseId = searchParams.get("courseId");
//       const lessonId = searchParams.get("lessonId");

//       if (courseId && lessonId) {
//         // Fetch the lesson details based on courseId and lessonId
//         const selectedLesson = videoCourseLesson.find(
//           (lesson) => lesson.id === lessonId
//         );
//         // setActualLesson(selectedLesson);
//         setCurrentLesson(selectedLesson);
//       }
//     };

//     loadLessonFromUrl();
//   }, [location.search, videoCourseLesson]); // Re-run on location change or videoCourseLesson update

//   const handleChapterClick = (courseId, lessonId) => {
//     if (!courseId || !lessonId) {
//       console.warn("Invalid click", courseId, lessonId);
//       return;
//     }

//     console.log("Clicked:", courseId, lessonId);

//     // Properly update the path, replacing old course/lesson IDs
//     navigate(`/courses/${courseId}/lessons/${lessonId}`);

//     const selectedChapter = videoCourseLesson[0]?.chapters.find(
//       (chapter) => chapter.id === lessonId
//     );

//     setSelectedChapter(selectedChapter);

//     if (selectedChapter) {
//       setCurrentLesson({ lesson: selectedChapter });
//     }
//   };

//   console.log("videeeeeooo lessooon", videoCourseLesson);
//   console.log("curent lessooon", currentLesson);
//   console.log("selected lessooon chapter", selectedChapter);
//   if (!currentLesson) {
//     return <p>Loading lesson...</p>;
//   }
//   const handleVideoEnd = () => {
//     setPlaying(false);
//     setShowModal(true);
//   };

//   const calculateTotalDuration = (videoCourseLesson) => {
//     if (!videoCourseLesson || !videoCourseLesson[0]?.chapters) return "00:00";

//     let totalSeconds = 0;

//     videoCourseLesson[0].chapters.forEach((chapter) => {
//       chapter.videos?.forEach((video) => {
//         const [hoursOrMinutes, minutesOrSeconds, maybeSeconds] = video.duration
//           .split(":")
//           .map(Number);

//         let videoSeconds = 0;

//         if (video.duration.split(":").length === 3) {
//           // Format is HH:MM:SS
//           const [hours, minutes, seconds] = [
//             hoursOrMinutes,
//             minutesOrSeconds,
//             maybeSeconds,
//           ];
//           videoSeconds = hours * 3600 + minutes * 60 + seconds;
//         } else {
//           // Format is MM:SS
//           const [minutes, seconds] = [hoursOrMinutes, minutesOrSeconds];
//           videoSeconds = minutes * 60 + seconds;
//         }

//         totalSeconds += videoSeconds;
//       });
//     });

//     const hours = Math.floor(totalSeconds / 3600);
//     const minutes = Math.floor((totalSeconds % 3600) / 60);
//     const seconds = totalSeconds % 60;

//     const formatted =
//       hours > 0
//         ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
//             .toString()
//             .padStart(2, "0")} Hrs`
//         : `${minutes}:${seconds.toString().padStart(2, "0")} Mins`;

//     return formatted;
//   };

//   const calculateProgress = (duration, lastWatched) => {
//     if (!duration || lastWatched === null) return 0;

//     // Split the duration into hours, minutes, and seconds
//     const [hours, minutes, seconds] = duration.split(":").map(Number);

//     // Convert total duration into seconds
//     const totalDurationSeconds = hours * 3600 + minutes * 60 + seconds;

//     console.log("hours", hours);
//     console.log("minutes", minutes);
//     console.log("totalDurationSeconds", totalDurationSeconds);

//     // Return 0 if the total duration is 0
//     if (totalDurationSeconds === 0) return 0;

//     // Calculate the progress percentage
//     const progress = (lastWatched / totalDurationSeconds) * 100;

//     return Math.min(progress, 100).toFixed(2); // Ensure the progress doesn't exceed 100%
//   };

//   const toggleFullScreen = () => {
//     if (!document.fullscreenElement) {
//       videoRef.current.requestFullscreen().catch((err) => console.error(err));
//     } else {
//       document.exitFullscreen().catch((err) => console.error(err));
//     }
//   };

//   return (
//     <div className="grid lg:grid-cols-5 gap-10">
//       <div className="lg:col-span-3  col-span-5">
//         <div className="relative w-full max-w-2xl mx-auto ">
//           <div className="!pb-6">
//             <ProgressBar percentage={50} />
//           </div>
//           {/* Video Element */}

//           <div className="w-full relative">
//             <video
//               className="w-full h-80 max-h-96 object-contain shadow rounded-2xl"
//               ref={videoRef}
//               src={src || actualLesson?.videos[0]?.videoURL}
//               poster={poster}
//               onPlay={() => setPlaying(true)}
//               onPause={() => setPlaying(false)}
//               onTimeUpdate={(e) => {
//                 updateDuration();
//                 setCurrentTime((e.target.currentTime / 100).toFixed(2));
//                 handleProgress();
//               }}
//               onLoadedMetadata={(e) =>
//                 setDuration((e.target.duration / 100).toFixed(2))
//               }
//               onVolumeChange={(e) => setVolume(e.target.volume)}
//               onEnded={handleVideoEnd}
//             ></video>

//             {showModal && (
//               <div className="absolute w-full  bottom-0 inset-0 flex items-center justify-center bg-[#00000083] bg-opacity-50 rounded-2xl">
//                 <div className=" !p-5 rounded-lg shadow-lg text-center">
//                   <div className="flex gap-4 justify-center">
//                     <button
//                       className="bg-green-tint text-white !px-4 !py-2 rounded"
//                       onClick={replayVideo}
//                     >
//                       <RiReplyAllLine />
//                     </button>
//                     <button
//                       className="bg-white text-red-500 !px-4 !py-2 rounded"
//                       onClick={() => setShowModal(false)}
//                     >
//                       <RiArrowGoBackLine />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-black/70 text-white p-3 !px-4 !py-3 rounded-2xl md:flex items-center justify-between hidden">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => skipTime(-10)}
//                 className="relative text-xl"
//               >
//                 <RiResetLeftLine size={26} />
//                 <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>

//               <button onClick={togglePlay} className="text-xl">
//                 {playing ? (
//                   <PiPause
//                     size={30}
//                     className="bg-gray-500/70 !p-1.5 rounded-3xl"
//                   />
//                 ) : (
//                   <PiPlayFill
//                     size={30}
//                     className="bg-gray-500/70 !p-1.5 rounded-3xl"
//                   />
//                 )}
//               </button>

//               <button onClick={() => skipTime(10)} className="relative text-xl">
//                 <RiResetRightLine size={26} />
//                 <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>
//             </div>

//             <div className="flex items-center gap-2 w-1/2">
//               <span className="text-sm">{currentTime}</span>

//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={progress}
//                 onChange={handleSeek}
//                 onClick={handleProgress}
//                 className="w-1/2 cursor-pointer appearance-none h-1 rounded-lg progress-slider"
//                 style={{
//                   background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
//                   height: "4px",
//                   borderRadius: "10px",
//                 }}
//               />
//               <span className="text-sm">{duration}</span>
//             </div>

//             {/* Right Volume Control */}
//             <div className="flex items-center gap-2 ">
//               <button onClick={toggleFullScreen} className="relative text-xl">
//                 <RiFullscreenLine size={26} />
//               </button>
//               <RiVolumeUpLine className="text-xl" />
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.1"
//                 value={volume}
//                 onChange={handleVolume}
//                 className="w-16 cursor-pointer !appearance-none bg-gray-300 h-1 rounded-lg"
//                 style={{
//                   background: `linear-gradient(to right, white ${
//                     volume * 100
//                   }%, gray ${volume * 100}%)`,
//                   height: "4px",
//                   borderRadius: "10px",
//                 }}
//               />
//             </div>
//           </div>
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-black/70 text-white p-2 md:p-3 !px-3 md:!px-4 !py-2 md:!py-3 rounded-2xl flex items-center justify-between text-xs md:text-base md:hidden">
//             <div className="flex items-center gap-2 md:gap-4">
//               <button
//                 onClick={() => skipTime(-10)}
//                 className="relative text-lg md:text-xl"
//               >
//                 <RiResetLeftLine size={22} className="md:size-26" />
//                 <span className="absolute inset-0 flex items-center justify-center text-[6px] md:text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>

//               <button onClick={togglePlay} className="text-lg md:text-xl">
//                 {playing ? (
//                   <PiPause
//                     size={24}
//                     className="bg-gray-500/70 !p-1 md:!p-1.5 rounded-3xl"
//                   />
//                 ) : (
//                   <PiPlayFill
//                     size={24}
//                     className="bg-gray-500/70 !p-1 md:!p-1.5 rounded-3xl"
//                   />
//                 )}
//               </button>

//               <button
//                 onClick={() => skipTime(10)}
//                 className="relative text-lg md:text-xl"
//               >
//                 <RiResetRightLine size={22} className="md:size-26" />
//                 <span className="absolute inset-0 flex items-center justify-center text-[6px] md:text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>
//             </div>

//             <div className="flex items-center gap-1 md:gap-2 w-1/3 md:w-1/2">
//               <span className="text-[10px] md:text-sm">{currentTime}</span>

//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={progress}
//                 onChange={handleSeek}
//                 className="w-1/3 md:w-1/2 cursor-pointer appearance-none h-[2px] md:h-1 rounded-lg progress-slider"
//                 style={{
//                   background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
//                   height: "3px",
//                   borderRadius: "10px",
//                 }}
//               />
//               <span className="text-[10px] md:text-sm">{duration}</span>
//             </div>

//             {/* Right Volume Control */}
//             <div className="hidden md:flex items-center gap-2">
//               <RiVolumeUpLine className="text-lg md:text-xl" />
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.1"
//                 value={volume}
//                 onChange={handleVolume}
//                 className="w-12 md:w-16 cursor-pointer !appearance-none bg-gray-300 h-[2px] md:h-1 rounded-lg"
//                 style={{
//                   background: `linear-gradient(to right, white ${
//                     volume * 100
//                   }%, gray ${volume * 100}%)`,
//                   height: "3px",
//                   borderRadius: "10px",
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="!py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
//           <h1 className="font-bebas !mt-1 w-full  text-wrap">
//             Chapter {actualLesson?.chapterNumber} - {actualLesson?.title}{" "}
//           </h1>
//           <div className=" flex items-center w-full  justify-between lg:justify-end gap-5 !py-3 md:!py-0 ">
//             <PiHeart className="bg-white text-black  rounded-2xl text-3xl !p-1.5" />
//             <button
//               className="flex items-center text-xs gap-2.5 py-1.5 rounded-full text-white font-semibold !p-2 !px-4 hover:scale-[1.02] transition"
//               style={{
//                 boxShadow: "0px 7px 17.4px 0px #8B73FF80",
//                 backgroundImage:
//                   "linear-gradient(86.82deg, #A6A1FE -0.48%, #4F45F0 98.98%)",
//               }}
//             >
//               Mark as completed <PiCheckCircleBold />
//             </button>
//           </div>
//         </div>
//         <p className="text-gray-500">{actualLesson?.description}</p>
//       </div>
//       <div className="lg:col-span-2 col-span-5 lg:-translate-y-5 ">
//         <h3 className="font-bebas text-2xl flex items-center gap-2.5 !pb-3">
//           CHAPTERS{" "}
//           <span className="bg-white !p-1 !px-2 rounded-xl text-lg">
//             {videoCourseLesson[0]?.chapters.length}
//           </span>
//         </h3>

//         <div className="space-y-4 bg-white w-full h-80 max-h-80 overflow-y-hidden flex flex-col justify-between !p-5 rounded-2xl relative overflow-x-hidden">
//           <div
//             className="overflow-scroll no-hide no-scrollbar !mb-8 "
//             onClick={() => handleChapterClick(video.courseId, video.id)}
//           >
//             {videoCourseLesson[0] ? (
//               videoCourseLesson[0]?.chapters.map((video, index) => {
//                 const progress = calculateProgress(video.duration, lastWatched);
//                 console.log("video in progresssss", video.duration);
//                 console.log("calculateProgress lastwatched", lastWatched);
//                 return (
//                   <ChapterCard
//                     key={video.id} // Unique key
//                     imgSrc={profile} // Thumbnail or placeholder
//                     chapter={video.chapterNumber}
//                     time={video.videos[0].duration} // Use actual video duration
//                     progress={progress} // Dynamically calculated progress
//                     isActive={
//                       actualLesson?.chapterNumber === video.chapterNumber
//                     }
//                     onClick={() =>
//                       handleChapterClick(
//                         videoCourseLesson[0]?.course.id,
//                         video.id
//                       )
//                     }
//                   />
//                 );
//               })
//             ) : (
//               <p className="text-gray-500">
//                 No videos available for this lesson.
//               </p>
//             )}

//             <div className="flex justify-between  w-full  font-nueue font-bold text-lg !my-4 !mt-8 gap-3.5 absolute bottom-0">
//               Total Time:{" "}
//               <span className="text-grey-tint flex items-center gap-1 text-sm mr-10">
//                 <PiClock /> {calculateTotalDuration(videoCourseLesson)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomVideoPlayer;

//#######
// import React, { useRef, useState, useEffect, useCallback } from "react";
// import { useAuth } from "../../../context/AuthContext";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import video from "../../../assets/img/dashboards/profile-image.jpg";
// import profile from "../../../assets/img/dashboards/profile-image.jpg";
// import {
//   PiCheckCircleBold,
//   PiClock,
//   PiHeart,
//   PiPause,
//   PiPlayFill,
// } from "react-icons/pi";
// import ProgressBar from "./ProgressBar";
// import ChapterCard from "./ChapterCard";
// import {
//   RiArrowGoBackLine,
//   RiFullscreenLine,
//   RiReplyAllLine,
//   RiResetLeftLine,
//   RiResetRightLine,
//   RiVolumeUpLine,
// } from "react-icons/ri";

// const BASE_URL = "https://backend-5781.onrender.com/api/v1/last-watched";

// const CustomVideoPlayer = ({ src, poster }) => {
//   // Refs
//   const videoRef = useRef(null);
//   const videoOperationInProgress = useRef(false);
//   const saveProgressTimerRef = useRef(null);

//   // Router hooks
//   const { courseId, lessonId } = useParams();
//   const navigate = useNavigate();

//   // Auth context
//   const { getCourseLessonsVideo } = useAuth();

//   // State variables
//   const [playing, setPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [currentTime, setCurrentTime] = useState("0:00");
//   const [duration, setDuration] = useState("0:00");
//   const [lastWatched, setLastWatched] = useState(null);
//   const [videoId, setVideoId] = useState(null);
//   const [currentLesson, setCurrentLesson] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [videoCourseLesson, setVideoCourseLesson] = useState([]);
//   const [selectedChapter, setSelectedChapter] = useState(null);
//   const [isChapterLoading, setIsChapterLoading] = useState(false);

//   // Derived values
//   const actualLesson = currentLesson?.lesson;

//   // Helper functions
//   const formatTime = useCallback((time) => {
//     if (!time || isNaN(time)) return "0:00";
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   }, []);

//   const calculateProgress = useCallback((videoDuration, lastWatchedTime) => {
//     if (!videoDuration || lastWatchedTime === null) return 0;

//     try {
//       const [hours = 0, minutes = 0, seconds = 0] = videoDuration
//         .split(":")
//         .map(Number);

//       const totalDurationSeconds = hours * 3600 + minutes * 60 + (seconds || 0);

//       if (totalDurationSeconds === 0) return 0;

//       const progress = (lastWatchedTime / totalDurationSeconds) * 100;
//       return Math.min(progress, 100).toFixed(2);
//     } catch (error) {
//       console.error("Error calculating progress:", error);
//       return 0;
//     }
//   }, []);

//   const calculateTotalDuration = useCallback((lessonData) => {
//     if (!lessonData || !lessonData[0]?.chapters) return "00:00";

//     try {
//       let totalSeconds = 0;

//       lessonData[0].chapters.forEach((chapter) => {
//         chapter.videos?.forEach((video) => {
//           if (!video.duration) return;

//           const parts = video.duration.split(":").map(Number);

//           if (parts.length === 3) {
//             // HH:MM:SS format
//             totalSeconds += parts[0] * 3600 + parts[1] * 60 + parts[2];
//           } else if (parts.length === 2) {
//             // MM:SS format
//             totalSeconds += parts[0] * 60 + parts[1];
//           }
//         });
//       });

//       const hours = Math.floor(totalSeconds / 3600);
//       const minutes = Math.floor((totalSeconds % 3600) / 60);
//       const seconds = totalSeconds % 60;

//       return hours > 0
//         ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
//             .toString()
//             .padStart(2, "0")} Hrs`
//         : `${minutes}:${seconds.toString().padStart(2, "0")} Mins`;
//     } catch (error) {
//       console.error("Error calculating total duration:", error);
//       return "00:00";
//     }
//   }, []);

//   // Save last watched position
//   const saveLastWatched = useCallback(() => {
//     if (!videoRef.current || !videoId || !courseId) return;

//     try {
//       const timestamp = parseFloat(videoRef.current.currentTime.toFixed(2));
//       if (timestamp <= 0) return;

//       axios
//         .post(
//           `${BASE_URL}/create`,
//           { videoId, courseId, duration: String(timestamp) },
//           { withCredentials: true }
//         )
//         .catch((error) => {
//           console.error("Error saving progress:", error);
//         });
//     } catch (error) {
//       console.error("Error in saveLastWatched:", error);
//     }
//   }, [videoId, courseId]);

//   // Fetch initial lesson data
//   useEffect(() => {
//     const storedLesson = sessionStorage.getItem("currentLesson");
//     if (storedLesson) {
//       try {
//         const parsedLesson = JSON.parse(storedLesson);
//         setCurrentLesson(parsedLesson);

//         const storedVideoId = parsedLesson?.lesson?.videos?.[0]?.id;
//         if (storedVideoId) {
//           setVideoId(storedVideoId);
//         }
//       } catch (error) {
//         console.error("Error parsing stored lesson:", error);
//       }
//     }
//   }, []);

//   // Fetch course lessons
//   useEffect(() => {
//     let isMounted = true;

//     if (courseId) {
//       getCourseLessonsVideo(courseId)
//         .then((data) => {
//           if (isMounted && data?.data) {
//             setVideoCourseLesson(data.data);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching course lessons:", error);
//         });
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [courseId]);

//   // Update selected chapter when route changes
//   useEffect(() => {
//     if (courseId && lessonId && videoCourseLesson[0]?.chapters) {
//       const chapter = videoCourseLesson[0].chapters.find(
//         (chapter) => chapter.id === lessonId
//       );

//       if (chapter) {
//         setCurrentLesson({ lesson: chapter });

//         if (chapter.videos?.[0]?.id) {
//           setVideoId(chapter.videos[0].id);
//         }
//       }
//     }
//   }, [courseId, lessonId, videoCourseLesson]);

//   // Fetch last watched timestamp
//   useEffect(() => {
//     let isMounted = true;

//     if (videoId && courseId) {
//       axios
//         .get(`${BASE_URL}/user?courseId=${courseId}`, { withCredentials: true })
//         .then((response) => {
//           if (!isMounted) return;

//           if (response.data?.data?.length > 0) {
//             const lastWatchedDuration = parseFloat(
//               response.data.data[0].duration
//             );

//             if (!isNaN(lastWatchedDuration) && lastWatchedDuration > 0) {
//               setLastWatched(lastWatchedDuration);
//             }
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching last watched:", error);
//         });
//     }

//     return () => {
//       isMounted = false;
//     };
//   }, [videoId, courseId]);

//   // Apply last watched time when video is ready
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const handleLoadedMetadata = () => {
//       try {
//         if (
//           lastWatched !== null &&
//           lastWatched > 0 &&
//           !videoOperationInProgress.current
//         ) {
//           video.currentTime = lastWatched;
//         }
//       } catch (error) {
//         console.error("Error setting video time:", error);
//       }
//     };

//     video.addEventListener("loadedmetadata", handleLoadedMetadata);

//     return () => {
//       video.removeEventListener("loadedmetadata", handleLoadedMetadata);
//     };
//   }, [lastWatched]);

//   // Set up progress tracking
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const updateProgress = () => {
//       if (video.duration > 0) {
//         const currentProgress = (video.currentTime / video.duration) * 100;
//         setProgress(currentProgress);
//         setCurrentTime(formatTime(video.currentTime));
//       }
//     };

//     const handleDurationChange = () => {
//       setDuration(formatTime(video.duration));
//     };

//     // Add event listeners
//     video.addEventListener("timeupdate", updateProgress);
//     video.addEventListener("durationchange", handleDurationChange);
//     video.addEventListener("ended", () => {
//       setPlaying(false);
//       setShowModal(true);
//     });

//     return () => {
//       // Remove event listeners
//       video.removeEventListener("timeupdate", updateProgress);
//       video.removeEventListener("durationchange", handleDurationChange);
//       video.removeEventListener("ended", () => {
//         setPlaying(false);
//         setShowModal(true);
//       });
//     };
//   }, [formatTime]);

//   // Set up periodic progress saving
//   useEffect(() => {
//     if (videoId && courseId) {
//       // Clear any existing timer
//       if (saveProgressTimerRef.current) {
//         clearInterval(saveProgressTimerRef.current);
//       }

//       // Create new timer for saving progress
//       saveProgressTimerRef.current = setInterval(saveLastWatched, 5000);

//       return () => {
//         if (saveProgressTimerRef.current) {
//           clearInterval(saveProgressTimerRef.current);
//           saveProgressTimerRef.current = null;
//         }
//         // Save progress on unmount
//         saveLastWatched();
//       };
//     }
//   }, [videoId, courseId, saveLastWatched]);

//   // Save on page unload
//   useEffect(() => {
//     const handleBeforeUnload = () => saveLastWatched();
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [saveLastWatched]);

//   // Video player controls
//   const togglePlay = useCallback(() => {
//     if (isChapterLoading || videoOperationInProgress.current) return;

//     const video = videoRef.current;
//     if (!video) return;

//     videoOperationInProgress.current = true;

//     try {
//       if (video.paused) {
//         video
//           .play()
//           .then(() => {
//             setPlaying(true);
//             videoOperationInProgress.current = false;
//           })
//           .catch((error) => {
//             console.error("Error playing video:", error);
//             videoOperationInProgress.current = false;
//           });
//       } else {
//         video.pause();
//         setPlaying(false);
//         videoOperationInProgress.current = false;
//       }
//     } catch (error) {
//       console.error("Error in togglePlay:", error);
//       videoOperationInProgress.current = false;
//     }
//   }, [isChapterLoading]);

//   const handleSeek = useCallback(
//     (e) => {
//       const video = videoRef.current;
//       if (!video || video.duration <= 0) return;

//       try {
//         const newValue = Number(e.target.value);
//         const newTime = (newValue / 100) * video.duration;

//         video.currentTime = newTime;
//         setProgress(newValue);
//         setCurrentTime(formatTime(newTime));
//       } catch (error) {
//         console.error("Error in handleSeek:", error);
//       }
//     },
//     [formatTime]
//   );

//   const skipTime = useCallback((seconds) => {
//     const video = videoRef.current;
//     if (!video) return;

//     try {
//       const newTime = video.currentTime + seconds;
//       video.currentTime = Math.max(0, Math.min(newTime, video.duration));
//     } catch (error) {
//       console.error("Error in skipTime:", error);
//     }
//   }, []);

//   const handleVolume = useCallback((e) => {
//     const video = videoRef.current;
//     if (!video) return;

//     try {
//       const newVolume = Number(e.target.value);
//       video.volume = newVolume;
//       setVolume(newVolume);
//     } catch (error) {
//       console.error("Error in handleVolume:", error);
//     }
//   }, []);

//   const toggleFullScreen = useCallback(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     try {
//       if (!document.fullscreenElement) {
//         video.requestFullscreen().catch((error) => {
//           console.error("Error requesting fullscreen:", error);
//         });
//       } else {
//         document.exitFullscreen().catch((error) => {
//           console.error("Error exiting fullscreen:", error);
//         });
//       }
//     } catch (error) {
//       console.error("Error in toggleFullScreen:", error);
//     }
//   }, []);

//   const replayVideo = useCallback(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     try {
//       video.currentTime = 0;
//       video
//         .play()
//         .then(() => {
//           setPlaying(true);
//           setShowModal(false);
//         })
//         .catch((error) => {
//           console.error("Error replaying video:", error);
//         });
//     } catch (error) {
//       console.error("Error in replayVideo:", error);
//     }
//   }, []);

//   // Chapter navigation
//   const handleChapterClick = useCallback(
//     (courseId, lessonId) => {
//       if (
//         !courseId ||
//         !lessonId ||
//         isChapterLoading ||
//         videoOperationInProgress.current
//       ) {
//         return;
//       }

//       setIsChapterLoading(true);
//       videoOperationInProgress.current = true;

//       // Save current progress before switching
//       saveLastWatched();

//       // Navigate to the new URL - will eventually trigger the useEffect that updates the chapter
//       navigate(`/courses/${courseId}/lessons/${lessonId}`);

//       // Reset loading state after a delay
//       setTimeout(() => {
//         setIsChapterLoading(false);
//         videoOperationInProgress.current = false;
//       }, 500);
//     },
//     [isChapterLoading, navigate, saveLastWatched]
//   );

//   if (!currentLesson && !isChapterLoading) {
//     return <p>Loading lesson...</p>;
//   }

//   return (
//     <div className="grid lg:grid-cols-5 gap-10">
//       <div className="lg:col-span-3 col-span-5">
//         <div className="relative w-full max-w-2xl mx-auto">
//           <div className="!pb-6">
//             <ProgressBar percentage={50} />
//           </div>
//           {/* Video Element */}
//           <div className="w-full relative">
//             <video
//               className="w-full h-80 max-h-96 object-contain shadow rounded-2xl"
//               ref={videoRef}
//               src={src || actualLesson?.videos?.[0]?.videoURL}
//               poster={poster}
//             ></video>

//             {showModal && (
//               <div className="absolute w-full bottom-0 inset-0 flex items-center justify-center bg-[#00000083] bg-opacity-50 rounded-2xl">
//                 <div className="!p-5 rounded-lg shadow-lg text-center">
//                   <div className="flex gap-4 justify-center">
//                     <button
//                       className="bg-green-tint text-white !px-4 !py-2 rounded"
//                       onClick={replayVideo}
//                     >
//                       <RiReplyAllLine />
//                     </button>
//                     <button
//                       className="bg-white text-red-500 !px-4 !py-2 rounded"
//                       onClick={() => setShowModal(false)}
//                     >
//                       <RiArrowGoBackLine />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* Desktop Controls */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-black/70 text-white p-3 !px-4 !py-3 rounded-2xl md:flex items-center justify-between hidden">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => skipTime(-10)}
//                 className="relative text-xl"
//               >
//                 <RiResetLeftLine size={26} />
//                 <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>

//               <button onClick={togglePlay} className="text-xl">
//                 {playing ? (
//                   <PiPause
//                     size={30}
//                     className="bg-gray-500/70 !p-1.5 rounded-3xl"
//                   />
//                 ) : (
//                   <PiPlayFill
//                     size={30}
//                     className="bg-gray-500/70 !p-1.5 rounded-3xl"
//                   />
//                 )}
//               </button>

//               <button onClick={() => skipTime(10)} className="relative text-xl">
//                 <RiResetRightLine size={26} />
//                 <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>
//             </div>

//             <div className="flex items-center gap-2 w-1/2">
//               <span className="text-sm">{currentTime}</span>

//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={progress}
//                 onChange={handleSeek}
//                 className="w-1/2 cursor-pointer appearance-none h-1 rounded-lg progress-slider"
//                 style={{
//                   background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
//                   height: "4px",
//                   borderRadius: "10px",
//                 }}
//               />
//               <span className="text-sm">{duration}</span>
//             </div>

//             {/* Right Volume Control */}
//             <div className="flex items-center gap-2">
//               <button onClick={toggleFullScreen} className="relative text-xl">
//                 <RiFullscreenLine size={26} />
//               </button>
//               <RiVolumeUpLine className="text-xl" />
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.1"
//                 value={volume}
//                 onChange={handleVolume}
//                 className="w-16 cursor-pointer !appearance-none bg-gray-300 h-1 rounded-lg"
//                 style={{
//                   background: `linear-gradient(to right, white ${
//                     volume * 100
//                   }%, gray ${volume * 100}%)`,
//                   height: "4px",
//                   borderRadius: "10px",
//                 }}
//               />
//             </div>
//           </div>
//           {/* Mobile Controls */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-black/70 text-white p-2 md:p-3 !px-3 md:!px-4 !py-2 md:!py-3 rounded-2xl flex items-center justify-between text-xs md:text-base md:hidden">
//             <div className="flex items-center gap-2 md:gap-4">
//               <button
//                 onClick={() => skipTime(-10)}
//                 className="relative text-lg md:text-xl"
//               >
//                 <RiResetLeftLine size={22} className="md:size-26" />
//                 <span className="absolute inset-0 flex items-center justify-center text-[6px] md:text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>

//               <button onClick={togglePlay} className="text-lg md:text-xl">
//                 {playing ? (
//                   <PiPause
//                     size={24}
//                     className="bg-gray-500/70 !p-1 md:!p-1.5 rounded-3xl"
//                   />
//                 ) : (
//                   <PiPlayFill
//                     size={24}
//                     className="bg-gray-500/70 !p-1 md:!p-1.5 rounded-3xl"
//                   />
//                 )}
//               </button>

//               <button
//                 onClick={() => skipTime(10)}
//                 className="relative text-lg md:text-xl"
//               >
//                 <RiResetRightLine size={22} className="md:size-26" />
//                 <span className="absolute inset-0 flex items-center justify-center text-[6px] md:text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>
//             </div>

//             <div className="flex items-center gap-1 md:gap-2 w-1/3 md:w-1/2">
//               <span className="text-[10px] md:text-sm">{currentTime}</span>

//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={progress}
//                 onChange={handleSeek}
//                 className="w-1/3 md:w-1/2 cursor-pointer appearance-none h-[2px] md:h-1 rounded-lg progress-slider"
//                 style={{
//                   background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
//                   height: "3px",
//                   borderRadius: "10px",
//                 }}
//               />
//               <span className="text-[10px] md:text-sm">{duration}</span>
//             </div>

//             {/* Right Volume Control */}
//             <div className="hidden md:flex items-center gap-2">
//               <RiVolumeUpLine className="text-lg md:text-xl" />
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.1"
//                 value={volume}
//                 onChange={handleVolume}
//                 className="w-12 md:w-16 cursor-pointer !appearance-none bg-gray-300 h-[2px] md:h-1 rounded-lg"
//                 style={{
//                   background: `linear-gradient(to right, white ${
//                     volume * 100
//                   }%, gray ${volume * 100}%)`,
//                   height: "3px",
//                   borderRadius: "10px",
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="!py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
//           <h1 className="font-bebas !mt-1 w-full text-wrap">
//             {isChapterLoading ? (
//               "Loading..."
//             ) : (
//               <>
//                 Chapter {actualLesson?.chapterNumber} - {actualLesson?.title}
//               </>
//             )}
//           </h1>
//           <div className="flex items-center w-full justify-between lg:justify-end gap-5 !py-3 md:!py-0">
//             <PiHeart className="bg-white text-black rounded-2xl text-3xl !p-1.5" />
//             <button
//               className="flex items-center text-xs gap-2.5 py-1.5 rounded-full text-white font-semibold !p-2 !px-4 hover:scale-[1.02] transition"
//               style={{
//                 boxShadow: "0px 7px 17.4px 0px #8B73FF80",
//                 backgroundImage:
//                   "linear-gradient(86.82deg, #A6A1FE -0.48%, #4F45F0 98.98%)",
//               }}
//             >
//               Mark as completed <PiCheckCircleBold />
//             </button>
//           </div>
//         </div>
//         <p className="text-gray-500">
//           {isChapterLoading ? "Loading..." : actualLesson?.description}
//         </p>
//       </div>
//       <div className="lg:col-span-2 col-span-5 lg:-translate-y-5">
//         <h3 className="font-bebas text-2xl flex items-center gap-2.5 !pb-3">
//           CHAPTERS{" "}
//           <span className="bg-white !p-1 !px-2 rounded-xl text-lg">
//             {videoCourseLesson[0]?.chapters?.length || 0}
//           </span>
//         </h3>

//         <div className="space-y-4 bg-white w-full h-80 max-h-80 overflow-y-hidden flex flex-col justify-between !p-5 rounded-2xl relative overflow-x-hidden">
//           <div className="overflow-scroll no-hide no-scrollbar !mb-8">
//             {videoCourseLesson[0]?.chapters?.length > 0 ? (
//               videoCourseLesson[0].chapters.map((video) => {
//                 const progress = calculateProgress(
//                   video.videos?.[0]?.duration || "0:00",
//                   video.id === lessonId ? lastWatched : 0
//                 );

//                 return (
//                   <ChapterCard
//                     key={video.id}
//                     imgSrc={profile}
//                     chapter={video.chapterNumber}
//                     title={video.title}
//                     time={video.videos?.[0]?.duration || "0:00"}
//                     progress={progress}
//                     isActive={actualLesson?.id === video.id}
//                     onClick={() =>
//                       handleChapterClick(
//                         videoCourseLesson[0]?.course?.id,
//                         video.id
//                       )
//                     }
//                   />
//                 );
//               })
//             ) : (
//               <p className="text-gray-500">
//                 No videos available for this lesson.
//               </p>
//             )}

//             <div className="flex justify-between w-full font-nueue font-bold text-lg !my-4 !mt-8 gap-3.5 absolute bottom-0">
//               Total Time:{" "}
//               <span className="text-grey-tint flex items-center gap-1 text-sm mr-10">
//                 <PiClock /> {calculateTotalDuration(videoCourseLesson)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomVideoPlayer;

// import React, { useRef, useState, useEffect, useCallback } from "react";
// import { useAuth } from "../../../context/AuthContext";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import profile from "../../../assets/img/dashboards/profile-image.jpg";
// import {
//   PiCheckCircleBold,
//   PiClock,
//   PiHeart,
//   PiPause,
//   PiPlayFill,
// } from "react-icons/pi";
// import ProgressBar from "./ProgressBar";
// import ChapterCard from "./ChapterCard";
// import {
//   RiArrowGoBackLine,
//   RiFullscreenLine,
//   RiReplyAllLine,
//   RiResetLeftLine,
//   RiResetRightLine,
//   RiVolumeUpLine,
// } from "react-icons/ri";
// import Loader2 from "../../../components/Loaders/Loader2";

// // Import your loader component

// const BASE_URL = "https://backend-5781.onrender.com/api/v1/last-watched";

// const CustomVideoPlayer = ({ src, poster }) => {
//   // Refs
//   const videoRef = useRef(null);
//   const operationInProgress = useRef(false);
//   const saveProgressTimeoutRef = useRef(null);
//   const lastWatchedRequestRef = useRef(null);

//   // Router hooks
//   const { courseId, lessonId } = useParams();
//   const navigate = useNavigate();

//   // Auth context
//   const { getCourseLessonsVideo } = useAuth();

//   // State variables
//   const [playing, setPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [currentTime, setCurrentTime] = useState("0:00");
//   const [duration, setDuration] = useState("0:00");
//   const [lastWatched, setLastWatched] = useState(null);
//   const [videoId, setVideoId] = useState(null);
//   const [currentLesson, setCurrentLesson] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [videoCourseLesson, setVideoCourseLesson] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isFetchingLastWatched, setIsFetchingLastWatched] = useState(false);
//   const [hasExistingLastWatched, setHasExistingLastWatched] = useState(false);

//   // Derived values
//   const actualLesson = currentLesson?.lesson;

//   // Helper functions
//   const formatTime = useCallback((time) => {
//     if (isNaN(time) || time === Infinity) return "0:00";
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   }, []);

//   const parseDurationToSeconds = useCallback((durationString) => {
//     if (!durationString) return 0;

//     try {
//       const parts = durationString.split(":").map(Number);
//       if (parts.length === 3) {
//         // HH:MM:SS format
//         return parts[0] * 3600 + parts[1] * 60 + parts[2];
//       } else if (parts.length === 2) {
//         // MM:SS format
//         return parts[0] * 60 + parts[1];
//       }
//       return 0;
//     } catch {
//       return 0;
//     }
//   }, []);

//   const calculateProgress = useCallback(
//     (durationString, currentTimeSeconds) => {
//       if (!durationString || currentTimeSeconds === null) return 0;

//       const totalDuration = parseDurationToSeconds(durationString);
//       if (totalDuration <= 0) return 0;

//       const progress = (currentTimeSeconds / totalDuration) * 100;
//       return Math.min(progress, 100);
//     },
//     [parseDurationToSeconds]
//   );

//   const calculateTotalDuration = useCallback(
//     (lessonData) => {
//       if (!lessonData || !lessonData[0]?.chapters) return "00:00";

//       let totalSeconds = 0;
//       lessonData[0].chapters.forEach((chapter) => {
//         chapter.videos?.forEach((video) => {
//           totalSeconds += parseDurationToSeconds(video.duration);
//         });
//       });

//       const hours = Math.floor(totalSeconds / 3600);
//       const minutes = Math.floor((totalSeconds % 3600) / 60);
//       const seconds = totalSeconds % 60;

//       return hours > 0
//         ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
//             .toString()
//             .padStart(2, "0")} Hrs`
//         : `${minutes}:${seconds.toString().padStart(2, "0")} Mins`;
//     },
//     [parseDurationToSeconds]
//   );

//   // Save last watched position
//   const saveLastWatched = useCallback(async () => {
//     if (!videoRef.current || !videoId || !courseId || !hasExistingLastWatched)
//       return;

//     try {
//       const timestamp = parseFloat(videoRef.current.currentTime.toFixed(2));
//       if (timestamp <= 0) return;

//       // Cancel any pending save operation
//       if (saveProgressTimeoutRef.current) {
//         clearTimeout(saveProgressTimeoutRef.current);
//       }

//       // Debounce the save operation
//       saveProgressTimeoutRef.current = setTimeout(async () => {
//         try {
//           await axios.post(
//             `${BASE_URL}/create`,
//             { videoId, courseId, duration: String(timestamp) },
//             { withCredentials: true }
//           );
//         } catch (error) {
//           console.error("Error saving progress:", error);
//         }
//       }, 1000); // 1 second debounce
//     } catch (error) {
//       console.error("Error in saveLastWatched:", error);
//     }
//   }, [videoId, courseId, hasExistingLastWatched]);

//   // Fetch initial lesson data
//   useEffect(() => {
//     const loadInitialData = async () => {
//       setIsLoading(true);
//       try {
//         // Load from session storage if available
//         const storedLesson = sessionStorage.getItem("currentLesson");
//         if (storedLesson) {
//           const parsedLesson = JSON.parse(storedLesson);
//           setCurrentLesson(parsedLesson);

//           if (parsedLesson?.lesson?.videos?.[0]?.id) {
//             setVideoId(parsedLesson.lesson.videos[0].id);
//           }
//         }

//         // Fetch course lessons
//         if (courseId) {
//           const data = await getCourseLessonsVideo(courseId);
//           if (data?.data) {
//             setVideoCourseLesson(data.data);
//           }
//         }
//       } catch (error) {
//         console.error("Error loading initial data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadInitialData();

//     return () => {
//       if (saveProgressTimeoutRef.current) {
//         clearTimeout(saveProgressTimeoutRef.current);
//       }
//       if (lastWatchedRequestRef.current) {
//         lastWatchedRequestRef.current.abort();
//       }
//     };
//   }, [courseId]);

//   // Update selected chapter when route changes
//   useEffect(() => {
//     if (!courseId || !lessonId || !videoCourseLesson.length) return;

//     const updateCurrentLesson = async () => {
//       operationInProgress.current = true;
//       setIsLoading(true);

//       try {
//         const chapter = videoCourseLesson[0]?.chapters?.find(
//           (chapter) => chapter.id === lessonId
//         );

//         if (chapter) {
//           const newLesson = { lesson: chapter };
//           setCurrentLesson(newLesson);
//           sessionStorage.setItem("currentLesson", JSON.stringify(newLesson));

//           if (chapter.videos?.[0]?.id) {
//             setVideoId(chapter.videos[0].id);
//           }
//         }
//       } catch (error) {
//         console.error("Error updating current lesson:", error);
//       } finally {
//         operationInProgress.current = false;
//         setIsLoading(false);
//       }
//     };

//     updateCurrentLesson();
//   }, [courseId, lessonId, videoCourseLesson]);

//   // Fetch last watched timestamp when videoId changes
//   useEffect(() => {
//     if (!videoId || !courseId) return;

//     const fetchLastWatched = async () => {
//       setIsFetchingLastWatched(true);
//       try {
//         // Cancel any pending request
//         if (lastWatchedRequestRef.current) {
//           lastWatchedRequestRef.current.abort();
//         }

//         // Create new AbortController for this request
//         const controller = new AbortController();
//         lastWatchedRequestRef.current = controller;

//         const response = await axios.get(
//           `${BASE_URL}/user?courseId=${courseId}`,
//           {
//             withCredentials: true,
//             signal: controller.signal,
//           }
//         );

//         if (response.data?.data?.length > 0) {
//           const lastWatchedDuration = parseFloat(
//             response.data.data[0].duration
//           );

//           if (isNaN(lastWatchedDuration)) {
//             setLastWatched(lastWatchedDuration);
//             setHasExistingLastWatched(true);
//           }
//         } else {
//           setHasExistingLastWatched(false);
//         }
//       } catch (error) {
//         if (error.name !== "AbortError") {
//           console.error("Error fetching last watched:", error);
//         }
//       } finally {
//         setIsFetchingLastWatched(false);
//       }
//     };

//     fetchLastWatched();

//     return () => {
//       if (lastWatchedRequestRef.current) {
//         lastWatchedRequestRef.current.abort();
//       }
//     };
//   }, [videoId, courseId]);

//   // Set up video event listeners and initial state
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const handleLoadedMetadata = () => {
//       if (isFetchingLastWatched) return;

//       // Set initial volume
//       video.volume = volume;

//       // Set initial time if we have last watched position
//       if (lastWatched !== null && lastWatched > 0 && hasExistingLastWatched) {
//         video.currentTime = lastWatched;
//       }

//       // Update duration display
//       setDuration(formatTime(video.duration));
//     };

//     const handleTimeUpdate = () => {
//       if (video.duration > 0) {
//         setCurrentTime(formatTime(video.currentTime));
//         setProgress((video.currentTime / video.duration) * 100);
//       }
//     };

//     const handleEnded = () => {
//       setPlaying(false);
//       setShowModal(true);
//     };

//     video.addEventListener("loadedmetadata", handleLoadedMetadata);
//     video.addEventListener("timeupdate", handleTimeUpdate);
//     video.addEventListener("ended", handleEnded);

//     return () => {
//       video.removeEventListener("loadedmetadata", handleLoadedMetadata);
//       video.removeEventListener("timeupdate", handleTimeUpdate);
//       video.removeEventListener("ended", handleEnded);
//     };
//   }, [
//     volume,
//     lastWatched,
//     hasExistingLastWatched,
//     isFetchingLastWatched,
//     formatTime,
//   ]);

//   // Save progress periodically and on unmount
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const interval = setInterval(() => {
//       saveLastWatched();
//     }, 10000); // Save every 10 seconds

//     return () => {
//       clearInterval(interval);
//       saveLastWatched(); // Save on unmount
//     };
//   }, [saveLastWatched]);

//   // Save on page unload
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       saveLastWatched();
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [saveLastWatched]);

//   // Video player controls
//   const togglePlay = useCallback(async () => {
//     const video = videoRef.current;
//     if (!video || operationInProgress.current) return;

//     operationInProgress.current = true;
//     try {
//       if (video.paused) {
//         await video.play();
//         setPlaying(true);
//       } else {
//         video.pause();
//         setPlaying(false);
//       }
//     } catch (error) {
//       console.error("Error toggling play:", error);
//     } finally {
//       operationInProgress.current = false;
//     }
//   }, []);

//   const handleSeek = useCallback((e) => {
//     const video = videoRef.current;
//     if (!video || video.duration <= 0) return;

//     const seekPercent = e.target.value;
//     const seekTime = (seekPercent / 100) * video.duration;
//     video.currentTime = seekTime;
//     setProgress(seekPercent);
//   }, []);

//   const skipTime = useCallback((seconds) => {
//     const video = videoRef.current;
//     if (!video) return;

//     const newTime = video.currentTime + seconds;
//     video.currentTime = Math.max(0, Math.min(newTime, video.duration));
//   }, []);

//   const handleVolume = useCallback((e) => {
//     const newVolume = parseFloat(e.target.value);
//     if (!isNaN(newVolume)) {
//       const video = videoRef.current;
//       if (video) video.volume = newVolume;
//       setVolume(newVolume);
//     }
//   }, []);

//   const toggleFullScreen = useCallback(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (!document.fullscreenElement) {
//       video.requestFullscreen().catch((err) => console.error(err));
//     } else {
//       document.exitFullscreen().catch((err) => console.error(err));
//     }
//   }, []);

//   const replayVideo = useCallback(async () => {
//     const video = videoRef.current;
//     if (!video) return;

//     operationInProgress.current = true;
//     try {
//       video.currentTime = 0;
//       await video.play();
//       setPlaying(true);
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error replaying video:", error);
//     } finally {
//       operationInProgress.current = false;
//     }
//   }, []);

//   // Chapter navigation
//   const handleChapterClick = useCallback(
//     (courseId, lessonId) => {
//       if (!courseId || !lessonId || operationInProgress.current) return;

//       // Save current progress before navigating
//       saveLastWatched();

//       // Navigate to new chapter
//       navigate(`/courses/${courseId}/lessons/${lessonId}`);
//     },
//     [navigate, saveLastWatched]
//   );

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 />
//       </div>
//     );
//   }

//   if (!currentLesson) {
//     return <div className="text-center py-10">Lesson not found</div>;
//   }

//   return (
//     <div className="grid lg:grid-cols-5 gap-10">
//       <div className="lg:col-span-3 col-span-5">
//         <div className="relative w-full max-w-2xl mx-auto">
//           <div className="!pb-6">
//             <ProgressBar percentage={50} />
//           </div>

//           {/* Video Element with Loading State */}
//           <div className="w-full relative">
//             {isFetchingLastWatched && (
//               <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
//                 <Loader2 text="Loading your progress..." />
//               </div>
//             )}

//             <video
//               className="w-full h-80 max-h-96 object-contain shadow rounded-2xl"
//               ref={videoRef}
//               src={src || actualLesson?.videos?.[0]?.videoURL}
//               poster={poster}
//               preload="metadata"
//             />

//             {showModal && (
//               <div className="absolute w-full bottom-0 inset-0 flex items-center justify-center bg-[#00000083] bg-opacity-50 rounded-2xl">
//                 <div className="!p-5 rounded-lg shadow-lg text-center">
//                   <div className="flex gap-4 justify-center">
//                     <button
//                       className="bg-green-tint text-white !px-4 !py-2 rounded"
//                       onClick={replayVideo}
//                     >
//                       <RiReplyAllLine />
//                     </button>
//                     <button
//                       className="bg-white text-red-500 !px-4 !py-2 rounded"
//                       onClick={() => setShowModal(false)}
//                     >
//                       <RiArrowGoBackLine />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Desktop Controls */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-black/70 text-white p-3 !px-4 !py-3 rounded-2xl md:flex items-center justify-between hidden">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => skipTime(-10)}
//                 className="relative text-xl"
//                 disabled={isFetchingLastWatched}
//               >
//                 <RiResetLeftLine size={26} />
//                 <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>

//               <button
//                 onClick={togglePlay}
//                 className="text-xl"
//                 disabled={isFetchingLastWatched}
//               >
//                 {playing ? (
//                   <PiPause
//                     size={30}
//                     className="bg-gray-500/70 !p-1.5 rounded-3xl"
//                   />
//                 ) : (
//                   <PiPlayFill
//                     size={30}
//                     className="bg-gray-500/70 !p-1.5 rounded-3xl"
//                   />
//                 )}
//               </button>

//               <button
//                 onClick={() => skipTime(10)}
//                 className="relative text-xl"
//                 disabled={isFetchingLastWatched}
//               >
//                 <RiResetRightLine size={26} />
//                 <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>
//             </div>

//             <div className="flex items-center gap-2 w-1/2">
//               <span className="text-sm">{currentTime}</span>
//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={progress}
//                 onChange={handleSeek}
//                 disabled={isFetchingLastWatched}
//                 className="w-1/2 cursor-pointer appearance-none h-1 rounded-lg progress-slider"
//                 style={{
//                   background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
//                   height: "4px",
//                   borderRadius: "10px",
//                 }}
//               />
//               <span className="text-sm">{duration}</span>
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 onClick={toggleFullScreen}
//                 className="relative text-xl"
//                 disabled={isFetchingLastWatched}
//               >
//                 <RiFullscreenLine size={26} />
//               </button>
//               <RiVolumeUpLine className="text-xl" />
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.1"
//                 value={volume}
//                 onChange={handleVolume}
//                 className="w-16 cursor-pointer !appearance-none bg-gray-300 h-1 rounded-lg"
//                 style={{
//                   background: `linear-gradient(to right, white ${
//                     volume * 100
//                   }%, gray ${volume * 100}%)`,
//                   height: "4px",
//                   borderRadius: "10px",
//                 }}
//               />
//             </div>
//           </div>

//           {/* Mobile Controls */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-black/70 text-white p-2 md:p-3 !px-3 md:!px-4 !py-2 md:!py-3 rounded-2xl flex items-center justify-between text-xs md:text-base md:hidden">
//             {/* Mobile controls content (similar to desktop but responsive) */}
//             {/* ... */}
//           </div>
//         </div>

//         <div className="!py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
//           <h1 className="font-bebas !mt-1 w-full text-wrap">
//             {isFetchingLastWatched ? (
//               "Loading..."
//             ) : (
//               <>
//                 Chapter {actualLesson?.chapterNumber} - {actualLesson?.title}
//               </>
//             )}
//           </h1>
//           <div className="flex items-center w-full justify-between lg:justify-end gap-5 !py-3 md:!py-0">
//             <PiHeart className="bg-white text-black rounded-2xl text-3xl !p-1.5" />
//             <button
//               className="flex items-center text-xs gap-2.5 py-1.5 rounded-full text-white font-semibold !p-2 !px-4 hover:scale-[1.02] transition"
//               style={{
//                 boxShadow: "0px 7px 17.4px 0px #8B73FF80",
//                 backgroundImage:
//                   "linear-gradient(86.82deg, #A6A1FE -0.48%, #4F45F0 98.98%)",
//               }}
//             >
//               Mark as completed <PiCheckCircleBold />
//             </button>
//           </div>
//         </div>

//         <p className="text-gray-500">
//           {isFetchingLastWatched ? "Loading..." : actualLesson?.description}
//         </p>
//       </div>

//       <div className="lg:col-span-2 col-span-5 lg:-translate-y-5">
//         <h3 className="font-bebas text-2xl flex items-center gap-2.5 !pb-3">
//           CHAPTERS{" "}
//           <span className="bg-white !p-1 !px-2 rounded-xl text-lg">
//             {videoCourseLesson[0]?.chapters?.length || 0}
//           </span>
//         </h3>

//         <div className="space-y-4 bg-white w-full h-80 max-h-80 overflow-y-hidden flex flex-col justify-between !p-5 rounded-2xl relative overflow-x-hidden">
//           <div className="overflow-scroll no-hide no-scrollbar !mb-8">
//             {videoCourseLesson[0]?.chapters?.length > 0 ? (
//               videoCourseLesson[0].chapters.map((chapter) => {
//                 const chapterProgress = calculateProgress(
//                   chapter.videos?.[0]?.duration || "0:00",
//                   chapter.id === lessonId ? lastWatched || 0 : 0
//                 );

//                 return (
//                   <ChapterCard
//                     key={chapter.id}
//                     imgSrc={profile}
//                     chapter={chapter.chapterNumber}
//                     title={chapter.title}
//                     time={chapter.videos?.[0]?.duration || "0:00"}
//                     progress={chapterProgress}
//                     isActive={actualLesson?.id === chapter.id}
//                     onClick={() =>
//                       handleChapterClick(
//                         videoCourseLesson[0]?.course?.id,
//                         chapter.id
//                       )
//                     }
//                   />
//                 );
//               })
//             ) : (
//               <p className="text-gray-500">
//                 No videos available for this lesson.
//               </p>
//             )}

//             <div className="flex justify-between w-full font-nueue font-bold text-lg !my-4 !mt-8 gap-3.5 absolute bottom-0">
//               Total Time:{" "}
//               <span className="text-grey-tint flex items-center gap-1 text-sm mr-10">
//                 <PiClock /> {calculateTotalDuration(videoCourseLesson)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomVideoPlayer;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import {
//   PiCheckCircleBold,
//   PiClock,
//   PiHeart,
//   PiPause,
//   PiPlayFill,
// } from "react-icons/pi";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";
// import ProgressBar from "./ProgressBar";
// import {
//   RiArrowGoBackLine,
//   RiFullscreenLine,
//   RiReplyAllLine,
//   RiResetLeftLine,
//   RiResetRightLine,
//   RiVolumeUpLine,
// } from "react-icons/ri";
// import ChapterCard from "./ChapterCard";
// import profile from "../../../assets/img/dashboards/100minds-logo.png";
// import axios from "axios";

// const BASE_URL = "https://backend-5781.onrender.com/api/v1/last-watched";

// const CustomVideoPlayer = ({
//   src,
//   poster,
//   courseName,
//   chapterName,
//   isChapterLoading,
//   videoCourseLesson,
// }) => {
//   // Router hooks
//   const { courseId, lessonId } = useParams();
//   const navigate = useNavigate();

//   // Auth context
//   // const { getCourseLessonsVideo } = useAuth();

//   // Refs
//   const videoRef = useRef(null);
//   const videoOperationInProgress = useRef(false);
//   const progressSaveTimerRef = useRef(null);
//   const isMounted = useRef(true);
//   const hasAppliedLastWatched = useRef(false);
//   const initialLoadComplete = useRef(false); // Track first complete load

//   // State variables
//   const [videoCourseLesson, setVideoCourseLesson] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [playing, setPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [currentTime, setCurrentTime] = useState("0:00");
//   const [duration, setDuration] = useState("0:00");
//   const [isChapterLoading, setIsChapterLoading] = useState(false);
//   const [currentChapterId, setCurrentChapterId] = useState(lessonId);
//   const [lastWatchedTime, setLastWatchedTime] = useState(null);
//   const [isVideoLoading, setIsVideoLoading] = useState(true);
//   const [chapterProgress, setChapterProgress] = useState({});
//   console.log("courseeeeennnnnnammmmmeee", courseName);
//   // Convert seconds to standard time format (HH:MM:SS or MM:SS)
//   const secondsToTimeFormat = useCallback((timeInSeconds) => {
//     if (!timeInSeconds || isNaN(timeInSeconds)) return "0:00";

//     // Round to 2 decimal places
//     const time = Math.round(parseFloat(timeInSeconds) * 100) / 100;

//     const hours = Math.floor(time / 3600);
//     const minutes = Math.floor((time % 3600) / 60);
//     const seconds = Math.floor(time % 60);

//     if (hours > 0) {
//       return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
//         .toString()
//         .padStart(2, "0")}`;
//     }

//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   }, []);

//   // Convert time format (HH:MM:SS or MM:SS) to seconds
//   const timeFormatToSeconds = useCallback((timeString) => {
//     if (!timeString) return 0;

//     const parts = timeString.split(":").map(Number);

//     if (parts.length === 3) {
//       return parts[0] * 3600 + parts[1] * 60 + parts[2];
//     } else if (parts.length === 2) {
//       return parts[0] * 60 + parts[1];
//     }

//     return 0;
//   }, []);

//   // Save last watched position with proper formatting
//   const saveLastWatched = useCallback(() => {
//     const video = videoRef.current;
//     if (!video || !currentChapterId || !courseId) return;

//     try {
//       const currentVideoId = videoCourseLesson[0]?.chapters?.find(
//         (chapter) => chapter.id === currentChapterId
//       )?.videos?.[0]?.id;

//       if (!currentVideoId) return;

//       // Convert to seconds with 2 decimal places (consistent format)
//       const timestamp = parseFloat(video.currentTime.toFixed(2));
//       if (timestamp <= 0) return;

//       // Format as HH:MM:SS for consistent storage
//       const formattedTime = secondsToTimeFormat(timestamp);

//       // Update local progress state
//       setChapterProgress((prev) => ({
//         ...prev,
//         [currentChapterId]: (timestamp / video.duration) * 100,
//       }));

//       // Save to server
//       axios
//         .post(
//           `${BASE_URL}/create`,
//           {
//             videoId: currentVideoId,
//             courseId,
//             duration: String(timestamp), // Keep as seconds for backend
//           },
//           { withCredentials: true }
//         )
//         .catch((error) => {
//           console.error("Error saving progress:", error);
//         });
//     } catch (error) {
//       console.error("Error in saveLastWatched:", error);
//     }
//   }, [currentChapterId, courseId, videoCourseLesson, secondsToTimeFormat]);

//   // Get current video details
//   const currentChapter = videoCourseLesson[0]?.chapters?.find(
//     (chapter) => chapter.id === currentChapterId
//   );
//   const videoSrc = currentChapter?.videos?.[0]?.videoURL;
//   const videoId = currentChapter?.videos?.[0]?.id;

//   // Set current chapter ID when lessonId changes
//   useEffect(() => {
//     if (lessonId) {
//       // Save progress of current chapter before switching
//       const video = videoRef.current;
//       if (video && video.currentTime > 0 && currentChapterId) {
//         saveLastWatched();
//       }

//       setCurrentChapterId(lessonId);
//       hasAppliedLastWatched.current = false; // Reset flag when changing chapters
//       initialLoadComplete.current = false; // Reset initial load flag
//     }

//     return () => {
//       // Save progress when unmounting or changing chapters
//       saveLastWatched();
//     };
//   }, [lessonId, saveLastWatched, currentChapterId]);

//   // Fetch course lessons
//   // useEffect(() => {
//   //   isMounted.current = true;

//   //   if (courseId) {
//   //     setIsChapterLoading(true);
//   //     getCourseLessonsVideo(courseId)
//   //       .then((data) => {
//   //         if (isMounted.current && data?.data) {
//   //           setVideoCourseLesson(data.data);
//   //         }
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error fetching course lessons:", error);
//   //       })
//   //       .finally(() => {
//   //         if (isMounted.current) {
//   //           setIsChapterLoading(false);
//   //         }
//   //       });
//   //   }

//   //   return () => {
//   //     isMounted.current = false;
//   //   };
//   // }, [courseId]);

//   // Fetch last watched position and progress data for all videos
//   // useEffect(() => {
//   //   if (!courseId) return;

//   //   setIsVideoLoading(true);

//   //   axios
//   //     .get(`${BASE_URL}/user?courseId=${courseId}`, { withCredentials: true })
//   //     .then((response) => {
//   //       if (!isMounted.current) return;

//   //       const watchedData = response.data?.data || [];
//   //       const progressMap = {};

//   //       // Process all chapter progress data
//   //       watchedData.forEach((item) => {
//   //         const chapter = videoCourseLesson[0]?.chapters?.find(
//   //           (ch) => ch.videos?.[0]?.id === item.videoId
//   //         );

//   //         if (chapter && chapter.videos?.[0]) {
//   //           // Find video duration
//   //           let duration = 0;
//   //           if (chapter.videos[0].duration) {
//   //             duration = timeFormatToSeconds(chapter.videos[0].duration);
//   //           }

//   //           // Calculate progress percentage
//   //           if (duration > 0) {
//   //             const watchedDuration = parseFloat(item.duration);
//   //             progressMap[chapter.id] = (watchedDuration / duration) * 100;
//   //           }
//   //         }
//   //       });

//   //       // Set all chapter progress at once to avoid multiple rerenders
//   //       setChapterProgress(progressMap);

//   //       // Find last watched position for current video
//   //       if (videoId) {
//   //         const videoLastWatched = watchedData.find(
//   //           (item) => item.videoId === videoId
//   //         );

//   //         if (videoLastWatched) {
//   //           const lastWatchedDuration = parseFloat(videoLastWatched.duration);
//   //           if (!isNaN(lastWatchedDuration) && lastWatchedDuration > 0) {
//   //             setLastWatchedTime(lastWatchedDuration);

//   //             // Important: Update progress state immediately to match the UI with the video position
//   //             const video = videoRef.current;
//   //             if (video && video.duration > 0) {
//   //               setProgress((lastWatchedDuration / video.duration) * 100);
//   //             }
//   //           }
//   //         } else {
//   //           setLastWatchedTime(null);
//   //         }
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching user watch data:", error);
//   //     })
//   //     .finally(() => {
//   //       if (isMounted.current) {
//   //         setIsVideoLoading(false);
//   //       }
//   //     });
//   // }, [courseId, videoId, videoCourseLesson, timeFormatToSeconds]);

//   // Apply last watched time to video when it's loaded
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video || lastWatchedTime === null || isVideoLoading) return;

//     const handleCanPlay = () => {
//       if (lastWatchedTime > 0 && !hasAppliedLastWatched.current) {
//         // Set the video's current time
//         video.currentTime = lastWatchedTime;

//         // Update UI to reflect this position
//         setCurrentTime(secondsToTimeFormat(lastWatchedTime));

//         // Update progress bar to match the position (only if duration is available)
//         if (video.duration > 0) {
//           const calculatedProgress = (lastWatchedTime / video.duration) * 100;
//           setProgress(calculatedProgress);
//         }

//         hasAppliedLastWatched.current = true;
//         initialLoadComplete.current = true;
//       } else if (!initialLoadComplete.current) {
//         // Even if there's no last watched time, mark as loaded
//         initialLoadComplete.current = true;
//       }
//     };

//     // Apply immediately if video is already loaded
//     if (video.readyState >= 2) {
//       handleCanPlay();
//     } else {
//       video.addEventListener("canplay", handleCanPlay, { once: true });
//     }

//     return () => {
//       video.removeEventListener("canplay", handleCanPlay);
//     };
//   }, [lastWatchedTime, isVideoLoading, secondsToTimeFormat]);

//   // Set up progress tracking and event listeners
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     // Update progress as video plays
//     const updateProgress = () => {
//       if (!video || video.duration <= 0) return;

//       const currentProgress = (video.currentTime / video.duration) * 100;
//       setProgress(currentProgress);
//       setCurrentTime(secondsToTimeFormat(video.currentTime));
//     };

//     const handleDurationChange = () => {
//       setDuration(secondsToTimeFormat(video.duration));

//       // After duration change, re-apply last watched position to update progress bar
//       if (
//         lastWatchedTime !== null &&
//         lastWatchedTime > 0 &&
//         video.duration > 0
//       ) {
//         const calculatedProgress = (lastWatchedTime / video.duration) * 100;
//         setProgress(calculatedProgress);
//       }
//     };

//     const handleLoadedData = () => {
//       setIsVideoLoading(false);
//       handleDurationChange();

//       // Apply last watched position if available and not yet applied
//       if (
//         lastWatchedTime !== null &&
//         lastWatchedTime > 0 &&
//         lastWatchedTime < video.duration &&
//         !hasAppliedLastWatched.current
//       ) {
//         video.currentTime = lastWatchedTime;
//         updateProgress();
//         hasAppliedLastWatched.current = true;
//       }
//     };

//     const handleEnded = () => {
//       setPlaying(false);
//       setShowModal(true);
//       saveLastWatched();
//     };

//     // Add event listeners
//     video.addEventListener("timeupdate", updateProgress);
//     video.addEventListener("durationchange", handleDurationChange);
//     video.addEventListener("loadeddata", handleLoadedData);
//     video.addEventListener("ended", handleEnded);

//     return () => {
//       // Remove event listeners
//       video.removeEventListener("timeupdate", updateProgress);
//       video.removeEventListener("durationchange", handleDurationChange);
//       video.removeEventListener("loadeddata", handleLoadedData);
//       video.removeEventListener("ended", handleEnded);
//     };
//   }, [secondsToTimeFormat, lastWatchedTime, saveLastWatched]);

//   // Set up periodic progress saving (every 30 seconds)
//   useEffect(() => {
//     if (playing) {
//       if (progressSaveTimerRef.current) {
//         clearInterval(progressSaveTimerRef.current);
//       }

//       progressSaveTimerRef.current = setInterval(() => {
//         saveLastWatched();

//         // Update chapter progress display after saving
//         const video = videoRef.current;
//         if (video && video.duration > 0) {
//           setChapterProgress((prev) => ({
//             ...prev,
//             [currentChapterId]: (video.currentTime / video.duration) * 100,
//           }));
//         }
//       }, 30000); // 30 seconds
//     } else {
//       // Save on pause if video has been playing
//       if (videoRef.current && videoRef.current.currentTime > 0) {
//         saveLastWatched();
//       }

//       if (progressSaveTimerRef.current) {
//         clearInterval(progressSaveTimerRef.current);
//       }
//     }

//     return () => {
//       if (progressSaveTimerRef.current) {
//         clearInterval(progressSaveTimerRef.current);
//       }
//     };
//   }, [playing, saveLastWatched, currentChapterId]);

//   // Calculate total duration of videos
//   const calculateTotalDuration = useCallback(
//     (lessonData) => {
//       if (!lessonData || !lessonData[0]?.chapters) return "00:00";

//       try {
//         let totalSeconds = 0;

//         lessonData[0].chapters.forEach((chapter) => {
//           chapter.videos?.forEach((video) => {
//             if (!video.duration) return;

//             totalSeconds += timeFormatToSeconds(video.duration);
//           });
//         });

//         const hours = Math.floor(totalSeconds / 3600);
//         const minutes = Math.floor((totalSeconds % 3600) / 60);
//         const seconds = totalSeconds % 60;

//         return hours > 0
//           ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
//               .toString()
//               .padStart(2, "0")} Hrs`
//           : `${minutes}:${seconds.toString().padStart(2, "0")} Mins`;
//       } catch (error) {
//         console.error("Error calculating total duration:", error);
//         return "00:00";
//       }
//     },
//     [timeFormatToSeconds]
//   );

//   // Handle chapter switch
//   const handleChapterSwitch = (id) => {
//     if (id === currentChapterId) return;

//     // Save progress before switching
//     saveLastWatched();

//     // Update the progress UI for the current chapter before switching
//     const video = videoRef.current;
//     if (video && video.duration > 0) {
//       setChapterProgress((prev) => ({
//         ...prev,
//         [currentChapterId]: (video.currentTime / video.duration) * 100,
//       }));
//     }

//     // Navigate to new lesson URL
//     navigate(`/courses/${courseId}/lessons/${id}`);
//   };

//   // Fixed toggle play to maintain position when playback starts
//   const togglePlay = useCallback(async () => {
//     const videoElement = videoRef.current;

//     // Guard clauses
//     if (
//       !videoElement ||
//       isChapterLoading ||
//       videoOperationInProgress.current ||
//       isVideoLoading
//     )
//       return;

//     videoOperationInProgress.current = true;

//     try {
//       if (videoElement.paused) {
//         // Play the video from its current position
//         // If we have a lastWatchedTime and it hasn't been applied yet,
//         // set the current time first
//         if (
//           lastWatchedTime !== null &&
//           lastWatchedTime > 0 &&
//           !hasAppliedLastWatched.current
//         ) {
//           videoElement.currentTime = lastWatchedTime;
//           hasAppliedLastWatched.current = true;
//         }
//         console.log("videoelement", videoElement);
//         // Store current position in case the browser resets it
//         const currentPosition = videoElement.currentTime;

//         await videoElement.play();

//         // If playing reset the position, restore it
//         if (videoElement.currentTime === 0 && currentPosition > 0) {
//           videoElement.currentTime = currentPosition;
//         }

//         setPlaying(true);
//       } else {
//         videoElement.pause();
//         setPlaying(false);
//         saveLastWatched();
//       }
//     } catch (error) {
//       console.error("Error toggling playback:", error);
//     } finally {
//       videoOperationInProgress.current = false;
//     }
//   }, [isChapterLoading, isVideoLoading, lastWatchedTime, saveLastWatched]);

//   const toggleFullScreen = useCallback(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     try {
//       if (!document.fullscreenElement) {
//         video.requestFullscreen().catch((error) => {
//           console.error("Error requesting fullscreen:", error);
//         });
//       } else {
//         document.exitFullscreen().catch((error) => {
//           console.error("Error exiting fullscreen:", error);
//         });
//       }
//     } catch (error) {
//       console.error("Error in toggleFullScreen:", error);
//     }
//   }, []);

//   const skipTime = useCallback(
//     (seconds) => {
//       const video = videoRef.current;
//       if (!video) return;

//       try {
//         const newTime = video.currentTime + seconds;
//         video.currentTime = Math.max(0, Math.min(newTime, video.duration));
//         saveLastWatched();
//       } catch (error) {
//         console.error("Error in skipTime:", error);
//       }
//     },
//     [saveLastWatched]
//   );

//   const handleVolume = useCallback((e) => {
//     const video = videoRef.current;
//     if (!video) return;

//     try {
//       const newVolume = Number(e.target.value);
//       video.volume = newVolume;
//       setVolume(newVolume);
//     } catch (error) {
//       console.error("Error in handleVolume:", error);
//     }
//   }, []);

//   const handleSeek = useCallback(
//     (e) => {
//       const video = videoRef.current;
//       if (!video || video.duration <= 0) return;

//       try {
//         const newValue = Number(e.target.value);
//         const newTime = (newValue / 100) * video.duration;

//         video.currentTime = newTime;
//         setProgress(newValue);
//         setCurrentTime(secondsToTimeFormat(newTime));
//         saveLastWatched();
//         console.log("new time seek", newTime);
//       } catch (error) {
//         console.error("Error in handleSeek:", error);
//       }
//     },
//     [secondsToTimeFormat, saveLastWatched]
//   );

//   const replayVideo = useCallback(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     try {
//       video.currentTime = 0;
//       video
//         .play()
//         .then(() => {
//           setPlaying(true);
//           setShowModal(false);
//         })
//         .catch((error) => {
//           console.error("Error replaying video:", error);
//         });
//     } catch (error) {
//       console.error("Error in replayVideo:", error);
//     }
//   }, []);

//   const course = videoCourseLesson?.[0];
//   const chapters = course?.chapters || [];

//   // Clean up function for component unmount
//   useEffect(() => {
//     return () => {
//       isMounted.current = false;
//       // Save progress when component unmounts
//       saveLastWatched();

//       if (progressSaveTimerRef.current) {
//         clearInterval(progressSaveTimerRef.current);
//       }
//     };
//   }, [saveLastWatched]);

//   return (
//     <div className="grid lg:grid-cols-5 gap-10">
//       <div className="lg:col-span-3 col-span-5">
//         <div className="relative w-full max-w-2xl mx-auto">
//           <div className="!pb-6">
//             <ProgressBar percentage={progress} />
//           </div>
//           {/* Video Element */}
//           <div className="w-full relative">
//             {isVideoLoading && (
//               <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10 rounded-2xl">
//                 <div className="loader-spinner border-4 border-t-4 border-gray-200 h-12 w-12 rounded-full animate-spin"></div>
//               </div>
//             )}
//             {videoSrc ? (
//               <video
//                 className="w-full h-80 max-h-96 object-contain shadow rounded-2xl"
//                 ref={videoRef}
//                 src={videoSrc}
//                 poster={poster}
//                 controls={false}
//                 onLoadStart={() => setIsVideoLoading(true)}
//               />
//             ) : (
//               <div className="text-center text-gray-500 py-10">
//                 No video found for this chapter.
//               </div>
//             )}

//             {showModal && (
//               <div className="absolute w-full bottom-0 inset-0 flex items-center justify-center bg-[#00000083] bg-opacity-50 rounded-2xl">
//                 <div className="!p-5 rounded-lg shadow-lg text-center">
//                   <div className="flex gap-4 justify-center">
//                     <button
//                       className="bg-green-tint text-white !px-4 !py-2 rounded"
//                       onClick={replayVideo}
//                     >
//                       <RiReplyAllLine />
//                     </button>
//                     <button
//                       className="bg-white text-red-500 !px-4 !py-2 rounded"
//                       onClick={() => setShowModal(false)}
//                     >
//                       <RiArrowGoBackLine />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* Desktop Controls */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-black/70 text-white p-3 !px-4 !py-3 rounded-2xl md:flex items-center justify-between hidden">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => skipTime(-10)}
//                 className="relative text-xl"
//               >
//                 <RiResetLeftLine size={26} />
//                 <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>

//               <button onClick={togglePlay} className="text-xl">
//                 {playing ? (
//                   <PiPause
//                     size={30}
//                     className="bg-gray-500/70 !p-1.5 rounded-3xl"
//                   />
//                 ) : (
//                   <PiPlayFill
//                     size={30}
//                     className="bg-gray-500/70 !p-1.5 rounded-3xl"
//                   />
//                 )}
//               </button>

//               <button onClick={() => skipTime(10)} className="relative text-xl">
//                 <RiResetRightLine size={26} />
//                 <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>
//             </div>

//             <div className="flex items-center gap-2 w-1/2">
//               <span className="text-sm">{currentTime}</span>

//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={progress}
//                 onChange={handleSeek}
//                 className="w-1/2 cursor-pointer appearance-none h-1 rounded-lg progress-slider"
//                 style={{
//                   background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
//                   height: "4px",
//                   borderRadius: "10px",
//                 }}
//               />
//               <span className="text-sm">{duration}</span>
//             </div>

//             {/* Right Volume Control */}
//             <div className="flex items-center gap-2">
//               <button onClick={toggleFullScreen} className="relative text-xl">
//                 <RiFullscreenLine size={26} />
//               </button>
//               <RiVolumeUpLine className="text-xl" />
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.1"
//                 value={volume}
//                 onChange={handleVolume}
//                 className="w-16 cursor-pointer !appearance-none bg-gray-300 h-1 rounded-lg"
//                 style={{
//                   background: `linear-gradient(to right, white ${
//                     volume * 100
//                   }%, gray ${volume * 100}%)`,
//                   height: "4px",
//                   borderRadius: "10px",
//                 }}
//               />
//             </div>
//           </div>
//           {/* Mobile Controls */}
//           <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-black/70 text-white p-2 md:p-3 !px-3 md:!px-4 !py-2 md:!py-3 rounded-2xl flex items-center justify-between text-xs md:text-base md:hidden">
//             <div className="flex items-center gap-2 md:gap-4">
//               <button
//                 onClick={() => skipTime(-10)}
//                 className="relative text-lg md:text-xl"
//               >
//                 <RiResetLeftLine size={22} className="md:size-26" />
//                 <span className="absolute inset-0 flex items-center justify-center text-[6px] md:text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>

//               <button onClick={togglePlay} className="text-lg md:text-xl">
//                 {playing ? (
//                   <PiPause
//                     size={24}
//                     className="bg-gray-500/70 !p-1 md:!p-1.5 rounded-3xl"
//                   />
//                 ) : (
//                   <PiPlayFill
//                     size={24}
//                     className="bg-gray-500/70 !p-1 md:!p-1.5 rounded-3xl"
//                   />
//                 )}
//               </button>

//               <button
//                 onClick={() => skipTime(10)}
//                 className="relative text-lg md:text-xl"
//               >
//                 <RiResetRightLine size={22} className="md:size-26" />
//                 <span className="absolute inset-0 flex items-center justify-center text-[6px] md:text-[8px] font-bold text-white">
//                   10
//                 </span>
//               </button>
//             </div>

//             <div className="flex items-center gap-1 md:gap-2 w-1/3 md:w-1/2">
//               <span className="text-[10px] md:text-sm">{currentTime}</span>

//               <input
//                 type="range"
//                 min="0"
//                 max="100"
//                 value={progress}
//                 onChange={handleSeek}
//                 className="w-1/3 md:w-1/2 cursor-pointer appearance-none h-[2px] md:h-1 rounded-lg progress-slider"
//                 style={{
//                   background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
//                   height: "3px",
//                   borderRadius: "10px",
//                 }}
//               />
//               <span className="text-[10px] md:text-sm">{duration}</span>
//             </div>

//             {/* Right Volume Control */}
//             <div className="hidden md:flex items-center gap-2">
//               <RiVolumeUpLine className="text-lg md:text-xl" />
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.1"
//                 value={volume}
//                 onChange={handleVolume}
//                 className="w-12 md:w-16 cursor-pointer !appearance-none bg-gray-300 h-[2px] md:h-1 rounded-lg"
//                 style={{
//                   background: `linear-gradient(to right, white ${
//                     volume * 100
//                   }%, gray ${volume * 100}%)`,
//                   height: "3px",
//                   borderRadius: "10px",
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="!py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
//           <h1 className="font-bebas !mt-1 w-full text-wrap">
//             {isChapterLoading ? (
//               "Loading..."
//             ) : (
//               <>
//                 {currentChapter
//                   ? `Chapter ${currentChapter.chapterNumber} - ${currentChapter.title}`
//                   : "Chapter"}
//               </>
//             )}
//           </h1>
//           <div className="flex items-center w-full justify-between lg:justify-end gap-5 !py-3 md:!py-0">
//             <PiHeart className="bg-white text-black rounded-2xl text-3xl !p-1.5" />
//             <button
//               className="flex items-center text-xs gap-2.5 py-1.5 rounded-full text-white font-semibold !p-2 !px-4 hover:scale-[1.02] transition"
//               style={{
//                 boxShadow: "0px 7px 17.4px 0px #8B73FF80",
//                 backgroundImage:
//                   "linear-gradient(86.82deg, #A6A1FE -0.48%, #4F45F0 98.98%)",
//               }}
//             >
//               Mark as completed <PiCheckCircleBold />
//             </button>
//           </div>
//         </div>
//         <p className="text-gray-500">
//           {isChapterLoading
//             ? "Loading..."
//             : currentChapter?.description || "Description"}
//         </p>
//       </div>
//       <div className="lg:col-span-2 col-span-5 lg:-translate-y-5">
//         <h3 className="font-bebas text-2xl flex items-center gap-2.5 !pb-3">
//           CHAPTERS{" "}
//           <span className="bg-white !p-1 !px-2 rounded-xl text-lg">
//             {videoCourseLesson[0]?.chapters?.length || 0}
//           </span>
//         </h3>

//         <div className="space-y-4 bg-white w-full h-80 max-h-80 overflow-y-hidden flex flex-col justify-between !p-5 rounded-2xl relative overflow-x-hidden">
//           <div className="overflow-scroll no-hide no-scrollbar !mb-8">
//             {chapters.length > 0 ? (
//               chapters.map((chapter) => {
//                 return (
//                   <ChapterCard
//                     key={chapter.id}
//                     imgSrc={profile}
//                     chapter={chapter.chapterNumber}
//                     title={chapter.title}
//                     time={chapter.videos?.[0]?.duration || "0:00"}
//                     progress={chapterProgress[chapter.id] || 0}
//                     onClick={() => handleChapterSwitch(chapter.id)}
//                     isActive={currentChapterId === chapter.id}
//                   />
//                 );
//               })
//             ) : (
//               <p className="text-gray-500">
//                 No videos available for this lesson.
//               </p>
//             )}

//             <div className="flex justify-between w-full font-nueue font-bold text-lg !my-4 !mt-8 gap-3.5 absolute bottom-0">
//               Total Time:{" "}
//               <span className="text-grey-tint flex items-center gap-1 text-sm mr-10">
//                 <PiClock />
//                 {calculateTotalDuration(videoCourseLesson)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomVideoPlayer;

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  PiCheckCircleBold,
  PiClock,
  PiHeart,
  PiPause,
  PiPlayFill,
} from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ProgressBar from "./ProgressBar";
import {
  RiArrowGoBackLine,
  RiFullscreenExitLine,
  RiFullscreenLine,
  RiReplyAllLine,
  RiResetLeftLine,
  RiResetRightLine,
  RiVolumeDownLine,
  RiVolumeMuteLine,
  RiVolumeUpLine,
} from "react-icons/ri";
import ChapterCard from "./ChapterCard";
import profile from "../../../assets/img/dashboards/100minds-logo.png";
import axios from "axios";

// Base URL for the last watched API endpoint
const BASE_URL = "https://backend-5781.onrender.com/api/v1/last-watched";

// Local storage keys
const LAST_WATCHED_KEY = "lastWatchedChapter";
const VOLUME_PREFERENCE_KEY = "videoPlayerVolume";

// Helper function to format time (e.g., 1:05, 15:30)
const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) {
    return "0:00";
  }
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// Parse duration string (convert any string format to seconds)
const parseDuration = (durationStr) => {
  if (!durationStr) return 0;

  // If already a number, return it
  if (typeof durationStr === "number") return durationStr;

  // If string is in format "mm:ss"
  if (durationStr.includes(":")) {
    const parts = durationStr.split(":");
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    if (parts.length === 3) {
      return (
        parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
      );
    }
  }

  // Try parsing as float
  return parseFloat(durationStr) || 0;
};

const CustomVideoPlayer = ({
  src,
  poster,
  courseName,
  chapterName,
  isChapterLoading,
  videoCourseLesson,
}) => {
  // --- Hooks ---
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  // const { user } = useAuth(); // Uncomment if you need user info

  // --- Refs ---
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const saveIntervalRef = useRef(null);
  const hasAppliedLastWatched = useRef(false);
  const progressBarRef = useRef(null);

  // --- State ---
  const [currentChapterId, setCurrentChapterId] = useState(lessonId);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lastWatchedData, setLastWatchedData] = useState(null);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [markChapterAsCompleted, setMarkasCompleted] = useState(false);
  const [chapterProgress, setChapterProgress] = useState({});

  // --- Derived Data ---
  const currentChapterDetails = chapterName?.find(
    (chapter) => chapter.id.toString() === currentChapterId
  );
  const videoSrc = currentChapterDetails?.videos?.[0]?.videoURL;
  const videoId = currentChapterDetails?.videos?.[0]?.id;

  console.log("Current Chapter ID:", currentChapterId);
  console.log("Current Video ID:", videoId);
  console.log("Current Video Src:", videoSrc);

  // --- Load Last Watched Info from LocalStorage ---
  useEffect(() => {
    try {
      const storedLastWatched = localStorage.getItem(LAST_WATCHED_KEY);
      if (storedLastWatched) {
        const parsedData = JSON.parse(storedLastWatched);
        // This will be used if we need to auto-navigate to the most recently watched chapter
        console.log("Loaded last watched from localStorage:", parsedData);
      }
    } catch (error) {
      console.error("Error loading last watched from localStorage:", error);
    }
  }, []);

  // --- Save Last Watched Info to LocalStorage ---
  const updateLocalStorage = useCallback(
    (videoId, chapterId, timestamp) => {
      try {
        const lastWatchedInfo = {
          videoId,
          chapterId,
          timestamp,
          courseId,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(LAST_WATCHED_KEY, JSON.stringify(lastWatchedInfo));
        console.log("Saved to localStorage:", lastWatchedInfo);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    },
    [courseId]
  );

  // --- Fetch Last Watched Data for All Chapters ---
  useEffect(() => {
    if (courseId && chapterName && chapterName.length > 0) {
      const fetchAllLastWatched = async () => {
        try {
          // Fetch last watched data for the entire course
          const response = await axios.get(
            `${BASE_URL}/user?courseId=${courseId}`,
            {
              withCredentials: true,
            }
          );

          if (response.data && Array.isArray(response.data)) {
            const watchedData = response.data;
            setLastWatchedData(watchedData);
            console.log("Last watched data fetched:", watchedData);

            // Process the last watched data into chapter progress
            const progressMap = {};

            watchedData.forEach((item) => {
              // Find which chapter this video belongs to
              const chapter = chapterName.find(
                (ch) =>
                  ch.videos &&
                  ch.videos.some((video) => video.id === item.videoId)
              );

              if (chapter) {
                const chapterId = chapter.id.toString();
                const video = chapter.videos.find((v) => v.id === item.videoId);

                if (video) {
                  const videoDuration = parseDuration(video.duration);
                  const watchedDuration = parseFloat(item.duration);

                  // Calculate progress percentage
                  const progressPercent =
                    videoDuration > 0
                      ? Math.min(100, (watchedDuration / videoDuration) * 100)
                      : 0;

                  progressMap[chapterId] = {
                    progress: progressPercent,
                    timestamp: watchedDuration,
                    videoId: item.videoId,
                    lastWatchedAt: item.lastWatchedAt,
                    isCompleted: item.isChapterCompleted,
                  };
                }
              }
            });

            setChapterProgress(progressMap);
            console.log("Chapter progress calculated:", progressMap);

            // If no lessonId is specified, navigate to the most recently watched chapter
            if (!lessonId && watchedData.length > 0) {
              // Sort by timestamp to find the most recently watched
              const sortedData = [...watchedData].sort(
                (a, b) => new Date(b.lastWatchedAt) - new Date(a.lastWatchedAt)
              );

              // Find the corresponding chapter for the most recent video
              const recentVideoId = sortedData[0].videoId;
              const recentChapter = chapterName.find(
                (chapter) =>
                  chapter.videos &&
                  chapter.videos.some((video) => video.id === recentVideoId)
              );

              if (recentChapter) {
                console.log(
                  `Navigating to most recent chapter: ${recentChapter.id}`
                );
                navigate(`/courses/${courseId}/lessons/${recentChapter.id}`, {
                  replace: true,
                });

                // Also store this information in localStorage
                updateLocalStorage(
                  recentVideoId,
                  recentChapter.id.toString(),
                  sortedData[0].duration
                );
              }
            }
          }
        } catch (error) {
          console.error("Failed to fetch last watched data:", error);
        }
      };

      fetchAllLastWatched();
    }
  }, [courseId, chapterName, lessonId, navigate, updateLocalStorage]);

  // --- Effect to handle default chapter navigation ---
  useEffect(() => {
    if (isChapterLoading || !chapterName || chapterName.length === 0) return;

    const isValidLessonId =
      lessonId && chapterName.some((ch) => ch.id.toString() === lessonId);

    if (!isValidLessonId) {
      const firstChapterId = chapterName[0].id.toString();
      console.log(
        `Default Nav: Invalid lessonId ${lessonId}, navigating to ${firstChapterId}`
      );
      navigate(`/courses/${courseId}/lessons/${firstChapterId}`, {
        replace: true,
      });
    }

    hasAppliedLastWatched.current = false;
  }, [courseId, lessonId, chapterName, isChapterLoading, navigate]);

  // --- Effect to sync state with URL and reset player for new video ---
  useEffect(() => {
    if (lessonId) {
      setCurrentChapterId(lessonId);
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      setIsVideoLoading(true);
      hasAppliedLastWatched.current = false;

      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
        saveIntervalRef.current = null;
      }

      console.log(
        `Sync Effect: Set chapter ID to ${lessonId}, reset player state.`
      );
    } else if (!isChapterLoading && chapterName && chapterName.length > 0) {
      const firstChapterId = chapterName[0].id.toString();
      setCurrentChapterId(firstChapterId);
      hasAppliedLastWatched.current = false;
      console.log(
        `Sync Effect: Fallback - Set chapter ID to first: ${firstChapterId}`
      );
    }
  }, [lessonId, chapterName, isChapterLoading]);

  // --- Effect to Apply Last Watched Time for Current Video ---
  useEffect(() => {
    if (
      videoId &&
      courseId &&
      videoRef.current &&
      !hasAppliedLastWatched.current
    ) {
      const applyLastWatched = async () => {
        console.log(`Fetching last watched time for videoId: ${videoId}`);
        try {
          // First try to use already fetched data if available
          let lastWatchedTimestamp = null;

          // Check if we have data in our chapterProgress state
          if (chapterProgress[currentChapterId]) {
            lastWatchedTimestamp = chapterProgress[currentChapterId].timestamp;
            console.log(
              `Found timestamp in chapter progress: ${lastWatchedTimestamp}`
            );
          }
          // Then check the fetched API data
          else if (lastWatchedData) {
            const videoData = lastWatchedData.find(
              (item) => item.videoId === videoId
            );
            if (videoData) {
              lastWatchedTimestamp = parseFloat(videoData.duration);
              console.log(
                `Found timestamp in API data: ${lastWatchedTimestamp}`
              );
            }
          }

          // If not found in local state, fetch directly
          if (lastWatchedTimestamp === null) {
            console.log("No timestamp found locally, fetching from API");
            const response = await axios.get(
              `${BASE_URL}/user?courseId=${courseId}`,
              { withCredentials: true }
            );

            if (response.data && Array.isArray(response.data)) {
              const videoData = response.data.find(
                (item) => item.videoId === videoId
              );
              if (videoData) {
                lastWatchedTimestamp = parseFloat(videoData.duration);
                console.log(
                  `Fetched timestamp from API: ${lastWatchedTimestamp}`
                );
              }
            }
          }

          if (
            !isNaN(lastWatchedTimestamp) &&
            lastWatchedTimestamp > 0 &&
            videoRef.current
          ) {
            // Function to apply seek once video is ready
            const applySeek = () => {
              if (
                videoRef.current.readyState >= 1 &&
                !hasAppliedLastWatched.current &&
                videoRef.current.duration
              ) {
                console.log(
                  `Applying last watched time: ${lastWatchedTimestamp}`
                );
                videoRef.current.currentTime = lastWatchedTimestamp;
                setCurrentTime(lastWatchedTimestamp);

                // Only set progress if duration is available
                if (videoRef.current.duration) {
                  const newProgress =
                    (lastWatchedTimestamp / videoRef.current.duration) * 100;
                  setProgress(newProgress);
                  console.log(`Setting progress to ${newProgress}%`);
                }

                hasAppliedLastWatched.current = true;
              } else if (!hasAppliedLastWatched.current) {
                console.log("Video not ready for seek, waiting...");
                setTimeout(applySeek, 100);
              }
            };

            applySeek();
          } else {
            console.log("No valid last watched time found or already applied.");
            hasAppliedLastWatched.current = true;
          }
        } catch (error) {
          console.error("Error fetching last watched time:", error);
          hasAppliedLastWatched.current = true;
        }
      };

      const timeoutId = setTimeout(applyLastWatched, 100);
      return () => clearTimeout(timeoutId);
    } else if (videoId) {
      hasAppliedLastWatched.current = true;
    }
  }, [videoId, courseId, currentChapterId, lastWatchedData, chapterProgress]);

  // --- Progress Save Logic ---
  const saveProgress = useCallback(() => {
    if (videoRef.current && videoId && courseId && !videoRef.current.seeking) {
      const timestamp = parseFloat(videoRef.current.currentTime.toFixed(2));
      const videoDuration = videoRef.current.duration;

      // Skip saving in edge cases
      if (timestamp <= 0.1 && videoDuration > 1) {
        console.warn("Skipping save progress: Timestamp near zero.");
        return;
      }
      if (timestamp > videoDuration) {
        console.warn("Skipping save progress: Timestamp exceeds duration.");
        return;
      }

      console.log(`Saving progress - Video: ${videoId}, Time: ${timestamp}`);
      axios
        .post(
          `${BASE_URL}/create`,
          {
            videoId,
            courseId,
            duration: String(timestamp),
            isChapterCompleted: markChapterAsCompleted,
          },
          { withCredentials: true }
        )
        .then(() => {
          console.log(`Saved progress: ${timestamp} for video ${videoId}`);

          // Update localStorage with the most recent watched information
          updateLocalStorage(videoId, currentChapterId, timestamp);

          // Update the lastWatchedData state
          setLastWatchedData((prevData) => {
            if (!prevData)
              return [{ videoId, courseId, timestamp: String(timestamp) }];

            const updatedData = [...prevData];
            const existingIndex = updatedData.findIndex(
              (item) => item.videoId === videoId
            );

            if (existingIndex >= 0) {
              updatedData[existingIndex] = {
                ...updatedData[existingIndex],
                duration: String(timestamp),
                lastWatchedAt: new Date().toISOString(),
              };
            } else {
              updatedData.push({
                videoId,
                courseId,
                duration: String(timestamp),
                lastWatchedAt: new Date().toISOString(),
              });
            }

            return updatedData;
          });

          // Update the chapter progress state
          setChapterProgress((prevProgress) => {
            const newProgress = { ...prevProgress };
            const completionPercentage = (timestamp / videoDuration) * 100;

            newProgress[currentChapterId] = {
              progress: completionPercentage,
              timestamp: timestamp,
              videoId: videoId,
              lastWatchedAt: new Date().toISOString(),
              isCompleted: completionPercentage >= 95 || markChapterAsCompleted,
            };

            return newProgress;
          });

          // Check if video is completed (95% or more)
          const completionPercentage = (timestamp / videoDuration) * 100;
          if (
            completionPercentage >= 95 &&
            !completedChapters.includes(currentChapterId)
          ) {
            setCompletedChapters((prev) => [...prev, currentChapterId]);
          }
        })
        .catch((error) =>
          console.error(
            "Error saving last watched:",
            error.response?.data || error.message
          )
        );
    }
  }, [
    videoId,
    courseId,
    currentChapterId,
    completedChapters,
    markChapterAsCompleted,
    updateLocalStorage,
  ]);

  // --- Effect to manage the save progress interval ---
  useEffect(() => {
    if (playing && videoId && courseId) {
      if (!saveIntervalRef.current) {
        console.log("Starting save progress interval.");
        saveIntervalRef.current = setInterval(saveProgress, 5000);

        // Also save immediately when starting playback
        saveProgress();
      }
    } else {
      if (saveIntervalRef.current) {
        console.log("Clearing save progress interval.");
        clearInterval(saveIntervalRef.current);
        saveIntervalRef.current = null;

        // Save one last time when pausing
        if (videoRef.current && videoRef.current.currentTime > 0) {
          saveProgress();
        }
      }
    }

    return () => {
      if (saveIntervalRef.current) {
        console.log("Cleaning up save progress interval.");
        clearInterval(saveIntervalRef.current);
        saveIntervalRef.current = null;

        // Save on unmount if needed
        if (videoRef.current && videoRef.current.currentTime > 0) {
          saveProgress();
        }
      }
    };
  }, [playing, videoId, courseId, saveProgress]);

  // --- Improved Fullscreen Handling ---
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      setIsFullscreen(!!isCurrentlyFullscreen);
    };

    // Listen for fullscreen change events across browsers
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  // --- Video Event Handlers ---
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      console.log(
        "Video metadata loaded. Duration:",
        videoRef.current.duration
      );
      setDuration(videoRef.current.duration);
      setIsVideoLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTimeValue = videoRef.current.currentTime;
      const durationValue = videoRef.current.duration;

      // Ensure we have valid numbers
      if (!isNaN(currentTimeValue)) {
        setCurrentTime(currentTimeValue);
      }

      if (!isNaN(durationValue) && durationValue > 0) {
        const newProgress = (currentTimeValue / durationValue) * 100;
        setProgress(newProgress);
      }
    }
  };

  const handlePlay = () => {
    setPlaying(true);
    setIsVideoLoading(false);
  };

  const handlePause = () => {
    setPlaying(false);
    // Save progress when user pauses
    saveProgress();
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(100);
    setShowModal(true);

    // Mark chapter as completed
    if (!completedChapters.includes(currentChapterId)) {
      setCompletedChapters((prev) => [...prev, currentChapterId]);
      setMarkasCompleted(true); // Set this flag for the next API call
    }

    // Save final progress
    saveProgress();
  };

  const handleVolumeChange = () => {
    if (videoRef.current) {
      setVolume(videoRef.current.volume);
      setIsMuted(videoRef.current.muted || videoRef.current.volume === 0);
    }
  };

  const handleWaiting = () => {
    setIsVideoLoading(true);
    console.log("Video waiting (buffering)...");
  };

  const handleCanPlay = () => {
    if (playing) {
      setIsVideoLoading(false);
    }
    console.log("Video can play.");
  };

  const handleError = (e) => {
    console.error("Video error:", e);
    setIsVideoLoading(false);
  };

  // --- Control Functions ---
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((error) => {
        console.error("Play error:", error);
        setPlaying(false); // Ensure state stays in sync if play fails
      });
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current || isNaN(duration) || duration <= 0) return;

    const seekPercentage = parseFloat(e.target.value);
    const seekTime = (seekPercentage / 100) * duration;

    // Apply seek to video element
    videoRef.current.currentTime = seekTime;

    // Update UI immediately for responsiveness
    setProgress(seekPercentage);
    setCurrentTime(seekTime);
  };

  const skipTime = (amount) => {
    if (!videoRef.current || isNaN(duration)) return;

    const newTime = Math.max(
      0,
      Math.min(duration, videoRef.current.currentTime + amount)
    );
    videoRef.current.currentTime = newTime;

    // Update UI immediately
    setCurrentTime(newTime);
    setProgress((newTime / duration) * 100);
  };

  const handleVolume = (e) => {
    if (!videoRef.current) return;

    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    videoRef.current.muted = newVolume === 0;

    setVolume(newVolume);
    setIsMuted(newVolume === 0);

    // Save volume preference to localStorage
    localStorage.setItem(VOLUME_PREFERENCE_KEY, newVolume);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    const currentlyMuted =
      videoRef.current.muted || videoRef.current.volume === 0;

    if (currentlyMuted) {
      const restoreVolume = volume > 0 ? volume : 0.5;
      videoRef.current.volume = restoreVolume;
      videoRef.current.muted = false;
      setVolume(restoreVolume);
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
      setCurrentTime(0);
      setShowModal(false);
      videoRef.current
        .play()
        .catch((error) => console.error("Play error:", error));
    }
  };

  const markChapterCompleted = () => {
    if (currentChapterId && !completedChapters.includes(currentChapterId)) {
      setCompletedChapters((prev) => [...prev, currentChapterId]);
      setMarkasCompleted(true); // Set flag for next API call

      // Trigger an immediate save with the completed flag
      saveProgress();
      console.log(`Marked chapter ${currentChapterId} as completed`);
    }
  };

  // --- Chapter Navigation ---
  const handleChapterClick = (clickedChapterId) => {
    const targetChapterIdStr = clickedChapterId.toString();
    if (targetChapterIdStr !== currentChapterId) {
      // Save progress on current video before navigating
      if (videoRef.current && videoRef.current.currentTime > 0) {
        saveProgress();
      }

      console.log(
        `Chapter Clicked: Navigating to lesson ID: ${targetChapterIdStr}`
      );
      navigate(`/courses/${courseId}/lessons/${targetChapterIdStr}`);
    }
  };

  // --- Find Next Chapter ---
  const findNextChapterAndNavigate = () => {
    if (!chapterName || chapterName.length === 0) return;

    const currentIndex = chapterName.findIndex(
      (chapter) => chapter.id.toString() === currentChapterId
    );

    if (currentIndex >= 0 && currentIndex < chapterName.length - 1) {
      const nextChapter = chapterName[currentIndex + 1];
      handleChapterClick(nextChapter.id);
    } else {
      console.log("This is the last chapter.");
      // Optionally show a course completion message
    }
  };

  // --- Calculate Total Duration ---
  const calculateTotalDuration = (chapters) => {
    if (!chapters || !Array.isArray(chapters)) return "00:00";

    let totalSeconds = 0;
    chapters.forEach((chapter) => {
      if (chapter.videos && chapter.videos.length > 0) {
        const videoObj = chapter.videos[0];
        // Parse duration from different formats
        const durationInSeconds = parseDuration(videoObj.duration);
        totalSeconds += durationInSeconds;
      }
    });

    // Format total duration
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // --- Load saved volume from localStorage ---
  useEffect(() => {
    const savedVolume = localStorage.getItem(VOLUME_PREFERENCE_KEY);
    if (savedVolume !== null && videoRef.current) {
      const parsedVolume = parseFloat(savedVolume);
      if (!isNaN(parsedVolume)) {
        videoRef.current.volume = parsedVolume;
        setVolume(parsedVolume);
        setIsMuted(parsedVolume === 0);
      }
    }
  }, []);

  // --- Render ---
  return (
    <div className="grid lg:grid-cols-5 gap-10" ref={playerContainerRef}>
      {/* Video Player Section */}
      <div className="lg:col-span-3 col-span-5">
        <div className="relative w-full max-w-2xl mx-auto">
          {/* Video Element Wrapper */}
          <div className="w-full relative bg-black rounded-2xl overflow-hidden">
            {(isVideoLoading || !videoSrc) && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                {videoSrc ? (
                  <div className="loader-spinner border-4 border-t-4 border-gray-200 h-12 w-12 rounded-full animate-spin border-t-blue-500"></div>
                ) : (
                  <p className="text-gray-400">Select a chapter</p>
                )}
              </div>
            )}
            {/* Actual Video Player */}
            <video
              key={videoSrc || "no-video"} // Force re-mount on src change
              className="w-full h-80 max-h-96 object-contain shadow rounded-2xl"
              ref={videoRef}
              src={videoSrc}
              poster={poster}
              controls={false}
              preload="metadata"
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
              onVolumeChange={handleVolumeChange}
              onWaiting={handleWaiting}
              onCanPlay={handleCanPlay}
              onError={handleError}
              onClick={togglePlay}
              onDoubleClick={toggleFullScreen}
            />
            {/* Replay Modal */}
            {showModal && (
              <div className="absolute w-full bottom-0 inset-0 flex items-center justify-center bg-[#00000083] bg-opacity-50 rounded-2xl z-20">
                <div className="!p-5 rounded-lg shadow-lg text-center">
                  <h4 className="text-white mb-4">Play again?</h4>
                  <div className="flex gap-4 justify-center">
                    <button
                      className="bg-green-tint text-white !px-4 !py-2 rounded hover:opacity-80"
                      onClick={replayVideo}
                    >
                      <RiReplyAllLine size={20} />
                    </button>
                    <button
                      className="bg-white text-red-500 !px-4 !py-2 rounded hover:opacity-80"
                      onClick={() => setShowModal(false)}
                    >
                      <RiArrowGoBackLine size={20} />
                    </button>
                    {currentChapterId !==
                      chapterName[chapterName.length - 1]?.id.toString() && (
                      <button
                        className="bg-green-tint text-white !px-4 !py-2 rounded hover:opacity-80"
                        onClick={findNextChapterAndNavigate}
                      >
                        Next Chapter
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* --- Custom Controls (Desktop) --- */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white p-3 !px-4 !py-3 transition-opacity duration-300 opacity-100 hover:opacity-100 ${
                playing && !isVideoLoading
                  ? "opacity-0 group-hover:opacity-100"
                  : ""
              } md:flex items-center justify-between hidden z-10`}
            >
              <div className="flex items-center gap-4">
                {/* Rewind Button */}
                <button
                  onClick={() => skipTime(-10)}
                  className="relative text-xl hover:text-gray-300"
                >
                  <RiResetLeftLine size={26} />
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
                    10
                  </span>
                </button>
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="text-xl hover:text-gray-300"
                >
                  {playing ? (
                    <PiPause
                      size={30}
                      className="bg-gray-500/70 !p-1.5 rounded-3xl"
                    />
                  ) : (
                    <PiPlayFill
                      size={30}
                      className="bg-gray-500/70 !p-1.5 rounded-3xl"
                    />
                  )}
                </button>
                {/* Forward Button */}
                <button
                  onClick={() => skipTime(10)}
                  className="relative text-xl hover:text-gray-300"
                >
                  <RiResetRightLine size={26} />
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
                    10
                  </span>
                </button>
              </div>
              {/* Time/Progress Bar */}
              <div className="flex items-center gap-2 w-1/2">
                <span className="text-sm font-medium w-12 text-right">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress || 0}
                  onChange={handleSeek}
                  ref={progressBarRef}
                  className="w-full cursor-pointer appearance-none h-1 rounded-lg progress-slider bg-gray-600"
                  style={{
                    background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
                    height: "5px",
                  }} // Style progress
                />
                <span className="text-sm font-medium w-10 text-left">
                  {formatTime(duration)}
                </span>
              </div>
              {/* Volume/Fullscreen */}
              <div className="flex items-center gap-3">
                {/* Volume Control */}
                <button
                  onClick={toggleMute}
                  className="text-xl hover:text-gray-300"
                >
                  {isMuted ? (
                    <RiVolumeMuteLine size={26} />
                  ) : volume < 0.5 ? (
                    <RiVolumeDownLine size={26} />
                  ) : (
                    <RiVolumeUpLine size={26} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume} // Show 0 if muted
                  onChange={handleVolume}
                  className="w-16 cursor-pointer appearance-none h-1 rounded-lg bg-gray-600"
                  style={{
                    background: `linear-gradient(to right, white ${
                      isMuted ? 0 : volume * 100
                    }%, gray ${isMuted ? 0 : volume * 100}%)`,
                    height: "5px",
                  }}
                />
                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullScreen}
                  className="relative text-xl hover:text-gray-300"
                >
                  {isFullscreen ? (
                    <RiFullscreenExitLine size={26} />
                  ) : (
                    <RiFullscreenLine size={26} />
                  )}
                </button>
              </div>
            </div>
            {/* --- Custom Controls (Mobile) --- */}
            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white p-2 !px-3 !py-2 transition-opacity duration-300 opacity-100 hover:opacity-100 ${
                playing ? "opacity-0 group-hover:opacity-100" : ""
              } flex items-center justify-between md:hidden z-10`}
            >
              {" "}
              {/* Added gradient + visibility logic */}
              {/* Left Controls (Play/Pause) */}
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="text-lg">
                  {playing ? (
                    <PiPause
                      size={26}
                      className="bg-gray-500/70 !p-1.5 rounded-3xl"
                    />
                  ) : (
                    <PiPlayFill
                      size={26}
                      className="bg-gray-500/70 !p-1.5 rounded-3xl"
                    />
                  )}
                </button>
              </div>
              {/* Center (Time/Progress) */}
              <div className="flex items-center gap-2 flex-grow mx-2">
                <span className="text-[10px] w-8 text-right">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full cursor-pointer appearance-none h-[3px] rounded-lg progress-slider bg-gray-600"
                  style={{
                    background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
                  }}
                />
                <span className="text-[10px] w-8 text-left">
                  {formatTime(duration)}
                </span>
              </div>
              {/* Right (Fullscreen) */}
              <div className="flex items-center gap-2">
                <button onClick={toggleFullScreen} className="relative text-lg">
                  {isFullscreen ? (
                    <RiFullscreenExitLine size={22} />
                  ) : (
                    <RiFullscreenLine size={22} />
                  )}
                </button>
              </div>
            </div>
          </div>{" "}
          {/* End Video Element Wrapper */}
        </div>{" "}
        {/* End Relative Container */}
        {/* Chapter Title and Actions */}
        <div className="!py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <h1 className="font-bebas !mt-1 w-full text-wrap text-xl md:text-2xl">
            {isChapterLoading
              ? "Loading..."
              : currentChapterDetails
              ? `Chapter ${currentChapterDetails.chapterNumber} - ${currentChapterDetails.title}`
              : "Chapter Not Found"}
          </h1>
          <div className="flex items-center w-full justify-between lg:justify-end gap-5 !py-3 md:!py-0">
            <PiHeart className="bg-white text-black rounded-2xl text-3xl !p-1.5 cursor-pointer hover:text-red-500" />
            <button
              className="flex items-center text-xs gap-2.5 py-1.5 rounded-full text-white font-semibold !p-2 !px-4 hover:scale-[1.02] transition"
              style={{
                boxShadow: "0px 7px 17.4px 0px #8B73FF80",
                backgroundImage:
                  "linear-gradient(86.82deg, #A6A1FE -0.48%, #4F45F0 98.98%)",
              }}
            >
              Mark as completed <PiCheckCircleBold />
            </button>
          </div>
        </div>
        <p className="text-gray-500">
          {isChapterLoading
            ? "Loading..."
            : currentChapterDetails?.description || "No description available."}
        </p>
      </div>{" "}
      {/* End Left Column */}
      {/* Chapters List Section */}
      <div className="lg:col-span-2 col-span-5 lg:-translate-y-5">
        {/* ... Chapter list rendering ... (no changes needed here from previous version) */}
        <h3 className="font-bebas text-2xl flex items-center gap-2.5 !pb-3">
          CHAPTERS{" "}
          <span className="bg-white !p-1 !px-2 rounded-xl text-lg">
            {chapterName?.length || 0}
          </span>
        </h3>
        <div className="space-y-4 bg-white w-full h-80 max-h-80 !p-5 rounded-2xl relative flex flex-col">
          <div className="overflow-y-auto overflow-x-hidden no-hide no-scrollbar flex-grow mb-12">
            {/* ... Mapping chapterName to ChapterCard ... */}
            {isChapterLoading ? (
              <p className="text-gray-500">Loading chapters...</p>
            ) : chapterName && chapterName.length > 0 ? (
              chapterName.map((chapter) => {
                if (!chapter || !chapter.id) return null;
                const chapterIdStr = chapter.id.toString();
                return (
                  <ChapterCard
                    key={chapter.id}
                    imgSrc={profile}
                    chapter={chapter.chapterNumber}
                    title={chapter.title}
                    time={chapter.videos?.[0]?.duration}
                    onClick={() => handleChapterClick(chapter.id)}
                    isActive={currentChapterId === chapterIdStr}
                    progress={chapterProgress}
                  />
                );
              })
            ) : (
              <p className="text-gray-500">No chapters available.</p>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 !p-5 bg-white rounded-b-2xl">
            <div className="flex justify-between w-full font-nueue font-bold text-lg gap-3.5 border-t pt-3">
              {" "}
              Total Time:{" "}
              <span className="text-grey-tint flex items-center gap-1 text-sm">
                {" "}
                <PiClock />{" "}
                {/* Make sure calculateTotalDuration parses time strings correctly */}{" "}
                {calculateTotalDuration(chapterName)}{" "}
              </span>{" "}
            </div>
          </div>
        </div>
      </div>{" "}
      {/* End Right Column */}
    </div> // End Grid Container
  );
};

export default CustomVideoPlayer;
