// import { useEffect, useState } from "react";
// import { BiCheckCircle } from "react-icons/bi";
import eth from "../../../assets/img/dashboards/quiz/eth.png";
import binance from "../../../assets/img/dashboards/quiz/btcp.png";
import tbx from "../../../assets/img/dashboards/quiz/tbx.png";
import bela from "../../../assets/img/dashboards/quiz/bela.png";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";
// import Loader2 from "../../../components/Loaders/Loader2";

// const Quiz = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedOption2, setSelectedOption2] = useState(null);
//   const [selectedOption3, setSelectedOption3] = useState(null);
//   const { courseId, lessonId } = useParams();
//   const { getQuizByChapter, quizLoading, setQuizLoading } = useAuth();
//   const [questions, setQuestions] = useState([]);

//   console.log("coooooooo", quizLoading);
//   console.log("questionns", questions);
//   useEffect(() => {
//     if (courseId) {
//       getQuizByChapter(courseId, lessonId).then((data) => {
//         setQuestions(data?.data[0].quiz || []);
//       });
//     }
//   }, [courseId]);

//   const handleNext = () => {
//     setSelectedOption(null); // Reset selection when moving to next question
//     setCurrentStep((prev) => prev + 1);
//   };

//   const handleBack = () => {
//     setSelectedOption(null);
//     setCurrentStep((prev) => prev - 1);
//   };

//   const options = [
//     { id: "tbx", src: tbx, alt: "TBX Logo" },
//     { id: "eth", src: eth, alt: "Ethereum Logo" },
//     { id: "binance", src: binance, alt: "Binance Logo" },
//     { id: "bela", src: bela, alt: "Bela Logo" },
//   ];
//   return (
//     <>
//       {quizLoading ? (
//         <Loader2 />
//       ) : (
//         <div className="">
//           {/** 🌟 SWITCH BETWEEN QUESTIONS BASED ON `currentStep` */}
//           {(() => {
//             switch (currentStep) {
//               case 1:
//                 return (
//                   <div>
//                     <h2 className="text-lg font-semibold !mb-4">
//                       What does "mining" in cryptocurrency refer to?
//                     </h2>
//                     <div className="!space-y-3">
//                       {[
//                         { id: "A", text: "Digging physical coins" },
//                         {
//                           id: "B",
//                           text: "Verifying transactions and adding them to the blockchain",
//                         },
//                         { id: "C", text: "Creating new wallets" },
//                         { id: "D", text: "Storing digital assets" },
//                       ].map((option) => (
//                         <label
//                           key={option.id}
//                           className="flex items-center justify-between bg-white !p-3 rounded-2xl cursor-pointer hover:scale-[1.01]"
//                         >
//                           <div className="flex items-center !space-x-3">
//                             <span className="bg-gray-200 text-gray-800 font-semibold !px-3 !py-1 rounded-md">
//                               {option.id}
//                             </span>
//                             <span className="text-gray-700">{option.text}</span>
//                           </div>
//                           <input
//                             type="radio"
//                             name="quiz1"
//                             value={option.id}
//                             checked={selectedOption === option.id}
//                             onChange={() => setSelectedOption(option.id)}
//                             className="hidden"
//                           />
//                           {selectedOption === option.id ? (
//                             <BiCheckCircle className="text-green-tint w-6 h-6" />
//                           ) : (
//                             <div className="w-6 h-6 border border-gray-400 rounded-full"></div>
//                           )}
//                         </label>
//                       ))}
//                     </div>
//                     <div className="flex justify-end !mt-6">
//                       <button
//                         onClick={handleNext}
//                         className="!px-4 !py-2 gradient text-sm  text-white rounded-4xl hover:scale-105"
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 );

//               case 2:
//                 return (
//                   <div>
//                     <div className="flex lg:flex-row flex-col items-center lg:!px-20 lg:gap-7">
//                       <h1 className="text-lg font-semibold font-bebas lg:text-4xl !pb-2">
//                         What is the logo for Ethereum?
//                       </h1>
//                       <div className="grid grid-cols-2 gap-12 !py-8">
//                         {options.map((option) => (
//                           <label
//                             key={option.id}
//                             className={`relative w-40 h-40 bg-white object-contain !p-6 rounded-3xl cursor-pointer transition hover:scale-105
//               ${selectedOption2 === option.id ? "ring-4 ring-green-tint" : ""}`}
//                           >
//                             <img
//                               src={option.src}
//                               alt={option.alt}
//                               className="w-full h-[85%] object-contain"
//                             />
//                             {/* Hidden Radio Button */}
//                             <input
//                               type="radio"
//                               name="logo"
//                               value={option.id}
//                               checked={selectedOption2 === option.id}
//                               onChange={() => setSelectedOption2(option.id)}
//                               className="hidden"
//                             />
//                             {/* Checkmark Below */}
//                             <div className="flex justify-center ">
//                               {selectedOption2 === option.id ? (
//                                 <BiCheckCircle className="text-green-tint w-5 h-5 !mt-2" />
//                               ) : (
//                                 <div className="w-4 h-4 border border-gray-400 rounded-full !mt-3"></div>
//                               )}
//                             </div>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="flex justify-between !mt-6">
//                       <button
//                         onClick={() => console.log("Back")}
//                         className="!px-4 !py-1.5 bg-white text-sm rounded-4xl hover:scale-105"
//                       >
//                         Back
//                       </button>
//                       <button
//                         onClick={handleNext}
//                         className="!px-4 !py-2 gradient text-sm text-white rounded-4xl hover:scale-105"
//                         disabled={!selectedOption2} // Prevents moving forward without selecting an option
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 );

//               case 3:
//                 return (
//                   <div className="flex flex-col justify-center items-center">
//                     <h2 className="text-lg font-semibold !mb-4">
//                       Does Bitcoin use a Proof of Work consensus mechanism?
//                     </h2>
//                     <div className="space-y-3 flex">
//                       {[
//                         { id: "yes", text: "Yes" },
//                         { id: "no", text: "No" },
//                       ].map((option) => (
//                         <div
//                           key={option.id}
//                           onClick={() => setSelectedOption3(option.id)}
//                           className={`flex !mr-6 items-center justify-center  bg-white !p-4 w-40 h-20 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-200 ${
//                             selectedOption3 === option.id
//                               ? "border-2 border-green-tint shadow-md"
//                               : "border border-gray-300"
//                           }`}
//                         >
//                           <span className="text-lg font-medium text-gray-800 ">
//                             {option.text}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex justify-between !mt-6 gap-4">
//                       <button
//                         onClick={handleBack}
//                         className="!px-4 !py-2 bg-gray-400 text-white rounded-lg hover:scale-105"
//                       >
//                         Back
//                       </button>
//                       <button
//                         onClick={() => setCurrentStep(4)} // Go to grading page
//                         className="!px-4 !py-2 bg-green-tint text-white rounded-lg hover:scale-105"
//                         disabled={!selectedOption3} // Prevent Next if no selection
//                       >
//                         Next
//                       </button>
//                     </div>
//                   </div>
//                 );

//               case 4:
//                 return (
//                   <div className="text-center min-h-60 flex  flex-col justify-center items-center">
//                     <h2 className="text-xl font-semibold !mb-4">
//                       Quiz Complete! 🎉
//                     </h2>
//                     <p>
//                       Your answers have been recorded. We will calculate your
//                       score.
//                     </p>
//                     <button
//                       onClick={() => console.log("Show Results")} // Replace with grading logic
//                       className="!mt-4 !px-4 !py-2 bg-green-tint text-white rounded-lg hover:scale-105"
//                     >
//                       View Results
//                     </button>
//                   </div>
//                 );

//               default:
//                 return <h2 className="text-center">Quiz Complete! 🎉</h2>;
//             }
//           })()}
//         </div>
//       )}
//     </>
//   );
// };

// export default Quiz;

// import { useEffect, useState } from "react";
// import { BiCheckCircle } from "react-icons/bi";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";
// import Loader2 from "../../../components/Loaders/Loader2";

// const Quiz = () => {
//   const [currentStep, setCurrentStep] = useState(0); // index-based
//   const [questions, setQuestions] = useState([]);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const { courseId, lessonId } = useParams();
//   const { getQuizByChapter, quizLoading } = useAuth();

//   useEffect(() => {
//     if (courseId) {
//       getQuizByChapter(courseId, lessonId).then((data) => {
//         setQuestions(data?.data[0]?.quiz || []);
//       });
//     }
//   }, [courseId, lessonId]);

//   const handleOptionSelect = (questionId, selected) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [questionId]: selected,
//     }));
//   };

//   const currentQuestion = questions[currentStep];

//   const handleNext = () => {
//     if (currentStep < questions.length - 1) {
//       setCurrentStep((prev) => prev + 1);
//     } else {
//       setCurrentStep((prev) => prev + 1); // go to results
//     }
//   };

//   const handleBack = () => {
//     setCurrentStep((prev) => prev - 1);
//   };

//   if (quizLoading) return <Loader2 />;

//   // Show final step
//   if (currentStep === questions.length) {
//     return (
//       <div className="text-center min-h-60 flex flex-col justify-center items-center">
//         <h2 className="text-xl font-semibold !mb-4">Quiz Complete! 🎉</h2>
//         <p>Your answers have been recorded.</p>
//         <button
//           onClick={() => console.log("Answers submitted:", selectedAnswers)}
//           className="!mt-4 !px-4 !py-2 bg-green-tint text-white rounded-lg hover:scale-105"
//         >
//           View Results
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       <h2 className="text-lg font-semibold !mb-4">
//         {currentQuestion?.question}
//       </h2>
//       <div className="space-y-3">
//         {["optionA", "optionB", "optionC", "optionD"].map((key) => {
//           const value = currentQuestion[key];
//           if (!value) return null;

//           return (
//             <label
//               key={key}
//               className="flex items-center justify-between bg-white !p-3 rounded-2xl cursor-pointer hover:scale-[1.01]"
//             >
//               <div className="flex items-center !space-x-3">
//                 <span className="bg-gray-200 text-gray-800 font-semibold !px-3 !py-1 rounded-md">
//                   {key.slice(-1)} {/* A, B, C, D */}
//                 </span>
//                 <span className="text-gray-700">{value}</span>
//               </div>
//               <input
//                 type="radio"
//                 name={`question-${currentQuestion.id}`}
//                 value={key}
//                 checked={selectedAnswers[currentQuestion.id] === key}
//                 onChange={() => handleOptionSelect(currentQuestion.id, key)}
//                 className="hidden"
//               />
//               {selectedAnswers[currentQuestion.id] === key ? (
//                 <BiCheckCircle className="text-green-tint w-6 h-6" />
//               ) : (
//                 <div className="w-6 h-6 border border-gray-400 rounded-full"></div>
//               )}
//             </label>
//           );
//         })}
//       </div>

//       <div className="flex justify-between !mt-6">
//         {currentStep > 0 && (
//           <button
//             onClick={handleBack}
//             className="!px-4 !py-2 bg-gray-400 text-white rounded-lg hover:scale-105"
//           >
//             Back
//           </button>
//         )}
//         <button
//           onClick={handleNext}
//           className="!px-4 !py-2 gradient text-white text-sm rounded-4xl hover:scale-105"
//           disabled={!selectedAnswers[currentQuestion.id]}
//         >
//           {currentStep === questions.length - 1 ? "Finish" : "Next"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Quiz;
import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Loader2 from "../../../components/Loaders/Loader2";
import { toast } from "sonner";

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0); // index-based
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { courseId, lessonId } = useParams();
  const { getQuizByChapter, quizLoading, submitQuizAnswers, getQuizScore } =
    useAuth();
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  useEffect(() => {
    if (courseId) {
      getQuizByChapter(courseId, lessonId).then((data) => {
        setQuestions(data?.data[0]?.quiz || []);
      });
    }
  }, [courseId, lessonId]);

  const handleOptionSelect = (questionId, selected) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selected,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length + 1) {
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
      // Now calling the correct function to submit quiz answers
      const response = await submitQuizAnswers(payload);
      console.log("Quiz submitted successfully:", response);
      // Optionally: Show success toast, reset form, or redirect
      toast.success(response?.data[0]?.message);
      setQuizSubmitted(true);
    } catch (err) {
      console.error("Quiz submission failed:", err);
      // Optionally: Show error message
      toast.error(err.response.data.message);
    }
  };

  const handleViewResults = async () => {
    try {
      const results = await getQuizScore(lessonId);
      setQuizResults(results);
      toast.success(results?.message);
    } catch (err) {
      console.error("Error fetching quiz results:", err);
      toast.error(err.response.data.message);
    }
  };
  if (quizLoading) return <Loader2 />;
  console.log("queston", questions);
  console.log("quiz sunmitted", quizSubmitted);
  console.log("result", quizResults);
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
  if (quizResults) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Your Quiz Results</h3>
          <p>Score: {quizResults?.score}</p>{" "}
          {/* Example - Adjust as per API response */}
          <p>Passed: {quizResults?.passed ? "Yes" : "No"}</p>
          <button
            onClick={() => setQuizResults(null)}
            className="close-modal-btn"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const renderQuestionUI = (question, index) => {
    // Example for different question types per step
    if (index === 1) {
      return (
        <div className="flex lg:flex-row flex-col items-center lg:!px-20 lg:gap-7">
          <h1 className="text-lg font-semibold font-bebas lg:text-4xl !pb-2">
            {question.question}
          </h1>
          <div className="grid grid-cols-2 gap-12 !py-8">
            {["optionA", "optionB", "optionC", "optionD"].map((key) => {
              const value = question[key];
              if (!value) return null;

              return (
                <label
                  key={key}
                  className={`relative w-40 h-40 bg-white !p-6 rounded-3xl cursor-pointer transition hover:scale-105 ${
                    selectedAnswers[question.id] === key
                      ? "ring-4 ring-green-tint"
                      : ""
                  }`}
                >
                  <img
                    src={value}
                    alt={`Option ${key}`}
                    className="w-full h-[85%] object-contain"
                  />
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={key}
                    checked={selectedAnswers[question.id] === key}
                    onChange={() => handleOptionSelect(question.id, key)}
                    className="hidden"
                  />
                  <div className="flex justify-center">
                    {selectedAnswers[question.id] === key ? (
                      <BiCheckCircle className="text-green-tint w-5 h-5 !mt-2" />
                    ) : (
                      <div className="w-4 h-4 border border-gray-400 rounded-full !mt-3"></div>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      );
    }

    // Default UI for other questions
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

  // STEP: Ready to submit?
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

  // STEP: Quiz complete
  if (currentStep === questions.length + 1) {
    return (
      <div className="text-center min-h-60 flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold !mb-4">Quiz Complete! 🎉</h2>
        <p>Your answers have been recorded.</p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleBack}
            className="!px-4 !py-2 bg-gray-400 text-white rounded-lg hover:scale-105"
          >
            Review Answers
          </button>
          <button
            onClick={() => console.log("Answers submitted:", selectedAnswers)}
            className="!px-4 !py-2 bg-green-tint text-white rounded-lg hover:scale-105"
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  // STEP: Show the actual quiz question
  const currentQuestion = questions[currentStep];

  return (
    <div>
      {questions.length >= 0 && <p>No Quiz Available for the course</p>}

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
  );
};

export default Quiz;
