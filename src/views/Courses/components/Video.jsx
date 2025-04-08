import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import video from "../../../assets/img/dashboards/profile-image.jpg";
import profile from "../../../assets/img/dashboards/profile-image.jpg";
import {
  PiCheckCircleBold,
  PiClock,
  PiHeart,
  PiPause,
  PiPlayFill,
} from "react-icons/pi";
import ProgressBar from "./ProgressBar";
import ChapterCard from "./ChapterCard";
import {
  RiArrowGoBackLine,
  RiFullscreenLine,
  RiReplyAllFill,
  RiReplyAllLine,
  RiResetLeftLine,
  RiResetRightLine,
  RiVolumeUpLine,
} from "react-icons/ri";

const BASE_URL = "https://backend-5781.onrender.com/api/v1/last-watched";

const CustomVideoPlayer = ({ src, poster }) => {
  const { loading } = useAuth();
  const videoRef = useRef(null);
  const { courseId, lessonId } = useParams();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [lastWatched, setLastWatched] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const actualLesson = currentLesson?.lesson;
  console.log("actual less", actualLesson);
  // Get current lesson from session storage
  useEffect(() => {
    const storedLesson = sessionStorage.getItem("currentLesson");
    if (storedLesson) {
      const parsedLesson = JSON.parse(storedLesson);
      setCurrentLesson(parsedLesson);

      const storedVideoId = parsedLesson?.lesson?.videos[0]?.id;
      console.log("stored videoId", storedVideoId);
      if (storedVideoId) {
        setVideoId(storedVideoId);
      }
    }
  }, [lessonId]);

  // Fetch last watched timestamp from API
  useEffect(() => {
    if (videoId && courseId) {
      axios
        .get(`${BASE_URL}/user?courseId=${courseId}`, { withCredentials: true })
        .then((response) => {
          console.log("API Response:", response.data);

          if (response.data && response.data.data.length > 0) {
            const lastWatchedDuration = parseFloat(
              response.data.data[0].duration
            );

            if (!isNaN(lastWatchedDuration) && lastWatchedDuration > 0) {
              setLastWatched(lastWatchedDuration);
            } else {
              console.warn("Valid duration not found, keeping previous value.");
            }
          } else {
            console.warn("No last watched data found.");
          }
        })
        .catch((error) => console.error("Error fetching last watched:", error));
    }
  }, [videoId, courseId]);

  useEffect(() => {
    if (videoRef.current && lastWatched > 0) {
      videoRef.current.currentTime = lastWatched;
    }
  }, [lastWatched]);
  // Set last watched time once metadata is loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log("Adding loadedmetadata event listener...");

    const handleLoadedMetadata = () => {
      if (lastWatched !== null && lastWatched > 0) {
        console.log(
          `Setting video currentTime to last watched: ${videoId}`,
          lastWatched
        );
        video.currentTime = lastWatched;
      } else {
        console.log("No last watched timestamp found, starting from 0.");
        video.currentTime = 0;
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [lastWatched]);

  // Save last watched timestamp every 10 seconds
  useEffect(() => {
    if (videoId && courseId) {
      let interval;

      const saveProgress = () => {
        if (videoRef.current) {
          const timestamp = parseFloat(videoRef.current.currentTime.toFixed(2));

          if (timestamp === 0) {
            console.warn("Skipping save: Timestamp is zero.");
            return;
          }

          console.log("Saving timestamp:", timestamp);

          axios
            .post(
              `${BASE_URL}/create`,
              { videoId, courseId, duration: String(timestamp) },
              { withCredentials: true }
            )
            .then(() =>
              console.log(
                `Successfully saved timestamp for videoId: ${videoId}`,
                timestamp
              )
            )
            .catch((error) =>
              console.error("Error saving last watched:", error)
            );
        }
      };

      interval = setInterval(saveProgress, 5000); // Save every 15 seconds

      return () => clearInterval(interval);
    }
  }, [videoId, courseId]);

  // Save last watched timestamp before page unload
  useEffect(() => {
    const handleBeforeUnload = () => saveLastWatched();

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      saveLastWatched();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [videoId, courseId]);

  // Save last watched function
  const saveLastWatched = () => {
    if (videoRef.current && videoId && courseId) {
      const timestamp = parseFloat(videoRef.current.currentTime.toFixed(2));

      console.log(
        `Saving last watched before unload: with video id ${videoId}`,
        timestamp,
        "for videoId:",
        videoId
      );

      axios
        .post(
          `${BASE_URL}/create`,
          { videoId, courseId, duration: String(timestamp) },
          { withCredentials: true }
        )
        .then(() =>
          console.log(
            `Successfully saved last watched on unload: ${videoId}`,
            timestamp
          )
        )
        .catch((error) =>
          console.error(
            "Error saving last watched on unload:",
            error.response?.data || error
          )
        );
    }
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const replayVideo = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setPlaying(true);
    setShowModal(false);
  };

  // const handleProgress = () => {
  //   if (videoRef.current) {
  //     const progress =
  //       (videoRef.current.currentTime / videoRef.current.duration) * 100;
  //     setProgress(progress);
  //     setCurrentTime(formatTime(videoRef.current.currentTime));
  //   }
  // };

  const handleProgress = () => {
    const video = videoRef.current;
    if (video && video.duration > 0) {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
      setCurrentTime(formatTime(video.currentTime));
    }
  };
  console.log("handles progress", progress);
  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(e.target.value);
    setCurrentTime(newTime);
  };

  const handleVolume = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const skipTime = (seconds) => {
    videoRef.current.currentTime += seconds;
    setProgress(
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    );
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const updateDuration = () => {
    setDuration(formatTime(videoRef.current.duration));
  };
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      const updateProgress = () => {
        const progress = (video.currentTime / video.duration) * 100;
        setProgress(progress);
        setCurrentTime(formatTime(video.currentTime));
      };

      video.addEventListener("timeupdate", updateProgress);

      return () => {
        video.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      const handleVideoEnd = () => {
        video.load(); // This reloads the video, making the poster show up again
        setPlaying(false);
        setShowModal(true);
      };

      video.addEventListener("ended", handleVideoEnd);

      return () => {
        video.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, []);
  if (!currentLesson) {
    return <p>Loading lesson...</p>;
  }
  const handleVideoEnd = () => {
    setPlaying(false); // Ensure video stops
    setShowModal(true); // Show the modal
  };
  const chapters = [
    { imgSrc: profile, chapter: 1, time: "34:55", progress: 60 },
    { imgSrc: profile, chapter: 2, time: "30:20", progress: 40 },
    { imgSrc: profile, chapter: 3, time: "28:10", progress: 80 },
    { imgSrc: profile, chapter: 4, time: "45:00", progress: 20 },
  ];

  const calculateTotalDuration = (videos) => {
    if (!videos || videos.length === 0) return "00:00";

    let totalSeconds = videos.reduce((sum, video) => {
      const [minutes, seconds] = video.duration.split(":").map(Number);
      return sum + minutes * 60 + seconds;
    }, 0);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds} Mins`;
  };
  // const calculateProgress = (duration, lastWatched) => {
  //   if (!duration || !lastWatched) return 0;

  //   const [minutes, seconds] = duration.split(":").map(Number);
  //   const totalDurationSeconds = minutes * 60 + seconds;

  //   if (totalDurationSeconds === 0) return 0; // Avoid division by zero

  //   const progress = (lastWatched / totalDurationSeconds) * 100;
  //   return Math.min(progress, 100).toFixed(2); // Ensure it doesn't exceed 100%
  // };

  const calculateProgress = (duration, lastWatched) => {
    if (!duration || lastWatched === null) return 0;

    // Split the duration into hours, minutes, and seconds
    const [hours, minutes, seconds] = duration.split(":").map(Number);

    // Convert total duration into seconds
    const totalDurationSeconds = hours * 3600 + minutes * 60 + seconds;

    console.log("hours", hours);
    console.log("minutes", minutes);
    console.log("totalDurationSeconds", totalDurationSeconds);

    // Return 0 if the total duration is 0
    if (totalDurationSeconds === 0) return 0;

    // Calculate the progress percentage
    const progress = (lastWatched / totalDurationSeconds) * 100;

    return Math.min(progress, 100).toFixed(2); // Ensure the progress doesn't exceed 100%
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  return (
    <div className="grid lg:grid-cols-5 gap-10">
      <div className="lg:col-span-3  col-span-5">
        <div className="relative w-full max-w-2xl mx-auto ">
          <div className="!pb-6">
            <ProgressBar percentage={50} />
          </div>
          {/* Video Element */}

          <div className="w-full relative">
            <video
              className="w-full h-72 object-cover rounded-2xl"
              ref={videoRef}
              src={src || actualLesson?.videos[0]?.videoURL}
              poster={poster}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onTimeUpdate={(e) => {
                updateDuration();
                setCurrentTime((e.target.currentTime / 100).toFixed(2));
                handleProgress();
              }}
              onLoadedMetadata={(e) =>
                setDuration((e.target.duration / 100).toFixed(2))
              }
              onVolumeChange={(e) => setVolume(e.target.volume)}
              onEnded={handleVideoEnd}
            ></video>

            {showModal && (
              <div className="absolute w-full  bottom-0 inset-0 flex items-center justify-center bg-[#00000083] bg-opacity-50 rounded-2xl">
                <div className=" !p-5 rounded-lg shadow-lg text-center">
                  <div className="flex gap-4 justify-center">
                    <button
                      className="bg-green-tint text-white !px-4 !py-2 rounded"
                      onClick={replayVideo}
                    >
                      <RiReplyAllLine />
                    </button>
                    <button
                      className="bg-white text-red-500 !px-4 !py-2 rounded"
                      onClick={() => setShowModal(false)}
                    >
                      <RiArrowGoBackLine />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-black/70 text-white p-3 !px-4 !py-3 rounded-2xl md:flex items-center justify-between hidden">
            <div className="flex items-center gap-4">
              <button
                onClick={() => skipTime(-10)}
                className="relative text-xl"
              >
                <RiResetLeftLine size={26} />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
                  10
                </span>
              </button>

              <button onClick={togglePlay} className="text-xl">
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

              <button onClick={() => skipTime(10)} className="relative text-xl">
                <RiResetRightLine size={26} />
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">
                  10
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2 w-1/2">
              <span className="text-sm">{currentTime}</span>

              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                onClick={handleProgress}
                className="w-1/2 cursor-pointer appearance-none h-1 rounded-lg progress-slider"
                style={{
                  background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
                  height: "4px",
                  borderRadius: "10px",
                }}
              />
              <span className="text-sm">{duration}</span>
            </div>

            {/* Right Volume Control */}
            <div className="flex items-center gap-2 ">
              <button onClick={toggleFullScreen} className="relative text-xl">
                <RiFullscreenLine size={26} />
              </button>
              <RiVolumeUpLine className="text-xl" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolume}
                className="w-16 cursor-pointer !appearance-none bg-gray-300 h-1 rounded-lg"
                style={{
                  background: `linear-gradient(to right, white ${
                    volume * 100
                  }%, gray ${volume * 100}%)`,
                  height: "4px",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] bg-black/70 text-white p-2 md:p-3 !px-3 md:!px-4 !py-2 md:!py-3 rounded-2xl flex items-center justify-between text-xs md:text-base md:hidden">
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={() => skipTime(-10)}
                className="relative text-lg md:text-xl"
              >
                <RiResetLeftLine size={22} className="md:size-26" />
                <span className="absolute inset-0 flex items-center justify-center text-[6px] md:text-[8px] font-bold text-white">
                  10
                </span>
              </button>

              <button onClick={togglePlay} className="text-lg md:text-xl">
                {playing ? (
                  <PiPause
                    size={24}
                    className="bg-gray-500/70 !p-1 md:!p-1.5 rounded-3xl"
                  />
                ) : (
                  <PiPlayFill
                    size={24}
                    className="bg-gray-500/70 !p-1 md:!p-1.5 rounded-3xl"
                  />
                )}
              </button>

              <button
                onClick={() => skipTime(10)}
                className="relative text-lg md:text-xl"
              >
                <RiResetRightLine size={22} className="md:size-26" />
                <span className="absolute inset-0 flex items-center justify-center text-[6px] md:text-[8px] font-bold text-white">
                  10
                </span>
              </button>
            </div>

            <div className="flex items-center gap-1 md:gap-2 w-1/3 md:w-1/2">
              <span className="text-[10px] md:text-sm">{currentTime}</span>

              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-1/3 md:w-1/2 cursor-pointer appearance-none h-[2px] md:h-1 rounded-lg progress-slider"
                style={{
                  background: `linear-gradient(to right, white ${progress}%, gray ${progress}%)`,
                  height: "3px",
                  borderRadius: "10px",
                }}
              />
              <span className="text-[10px] md:text-sm">{duration}</span>
            </div>

            {/* Right Volume Control */}
            <div className="hidden md:flex items-center gap-2">
              <RiVolumeUpLine className="text-lg md:text-xl" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolume}
                className="w-12 md:w-16 cursor-pointer !appearance-none bg-gray-300 h-[2px] md:h-1 rounded-lg"
                style={{
                  background: `linear-gradient(to right, white ${
                    volume * 100
                  }%, gray ${volume * 100}%)`,
                  height: "3px",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="!py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <h1 className="font-bebas !mt-1 w-full  text-wrap">
            Chapter {actualLesson?.chapterNumber} - {actualLesson.title}{" "}
          </h1>
          <div className=" flex items-center w-full  justify-between lg:justify-end gap-5 !py-3 md:!py-0 ">
            <PiHeart className="bg-white text-black  rounded-2xl text-3xl !p-1.5" />
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
        <p className="text-gray-500">{actualLesson?.description}</p>
      </div>
      <div className="lg:col-span-2 col-span-5 lg:-translate-y-5">
        <h3 className="font-bebas text-2xl flex items-center gap-2.5 !pb-3">
          CHAPTERS{" "}
          <span className="bg-white !p-1 !px-2 rounded-xl text-lg">
            {actualLesson?.chapterNumber}
          </span>
        </h3>
        {/* <div className="space-y-4 bg-white !p-5 rounded-2xl ">
          {chapters.map((item, index) => (
            <ChapterCard key={index} {...item} />
          ))}

          <div className="flex justify-between font-nueue font-bold text-lg !my-4 !mt-8">
            Total Time:{" "}
            <span className="text-grey-tint flex items-center gap-1 text-sm">
              <PiClock /> 54:32 Mins
            </span>
          </div>
        </div> */}

        <div className="space-y-4 bg-white lg:min-h-72 flex flex-col justify-between !p-5 rounded-2xl ">
          {actualLesson?.videos && actualLesson.videos.length > 0 ? (
            actualLesson.videos.map((video, index) => {
              const progress = calculateProgress(video.duration, lastWatched);
              console.log("video in progresssss", video.duration);
              console.log("calculateProgress lastwatched", lastWatched);
              return (
                <ChapterCard
                  key={video.id} // Unique key
                  imgSrc={profile} // Thumbnail or placeholder
                  chapter={actualLesson.chapterNumber}
                  time={video.duration} // Use actual video duration
                  progress={progress} // Dynamically calculated progress
                />
              );
            })
          ) : (
            <p className="text-gray-500">
              No videos available for this lesson.
            </p>
          )}

          <div className="flex justify-between font-nueue font-bold text-lg !my-4 !mt-8">
            Total Time:{" "}
            <span className="text-grey-tint flex items-center gap-1 text-sm">
              <PiClock /> {calculateTotalDuration(actualLesson?.videos)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
