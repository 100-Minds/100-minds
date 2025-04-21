import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PiTrophy, PiMedal, PiStar, PiBookOpen, PiClock } from "react-icons/pi";
import coin1 from "../../../assets/img/dashboards/quiz/confetti.gif";
import confetti from "../../../assets/img/dashboards/quiz/coins1.png";
import challengeImage from "../../../assets/img/dashboards/quiz/question.gif";
import QuizQuestion from "./QuizQuestion";
import { useAuth } from "../../../context/AuthContext";

const Quiz = () => {
  const { courseId, lessonId } = useParams();
  const { getQuizScore, loading } = useAuth();
  const [quizScore, setQuizScore] = useState(null);
  const [error, setError] = useState(null);
  const [quizStats, setQuizStats] = useState({
    correct: 0,
    incorrect: 0,
    total: 0,
    timeSpent: "0:00",
  });
  const [isReviewing, setIsReviewing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizScore = async () => {
      try {
        const data = await getQuizScore(lessonId);
        const scoreData = data.data[0] || null;
        setQuizScore(scoreData);
        setError(null);

        if (scoreData?.quiz) {
          const total = scoreData.quiz.length;
          const correct = Math.round((scoreData.score / 100) * total);
          const incorrect = total - correct;
          const timeSpent = scoreData.timeSpent || "2:45";

          setQuizStats({ correct, incorrect, total, timeSpent });
        }
      } catch (error) {
        console.error("Error fetching quiz score:", error);

        setError(error);
        setQuizScore(null);
      }
    };

    fetchQuizScore();
  }, [lessonId, getQuizScore]);

  // Determine if we have a valid quiz score
  const hasQuizScore =
    quizScore !== null && typeof quizScore?.score === "number";

  // Determine performance level
  const getPerformanceLevel = (score) => {
    if (score >= 90) return { label: "Excellent!", color: "#4CAF50" };
    if (score >= 75) return { label: "Great Job!", color: "#8BC34A" };
    if (score >= 60) return { label: "Good Work!", color: "#FFC107" };
    if (score >= 40) return { label: "Keep Trying!", color: "#FF9800" };
    return { label: "Need Practice", color: "#F44336" };
  };

  const performance = hasQuizScore
    ? getPerformanceLevel(quizScore.score)
    : { label: "", color: "#3B82F6" };

  console.log("quiz score", quizScore);
  // If there's an error (like 404) or no quiz score, show the quiz questions
  if (quizScore === null || isReviewing) {
    return (
      <div className="bg-white !p-6 lg:!p-8 min-h-96 w-full rounded-3xl overflow-hidden flex flex-col justify-center items-center relative font-nueue">
        <div className="w-full p-6 my-8 rounded-3xl relative z-10">
          <QuizQuestion
            isReviewing={isReviewing}
            quizData={quizScore?.quiz}
            submittedAnswers={quizScore?.answers}
            // You might need a callback here if QuizQuestion needs to tell Quiz
            // when the review is finished to go back to the results screen.
            onReviewComplete={() => setIsReviewing(false)}
          />
        </div>
      </div>
    );
  }
  const handleReviewClick = () => {
    setIsReviewing(true);
  };
  const handleNextLessonClick = () => {
    const videoUrl = `/courses/${courseId}/lessons/${lessonId}?tab=video`;
    navigate(videoUrl);
  };

  // Otherwise, show the quiz results
  return (
    <div className="bg-white !p-6 lg:!p-8 min-h-96 w-full rounded-3xl overflow-hidden flex flex-col justify-center items-center relative font-nueue">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {quizScore.score >= 75 && (
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            {/* Confetti image here if needed */}
          </div>
        )}
      </div>

      <div className="text-center w-full flex flex-col items-center gap-6 z-10 py-4 font-nueue">
        <div className="relative flex flex-col items-center">
          <h2 className="text-3xl font-bold text-green-tint">
            Quiz Results 🏆
          </h2>
          <p className="text-gray-600 mt-2">
            You've completed the quiz for this lesson!
          </p>
        </div>

        {/* Score Display */}
        <div className="w-full max-w-sm">
          <div className="relative h-48 w-48 mx-auto">
            <CircularProgressbar
              value={quizScore?.score}
              circleRatio={0.75}
              styles={buildStyles({
                rotation: 1 / 2 + 1 / 8,
                strokeLinecap: "round",
                trailColor: "#eee",
                pathColor: performance.color,
              })}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">
                {quizScore?.score}%
              </span>
              <span className="text-sm font-medium text-gray-600">
                {performance?.label}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
            <div className="bg-[#5099993d] p-2 rounded-full mb-2">
              <PiStar className="text-green-tint text-xl" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              {quizStats.correct}
            </span>
            <span className="text-sm text-gray-600">Correct Answers</span>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
            <div className="bg-red-100 p-2 rounded-full mb-2">
              <PiBookOpen className="text-red-600 text-xl" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              {quizStats.incorrect}
            </span>
            <span className="text-sm text-gray-600">Incorrect Answers</span>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
            <div className="bg-[#5099993d] p-2 rounded-full mb-2">
              <PiClock className="text-green-tint text-xl" />
            </div>
            <span className="text-2xl font-bold text-gray-800">
              {quizStats.timeSpent}
            </span>
            <span className="text-sm text-gray-600">Time Spent</span>
          </div>
        </div>

        {/* Feedback & Next Steps */}
        <div className="mt-6 bg-[#50999915] p-5 rounded-2xl w-full max-w-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center justify-center !text-center ">
            <PiTrophy className="mr-2 text-green-tint" />
            Your Performance
          </h3>
          <p className="text-gray-700">
            {quizScore?.score >= 80
              ? "Amazing work! You've mastered this lesson's content. Ready for the next challenge?"
              : quizScore?.score >= 60
              ? "Good job! You've understood most concepts, but there's still room to improve."
              : "You're making progress! Consider revisiting the lesson material to strengthen your understanding."}
          </p>

          <div className="mt-4 flex justify-center gap-4">
            <button
              className="px-5 py-2 text-green-tint rounded-full shadow-md hover:opacity-85 transition-colors"
              onClick={handleReviewClick}
            >
              Review Lesson
            </button>
            {/* <Link
              to={`/courses/${courseId}/lessons/${lessonId}`}
              className="px-5 py-2 bg-green-tint text-white rounded-full shadow-md hover:opacity-85 transition-colors"
            >
              Next Lesson
            </Link> */}
            <button // Use a button instead of Link
              onClick={handleNextLessonClick}
              className="px-5 py-2 bg-green-tint text-white rounded-full shadow-md hover:opacity-85 transition-colors"
            >
              Next Lesson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
