import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { useAuth } from "../../../context/AuthContext";
import ProgressBar from "./ProgressBar";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const GetAssessment = ({ hasTakenAssessment, setHasTakenAssessment }) => {
  const { getAllAssessments, submitAssessmentAnswers } = useAuth();
  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const data = await getAllAssessments(courseId);
        if (data && data.data) {
          setAssessmentQuestions(data.data);
        }
      } catch (error) {
        console.error("Error fetching assessment:", error);
      }
    };

    if (!hasTakenAssessment) {
      fetchAssessment();
    }
  }, [courseId, hasTakenAssessment]);

  const handleOptionSelect = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmitAssessment = async () => {
    // Prepare the answers array with assessmentId and selectedOption
    const answersArray = Object.keys(selectedAnswers).map((questionId) => {
      const selectedOption = selectedAnswers[questionId];
      const question = assessmentQuestions.find((q) => q.id === questionId);

      return {
        assessmentId: question.id, // Assessment ID
        selectedOption: selectedOption, // The selected option (optionA, optionB, etc.)
      };
    });

    try {
      // Submit the assessment answers
      await submitAssessmentAnswers(courseId, answersArray);

      setHasTakenAssessment(true);
      toast.success("Assessment submitted successfully!");

      // Navigate to the lesson route
      navigate(`/courses/${courseId}/lessons/${lessonId}`);
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const currentQuestion = assessmentQuestions[currentStep];
  const totalQuestions = assessmentQuestions.length;

  const renderQuestionUI = (question) => {
    if (!question) return <p>Error loading question.</p>;

    return (
      <>
        <h2 className="text-lg font-semibold !mb-4">{question?.question}</h2>
        <div className="space-y-3">
          {["optionA", "optionB", "optionC", "optionD"].map((key) => {
            const value = question[key];
            if (!value) return null;

            const isSelected = selectedAnswers[question.id] === key;
            const isCorrect = question.isCorrect === key;

            let borderClass = "border-transparent hover:border-gray-300";
            if (isSelected) {
              if (isCorrect) borderClass = "border-green-500";
              else borderClass = "border-red-500";
            }

            let backgroundClass = "bg-white";
            if (isCorrect && isSelected) {
              backgroundClass = "bg-green-tint/10";
            }

            return (
              <label
                key={key}
                className={`flex items-center justify-between ${backgroundClass} p-3 rounded-xl cursor-pointer transition-all duration-200 ${borderClass}`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`flex items-center justify-center font-semibold rounded-md w-8 h-8 text-sm ${
                      isSelected
                        ? "bg-green-tint text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {key.slice(-1)}
                  </span>
                  <span
                    className={`text-sm ${
                      isSelected ? "text-black font-medium" : "text-gray-700"
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
                />
                <div
                  className={`w-5 h-5 border-none rounded-full flex items-center justify-center ${
                    isSelected
                      ? "border-green-tint bg-green-tint"
                      : "border-gray-400"
                  }`}
                >
                  {(isSelected || isCorrect) && (
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

  return (
    <div className="p-12 bg-white rounded-3xl ">
      <div className="flex flex-col justify-center items-center font-nueue mb-6">
        <h1 className="font-bebas text-2xl sm:text-3xl !pb-3">Assessment 💎</h1>
        <div className="w-full sm:w-2/3 px-4 sm:px-0">
          <ProgressBar percentage={(currentStep / totalQuestions) * 100} />
          <p className="text-xs text-gray-500 text-center mt-1 py-4">
            Question {currentStep + 1} of {totalQuestions}
          </p>
        </div>
      </div>

      {assessmentQuestions.length === 0 ? (
        <p>No questions available yet.</p>
      ) : (
        <div className="bg-whitish p-12 rounded-3xl py-10">
          <div className="mb-6">
            {renderQuestionUI(assessmentQuestions[currentStep])}
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              disabled={currentStep === 0}
              className={`px-12 py-2 rounded-full border ${
                currentStep === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            {currentStep === totalQuestions - 1 ? (
              <button
                onClick={handleSubmitAssessment}
                className="bg-green-tint text-white px-12 py-2 rounded-full"
                disabled={!selectedAnswers[currentQuestion?.id]}
              >
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentStep((prev) =>
                    Math.min(prev + 1, totalQuestions - 1)
                  )
                }
                disabled={!selectedAnswers[currentQuestion?.id]}
                className={`px-12 py-2 rounded-full ${
                  !selectedAnswers[currentQuestion?.id]
                    ? "bg-green-tint text-white cursor-not-allowed"
                    : "bg-green-tint text-white"
                }`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAssessment;
