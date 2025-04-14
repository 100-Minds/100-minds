// // import { useEffect, useState } from "react";
// // import coin1 from "../../../assets/img/dashboards/quiz/coins1.png";
// // import { useAuth } from "../../../context/AuthContext";
// // import ProgressBar from "./ProgressBar";
// // import QuizQuestion from "./QuizQuestion";
// // import { useParams } from "react-router-dom";

// // const Quiz = () => {
// //   const { courseId, lessonId } = useParams();
// //   const { getQuizScore, loading } = useAuth();
// //   const [quizScore, setQuizScore] = useState([]);

// //   useEffect(() => {
// //     if (courseId) {
// //       getQuizScore(lessonId).then((data) => {
// //         setQuizScore(data?.data[0]?.quiz || []);
// //         setQuizScore(data?.data[0]);
// //       });
// //     }
// //   }, [lessonId]);
// //   console.log("quiz scorzzz", quizScore);

// //   return (
// //     <div className="bg-white !p-4 lg:!px-10 min-h-96 w-full rounded-3xl overflow-clip flex flex-col justify-center items-center relative">
// //       {/* <div className="flex justify-center items-center  !py-7 ">
// //         <div className="absolute w-1/4  h-50 -top-10 -left-10">
// //           <img src={coin1} alt="" className="w-full  h-full object-cover" />
// //         </div>
// //         <div className="flex flex-col justify-center items-center font-nueue">
// //           <h1 className="font-bebas lg:text-3xl !pb-2"> QUIZ 💎</h1>
// //           <p className="text-center w-[55%] tracking-tight">
// //             Step into the exhilarating world of CryptoMineQuest, where your
// //             knowledge is the key to unlocking treasures in the blockchain
// //             universe! 💎
// //           </p>
// //           <div className="flex items-center gap-2.5 !pt-3">
// //             <p className="bg-whitish !p-1 !px-2 rounded-xl text-sm">Beginner</p>
// //             <p className="text-sm">Intermediate</p>
// //             <p className="text-sm">Expert</p>
// //           </div>
// //         </div>
// //         <div className="absolute -top-10 right-0 w-1/3 h-84 ">
// //           <img src={coin1} alt="" className="w-full  h-full object-cover" />
// //         </div>
// //       </div>
// //       <div className="w-2/3">
// //         <ProgressBar percentage={70} />
// //       </div> */}
// //       <div className=" w-full !p-6 !my-8 rounded-3xl relative z-10">
// //         <QuizQuestion />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Quiz;

// import { useEffect, useState } from "react";
// import coin1 from "../../../assets/img/dashboards/quiz/coins1.png";
// import { useAuth } from "../../../context/AuthContext";
// import ProgressBar from "./ProgressBar";
// import QuizQuestion from "./QuizQuestion";
// import { useParams } from "react-router-dom";
// import SegmentedProgressBars from "../../dashboard/components/SegmentedProgressBars";

// const Quiz = () => {
//   const { courseId, lessonId } = useParams();
//   const { getQuizScore, loading } = useAuth();
//   const [quizScore, setQuizScore] = useState(null);

//   useEffect(() => {
//     getQuizScore(lessonId).then((data) => {
//       setQuizScore(data.data[0] || null);
//       console.log("dataz", data.data[0]);
//     });
//   }, [lessonId]);

//   const hasQuizScore = quizScore?.score && quizScore?.score >= 0;
//   console.log("has quiz", hasQuizScore);
//   console.log(quizScore?.quiz);
//   console.log(quizScore);

//   return (
//     <div className="bg-white !p-4 lg:!px-10 min-h-96 w-full rounded-3xl overflow-clip flex flex-col justify-center items-center relative">
//       {hasQuizScore ? (
//         <div className="text-center w-full flex flex-col items-center gap-6">
//           <h2 className="text-3xl font-bold text-primary">Quiz Results 💎</h2>
//           <p className="text-gray-700 w-full md:w-2/3 text-center">
//             You’ve completed the quiz for this lesson! Here’s how you did:
//           </p>
//           <SegmentedProgressBars />
//           <span className="text-primary text-4xl font-semibold -translate-y-7 ">
//             {quizScore.score ?? "N/A"}%
//           </span>
//         </div>
//       ) : (
//         <div className="w-full !p-6 !my-8 rounded-3xl relative z-10">
//           <QuizQuestion />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;

// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";

// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { PiTrophy, PiMedal, PiStar, PiBookOpen, PiClock } from "react-icons/pi";
// import coin1 from "../../../assets/img/dashboards/quiz/confetti.gif";
// import confetti from "../../../assets/img/dashboards/quiz/coins1.png"; // This should be your actual confetti image
// import challengeImage from "../../../assets/img/dashboards/quiz/question.gif"; // Add your challenge image for the quiz state
// import QuizQuestion from "./QuizQuestion";
// import { useAuth } from "../../../context/AuthContext";

// const Quiz = () => {
//   const { courseId, lessonId } = useParams();
//   const { getQuizScore, loading } = useAuth();
//   const [quizScore, setQuizScore] = useState(null);
//   const [quizStats, setQuizStats] = useState({
//     correct: 0,
//     incorrect: 0,
//     total: 0,
//     timeSpent: "0:00",
//   });

//   // useEffect(() => {
//   //   getQuizScore(lessonId).then((data) => {
//   //     const scoreData = data.data[0] || null;
//   //     setQuizScore(scoreData);

//   //     // Calculate quiz statistics
//   //     if (scoreData?.quiz) {
//   //       const total = scoreData.quiz.length;
//   //       const correct = Math.round((scoreData.score / 100) * total);
//   //       const incorrect = total - correct;

//   //       // Assuming timeSpent is available in the data or calculate it
//   //       const timeSpent = scoreData.timeSpent || "2:45"; // Example fallback

//   //       setQuizStats({
//   //         correct,
//   //         incorrect,
//   //         total,
//   //         timeSpent,
//   //       });
//   //     }
//   //   });
//   // }, [lessonId, getQuizScore]);
//   useEffect(() => {
//     const fetchQuizScore = async () => {
//       try {
//         const data = await getQuizScore(lessonId);
//         const scoreData = data.data[0] || null;
//         setQuizScore(scoreData);

//         if (scoreData?.quiz) {
//           const total = scoreData.quiz.length;
//           const correct = Math.round((scoreData.score / 100) * total);
//           const incorrect = total - correct;
//           const timeSpent = scoreData.timeSpent || "2:45";

//           setQuizStats({ correct, incorrect, total, timeSpent });
//         }
//       } catch (error) {
//         if (error.response?.status === 404) {
//           console.log("404: No score found, showing QuizQuestion.");
//           setQuizScore(null); // fallback to quiz question
//         } else {
//           console.error("Error fetching quiz score:", error);
//         }
//       }
//     };

//     fetchQuizScore();
//   }, [lessonId, getQuizScore]);

//   // const hasQuizScore = quizScore?.score && quizScore?.score >= 0;
//   const hasQuizScore =
//     quizScore !== null && typeof quizScore?.score === "number";

//   console.log("has quiz score", hasQuizScore);
//   console.log("quizScore", quizScore);
//   // Determine performance level
//   const getPerformanceLevel = (score) => {
//     if (score >= 90) return { label: "Excellent!", color: "#4CAF50" };
//     if (score >= 75) return { label: "Great Job!", color: "#8BC34A" };
//     if (score >= 60) return { label: "Good Work!", color: "#FFC107" };
//     if (score >= 40) return { label: "Keep Trying!", color: "#FF9800" };
//     return { label: "Need Practice", color: "#F44336" };
//   };

//   const performance = hasQuizScore
//     ? getPerformanceLevel(quizScore.score)
//     : { label: "", color: "#3B82F6" };

//   return (
//     <div className="bg-white !p-6 lg:!p-8 min-h-96 w-full rounded-3xl overflow-hidden flex flex-col justify-center items-center relative font-nueue">
//       {/* Background decorations - conditionally render based on UI state */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         {hasQuizScore ? (
//           <>
//             {/* Quiz result background elements */}
//             {/* <div className="absolute -top-10 -left-10 w-60 opacity-30">
//               <img src={coin1} alt="" className="w-full object-contain" />
//             </div>
//             <div className="absolute -bottom-10 -right-10 w-1/4 opacity-30 rotate-180">
//               <img src={coin1} alt="" className="w-full object-contain" />
//             </div> */}
//             {quizScore.score >= 75 && (
//               <div className="absolute top-0 left-0 w-full h-full opacity-30">
//                 {/* <img
//                   src={confetti}
//                   alt=""
//                   className="w-full h-full object-cover"
//                 /> */}
//               </div>
//             )}
//           </>
//         ) : (
//           <>
//             {/* Quiz challenge background elements */}

//             {/* <div className="challenge w-full flex justify-center">
//               <div className="w-40  mt-14">
//                 <img
//                   src={challengeImage}
//                   alt=""
//                   className="w-full object-cover"
//                 />
//               </div>
//             </div> */}
//           </>
//         )}
//       </div>

//       {hasQuizScore && quizScore == null ? (
//         <div className="text-center w-full flex flex-col items-center gap-6 z-10 py-4 font-nueue">
//           <div className="relative flex flex-col items-center">
//             <h2 className="text-3xl font-bold text-green-tint">
//               Quiz Results 🏆
//             </h2>
//             <p className="text-gray-600 mt-2">
//               You've completed the quiz for this lesson!
//             </p>
//           </div>

//           {/* Score Display */}
//           <div className="w-full max-w-sm">
//             <div className="relative h-48 w-48 mx-auto">
//               <CircularProgressbar
//                 value={quizScore?.score}
//                 circleRatio={0.75}
//                 styles={buildStyles({
//                   rotation: 1 / 2 + 1 / 8,
//                   strokeLinecap: "round",
//                   trailColor: "#eee",
//                   pathColor: performance.color,
//                 })}
//               />
//               <div className="absolute inset-0 flex flex-col items-center justify-center">
//                 <span className="text-4xl font-bold text-gray-800">
//                   {quizScore?.score}%
//                 </span>
//                 <span className="text-sm font-medium text-gray-600">
//                   {performance?.label}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
//             <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
//               <div className="bg-[#5099993d] p-2 rounded-full mb-2">
//                 <PiStar className="text-green-tint text-xl" />
//               </div>
//               <span className="text-2xl font-bold text-gray-800">
//                 {quizStats.correct}
//               </span>
//               <span className="text-sm text-gray-600">Correct Answers</span>
//             </div>

//             <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
//               <div className="bg-red-100 p-2 rounded-full mb-2">
//                 <PiBookOpen className="text-red-600 text-xl" />
//               </div>
//               <span className="text-2xl font-bold text-gray-800">
//                 {quizStats.incorrect}
//               </span>
//               <span className="text-sm text-gray-600">Incorrect Answers</span>
//             </div>

//             <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center">
//               <div className="bg-[#5099993d] p-2 rounded-full mb-2">
//                 <PiClock className="text-green-tint text-xl" />
//               </div>
//               <span className="text-2xl font-bold text-gray-800">
//                 {quizStats.timeSpent}
//               </span>
//               <span className="text-sm text-gray-600">Time Spent</span>
//             </div>
//           </div>

//           {/* Feedback & Next Steps */}
//           <div className="mt-6 bg-[#50999915] p-5 rounded-2xl w-full max-w-2xl">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center justify-center !text-center ">
//               <PiTrophy className="mr-2 text-green-tint" />
//               Your Performance
//             </h3>
//             <p className="text-gray-700">
//               {quizScore?.score >= 80
//                 ? "Amazing work! You've mastered this lesson's content. Ready for the next challenge?"
//                 : quizScore?.score >= 60
//                 ? "Good job! You've understood most concepts, but there's still room to improve."
//                 : "You're making progress! Consider revisiting the lesson material to strengthen your understanding."}
//             </p>

//             <div className="mt-4 flex justify-center gap-4">
//               <button className="px-5 py-2 text-green-tint rounded-full shadow-md hover:opacity-85 transition-colors">
//                 Review Lesson
//               </button>
//               <Link
//                 to={""}
//                 className="px-5 py-2 bg-green-tint text-white rounded-full shadow-md hover:opacity-85 transition-colors"
//               >
//                 Next Lesson
//               </Link>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="w-full p-6 my-8 rounded-3xl relative z-10">
//           <div className="text-center mb-8">
//             {/* <h2 className="text-3xl font-bold b">
//               Knowledge Challenge <span className="bg-clip-text ">💎</span>
//             </h2>
//             <p className="text-gray-600 mt-2 max-w-xl mx-auto">
//               Test your understanding of this lesson's content. Answer all
//               questions to unlock your achievement badge!
//             </p> */}
//           </div>
//           <QuizQuestion />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Quiz;

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
  if (quizScore === null) {
    return (
      <div className="bg-white !p-6 lg:!p-8 min-h-96 w-full rounded-3xl overflow-hidden flex flex-col justify-center items-center relative font-nueue">
        <div className="w-full p-6 my-8 rounded-3xl relative z-10">
          <QuizQuestion />
        </div>
      </div>
    );
  }

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
            <button className="px-5 py-2 text-green-tint rounded-full shadow-md hover:opacity-85 transition-colors">
              Review Lesson
            </button>
            <Link
              to={""}
              className="px-5 py-2 bg-green-tint text-white rounded-full shadow-md hover:opacity-85 transition-colors"
            >
              Next Lesson
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
