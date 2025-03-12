// import { useState, useEffect, useRef } from "react";
// import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// export default function AIChatIntro() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const chatEndRef = useRef(null);

//   const handleSendMessage = () => {
//     if (!input.trim()) return;

//     const newMessage = { text: input, type: "user" };
//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");

//     setTimeout(() => {
//       const aiResponse = { text: `AI Response to: "${input}"`, type: "ai" };
//       setMessages((prev) => [...prev, aiResponse]);
//     }, 1000);
//   };

//   // Allow sending with Enter key
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSendMessage();
//   };

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="hidden md:flex flex-col bg-white rounded-3xl !p-6 !min-h-[60vh] !max-h-[60vh]">
//       {/* Animated Header - Disappears when chat starts */}
//       <AnimatePresence>
//         {messages.length === 0 && (
//           <motion.div
//             initial={{ opacity: 1 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="text-center !p-6 font-nueue"
//           >
//             <h1 className="text-xl font-semibold text-gray-400">
//               Hi Grant, Welcome
//               <br /> Let's get you started
//             </h1>
//             <p className="!mt-3 text-gray-400 text-sm">
//               Our AI Chat module enables you to learn and know more in a more
//               engaging and resourceful way.
//             </p>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Chat Messages */}
//       <motion.div
//         className={`flex flex-col gap-3 !px-2 !py-4 !flex-grow !overflow-y-auto relative no-scrollbar transition-all`}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         {messages.map((msg, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//             className={`!p-3 rounded-lg text-sm max-w-[75%] ${
//               msg.type === "user"
//                 ? "bg-white text-gray-700 self-end shadow-md"
//                 : "bg-green-500 text-white self-start shadow-md"
//             }`}
//           >
//             {msg.text}
//           </motion.div>
//         ))}
//         <div ref={chatEndRef} />
//       </motion.div>

//       {/* Input Field - Always Visible */}
//       <div className="flex items-center w-full !mt-6 !p-3 rounded-full shadow-md bg-gray-50">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Type your reply"
//           className="flex-grow !p-2 outline-none text-gray-700 bg-transparent"
//         />
//         <button
//           onClick={handleSendMessage}
//           className="text-gray-400 text-xl cursor-pointer hover:text-blue-700"
//         >
//           <FaPaperPlane />
//         </button>
//         <FaMicrophone className="text-gray-400 text-xl cursor-pointer hover:text-blue-700 !ml-3" />
//       </div>
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function AIChatIntro() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  let recognition;

  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }

  const startListening = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    setIsListening(true);
    recognition.start();
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, type: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      const aiResponse = { text: `AI Response to: "${input}"`, type: "ai" };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="hidden md:flex flex-col bg-white rounded-3xl w-full !p-6 !min-h-[60vh] !max-h-[60vh]">
      <AnimatePresence>
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center !p-6 font-nueue"
          >
            <h1 className="text-xl font-semibold text-gray-400">
              Hi Grant, Welcome
              <br /> Let's get you started
            </h1>
            <p className="!mt-3 text-gray-400 text-sm">
              Our AI Chat module enables you to learn and know more in a more
              engaging and resourceful way.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Messages */}
      <motion.div
        className={`flex flex-col gap-3 !px-2 !py-4 !flex-grow !overflow-y-auto relative no-scrollbar transition-all `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`!p-3 rounded-lg text-sm max-w-[75%] ${
              msg.type === "user"
                ? "bg-white text-gray-700 self-end shadow-md"
                : "bg-green-tint text-white self-start shadow-md"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </motion.div>

      {/* Input Field & Voice */}
      <div className="flex items-center w-full !mt-6 !p-3 rounded-full shadow-md bg-gray-50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type or speak your reply"
          className="flex-grow !p-2 outline-none text-gray-700 bg-transparent"
        />
        {/* <button
          onClick={handleSendMessage}
          className="text-gray-400 text-xl cursor-pointer hover:text-blue-700"
        >
          <FaPaperPlane />
        </button> */}
        <FaMicrophone
          className={`text-gray-400 text-xl cursor-pointer hover:text-green-tint !ml-3 ${
            isListening ? "text-red-500 animate-pulse" : ""
          }`}
          onClick={startListening}
        />
      </div>
    </div>
  );
}
