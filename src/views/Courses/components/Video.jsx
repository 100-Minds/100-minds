import React, { useRef, useState, useEffect } from "react";
import {
  PiPause,
  PiPlayFill,
  PiCheckCircleBold,
  PiHeart,
  PiClock,
} from "react-icons/pi";
import video from "../../../assets/img/dashboards/profile-image.jpg";
import vid from "../../../assets/img/dashboards/vid.mp4";
import {
  RiResetLeftLine,
  RiResetRightLine,
  RiVolumeUpLine,
} from "react-icons/ri";
import ChapterCard from "./ChapterCard";
import profile from "../../../assets/img/dashboards/profile-image.jpg";
import TabComponent from "./TabComponent";
import ProgressBar from "./ProgressBar";

const CustomVideoPlayer = ({ src, poster }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const updateCurrentTime = () => {
        setCurrentTime(formatTime(video.currentTime));
      };

      video.addEventListener("timeupdate", updateCurrentTime);

      return () => video.removeEventListener("timeupdate", updateCurrentTime);
    }
  }, []);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  // Replay video
  const replayVideo = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setPlaying(true);
  };

  // Update progress bar
  const handleProgress = () => {
    const video = videoRef.current;
    if (video) {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
      setCurrentTime(formatTime(video.currentTime));
    }
  };

  // Seek video position
  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  // Adjust volume
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

  const chapters = [
    { imgSrc: profile, chapter: 1, time: "34:55", progress: 60 },
    { imgSrc: profile, chapter: 2, time: "30:20", progress: 40 },
    { imgSrc: profile, chapter: 3, time: "28:10", progress: 80 },
    { imgSrc: profile, chapter: 4, time: "45:00", progress: 20 },
  ];

  return (
    <div className="grid lg:grid-cols-5 gap-10">
      <div className="lg:col-span-3  col-span-5">
        <div className="relative w-full max-w-2xl mx-auto ">
          <div className="!pb-6">
            <ProgressBar percentage={50} />
          </div>
          {/* Video Element */}
          <video
            ref={videoRef}
            src={vid}
            poster={video}
            onTimeUpdate={handleProgress}
            className="w-full rounded-lg"
          ></video>

          {/* Custom Controls Dock */}
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
          <h1 className="font-bebas !mt-1 text-nowrap">
            Chapter 1 - the beginners guide
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
        <p className="text-gray-500">
          In this mini-course, learners will build a basic interactive web game
          using HTML, CSS, and JavaScript. The goal is to introduce fundamental
          web development concepts while creating something fun and interactive.
        </p>
      </div>
      <div className="lg:col-span-2 col-span-5">
        <h3 className="font-bebas text-2xl flex items-center gap-2.5 !pb-3">
          CHAPTERS{" "}
          <span className="bg-white !p-1 !px-2 rounded-xl text-lg">6</span>
        </h3>
        <div className="space-y-4 bg-white !p-5 rounded-2xl ">
          {chapters.map((item, index) => (
            <ChapterCard key={index} {...item} />
          ))}

          <div className="flex justify-between font-nueue font-bold text-lg !my-4 !mt-8">
            Total Time:{" "}
            <span className="text-grey-tint flex items-center gap-1 text-sm">
              <PiClock /> 54:32 Mins
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
