import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  PiCheckCircleBold,
  PiClock,
  PiHeart,
  PiHeartFill,
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
import ailink from "../../../assets/img/dashboards/teams/avatar2.jpg";
import axios from "axios";
import { toast } from "sonner";

// Base URL for the last watched API endpoint
const BASE_URL = "https://backend-5781.onrender.com/api/v1/last-watched";
const MAINURL = "https://backend-5781.onrender.com/api/v1/";

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
  // favourites

  const [isFavourite, setIsFavourite] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const [favouriteId, setFavouriteId] = useState("");

  const [test, setTest] = useState([]);
  useEffect(() => {
    try {
      // Fetch last watched data for the entire course

      const fetchText = async () => {
        const response = await axios.get(
          `${BASE_URL}/user?courseId=${courseId}`,
          {
            withCredentials: true,
          }
        );
        setTest(response.data.data);
      };
      fetchText();
    } catch (error) {
      console.error("Failed to fetch last watched data:", error);
    }
  }, [lessonId]);
  console.log("TEST FETCH", test);
  // --- Derived Data ---
  const currentChapterDetails = chapterName?.find(
    (chapter) => chapter.id.toString() === currentChapterId
  );
  const videoSrc = currentChapterDetails?.videos?.[0]?.videoURL;
  const videoId = currentChapterDetails?.videos?.[0]?.id;

  console.log("Current Chapter ID:", currentChapterId);
  console.log("Current Video ID:", videoId);
  console.log("Current Video Src:", videoSrc);
  console.log("progress", progress);
  console.log("currentTime", currentTime);
  console.log("duration", duration);
  console.log("Chapter progress", chapterProgress);
  console.log("completed chapters", completedChapters);
  console.log("last watched data", lastWatchedData);

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
  }, [
    courseId,
    chapterName,
    lessonId,
    navigate,
    updateLocalStorage,
    markChapterAsCompleted,
  ]);

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

  // // --- Effect to Apply Last Watched Time for Current Video ---

  useEffect(() => {
    if (!videoRef.current || !videoId || !test.length) return;

    const match = test.find((item) => item.videoId === videoId);
    const timestamp = match ? parseFloat(match.duration || 0) : 0;

    const applySeek = () => {
      const video = videoRef.current;
      if (!hasAppliedLastWatched.current && video && video.readyState >= 1) {
        video.currentTime = timestamp;
        setCurrentTime(timestamp);
        setProgress((timestamp / video.duration) * 100);
        hasAppliedLastWatched.current = true;
        console.log(`Seeked to last watched: ${timestamp}s`);
      } else if (!hasAppliedLastWatched.current) {
        setTimeout(applySeek, 100);
      }
    };

    const videoElement = videoRef.current;
    if (videoElement && videoElement.readyState >= 1) {
      applySeek();
    } else if (videoElement) {
      videoElement.addEventListener("loadedmetadata", applySeek);
      return () =>
        videoElement.removeEventListener("loadedmetadata", applySeek);
    }
  }, [test, videoId]);
  // --- Progress Save Logic ---
  const saveProgress = useCallback(() => {
    if (videoRef.current && videoId && courseId && !videoRef.current.seeking) {
      let timestamp = parseFloat(videoRef.current.currentTime.toFixed(2));
      const videoDuration = videoRef.current.duration;

      // If marking as completed, use the full duration
      if (markChapterAsCompleted) {
        timestamp = videoDuration;
      }

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
            // isChapterCompleted: markChapterAsCompleted,
            isChapterCompleted:
              markChapterAsCompleted || timestamp / videoDuration >= 0.95,
          },
          { withCredentials: true }
        )
        .then(() => {
          console.log(`Saved progress: ${timestamp} for video ${videoId}`);

          // Update localStorage with the most recent watched information
          updateLocalStorage(videoId, currentChapterId, timestamp);

          // Update the lastWatchedData state

          // Check if video is completed (95% or more)
          const completionPercentage = (timestamp / videoDuration) * 100;

          setLastWatchedData((prevData) => {
            if (!prevData)
              return [
                {
                  videoId,
                  courseId,
                  timestamp: String(timestamp),
                  isChapterCompleted: markChapterAsCompleted,
                },
              ];

            const updatedData = [...prevData];
            const existingIndex = updatedData.findIndex(
              (item) => item.videoId === videoId
            );

            if (existingIndex >= 0) {
              updatedData[existingIndex] = {
                ...updatedData[existingIndex],
                duration: String(timestamp),
                lastWatchedAt: new Date().toISOString(),
                isChapterCompleted:
                  markChapterAsCompleted || completionPercentage >= 95,
              };
            } else {
              updatedData.push({
                videoId,
                courseId,
                duration: String(timestamp),
                lastWatchedAt: new Date().toISOString(),
                isChapterCompleted:
                  markChapterAsCompleted || completionPercentage >= 95,
              });
            }

            return updatedData;
          });
          // Update the chapter progress state
          setChapterProgress((prevProgress) => {
            const newProgress = { ...prevProgress };
            const completionPercentage = (timestamp / videoDuration) * 100;

            newProgress[currentChapterId] = {
              progress: markChapterAsCompleted ? 100 : completionPercentage,
              timestamp: timestamp,
              videoId: videoId,
              lastWatchedAt: new Date().toISOString(),
              isCompleted: completionPercentage >= 95 || markChapterAsCompleted,
            };

            return newProgress;
          });

          if (
            completionPercentage >= 95 &&
            !completedChapters.includes(currentChapterId)
          ) {
            setCompletedChapters((prev) => [...prev, currentChapterId]);
          }
          // Reset the markChapterAsCompleted flag after successful save
          if (markChapterAsCompleted) {
            setMarkasCompleted(false);
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
    if (currentChapterId && videoRef.current) {
      setCompletedChapters((prev) =>
        prev.includes(currentChapterId) ? prev : [...prev, currentChapterId]
      );
      setMarkasCompleted(true);

      setProgress(100);
      setChapterProgress((prevProgress) => {
        const newProgress = { ...prevProgress };
        newProgress[currentChapterId] = {
          ...newProgress[currentChapterId],
          progress: 100,
          isCompleted: true,
        };
        return newProgress;
      });

      if (videoRef.current && videoId) {
        setTest((prevTest) => {
          return prevTest.map((item) => {
            if (item.videoId === videoId) {
              return {
                ...item,
                duration: String(videoRef.current.duration || 0),
                isChapterCompleted: true,
              };
            }
            return item;
          });
        });
      }

      saveProgress();

      toast.success("Chapter marked as completed!");
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
      setShowModal(false);
    } else {
      console.log("This is the last chapter.");
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

  // favourites
  // Fetch favourites on mount
  useEffect(() => {
    const fetchFavouriteStatus = async () => {
      if (!lessonId || !courseId) return;
      try {
        const res = await axios.get(
          `${MAINURL}favourites/user?chapterId=${lessonId}&courseId=${courseId}`,
          { withCredentials: true }
        );
        console.log("fav res", res);
        if (res.status === 200) {
          setIsFavourite(true);
          setFavouriteId(res.data.data[0].id);
          setFavourites(res.data.data[0]);
        } else {
          setIsFavourite(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setIsFavourite(false); // Not favourited
        } else {
          console.error("Error fetching favourite status:", error);
        }
      }
    };
    fetchFavouriteStatus();
  }, [lessonId, courseId]);

  // Update isFavourite when favourites or chapter changes
  useEffect(() => {
    if (favourites.length && lessonId) {
      const isFav = favourites.some((fav) => fav.lessonId === lessonId);
      setIsFavourite(isFav);
    }
  }, [favourites, lessonId]);

  // Toggle favourite state
  const handleFavouriteClick = async () => {
    if (!lessonId || !courseId) return;
    try {
      if (!isFavourite) {
        // Add to favourites
        const res = await axios.post(
          `${MAINURL}favourites/create`,
          { chapterId: lessonId, courseId },
          { withCredentials: true }
        );
        setIsFavourite(true);
        toast.success(res?.data?.message || "Added to favourites");
      } else {
        // Remove from favourites
        const res = await axios.post(
          `${MAINURL}favourites/delete`,
          { chapterId: lessonId, courseId, favouriteId },
          { withCredentials: true }
        );
        setIsFavourite(false);
        toast.success(res?.data?.message || "Removed from favourites");
      }
    } catch (err) {
      console.error("Error updating favourite status:", err);
    }
  };
  console.log("favour", favourites);
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
            <div
              className={`bg-white text-black rounded-2xl text-2xl !p-1.5 cursor-pointer hover:text-red-500 transition-transform duration-200 ${
                isFavourite ? "scale-110 text-red-500" : "hover:scale-105"
              }`}
              onClick={handleFavouriteClick}
            >
              {isFavourite ? <PiHeartFill /> : <PiHeart />}
            </div>

            <button
              onClick={markChapterCompleted}
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
                const matchingData = test.find(
                  (item) => item.videoId === chapter.videos?.[0]?.id
                );

                const videoDuration = parseDuration(
                  chapter.videos?.[0]?.duration
                );
                const watchedDuration = parseFloat(matchingData?.duration || 0);

                console.log("watched duration", watchedDuration);
                console.log("video duration", videoDuration);

                const progressPercent = videoDuration
                  ? Math.min(100, (watchedDuration / videoDuration) * 100)
                  : 0;

                console.log("progress percent", progressPercent);
                return (
                  <ChapterCard
                    key={chapter.id}
                    imgSrc={profile}
                    chapter={chapter.chapterNumber}
                    title={chapter.title}
                    time={chapter.videos?.[0]?.duration}
                    onClick={() => handleChapterClick(chapter.id)}
                    isActive={currentChapterId === chapterIdStr}
                    // progress={chapterProgress[chapterIdStr]?.progress || 0}
                    progress={progressPercent}
                  />
                );
              })
            ) : (
              <p className="text-gray-500">No chapters available.</p>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 !p-5 bg-white rounded-b-2xl">
            <div className="flex justify-between w-full font-nueue font-bold text-lg gap-3.5 border-t border-gray-300 pt-3">
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
        <div className="p-5 bg-white my-4 rounded-3xl flex gap-5 items-center text-green-tint ">
          <img
            src={ailink}
            alt=""
            className="w-20 h-20 object-cover rounded-full"
          />
          <div>
            <p>Now lets practice with our Ai coach</p>
            <a href="https://labs.heygen.com/interactive-avatar/share?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJKdW5lX0hSX3B1YmxpYyIsInByZXZpZXdJ%0D%0AbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzc0NDQ3YTI3ODU5YTQ1NmM5%0D%0ANTVlMDFmMjFlZjE4MjE2XzQ1NjIwL3ByZXZpZXdfdGFsa18xLndlYnAiLCJuZWVkUmVtb3ZlQmFj%0D%0Aa2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjY1NTU0ODQ0ZWJhYzQ5N2Q5NGNhNTQz%0D%0AZmI5YmFhYzRhIiwidXNlcm5hbWUiOiI0MDA1MWMzMTE3MjM0MTMxYjM2MDA3NzkyYjhiMmY1YiJ9">
              Click here
            </a>
          </div>
        </div>
      </div>{" "}
      {/* End Right Column */}
    </div> // End Grid Container
  );
};

export default CustomVideoPlayer;
