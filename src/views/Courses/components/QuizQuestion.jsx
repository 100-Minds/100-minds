import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Loader2 from "../../../components/Loaders/Loader2";
import { toast } from "sonner";
import eth from "../../../assets/img/dashboards/quiz/eth.png";
import binance from "../../../assets/img/dashboards/quiz/btcp.png";
import tbx from "../../../assets/img/dashboards/quiz/tbx.png";
import bela from "../../../assets/img/dashboards/quiz/bela.png";
import challengeImage from "../../../assets/img/dashboards/quiz/question.gif";
import ProgressBar from "./ProgressBar";
const options = [
  { key: "optionA", image: eth },
  { key: "optionB", image: tbx },
  { key: "optionC", image: binance },
  { key: "optionD", image: bela },
];

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0); // index-based
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { courseId, lessonId } = useParams();
  const { getQuizByChapter, quizLoading, submitQuizAnswers, getQuizScore } =
    useAuth();
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [quizCourses, setQuizCourses] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        if (courseId && lessonId) {
          const data = await getQuizByChapter(lessonId);
          setQuestions(data?.data || []);
          setQuizCourses(data?.data[0]);
          console.log("data from quiz question", data);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchQuizData();
  }, [courseId, lessonId]);

  const handleOptionSelect = (questionId, selected) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selected,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    const answers = Object.entries(selectedAnswers).map(
      ([quizId, selectedOption]) => ({
        quizId,
        selectedOption,
      })
    );

    const payload = {
      chapterId: lessonId, // Assuming lessonId corresponds to chapterId
      courseId,
      answers,
    };

    try {
      const response = await submitQuizAnswers(payload);
      console.log("Quiz submitted successfully:", response);
      toast.success(response?.data[0]?.message);
      setQuizSubmitted(true);
      handleViewResults(); // Show results after submitting
    } catch (err) {
      console.error("Quiz submission failed:", err);
      toast.error(err.response.data.message);
    }
  };

  const handleViewResults = async () => {
    try {
      const results = await getQuizScore(lessonId);
      setQuizResults(results);
      // toast.success(results?.message);
    } catch (err) {
      console.error("Error fetching quiz results:", err);
      toast.error(err.response.data.message);
    }
  };
  console.log("questions from quiz question", questions);
  if (quizLoading) return <Loader2 />;
  console.log("questions", questions);
  console.log("all courses, qiz", quizCourses);
  // No quiz questions available
  if (questions.length === 0) {
    return (
      <div className="text-center flex flex-col justify-center items-center">
        <div className="challenge w-full flex justify-center ">
          <div className="w-40 ">
            <img src={challengeImage} alt="" className="w-full object-cover" />
          </div>
        </div>
        <h2 className="text-xl font-semibold ">No Questions Available</h2>
        <p>Sorry, there are no questions for this chapter.</p>
      </div>
    );
  }

  // Quiz submitted view
  // if (quizSubmitted) {
  //   return (
  //     <div className="text-center min-h-60 flex flex-col justify-center items-center">
  //       <h2 className="text-xl font-semibold !mb-4">
  //         Congrats, you’ve submitted the quiz! 🎉
  //       </h2>
  //       <p>Your answers have been recorded.</p>
  //       <div className="flex gap-4 mt-6">
  //         <button
  //           onClick={handleViewResults}
  //           className="!px-4 !py-2 gradient text-white rounded-lg hover:scale-105"
  //         >
  //           View Results
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // // Display the quiz results modal if available
  // if (quizResults) {
  //   return (
  //     <div className="modal-overlay">
  //       <div className="modal-content">
  //         <h3>Your Quiz Results</h3>
  //         <p>Score: {quizResults?.score}</p>
  //         <p>Passed: {quizResults?.passed ? "Yes" : "No"}</p>
  //         <button
  //           onClick={() => setQuizResults(null)}
  //           className="close-modal-btn"
  //         >
  //           Close
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }
  console.log("course result", quizResults);
  // 🥇 Always check for quizResults FIRST
  if (quizResults) {
    const resultData = quizResults?.data[0];
    const passed = quizResults?.passed;
    const totalQuestions = resultData?.totalQuestions || 0;
    const correctAnswers = resultData?.correctAnswers || 0;
    const score = resultData?.score || 0;

    return (
      <div className="fixed inset-0 bg-black/85 bg-opacity-60 z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
          <h1 className="text-2xl lg:text-3xl font-bold font-bebas mb-1 text-center">
            {quizCourses?.course?.name} QUIZ 💎
          </h1>
          <p className="text-center text-sm text-gray-600 mb-4 font-nueue">
            Chapter: {quizCourses?.chapter?.title}
          </p>

          <div className="text-center mb-6">
            <h2
              className={`text-2xl font-bold ${
                passed ? "text-green-tint" : "text-red-500"
              }`}
            >
              {passed ? "🎉 You Passed!" : "❌ Try Again!"}
            </h2>
            <p className="text-sm text-gray-500">
              {passed
                ? "Great job! You've demonstrated a solid understanding."
                : "Keep practicing and give it another shot!"}
            </p>
          </div>

          <div className="grid gap-4 text-sm text-gray-800">
            <div className="flex justify-between">
              <span>Score:</span>
              <span className="font-semibold">{score}/100</span>
            </div>
            <div className="flex justify-between">
              <span>Total Questions:</span>
              <span>{totalQuestions}</span>
            </div>
            <div className="flex justify-between">
              <span>Correct Answers:</span>
              <span>{correctAnswers}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                  passed ? "bg-green-tint" : "bg-red-500"
                }`}
              >
                {passed ? "Passed" : "Failed"}
              </span>
            </div>
          </div>

          <button
            onClick={() => setQuizResults(null)}
            className="mt-6 w-full py-2 rounded-full bg-gradient-to-r bg-green-tint text-white hover:scale-105 transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // 🥈 Only show submitted message if modal isn’t showing
  if (quizSubmitted) {
    return (
      <div className="text-center min-h-60 flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold !mb-4">
          Congrats, you’ve submitted the quiz! 🎉
        </h2>
        <p>Your answers have been recorded.</p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleViewResults}
            className="!px-4 !py-2 gradient text-white rounded-lg hover:scale-105"
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  // Render question UI
  const renderQuestionUI = (question, index) => {
    // if (index === 1) {
    //   return (
    //     <div className="flex lg:flex-row flex-col items-center lg:!px-20 lg:gap-7">
    //       <h1 className="text-lg font-semibold font-bebas lg:text-4xl !pb-2">
    //         {question.question}
    //       </h1>
    //       <div className="grid grid-cols-2 gap-12 !py-8">
    //         {options.map(({ key, image }) => {
    //           // Remove the question[key] part, we don't need that for images
    //           return (
    //             <label
    //               key={key}
    //               className={`relative w-40 h-40 bg-white !p-6 rounded-3xl cursor-pointer transition hover:scale-105 ${
    //                 selectedAnswers[question.id] === key
    //                   ? "ring-4 ring-green-tint"
    //                   : ""
    //               }`}
    //             >
    //               <img
    //                 src={image} // Directly use the image from options array
    //                 alt={`Option ${key}`}
    //                 className="w-full h-[85%] object-contain"
    //               />
    //               <input
    //                 type="radio"
    //                 name={`question-${question.id}`}
    //                 value={key}
    //                 checked={selectedAnswers[question.id] === key}
    //                 onChange={() => handleOptionSelect(question.id, key)}
    //                 className="hidden"
    //               />
    //               <div className="flex justify-center">
    //                 {selectedAnswers[question.id] === key ? (
    //                   <BiCheckCircle className="text-green-tint w-5 h-5 !mt-2" />
    //                 ) : (
    //                   <div className="w-4 h-4 border border-gray-400 rounded-full !mt-3"></div>
    //                 )}
    //               </div>
    //             </label>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <>
        <h2 className="text-lg font-semibold !mb-4">{question?.question}</h2>
        <div className="space-y-3">
          {["optionA", "optionB", "optionC", "optionD"].map((key) => {
            const value = question[key];
            if (!value) return null;

            return (
              <label
                key={key}
                className="flex items-center justify-between bg-white !p-3 rounded-2xl cursor-pointer hover:scale-[1.01]"
              >
                <div className="flex items-center !space-x-3">
                  <span className="bg-gray-200 text-gray-800 font-semibold !px-3 !py-1 rounded-md">
                    {key.slice(-1)}
                  </span>
                  <span className="text-gray-700">{value}</span>
                </div>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={key}
                  checked={selectedAnswers[question.id] === key}
                  onChange={() => handleOptionSelect(question.id, key)}
                  className="hidden"
                />
                {selectedAnswers[question.id] === key ? (
                  <BiCheckCircle className="text-green-tint w-6 h-6" />
                ) : (
                  <div className="w-6 h-6 border border-gray-400 rounded-full"></div>
                )}
              </label>
            );
          })}
        </div>
      </>
    );
  };

  // STEP: Ready to submit
  if (currentStep === questions.length) {
    return (
      <div className="text-center min-h-60 flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold !mb-4">
          Ready to submit your quiz? 📝
        </h2>
        <p>You’ve answered all questions.</p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleBack}
            className="!px-4 !py-2 bg-gray-400 text-white rounded-lg hover:scale-105"
          >
            Go Back
          </button>
          <button
            onClick={handleSubmitQuiz}
            className="!px-4 !py-2 gradient text-white rounded-lg hover:scale-105"
          >
            Yes, Submit
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <section>
      <div className="flex flex-col justify-center items-center font-nueue">
        <h1 className="font-bebas lg:text-3xl !pb-2">
          {quizCourses?.course?.name} QUIZ 💎
        </h1>
        <p className="pb-4 font-nueue">
          {" "}
          Chapter:{quizCourses?.chapter?.title}
        </p>
        <div className="w-2/3">
          <ProgressBar percentage={70} />
        </div>
      </div>
      <div className="bg-whitish w-full !p-6 !my-8 rounded-3xl relative z-10">
        {renderQuestionUI(currentQuestion, currentStep)}
        <div className="flex justify-between !mt-6">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="!px-4 !py-2 bg-gray-400 text-white rounded-lg hover:scale-105"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="!px-4 !py-2 gradient text-white text-sm rounded-4xl hover:scale-105"
            disabled={!selectedAnswers[currentQuestion.id]}
          >
            {currentStep === questions.length - 1 ? "Continue" : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
