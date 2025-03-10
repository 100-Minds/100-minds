// import { FaMicrophone } from "react-icons/fa";

// export default function AIChatIntro() {
//   return (
//     <div className="flex flex-col justify-between bg-white rounded-3xl !p-6 min-h-[60vh]">
//       <div className=" text-center !p-6 font-nueue !pt-22 ">
//         <h1 className="text-xl font-semibold text-gray-400">
//           Hi Grant, Welcome{" "}
//           <span>
//             <br />
//           </span>{" "}
//           lets get you started
//         </h1>
//         <p className="!mt-3 text-gray-400 text-sm">
//           Our AI Chat module enables you to learn and know more in a more
//           engaging and resourceful way.
//         </p>
//         {/* <button className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
//           Get started
//         </button> */}
//       </div>
//       <div className="flex items-center w-full !mt-6 !p-3 rounded-full shadow-md bg-gray-50">
//         <input
//           type="text"
//           placeholder="Type your reply"
//           className="flex-grow !p-2 outline-none text-gray-700 "
//         />
//         <FaMicrophone className="text-gray-400 text-xl cursor-pointer hover:text-blue-700" />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";

export default function AIChatIntro() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, type: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { text: `AI Response to: "${input}"`, type: "ai" };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-between bg-white rounded-3xl !p-6 min-h-[60vh]">
      <div className="text-center !p-6 font-nueue !pt-22">
        <h1 className="text-xl font-semibold text-gray-400">
          Hi Grant, Welcome{" "}
          <span>
            <br />
          </span>{" "}
          let's get you started
        </h1>
        <p className="!mt-3 text-gray-400 text-sm">
          Our AI Chat module enables you to learn and know more in a more
          engaging and resourceful way.
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[40vh] px-2 py-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg text-sm max-w-[75%] ${
              msg.type === "user"
                ? "bg-white text-gray-700 self-end shadow-md"
                : "bg-green-500 text-white self-start shadow-md"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center w-full !mt-6 !p-3 rounded-full shadow-md bg-gray-50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your reply"
          className="flex-grow !p-2 outline-none text-gray-700 bg-transparent"
        />
        <button
          onClick={handleSendMessage}
          className="text-gray-400 text-xl cursor-pointer hover:text-blue-700"
        >
          <FaPaperPlane />
        </button>
        <FaMicrophone className="text-gray-400 text-xl cursor-pointer hover:text-blue-700 ml-3" />
      </div>
    </div>
  );
}
