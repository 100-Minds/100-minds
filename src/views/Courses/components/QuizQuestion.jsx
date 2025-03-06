import { useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import eth from "../../../assets/img/dashboards/quiz/eth.png";
import binance from "../../../assets/img/dashboards/quiz/btcp.png";
import tbx from "../../../assets/img/dashboards/quiz/tbx.png";
import bela from "../../../assets/img/dashboards/quiz/bela.png";

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);

  const handleNext = () => {
    setSelectedOption(null); // Reset selection when moving to next question
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setSelectedOption(null);
    setCurrentStep((prev) => prev - 1);
  };

  const options = [
    { id: "tbx", src: tbx, alt: "TBX Logo" },
    { id: "eth", src: eth, alt: "Ethereum Logo" },
    { id: "binance", src: binance, alt: "Binance Logo" },
    { id: "bela", src: bela, alt: "Bela Logo" },
  ];
  return (
    <div className="">
      {/** 🌟 SWITCH BETWEEN QUESTIONS BASED ON `currentStep` */}
      {(() => {
        switch (currentStep) {
          case 1:
            return (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  What does "mining" in cryptocurrency refer to?
                </h2>
                <div className="space-y-3">
                  {[
                    { id: "A", text: "Digging physical coins" },
                    {
                      id: "B",
                      text: "Verifying transactions and adding them to the blockchain",
                    },
                    { id: "C", text: "Creating new wallets" },
                    { id: "D", text: "Storing digital assets" },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center justify-between bg-white p-3 rounded-2xl cursor-pointer hover:scale-[1.01]"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="bg-gray-200 text-gray-800 font-semibold px-3 py-1 rounded-md">
                          {option.id}
                        </span>
                        <span className="text-gray-700">{option.text}</span>
                      </div>
                      <input
                        type="radio"
                        name="quiz1"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={() => setSelectedOption(option.id)}
                        className="hidden"
                      />
                      {selectedOption === option.id ? (
                        <BiCheckCircle className="text-green-tint w-6 h-6" />
                      ) : (
                        <div className="w-6 h-6 border border-gray-400 rounded-full"></div>
                      )}
                    </label>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 gradient text-sm  text-white rounded-4xl hover:scale-105"
                  >
                    Next
                  </button>
                </div>
              </div>
            );

          case 2:
            return (
              <div>
                <div className="flex lg:flex-row flex-col items-center lg:px-20 lg:gap-7">
                  <h1 className="text-lg font-semibold font-bebas lg:text-4xl pb-2">
                    What is the logo for Ethereum?
                  </h1>
                  <div className="grid grid-cols-2 gap-12 py-8">
                    {options.map((option) => (
                      <label
                        key={option.id}
                        className={`relative w-40 h-40 bg-white object-contain p-6 rounded-3xl cursor-pointer transition hover:scale-105 
              ${selectedOption2 === option.id ? "ring-4 ring-green-tint" : ""}`}
                      >
                        <img
                          src={option.src}
                          alt={option.alt}
                          className="w-full h-[85%] object-contain"
                        />
                        {/* Hidden Radio Button */}
                        <input
                          type="radio"
                          name="logo"
                          value={option.id}
                          checked={selectedOption2 === option.id}
                          onChange={() => setSelectedOption2(option.id)}
                          className="hidden"
                        />
                        {/* Checkmark Below */}
                        <div className="flex justify-center ">
                          {selectedOption2 === option.id ? (
                            <BiCheckCircle className="text-green-tint w-5 h-5 mt-2" />
                          ) : (
                            <div className="w-4 h-4 border border-gray-400 rounded-full mt-3"></div>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => console.log("Back")}
                    className="px-4 py-1.5 bg-white text-sm rounded-4xl hover:scale-105"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 gradient text-sm text-white rounded-4xl hover:scale-105"
                    disabled={!selectedOption2} // Prevents moving forward without selecting an option
                  >
                    Next
                  </button>
                </div>
              </div>
            );

          //   case 3:
          //     return (
          //       <div>
          //         <h2 className="text-lg font-semibold mb-4">
          //           Bitcoin was the first cryptocurrency. True or False?
          //         </h2>
          //         <div className="space-y-3">
          //           {[
          //             { id: "A", text: "True" },
          //             { id: "B", text: "False" },
          //           ].map((option) => (
          //             <label
          //               key={option.id}
          //               className="flex items-center justify-between bg-white p-3 rounded-2xl cursor-pointer hover:scale-[1.01]"
          //             >
          //               <div className="flex items-center space-x-3">
          //                 <span className="bg-gray-200 text-gray-800 font-semibold px-3 py-1 rounded-md">
          //                   {option.id}
          //                 </span>
          //                 <span className="text-gray-700">{option.text}</span>
          //               </div>
          //             </label>
          //           ))}
          //         </div>
          //         <div className="flex justify-between mt-6">
          //           <button
          //             onClick={handleBack}
          //             className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:scale-105"
          //           >
          //             Back
          //           </button>
          //           <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:scale-105">
          //             Finish
          //           </button>
          //         </div>
          //       </div>
          //     );

          //   case 3:
          //     return (
          //       <div>
          //         <h2 className="text-lg font-semibold mb-4">
          //           Does Bitcoin use a Proof of Work consensus mechanism?
          //         </h2>
          //         <div className="space-y-3">
          //           {[
          //             { id: "yes", text: "Yes" },
          //             { id: "no", text: "No" },
          //           ].map((option) => (
          //             <label
          //               key={option.id}
          //               className="flex items-center justify-between bg-white p-3 rounded-2xl cursor-pointer hover:scale-[1.01]"
          //             >
          //               <div className="flex items-center space-x-3">
          //                 <span className="bg-gray-200 text-gray-800 font-semibold px-3 py-1 rounded-md">
          //                   {option.id.toUpperCase()}
          //                 </span>
          //                 <span className="text-gray-700">{option.text}</span>
          //               </div>
          //               <input
          //                 type="radio"
          //                 name="quiz3"
          //                 value={option.id}
          //                 checked={selectedOption3 === option.id}
          //                 onChange={() => setSelectedOption3(option.id)}
          //                 className="hidden"
          //               />
          //               {selectedOption3 === option.id ? (
          //                 <BiCheckCircle className="text-green-tint w-6 h-6" />
          //               ) : (
          //                 <div className="w-6 h-6 border border-gray-400 rounded-full"></div>
          //               )}
          //             </label>
          //           ))}
          //         </div>
          //         <div className="flex justify-between mt-6">
          //           <button
          //             onClick={handleBack}
          //             className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:scale-105"
          //           >
          //             Back
          //           </button>
          //           <button
          //             onClick={() => setCurrentStep(4)} // Go to grading page
          //             className="px-4 py-2 bg-green-500 text-white rounded-lg hover:scale-105"
          //             disabled={!selectedOption3} // Prevent Next if no selection
          //           >
          //             Next
          //           </button>
          //         </div>
          //       </div>
          //     );

          case 3:
            return (
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-lg font-semibold mb-4">
                  Does Bitcoin use a Proof of Work consensus mechanism?
                </h2>
                <div className="space-y-3 flex">
                  {[
                    { id: "yes", text: "Yes" },
                    { id: "no", text: "No" },
                  ].map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setSelectedOption3(option.id)}
                      className={`flex mr-6 items-center justify-center  bg-white p-4 w-40 h-20 rounded-2xl cursor-pointer hover:scale-[1.02] transition-all duration-200 ${
                        selectedOption3 === option.id
                          ? "border-2 border-green-tint shadow-md"
                          : "border border-gray-300"
                      }`}
                    >
                      <span className="text-lg font-medium text-gray-800 ">
                        {option.text}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-6 gap-4">
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:scale-105"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)} // Go to grading page
                    className="px-4 py-2 bg-green-tint text-white rounded-lg hover:scale-105"
                    disabled={!selectedOption3} // Prevent Next if no selection
                  >
                    Next
                  </button>
                </div>
              </div>
            );

          case 4:
            return (
              <div className="text-center min-h-60 flex  flex-col justify-center items-center">
                <h2 className="text-xl font-semibold mb-4">
                  Quiz Complete! 🎉
                </h2>
                <p>
                  Your answers have been recorded. We will calculate your score.
                </p>
                <button
                  onClick={() => console.log("Show Results")} // Replace with grading logic
                  className="mt-4 px-4 py-2 bg-green-tint text-white rounded-lg hover:scale-105"
                >
                  View Results
                </button>
              </div>
            );

          default:
            return <h2 className="text-center">Quiz Complete! 🎉</h2>;
        }
      })()}
    </div>
  );
};

export default Quiz;
