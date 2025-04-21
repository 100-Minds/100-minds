// import { useEffect, useState } from "react";
// import { BiCheckCircle } from "react-icons/bi";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext"; // Assuming path is correct
// import Loader2 from "../../../components/Loaders/Loader2"; // Assuming path is correct
// import { toast } from "sonner";
// import eth from "../../../assets/img/dashboards/quiz/eth.png"; // Assuming path is correct
// import binance from "../../../assets/img/dashboards/quiz/btcp.png"; // Assuming path is correct
// import tbx from "../../../assets/img/dashboards/quiz/tbx.png"; // Assuming path is correct
// import bela from "../../../assets/img/dashboards/quiz/bela.png"; // Assuming path is correct
// import challengeImage from "../../../assets/img/dashboards/quiz/question.gif"; // Assuming path is correct
// import ProgressBar from "./ProgressBar"; // Assuming path is correct

// // Define options outside the component as it's static data
// const options = [
//   { key: "optionA", image: eth },
//   { key: "optionB", image: tbx },
//   { key: "optionC", image: binance },
//   { key: "optionD", image: bela },
// ];

// const Quiz = ({ activeTab, onQuizComplete }) => {
//   // State Hooks
//   const [currentStep, setCurrentStep] = useState(0); // index-based step for questions
//   const [questions, setQuestions] = useState([]); // Array to hold fetched quiz questions
//   const [selectedAnswers, setSelectedAnswers] = useState({}); // Object to store user's answers { questionId: selectedOptionKey }
//   const [quizSubmitted, setQuizSubmitted] = useState(false); // Flag indicating if the quiz has been submitted
//   const [quizResults, setQuizResults] = useState(null); // State to hold fetched quiz results
//   const [quizCourses, setQuizCourses] = useState(null); // State to hold quiz/course metadata

//   // Router Hooks
//   const { courseId, lessonId } = useParams();

//   // Context Hooks
//   const { getQuizByChapter, quizLoading, submitQuizAnswers, getQuizScore } =
//     useAuth();

//   // Effect to fetch quiz questions when component mounts or IDs change
//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         if (courseId && lessonId) {
//           console.log(`Workspaceing quiz for lessonId: ${lessonId}`);
//           const data = await getQuizByChapter(lessonId);
//           setQuestions(data?.data || []); // Ensure questions is always an array
//           // Assuming data?.data[0] contains metadata like course/chapter title if needed
//           setQuizCourses(data?.data?.[0]); // Store metadata if available
//           console.log("Fetched quiz data:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching quiz data:", error);
//         toast.error("Failed to load quiz questions.");
//         setQuestions([]); // Reset questions on error
//       }
//     };

//     fetchQuizData();
//     // Reset state when IDs change to avoid showing old data briefly
//     setCurrentStep(0);
//     setSelectedAnswers({});
//     setQuizSubmitted(false);
//     setQuizResults(null);
//     setQuizCourses(null);
//   }, []); // Dependencies

//   // Handler for selecting an answer option
//   const handleOptionSelect = (questionId, selected) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [questionId]: selected,
//     }));
//   };

//   // Handler for navigating to the next question/step
//   const handleNext = () => {
//     // Check if we are on the last question, next step is the submission confirmation
//     if (currentStep < questions.length) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   // Handler for navigating to the previous question
//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   // Handler for submitting the quiz answers
//   const handleSubmitQuiz = async () => {
//     // Format answers into the required payload structure
//     const answers = Object.entries(selectedAnswers).map(
//       ([quizId, selectedOption]) => ({
//         quizId, // The ID of the question
//         selectedOption, // The key of the selected option (e.g., "optionA")
//       })
//     );

//     const payload = {
//       chapterId: lessonId, // Assuming lessonId corresponds to chapterId for the API
//       courseId,
//       answers,
//     };

//     console.log("Submitting quiz with payload:", payload);

//     try {
//       const response = await submitQuizAnswers(payload);
//       console.log("Quiz submitted successfully:", response);
//       toast.success(
//         response?.data?.[0]?.message || "Quiz submitted successfully!"
//       );
//       setQuizSubmitted(true); // Set flag to show submission success message
//       // Don't automatically fetch results here, let the user click "View Results"
//       // handleViewResults(); // Remove this line
//     } catch (err) {
//       console.error("Quiz submission failed:", err);
//       const errorMsg =
//         err.response?.data?.message ||
//         "Quiz submission failed. Please try again.";
//       toast.error(errorMsg);
//     }
//   }; // <<< handleSubmitQuiz function ends here

//   // Handler for fetching and displaying quiz results
//   const handleViewResults = async () => {
//     console.log(`Workspaceing results for lessonId: ${lessonId}`);
//     try {
//       const results = await getQuizScore(lessonId); // Fetch results using lessonId
//       console.log("Fetched quiz results:", results);
//       setQuizResults(results); // Store results in state to trigger modal display
//       // Optional: Show success toast for fetching results if needed
//       // toast.success(results?.message || "Results loaded!");
//     } catch (err) {
//       console.error("Error fetching quiz results:", err);
//       const errorMsg =
//         err.response?.data?.message || "Failed to fetch quiz results.";
//       toast.error(errorMsg);
//     }
//   }; // <<< handleViewResults function ends here

//   // --- Conditional Rendering Logic ---

//   // 1. Show loader while fetching initial quiz data
//   if (quizLoading) {
//     console.log("Quiz Loading...");
//     return <Loader2 />;
//   }

//   // 2. Handle case where no questions are available for the chapter
//   // Check *after* loading is false
//   if (!quizLoading && questions.length === 0) {
//     console.log("No questions available.");
//     return (
//       <div className="text-center flex flex-col justify-center items-center min-h-60">
//         <div className="challenge w-full flex justify-center ">
//           <div className="w-40 ">
//             <img
//               src={challengeImage}
//               alt="No questions"
//               className="w-full object-cover"
//             />
//           </div>
//         </div>
//         <h2 className="text-xl font-semibold mt-4">No Questions Available</h2>
//         <p className="text-gray-600">
//           Sorry, there are no quiz questions for this chapter yet.
//         </p>
//       </div>
//     );
//   }

//   // 3. Display the quiz results modal if results have been fetched
//   // Check this BEFORE the quiz submitted message
//   if (quizResults) {
//     // Safely access nested data
//     const resultData = quizResults?.data?.[0];
//     const passed = quizResults?.passed ?? false; // Default to false if undefined
//     const totalQuestions = resultData?.totalQuestions || questions.length || 0; // Use questions.length as fallback
//     const correctAnswers = resultData?.correctAnswers || 0;
//     const score = resultData?.score || 0;
//     // Use quizCourses for metadata, fallback gracefully
//     const courseName = quizCourses?.course?.name || "Course";
//     const chapterTitle = quizCourses?.chapter?.title || "Chapter";

//     console.log("Displaying Quiz Results Modal:", quizResults);
//     return (
//       <div className="fixed inset-0 bg-black/85 bg-opacity-60 z-50 flex items-center justify-center px-4 transition-opacity duration-300">
//         <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative transform transition-all duration-300 scale-100">
//           <h1 className="text-2xl lg:text-3xl font-bold font-bebas mb-1 text-center">
//             {courseName} QUIZ 💎
//           </h1>
//           <p className="text-center text-sm text-gray-600 mb-4 font-nueue">
//             Chapter: {chapterTitle}
//           </p>

//           <div className="text-center mb-6">
//             <h2
//               className={`text-2xl font-bold ${
//                 passed ? "text-green-tint" : "text-red-500"
//               }`}
//             >
//               {passed ? "🎉 You Passed!" : "❌ Try Again!"}
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">
//               {passed
//                 ? "Great job! You've demonstrated a solid understanding."
//                 : "Keep practicing and give it another shot!"}
//             </p>
//           </div>

//           <div className="grid gap-3 text-sm text-gray-800 mb-6">
//             <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
//               <span>Score:</span>
//               <span className="font-semibold text-lg">{score}%</span>
//             </div>
//             <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
//               <span>Total Questions:</span>
//               <span className="font-semibold">{totalQuestions}</span>
//             </div>
//             <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
//               <span>Correct Answers:</span>
//               <span className="font-semibold">{correctAnswers}</span>
//             </div>
//             <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
//               <span>Status:</span>
//               <span
//                 className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
//                   passed ? "bg-green-tint" : "bg-red-500"
//                 }`}
//               >
//                 {passed ? "Passed" : "Failed"}
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={() => setQuizResults(null)} // Close the modal by resetting results state
//             className="mt-4 w-full py-2.5 rounded-full bg-gradient-to-r bg-green-tint text-white font-semibold hover:scale-[1.03] transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-green-tint focus:ring-opacity-50"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // 4. Show confirmation message after submitting, if results aren't being shown yet
//   if (quizSubmitted) {
//     console.log("Quiz Submitted, showing confirmation.");
//     return (
//       <div className="text-center min-h-60 flex flex-col justify-center items-center">
//         <h2 className="text-xl font-semibold !mb-4">
//           Congrats, you’ve submitted the quiz! 🎉
//         </h2>
//         <p className="text-gray-600">Your answers have been recorded.</p>
//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={handleViewResults} // Button to trigger fetching results
//             className="!px-6 !py-2 gradient text-white rounded-lg hover:scale-105 transition-transform duration-200"
//           >
//             View Results
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // 5. Render the final confirmation step before submitting
//   if (currentStep === questions.length) {
//     console.log("Ready to submit step.");
//     return (
//       <div className="text-center min-h-60 flex flex-col justify-center items-center">
//         <h2 className="text-xl font-semibold !mb-4">
//           Ready to submit your quiz? 📝
//         </h2>
//         <p className="text-gray-600">You’ve answered all questions.</p>
//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={handleBack} // Go back to the last question
//             className="!px-10 !py-2  text-green-tint border border-green-tint rounded-full hover:scale-105 transition-transform duration-200"
//           >
//             Go Back
//           </button>
//           <button
//             onClick={handleSubmitQuiz} // Trigger submission
//             className="!px-6 !py-2 bg-green-tint  text-white rounded-full hover:scale-105 transition-transform duration-200"
//             disabled={quizLoading} // Disable while submitting maybe? Add loading state if needed
//           >
//             {quizLoading ? "Submitting..." : "Yes, Submit"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // --- Render Question UI ---
//   // Helper function to render the specific UI for a question based on index/type
//   // NOTE: Your original code had specific UI for index === 1 (image options).
//   // Let's assume ONLY the question at index 1 uses image options. Adjust if needed.
//   const renderQuestionUI = (question, index) => {
//     if (!question) return <p>Error loading question.</p>; // Handle case where question is undefined

//     // Specific UI for Image-based Question (assuming it's always index 1)
//     // if (index === 1 && options.length > 0) {
//     //   // Check if options array has images
//     //   return (
//     //     <div className="flex flex-col items-center lg:px-4">
//     //       <h2 className="text-lg font-semibold text-center font-bebas lg:text-4xl !pb-2 mb-4">
//     //         {question.question}
//     //       </h2>
//     //       <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 md:gap-12 !py-4">
//     //         {options.map(
//     //           (
//     //             { key, image } // Use the static options array defined outside
//     //           ) => (
//     //             <label
//     //               key={key}
//     //               className={`relative w-32 h-32 sm:w-40 sm:h-40 bg-white !p-4 sm:!p-6 rounded-2xl sm:rounded-3xl cursor-pointer transition hover:scale-105 border-2 ${
//     //                 selectedAnswers[question.id] === key
//     //                   ? "border-green-tint ring-2 ring-green-tint/50" // Enhanced selected style
//     //                   : "border-gray-200"
//     //               }`}
//     //             >
//     //               <img
//     //                 src={image} // Use image from the static options array
//     //                 alt={`Option ${key.slice(-1)}`} // Better alt text
//     //                 className="w-full h-[75%] object-contain mb-1" // Adjusted size/margin
//     //               />
//     //               <input
//     //                 type="radio"
//     //                 name={`question-${question.id}`}
//     //                 value={key}
//     //                 checked={selectedAnswers[question.id] === key}
//     //                 onChange={() => handleOptionSelect(question.id, key)}
//     //                 className="sr-only" // Hide radio visually but keep accessibility
//     //               />
//     //               {/* Custom Radio Indicator */}
//     //               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center">
//     //                 <div
//     //                   className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
//     //                     selectedAnswers[question.id] === key
//     //                       ? "border-green-tint bg-green-tint"
//     //                       : "border-gray-400"
//     //                   }`}
//     //                 >
//     //                   {selectedAnswers[question.id] === key && (
//     //                     <BiCheckCircle className="text-white w-3 h-3" /> // Smaller check inside
//     //                   )}
//     //                 </div>
//     //               </div>
//     //             </label>
//     //           )
//     //         )}
//     //       </div>
//     //     </div>
//     //   );
//     // }

//     // Default UI for Text-based Questions
//     return (
//       <>
//         <h2 className="text-lg font-semibold !mb-4">{question?.question}</h2>
//         <div className="space-y-3">
//           {["optionA", "optionB", "optionC", "optionD"].map((key) => {
//             const value = question[key];
//             if (!value) return null; // Don't render if option value is missing

//             const isSelected = selectedAnswers[question.id] === key;

//             return (
//               <label
//                 key={key}
//                 className={`flex items-center justify-between bg-white p-3 rounded-xl cursor-pointer transition-all duration-200 ${
//                   isSelected
//                     ? "border-green-tint ring-2 ring-green-tint/40" // Selected style
//                     : "border-transparent hover:border-gray-300" // Default hover style
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <span
//                     className={`flex items-center justify-center font-semibold rounded-md w-8 h-8 text-sm ${
//                       isSelected
//                         ? "bg-green-tint text-white"
//                         : "bg-gray-200 text-gray-800"
//                     }`}
//                   >
//                     {key.slice(-1)} {/* A, B, C, D */}
//                   </span>
//                   <span
//                     className={`text-sm ${
//                       isSelected ? "text-black font-medium" : "text-gray-700"
//                     }`}
//                   >
//                     {value}
//                   </span>
//                 </div>
//                 <input
//                   type="radio"
//                   name={`question-${question.id}`}
//                   value={key}
//                   checked={isSelected}
//                   onChange={() => handleOptionSelect(question.id, key)}
//                   className="sr-only" // Hide visually
//                 />
//                 {/* Custom radio indicator */}
//                 <div
//                   className={`w-5 h-5 border-none rounded-full flex items-center justify-center ${
//                     isSelected
//                       ? "border-green-tint bg-green-tint"
//                       : "border-gray-400"
//                   }`}
//                 >
//                   {isSelected && (
//                     <BiCheckCircle className="text-white w-3 h-3" />
//                   )}
//                 </div>
//               </label>
//             );
//           })}
//         </div>
//       </>
//     );
//   };

//   // 6. Render the active quiz question
//   const currentQuestion = questions[currentStep];
//   // Calculate progress percentage
//   const progressPercentage =
//     questions.length > 0 ? ((currentStep + 1) / questions.length) * 100 : 0;

//   console.log(
//     `Rendering question step: ${currentStep}, Question ID: ${currentQuestion?.id}`
//   );

//   return (
//     <section className="quiz-container">
//       {/* Quiz Header */}
//       <div className="flex flex-col justify-center items-center font-nueue mb-6">
//         <h1 className="font-bebas text-2xl sm:text-3xl !pb-1">
//           {quizCourses?.course?.name || "Course"} QUIZ 💎
//         </h1>
//         <p className="pb-3 font-nueue text-sm text-gray-600">
//           Chapter: {quizCourses?.chapter?.title || "Current Chapter"}
//         </p>
//         {/* Progress Bar */}
//         <div className="w-full sm:w-2/3 px-4 sm:px-0">
//           <ProgressBar percentage={progressPercentage} />
//           <p className="text-xs text-gray-500 text-center mt-1">
//             Question {currentStep + 1} of {questions.length}
//           </p>
//         </div>
//       </div>

//       {/* Question Area */}
//       <div className="bg-whitish w-full p-4 sm:p-6 my-4 rounded-3xl relative z-10 shadow-sm border border-gray-200">
//         {/* Render the appropriate UI for the current question */}
//         {renderQuestionUI(currentQuestion, currentStep)}

//         {/* Navigation Buttons */}
//         <div
//           className={`flex ${
//             currentStep > 0 ? "justify-between" : "justify-end"
//           } items-center mt-6`}
//         >
//           {currentStep > 0 && (
//             <button
//               onClick={handleBack}
//               className="px-10 py-2 border border-green-tint text-green-tint text-sm rounded-full hover:opacity-65 transition-colors duration-200"
//             >
//               Back
//             </button>
//           )}
//           <button
//             onClick={handleNext}
//             className={`px-10 py-2 bg-green-tint hover:opacity-85 text-white text-sm rounded-full transition-all duration-200 ${
//               !selectedAnswers[currentQuestion?.id]
//                 ? "opacity-50 cursor-not-allowed"
//                 : "hover:scale-105"
//             }`}
//             disabled={!selectedAnswers[currentQuestion?.id]} // Disable Next if no answer selected for the current question
//           >
//             {/* Change button text on the last question */}
//             {currentStep === questions.length - 1 ? "Finish & Review" : "Next"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );

//   // *** THIS IS THE CORRECT PLACEMENT FOR THE COMPONENT'S CLOSING BRACE ***
// };

// export default Quiz;

//+++++++++++++++++++++++++++++++++//

// import { useEffect, useState } from "react";
// import { BiCheckCircle } from "react-icons/bi";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext"; // Assuming path is correct
// import Loader2 from "../../../components/Loaders/Loader2"; // Assuming path is correct
// import { toast } from "sonner";
// import eth from "../../../assets/img/dashboards/quiz/eth.png"; // Assuming path is correct
// import binance from "../../../assets/img/dashboards/quiz/btcp.png"; // Assuming path is correct
// import tbx from "../../../assets/img/dashboards/quiz/tbx.png"; // Assuming path is correct
// import bela from "../../../assets/img/dashboards/quiz/bela.png"; // Assuming path is correct
// import challengeImage from "../../../assets/img/dashboards/quiz/question.gif"; // Assuming path is correct
// import ProgressBar from "./ProgressBar"; // Assuming path is correct

// Define options outside the component as it's static data
// const options = [
//   { key: "optionA", image: eth },
//   { key: "optionB", image: tbx },
//   { key: "optionC", image: binance },
//   { key: "optionD", image: bela },
// ];

// const QuizQuestion = ({ isReviewing, quizData, submittedAnswers }) => {
//   // State Hooks
//   const [currentStep, setCurrentStep] = useState(0); // index-based step for questions
//   const [questions, setQuestions] = useState([]); // Array to hold fetched quiz questions
//   const [selectedAnswers, setSelectedAnswers] = useState({}); // Object to store user's answers { questionId: selectedOptionKey }
//   const [quizSubmitted, setQuizSubmitted] = useState(false); // Flag indicating if the quiz has been submitted
//   const [quizResults, setQuizResults] = useState(null); // State to hold fetched quiz results
//   const [quizCourses, setQuizCourses] = useState(null); // State to hold quiz/course metadata

//   // Router Hooks
//   const { courseId, lessonId } = useParams();

//   // Context Hooks
//   const { getQuizByChapter, quizLoading, submitQuizAnswers, getQuizScore } =
//     useAuth();

//   // Effect to fetch quiz questions when component mounts or IDs change
//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         if (courseId && lessonId) {
//           console.log(`Workspaceing quiz for lessonId: ${lessonId}`);
//           const data = await getQuizByChapter(lessonId);
//           setQuestions(data?.data || []); // Ensure questions is always an array
//           // Assuming data?.data[0] contains metadata like course/chapter title if needed
//           setQuizCourses(data?.data?.[0]); // Store metadata if available
//           console.log("Fetched quiz data:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching quiz data:", error);
//         toast.error("Failed to load quiz questions.");
//         setQuestions([]); // Reset questions on error
//       }
//     };

//     // Only fetch if not in review mode and no quiz data is passed
//     if (!isReviewing && !quizData) {
//       fetchQuizData();
//     } else if (isReviewing && quizData) {
//       // If in review mode and quiz data is available, use that
//       setQuestions(quizData);
//       // Initialize selected answers from submitted answers
//       const initialSelectedAnswers = {};
//       quizData.forEach((question, index) => {
//         const submittedAnswer = submittedAnswers?.find(
//           (ans) => ans.quizId === question.id
//         );
//         if (submittedAnswer) {
//           initialSelectedAnswers[question.id] = submittedAnswer.selectedOption;
//         }
//       });
//       setSelectedAnswers(initialSelectedAnswers);
//       setQuizSubmitted(true); // In review mode, it's considered submitted
//     }

//     // Reset state when IDs change (only if not in review mode)
//     if (!isReviewing) {
//       setCurrentStep(0);
//       setSelectedAnswers({});
//       setQuizSubmitted(false);
//       setQuizResults(null);
//       setQuizCourses(null);
//     }
//   }, [lessonId, courseId, isReviewing, quizData, submittedAnswers]); // Dependencies

//   // Handler for selecting an answer option
//   const handleOptionSelect = (questionId, selected) => {
//     if (!isReviewing) {
//       setSelectedAnswers((prev) => ({
//         ...prev,
//         [questionId]: selected,
//       }));
//     }
//   };

//   // Handler for navigating to the next question/step
//   const handleNext = () => {
//     if (currentStep < questions.length) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   // Handler for navigating to the previous question
//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   // Handler for submitting the quiz answers
//   const handleSubmitQuiz = async () => {
//     if (isReviewing) return; // Don't submit again in review mode

//     // Format answers into the required payload structure
//     const answers = Object.entries(selectedAnswers).map(
//       ([quizId, selectedOption]) => ({
//         quizId, // The ID of the question
//         selectedOption, // The key of the selected option (e.g., "optionA")
//       })
//     );

//     const payload = {
//       chapterId: lessonId, // Assuming lessonId corresponds to chapterId for the API
//       courseId,
//       answers,
//     };

//     console.log("Submitting quiz with payload:", payload);

//     try {
//       const response = await submitQuizAnswers(payload);
//       console.log("Quiz submitted successfully:", response);
//       toast.success(
//         response?.data?.[0]?.message || "Quiz submitted successfully!"
//       );
//       setQuizSubmitted(true); // Set flag to show submission success message
//       // Don't automatically fetch results here, the parent will handle it
//       // handleViewResults(); // Remove this line
//     } catch (err) {
//       console.error("Quiz submission failed:", err);
//       const errorMsg =
//         err.response?.data?.message ||
//         "Quiz submission failed. Please try again.";
//       toast.error(errorMsg);
//     }
//   }; // <<< handleSubmitQuiz function ends here

//   // --- Conditional Rendering Logic ---

//   // 1. Show loader while fetching initial quiz data (only if not in review)
//   if (!isReviewing && quizLoading) {
//     console.log("Quiz Loading...");
//     return <Loader2 />;
//   }

//   // 2. Handle case where no questions are available for the chapter (only if not in review and after loading)
//   if (!isReviewing && !quizLoading && questions.length === 0) {
//     console.log("No questions available.");
//     return (
//       <div className="text-center flex flex-col justify-center items-center min-h-60">
//         <div className="challenge w-full flex justify-center ">
//           <div className="w-40 ">
//             <img
//               src={challengeImage}
//               alt="No questions"
//               className="w-full object-cover"
//             />
//           </div>
//         </div>
//         <h2 className="text-xl font-semibold mt-4">No Questions Available</h2>
//         <p className="text-gray-600">
//           Sorry, there are no quiz questions for this chapter yet.
//         </p>
//       </div>
//     );
//   }

//   // 3. Render the final confirmation step before submitting (only if not in review)
//   if (!isReviewing && currentStep === questions.length && !quizSubmitted) {
//     console.log("Ready to submit step.");
//     return (
//       <div className="text-center min-h-60 flex flex-col justify-center items-center">
//         <h2 className="text-xl font-semibold !mb-4">
//           Ready to submit your quiz? 📝
//         </h2>
//         <p className="text-gray-600">You’ve answered all questions.</p>
//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={handleBack} // Go back to the last question
//             className="!px-10 !py-2  text-green-tint border border-green-tint rounded-full hover:scale-105 transition-transform duration-200"
//           >
//             Go Back
//           </button>
//           <button
//             onClick={handleSubmitQuiz} // Trigger submission
//             className="!px-6 !py-2 bg-green-tint  text-white rounded-full hover:scale-105 transition-transform duration-200"
//             disabled={quizLoading} // Disable while submitting maybe? Add loading state if needed
//           >
//             {quizLoading ? "Submitting..." : "Yes, Submit"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // --- Render Question UI ---
//   // Helper function to render the specific UI for a question based on index/type
//   const renderQuestionUI = (question, index) => {
//     if (!question) return <p>Error loading question.</p>; // Handle case where question is undefined

//     return (
//       <>
//         <h2 className="text-lg font-semibold !mb-4">{question?.question}</h2>
//         <div className="space-y-3">
//           {["optionA", "optionB", "optionC", "optionD"].map((key) => {
//             const value = question[key];
//             if (!value) return null; // Don't render if option value is missing

//             const isSelected = selectedAnswers[question.id] === key;
//             const isCorrect = question.correctAnswer === key;
//             const showCorrect = isReviewing;

//             return (
//               <label
//                 key={key}
//                 className={`flex items-center justify-between bg-white p-3 rounded-xl cursor-pointer transition-all duration-200 ${
//                   isSelected
//                     ? isCorrect
//                       ? "border-green-500 ring-2 ring-green-500/40"
//                       : showCorrect
//                       ? "border-red-500 ring-2 ring-red-500/40"
//                       : "border-green-tint ring-2 ring-green-tint/40" // Still highlight selected if not reviewing
//                     : "border-transparent hover:border-gray-300" // Default hover style
//                 } ${isReviewing && isCorrect ? "bg-green-100" : ""}`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <span
//                     className={`flex items-center justify-center font-semibold rounded-md w-8 h-8 text-sm ${
//                       isSelected
//                         ? isCorrect
//                           ? "bg-green-500 text-white"
//                           : showCorrect
//                           ? "bg-red-500 text-white"
//                           : "bg-green-tint text-white"
//                         : isCorrect && isReviewing
//                         ? "bg-green-500 text-white"
//                         : "bg-gray-200 text-gray-800"
//                     }`}
//                   >
//                     {key.slice(-1)} {/* A, B, C, D */}
//                   </span>
//                   <span
//                     className={`text-sm ${
//                       isSelected ? "text-black font-medium" : "text-gray-700"
//                     } ${
//                       isCorrect && isReviewing ? "font-bold text-green-500" : ""
//                     }`}
//                   >
//                     {value}
//                   </span>
//                 </div>
//                 <input
//                   type="radio"
//                   name={`question-${question.id}`}
//                   value={key}
//                   checked={isSelected}
//                   onChange={() => handleOptionSelect(question.id, key)}
//                   className="sr-only" // Hide visually
//                   disabled={isReviewing} // Disable input in review mode
//                 />
//                 {/* Custom radio indicator */}
//                 <div
//                   className={`w-5 h-5 border-none rounded-full flex items-center justify-center ${
//                     isSelected
//                       ? isCorrect
//                         ? "border-green-500 bg-green-500"
//                         : showCorrect
//                         ? "border-red-500 bg-red-500"
//                         : "border-green-tint bg-green-tint"
//                       : isCorrect && isReviewing
//                       ? "border-green-500 bg-green-500"
//                       : "border-gray-400"
//                   }`}
//                 >
//                   {(isSelected && (
//                     <BiCheckCircle className="text-white w-3 h-3" />
//                   )) ||
//                     (isCorrect && isReviewing && (
//                       <BiCheckCircle className="text-white w-3 h-3" />
//                     ))}
//                 </div>
//               </label>
//             );
//           })}
//           {isReviewing && (
//             <p className="text-sm text-gray-600 mt-2">
//               Correct Answer:{" "}
//               <span className="font-semibold">
//                 {question.isCorrect?.slice(-1)}
//               </span>{" "}
//               - {question[question.correctAnswer]}
//             </p>
//           )}
//         </div>
//       </>
//     );
//   };

//   // 6. Render the active quiz question
//   const currentQuestion = questions[currentStep];
//   // Calculate progress percentage
//   const progressPercentage =
//     questions.length > 0 ? ((currentStep + 1) / questions.length) * 100 : 0;

//   console.log(
//     `Rendering question step: ${currentStep}, Question ID: ${currentQuestion?.id}, isReviewing: ${isReviewing}`
//   );
//   console.log("is review", isReviewing);
//   return (
//     <section className="quiz-container">
//       {/* Quiz Header */}
//       <div className="flex flex-col justify-center items-center font-nueue mb-6">
//         <h1 className="font-bebas text-2xl sm:text-3xl !pb-1">
//           {quizCourses?.course?.name || "Course"} QUIZ 💎
//         </h1>
//         <p className="pb-3 font-nueue text-sm text-gray-600">
//           Chapter: {quizCourses?.chapter?.title || "Current Chapter"}
//         </p>
//         {/* Progress Bar */}
//         {!isReviewing && (
//           <div className="w-full sm:w-2/3 px-4 sm:px-0">
//             <ProgressBar percentage={progressPercentage} />
//             <p className="text-xs text-gray-500 text-center mt-1">
//               Question {currentStep + 1} of {questions.length}
//             </p>
//           </div>
//         )}
//         {isReviewing && (
//           <p className="text-sm text-gray-600 mt-2">Reviewing your answers.</p>
//         )}
//       </div>

//       {/* Question Area */}
//       <div className="bg-whitish w-full p-4 sm:p-6 my-4 rounded-3xl relative z-10 shadow-sm border border-gray-200">
//         {/* Render the appropriate UI for the current question */}
//         {currentQuestion && renderQuestionUI(currentQuestion, currentStep)}
//         {!currentQuestion && questions.length > 0 && (
//           <p className="text-center">End of questions.</p>
//         )}

//         {/* Navigation Buttons (only if not in review or if review but not at the end) */}
//         {!isReviewing && questions.length > 0 && (
//           <div
//             className={`flex ${
//               currentStep > 0 ? "justify-between" : "justify-end"
//             } items-center mt-6`}
//           >
//             {currentStep > 0 && (
//               <button
//                 onClick={handleBack}
//                 className="px-10 py-2 border border-green-tint text-green-tint text-sm rounded-full hover:opacity-65 transition-colors duration-200"
//               >
//                 Back
//               </button>
//             )}
//             <button
//               onClick={handleNext}
//               className={`px-10 py-2 bg-green-tint hover:opacity-85 text-white text-sm rounded-full transition-all duration-200 ${
//                 !selectedAnswers[currentQuestion?.id] && !isReviewing
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:scale-105"
//               }`}
//               disabled={!selectedAnswers[currentQuestion?.id] && !isReviewing} // Disable Next if no answer selected for the current question and not reviewing
//             >
//               {/* Change button text on the last question */}
//               {currentStep === questions.length - 1 ? "Finish" : "Next"}
//             </button>
//           </div>
//         )}
//         {isReviewing &&
//           questions.length > 0 &&
//           currentStep < questions.length - 1 && (
//             <div className="flex justify-end items-center mt-6">
//               <button
//                 onClick={handleNext}
//                 className="px-10 py-2 bg-green-tint hover:opacity-85 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         {isReviewing &&
//           questions.length > 0 &&
//           currentStep === questions.length - 1 && (
//             <div className="flex justify-end items-center mt-6">
//               <button
//                 onClick={() => {
//                   // Reset review state in the parent component// Assuming you have a way to communicate this back to the parent
//                   // For example, by calling a function passed as a prop
//                   // or by updating a state in the parent.
//                   // Since QuizQuestion is now directly rendered in Quiz,
//                   // you can update the isReviewing state in the Quiz component.
//                   // You'll need to pass a setter function from Quiz to QuizQuestion.
//                   // For now, let's assume you want to go back to the results screen.
//                   // You would need to manage the 'isReviewing' state in the parent 'Quiz' component.
//                   // For this example, we'll just log a message.
//                   console.log("Review finished.");
//                   // If you passed a function to handle review completion:
//                   // onReviewComplete();
//                 }}
//                 className="px-10 py-2 bg-green-tint hover:opacity-85 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
//               >
//                 Finish Review
//               </button>
//             </div>
//           )}
//       </div>
//     </section>
//   );
// };

// export default QuizQuestion;

///___________________________________//
// import { useEffect, useState } from "react";
// import { BiCheckCircle } from "react-icons/bi";
// import { useParams } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext"; // Assuming path is correct
// import Loader2 from "../../../components/Loaders/Loader2"; // Assuming path is correct
// import { toast } from "sonner";
// import eth from "../../../assets/img/dashboards/quiz/eth.png"; // Assuming path is correct
// import binance from "../../../assets/img/dashboards/quiz/btcp.png"; // Assuming path is correct
// import tbx from "../../../assets/img/dashboards/quiz/tbx.png"; // Assuming path is correct
// import bela from "../../../assets/img/dashboards/quiz/bela.png"; // Assuming path is correct
// import challengeImage from "../../../assets/img/dashboards/quiz/question.gif"; // Assuming path is correct
// import ProgressBar from "./ProgressBar"; // Assuming path is correct

// // Define options outside the component as it's static data
// const options = [
//   { key: "optionA", image: eth },
//   { key: "optionB", image: tbx },
//   { key: "optionC", image: binance },
//   { key: "optionD", image: bela },
// ];

// const QuizQuestion = ({
//   isReviewing,
//   quizData,
//   submittedAnswers,
//   onReviewComplete,
// }) => {
//   // State Hooks
//   const [currentStep, setCurrentStep] = useState(0); // index-based step for questions
//   const [questions, setQuestions] = useState([]); // Array to hold fetched quiz questions
//   const [selectedAnswers, setSelectedAnswers] = useState({}); // Object to store user's answers { questionId: selectedOptionKey }
//   const [quizSubmitted, setQuizSubmitted] = useState(false); // Flag indicating if the quiz has been submitted
//   const [quizResults, setQuizResults] = useState(null); // State to hold fetched quiz results
//   const [quizCourses, setQuizCourses] = useState(null); // State to hold quiz/course metadata

//   // Router Hooks
//   const { courseId, lessonId } = useParams();

//   // Context Hooks
//   const { getQuizByChapter, quizLoading, submitQuizAnswers, getQuizScore } =
//     useAuth();

//   useEffect(() => {
//     const fetchQuizData = async () => {
//       try {
//         if (courseId && lessonId) {
//           console.log(`Workspaceing quiz for lessonId: ${lessonId}`);
//           const data = await getQuizByChapter(lessonId);
//           setQuestions(data?.data || []); // Ensure questions is always an array
//           setQuizCourses(data?.data?.[0]); // Store metadata if available
//           console.log("Fetched quiz data:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching quiz data:", error);
//         toast.error("Failed to load quiz questions.");
//         setQuestions([]); // Reset questions on error
//       }
//     };

//     if (!isReviewing && !quizData) {
//       fetchQuizData();
//     } else if (isReviewing && quizData) {
//       setQuestions(quizData);
//       const initialSelectedAnswers = {};
//       quizData.forEach((question) => {
//         const submittedAnswer = submittedAnswers?.find(
//           (ans) => ans.quizId === question.id
//         );
//         if (submittedAnswer) {
//           initialSelectedAnswers[question.id] = submittedAnswer.selectedOption;
//         }
//       });
//       setSelectedAnswers(initialSelectedAnswers);
//       setQuizSubmitted(true);
//     }

//     if (!isReviewing) {
//       setCurrentStep(0);
//       setSelectedAnswers({});
//       setQuizSubmitted(false);
//       setQuizResults(null);
//       setQuizCourses(null);
//     }
//   }, [lessonId, courseId, isReviewing, quizData, submittedAnswers]);

//   const handleOptionSelect = (questionId, selected) => {
//     if (!isReviewing) {
//       setSelectedAnswers((prev) => ({
//         ...prev,
//         [questionId]: selected,
//       }));
//     }
//   };

//   const handleNext = () => {
//     if (currentStep < questions.length) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   const handleSubmitQuiz = async () => {
//     if (isReviewing) return;

//     const answers = Object.entries(selectedAnswers).map(
//       ([quizId, selectedOption]) => ({
//         quizId,
//         selectedOption,
//       })
//     );

//     const payload = {
//       chapterId: lessonId,
//       courseId,
//       answers,
//     };

//     console.log("Submitting quiz with payload:", payload);

//     try {
//       const response = await submitQuizAnswers(payload);
//       console.log("Quiz submitted successfully:", response);
//       toast.success(
//         response?.data?.[0]?.message || "Quiz submitted successfully!"
//       );
//       setQuizSubmitted(true);
//     } catch (err) {
//       console.error("Quiz submission failed:", err);
//       const errorMsg =
//         err.response?.data?.message ||
//         "Quiz submission failed. Please try again.";
//       toast.error(errorMsg);
//     }
//   };

//   if (!isReviewing && quizLoading) {
//     console.log("Quiz Loading...");
//     return <Loader2 />;
//   }

//   if (!isReviewing && !quizLoading && questions.length === 0) {
//     console.log("No questions available.");
//     return (
//       <div className="text-center flex flex-col justify-center items-center min-h-60">
//         <div className="challenge w-full flex justify-center ">
//           <div className="w-40 ">
//             <img
//               src={challengeImage}
//               alt="No questions"
//               className="w-full object-cover"
//             />
//           </div>
//         </div>
//         <h2 className="text-xl font-semibold mt-4">No Questions Available</h2>
//         <p className="text-gray-600">
//           Sorry, there are no quiz questions for this chapter yet.
//         </p>
//       </div>
//     );
//   }

//   if (!isReviewing && currentStep === questions.length && !quizSubmitted) {
//     console.log("Ready to submit step.");
//     return (
//       <div className="text-center min-h-60 flex flex-col justify-center items-center">
//         <h2 className="text-xl font-semibold !mb-4">
//           Ready to submit your quiz? 📝
//         </h2>
//         <p className="text-gray-600">You’ve answered all questions.</p>
//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={handleBack}
//             className="!px-10 !py-2  text-green-tint border border-green-tint rounded-full hover:scale-105 transition-transform duration-200"
//           >
//             Go Back
//           </button>
//           <button
//             onClick={handleSubmitQuiz}
//             className="!px-6 !py-2 bg-green-tint  text-white rounded-full hover:scale-105 transition-transform duration-200"
//             disabled={quizLoading}
//           >
//             {quizLoading ? "Submitting..." : "Yes, Submit"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const renderQuestionUI = (question) => {
//     if (!question) return <p>Error loading question.</p>;

//     return (
//       <>
//         <h2 className="text-lg font-semibold !mb-4">{question?.question}</h2>
//         <div className="space-y-3">
//           {["optionA", "optionB", "optionC", "optionD"].map((key) => {
//             const value = question[key];
//             if (!value) return null;

//             const isSelected = selectedAnswers[question.id] === key;
//             const isCorrect = question.isCorrect === key;
//             const showCorrect = isReviewing;

//             let borderClass = "border-transparent hover:border-gray-300";
//             if (showCorrect) {
//               if (isCorrect) {
//                 borderClass = "border-green-500";
//               } else if (isSelected && !isCorrect) {
//                 borderClass = "border-red-500";
//               }
//             } else if (isSelected) {
//               borderClass = "border-green-tint";
//             }

//             let backgroundClass = "bg-white";
//             if (showCorrect && isCorrect) {
//               backgroundClass = "bg-green-tint/10";
//             }

//             return (
//               <label
//                 key={key}
//                 className={`flex items-center justify-between ${backgroundClass} p-3 rounded-xl cursor-pointer transition-all duration-200 ${borderClass} ${
//                   isSelected && !showCorrect ? "ring-2 ring-green-tint/40" : ""
//                 } ${
//                   isSelected && showCorrect && !isCorrect
//                     ? "ring-2 ring-red-500/40"
//                     : ""
//                 } ${
//                   showCorrect && isCorrect && !isSelected
//                     ? "ring-2 ring-green-tint/40"
//                     : ""
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <span
//                     className={`flex items-center justify-center font-semibold rounded-md w-8 h-8 text-sm ${
//                       isSelected
//                         ? isCorrect
//                           ? "bg-green-tint text-white"
//                           : showCorrect
//                           ? "bg-red-500 text-white"
//                           : "bg-green-tint text-white"
//                         : isCorrect && showCorrect
//                         ? "bg-green-tint text-white"
//                         : "bg-gray-200 text-gray-800"
//                     }`}
//                   >
//                     {key.slice(-1)}
//                   </span>
//                   <span
//                     className={`text-sm ${
//                       isSelected ? "text-black font-medium" : "text-gray-700"
//                     } ${
//                       isCorrect && showCorrect
//                         ? "font-bold text-green-tint"
//                         : ""
//                     }`}
//                   >
//                     {value}
//                   </span>
//                 </div>
//                 <input
//                   type="radio"
//                   name={`question-${question.id}`}
//                   value={key}
//                   checked={isSelected}
//                   onChange={() => handleOptionSelect(question.id, key)}
//                   className="sr-only"
//                   disabled={isReviewing}
//                 />
//                 <div
//                   className={`w-5 h-5 border-none rounded-full flex items-center justify-center ${
//                     isSelected
//                       ? isCorrect
//                         ? "border-green-tint bg-green-tint"
//                         : showCorrect
//                         ? "border-red-500 bg-red-500"
//                         : "border-green-tint bg-green-tint"
//                       : isCorrect && showCorrect
//                       ? "border-green-tint bg-green-tint"
//                       : "border-gray-400"
//                   }`}
//                 >
//                   {(isSelected && (
//                     <BiCheckCircle className="text-white w-3 h-3" />
//                   )) ||
//                     (isCorrect && showCorrect && (
//                       <BiCheckCircle className="text-white w-3 h-3" />
//                     ))}
//                 </div>
//               </label>
//             );
//           })}
//         </div>
//       </>
//     );
//   };
//   console.log("quiz courses", quizCourses);
//   const currentQuestion = questions[currentStep];
//   const progressPercentage =
//     questions.length > 0 && currentStep < questions.length
//       ? ((currentStep + 1) / questions.length) * 100
//       : 100;

//   console.log(
//     `Rendering question step: ${currentStep}, Question ID: ${currentQuestion?.id}, isReviewing: ${isReviewing}`
//   );

//   return (
//     <section className="quiz-container">
//       {/* Quiz Header */}
//       <div className="flex flex-col justify-center items-center font-nueue mb-6">
//         <h1 className="font-bebas text-2xl sm:text-3xl !pb-1">
//           {quizCourses?.course?.name || "Course"} QUIZ 💎
//         </h1>
//         <p className="pb-3 font-nueue text-sm text-gray-600">
//           Chapter: {quizCourses?.chapter?.title || "Current Chapter"}
//         </p>
//         {!isReviewing && (
//           <div className="w-full sm:w-2/3 px-4 sm:px-0">
//             <ProgressBar percentage={progressPercentage} />
//             <p className="text-xs text-gray-500 text-center mt-1">
//               Question {currentStep + 1} of {questions.length}
//             </p>
//           </div>
//         )}
//         {isReviewing && (
//           <p className="text-sm text-gray-600 mt-2">Reviewing your answers.</p>
//         )}
//       </div>

//       {/* Question Area */}
//       <div className="bg-whitish w-full p-4 sm:p-6 my-4 rounded-3xl relative z-10 shadow-sm border border-gray-200">
//         {currentQuestion && renderQuestionUI(currentQuestion)}
//         {!currentQuestion && questions.length > 0 && (
//           <p className="text-center">End of questions.</p>
//         )}

//         {!isReviewing && questions.length > 0 && (
//           <div
//             className={`flex ${
//               currentStep > 0 ? "justify-between" : "justify-end"
//             } items-center mt-6`}
//           >
//             {currentStep > 0 && (
//               <button
//                 onClick={handleBack}
//                 className="px-10 py-2 border border-green-tint text-green-tint text-sm rounded-full hover:opacity-65 transition-colors duration-200"
//               >
//                 Back
//               </button>
//             )}
//             <button
//               onClick={handleNext}
//               className={`px-10 py-2 bg-green-tint hover:opacity-85 text-white text-sm rounded-full transition-all duration-200 ${
//                 !selectedAnswers[currentQuestion?.id] && !isReviewing
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:scale-105"
//               }`}
//               disabled={!selectedAnswers[currentQuestion?.id] && !isReviewing}
//             >
//               {currentStep === questions.length - 1 ? "Finish" : "Next"}
//             </button>
//           </div>
//         )}
//         {isReviewing &&
//           questions.length > 0 &&
//           currentStep < questions.length - 1 && (
//             <div className="flex justify-end items-center mt-6">
//               <button
//                 onClick={handleNext}
//                 className="px-10 py-2 bg-green-tint hover:opacity-85 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         {isReviewing &&
//           questions.length > 0 &&
//           currentStep === questions.length - 1 && (
//             <div className="flex justify-end items-center mt-6">
//               <button
//                 onClick={() => {
//                   // Assuming you have a way to communicate this back to the parent
//                   // For example, by calling a function passed as a prop
//                   // or by updating a state in the parent.
//                   // Since QuizQuestion is now directly rendered in Quiz,
//                   // you can update the isReviewing state in the Quiz component.
//                   // You'll need to pass a setter function from Quiz to QuizQuestion.
//                   onReviewComplete(); // Go back to the results screen in the parent
//                 }}
//                 className="px-10 py-2 bg-green-tint hover:opacity-85 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
//               >
//                 Finish Review
//               </button>
//             </div>
//           )}
//       </div>
//     </section>
//   );
// };

// export default QuizQuestion;

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

// Define options outside the component as it's static data
const options = [
  { key: "optionA", image: eth },
  { key: "optionB", image: tbx },
  { key: "optionC", image: binance },
  { key: "optionD", image: bela },
];

const QuizQuestion = ({ isReviewing, submittedAnswers, onReviewComplete }) => {
  // State Hooks
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [quizCourses, setQuizCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Router Hooks
  const { courseId, lessonId } = useParams();

  // Context Hooks
  const { getQuizByChapter, quizLoading, submitQuizAnswers } = useAuth();

  useEffect(() => {
    const fetchQuizData = async () => {
      setIsLoading(true);
      try {
        if (courseId && lessonId) {
          console.log(`Fetching quiz for lessonId: ${lessonId}`);
          const data = await getQuizByChapter(lessonId);
          setQuestions(data?.data || []);
          setQuizCourses(data?.data?.[0]);
          console.log("Fetched quiz data:", data);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        toast.error("Failed to load quiz questions.");
        setQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isReviewing) {
      fetchQuizData();
      setCurrentStep(0);
      setSelectedAnswers({});
      setQuizSubmitted(false);
      setQuizResults(null);
    } else if (isReviewing) {
      setIsLoading(true);
      fetchQuizData(); // Fetch questions again for review mode
      setCurrentStep(0);
      setSelectedAnswers({});
      setQuizSubmitted(true); // Consider this state for review mode
      setIsLoading(false);
    }
  }, [lessonId, courseId, isReviewing]);

  useEffect(() => {
    if (
      isReviewing &&
      questions.length > 0 &&
      Array.isArray(submittedAnswers)
    ) {
      const initialSelectedAnswers = {};
      questions.forEach((question) => {
        const submittedAnswer = submittedAnswers.find(
          (ans) => ans.quizId === question.id
        );
        if (submittedAnswer) {
          initialSelectedAnswers[question.id] = submittedAnswer.selectedOption;
          console.log(
            `Set answer for review question ${question.id}: ${submittedAnswer.selectedOption}`
          );
        }
      });
      setSelectedAnswers(initialSelectedAnswers);
    }
  }, [isReviewing, questions, submittedAnswers]);

  const handleOptionSelect = (questionId, selected) => {
    if (!isReviewing) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: selected,
      }));
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (isReviewing) return;

    const answers = Object.entries(selectedAnswers).map(
      ([quizId, selectedOption]) => ({
        quizId,
        selectedOption,
      })
    );

    const payload = {
      chapterId: lessonId,
      courseId,
      answers,
    };

    console.log("Submitting quiz with payload:", payload);

    try {
      const response = await submitQuizAnswers(payload);
      console.log("Quiz submitted successfully:", response);
      toast.success(
        response?.data?.[0]?.message || "Quiz submitted successfully!"
      );
      setQuizSubmitted(true);
    } catch (err) {
      console.error("Quiz submission failed:", err);
      const errorMsg =
        err.response?.data?.message ||
        "Quiz submission failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  const renderQuestionUI = (question) => {
    if (!question) {
      console.warn("Attempting to render undefined question");
      return <p>Error loading question.</p>;
    }

    console.log("Rendering question:", question);

    return (
      <>
        <h2 className="text-lg font-semibold !mb-4">{question?.question}</h2>
        <div className="space-y-3">
          {["optionA", "optionB", "optionC", "optionD"].map((key) => {
            const value = question[key];
            if (!value) return null;

            const isSelected = selectedAnswers[question.id] === key;
            const isCorrect = question.isCorrect === key;
            const showCorrect = isReviewing;

            let borderClass = "border-transparent hover:border-gray-300";
            if (showCorrect) {
              if (isCorrect) {
                borderClass = "border-green-500";
              } else if (isSelected && !isCorrect) {
                borderClass = "border-red-500";
              }
            } else if (isSelected) {
              borderClass = "border-green-tint";
            }

            let backgroundClass = "bg-white";
            if (showCorrect && isCorrect) {
              backgroundClass = "bg-green-tint/10";
            }

            return (
              <label
                key={key}
                className={`flex items-center justify-between ${backgroundClass} p-3 rounded-xl cursor-pointer transition-all duration-200 ${borderClass} ${
                  isSelected && !showCorrect ? "ring-2 ring-green-tint/40" : ""
                } ${
                  isSelected && showCorrect && !isCorrect
                    ? "ring-2 ring-red-500/40"
                    : ""
                } ${
                  showCorrect && isCorrect && !isSelected
                    ? "ring-2 ring-green-tint/40"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`flex items-center justify-center font-semibold rounded-md w-8 h-8 text-sm ${
                      isSelected
                        ? isCorrect || !showCorrect
                          ? "bg-green-tint text-white"
                          : "bg-red-500 text-white"
                        : isCorrect && showCorrect
                        ? "bg-green-tint text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {key.slice(-1)}
                  </span>
                  <span
                    className={`text-sm ${
                      isSelected ? "text-black font-medium" : "text-gray-700"
                    } ${
                      isCorrect && showCorrect
                        ? "font-bold text-green-tint"
                        : ""
                    }`}
                  >
                    {value}
                  </span>
                </div>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={key}
                  checked={isSelected}
                  onChange={() => handleOptionSelect(question.id, key)}
                  className="sr-only"
                  disabled={isReviewing}
                />
                <div
                  className={`w-5 h-5 border-none rounded-full flex items-center justify-center ${
                    isSelected
                      ? isCorrect || !showCorrect
                        ? "border-green-tint bg-green-tint"
                        : "border-red-500 bg-red-500"
                      : isCorrect && showCorrect
                      ? "border-green-tint bg-green-tint"
                      : "border-gray-400"
                  }`}
                >
                  {(isSelected || (isCorrect && showCorrect)) && (
                    <BiCheckCircle className="text-white w-3 h-3" />
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </>
    );
  };

  // Get current question
  const currentQuestion = questions[currentStep];

  // Calculate progress percentage
  const progressPercentage =
    questions.length > 0 ? ((currentStep + 1) / questions.length) * 100 : 100;

  console.log(
    `Rendering question step: ${currentStep}, Question ID: ${currentQuestion?.id}, isReviewing: ${isReviewing}`
  );
  console.log("current quest", currentQuestion);
  console.log("quiz courses", quizCourses);
  console.log("questions array:", questions);
  console.log("selectedAnswers:", selectedAnswers);

  // Loading state
  if (quizLoading || isLoading) {
    console.log("Quiz Loading...");
    return <Loader2 />;
  }

  // No questions available state
  if (!questions || questions.length === 0) {
    console.log("No questions available.");
    return (
      <div className="text-center flex flex-col justify-center items-center min-h-60">
        <div className="challenge w-full flex justify-center ">
          <div className="w-40 ">
            <img
              src={challengeImage}
              alt="No questions"
              className="w-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-4">No Questions Available</h2>
        <p className="text-gray-600">
          Sorry, there are no quiz questions for this chapter yet.
        </p>
      </div>
    );
  }

  // Submit quiz step
  if (!isReviewing && currentStep === questions.length && !quizSubmitted) {
    console.log("Ready to submit step.");
    return (
      <div className="text-center min-h-60 flex flex-col justify-center items-center">
        <h2 className="text-xl font-semibold !mb-4">
          Ready to submit your quiz? 📝
        </h2>
        <p className="text-gray-600">You've answered all questions.</p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleBack}
            className="!px-10 !py-2 text-green-tint border border-green-tint rounded-full hover:scale-105 transition-transform duration-200"
          >
            Go Back
          </button>
          <button
            onClick={handleSubmitQuiz}
            className="!px-6 !py-2 bg-green-tint text-white rounded-full hover:scale-105 transition-transform duration-200"
            disabled={quizLoading}
          >
            {quizLoading ? "Submitting..." : "Yes, Submit"}
          </button>
        </div>
      </div>
    );
  }
  console.log("QUIZ COURSES", quizCourses);
  return (
    <section className="quiz-container">
      {/* Quiz Header */}
      <div className="flex flex-col justify-center items-center font-nueue mb-6">
        <h1 className="font-bebas text-2xl sm:text-3xl !pb-1">
          {quizCourses?.course?.name || "Course"} QUIZ 💎
        </h1>
        <p className="pb-3 font-nueue text-sm text-gray-600">
          Chapter: {quizCourses?.chapter?.title || "Current Chapter"}
        </p>
        {!isReviewing && (
          <div className="w-full sm:w-2/3 px-4 sm:px-0">
            <ProgressBar percentage={progressPercentage} />
            <p className="text-xs text-gray-500 text-center mt-1">
              Question {currentStep + 1} of {questions.length}
            </p>
          </div>
        )}
        {isReviewing && (
          <p className="text-sm text-gray-600 mt-2">Reviewing your answers.</p>
        )}
      </div>

      {/* Question Area */}
      <div className="bg-whitish w-full p-4 sm:p-6 my-4 rounded-3xl relative z-10 shadow-sm border border-gray-200">
        {currentQuestion ? (
          renderQuestionUI(currentQuestion)
        ) : (
          <p className="text-center">No question available.</p>
        )}

        {/* Navigation buttons - Normal mode */}
        {!isReviewing && currentQuestion && (
          <div
            className={`flex ${
              currentStep > 0 ? "justify-between" : "justify-end"
            } items-center mt-6`}
          >
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-10 py-2 border border-green-tint text-green-tint text-sm rounded-full hover:opacity-65 transition-colors duration-200"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className={`px-10 py-2 bg-green-tint hover:opacity-85 text-white text-sm rounded-full transition-all duration-200 ${
                !selectedAnswers[currentQuestion?.id] && !isReviewing
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              disabled={!selectedAnswers[currentQuestion?.id] && !isReviewing}
            >
              {currentStep === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        )}

        {/* Navigation buttons - Review mode */}
        {isReviewing && currentQuestion && (
          <div className="flex justify-between items-center mt-6">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-10 py-2 border border-green-tint text-green-tint text-sm rounded-full hover:opacity-65 transition-colors duration-200"
              >
                Back
              </button>
            )}
            {currentStep < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-10 py-2 bg-green-tint hover:opacity-85 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
              >
                Next
              </button>
            ) : (
              <button
                onClick={onReviewComplete}
                className="px-10 py-2 bg-green-tint hover:opacity-85 text-white text-sm rounded-full transition-all duration-200 hover:scale-105"
              >
                Finish Review
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuizQuestion;
