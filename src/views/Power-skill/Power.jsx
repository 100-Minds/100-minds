// import NavHeader from "../../layouts/NavHeader";
// import img1 from "../../assets/img/dashboards/learningModules/module btn.svg";
// import starz from "../../assets/img/dashboards/teams/avatar5.jpg";
// import { PiClock } from "react-icons/pi";
// import AIChatIntro from "./components/AiChatIntro";
// import PerformanceRating from "./components/PerformanceRating";

// const Power = () => {
//   return (
//     <div className="h-full w-full overflow-hidden   !pt-4 ">
//       <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3 !px-6">
//         <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
//           <NavHeader header={"POWER SKILL"} />
//         </div>
//         <div className="grid grid-cols-7 align-self-end gap-5 min-h-[80vh] ">
//           <div className="col-span-4 bg-white rounded-3xl !p-6 flex  flex-col justify-center items-center  ">
//             <div className="flex">
//               <img
//                 src={starz}
//                 alt=""
//                 className="w-12 h-12 object-contain rounded-full translate-x-3"
//               />
//               <img
//                 src={img1}
//                 alt=""
//                 className="w-18 h-20 object-cover rounded-full -translate-x-3 -translate-y-2 "
//               />
//             </div>
//             <h1 className="font-bebas text-3xl">How to integrate with ease</h1>
//             <div className="font-nueue text-gray-400  flex gap-1.5 items-center !py-4 text-sm">
//               <PiClock className="text-gray-400" />
//               <p>30:00 Mins</p>
//             </div>
//             <button className="gradient text-white !p-2 !px-6 rounded-3xl shadow font-nueue text-sm">
//               Get started
//             </button>
//           </div>
//           <div className="col-span-3 flex flex-col gap-3.5">
//             <PerformanceRating />
//             <AIChatIntro />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Power;

import { useState, useRef } from "react";
import NavHeader from "../../layouts/NavHeader";
import img1 from "../../assets/img/dashboards/learningModules/module btn.svg";
import starz from "../../assets/img/dashboards/teams/avatar5.jpg";
import {
  PiClock,
  PiMicrophone,
  PiPhoneFill,
  PiVideoCamera,
} from "react-icons/pi";
import AIChatIntro from "./components/AiChatIntro";
import PerformanceRating from "./components/PerformanceRating";

const Power = () => {
  const [inCall, setInCall] = useState(false);
  const localVideoRef = useRef(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const startCall = async () => {
    setInCall(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setTimeout(() => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      }, 2000);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const endCall = () => {
    setInCall(false);
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
    }
  };
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
      }
    }
  };

  return (
    <div className="h-full w-full overflow-hidden !pt-4">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3 !px-6">
        <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
          <NavHeader header={"POWER SKILL"} />
        </div>

        <div className="grid grid-cols-7 align-self-end gap-5 min-h-[80vh]">
          {inCall ? (
            // Video Call UI
            <div className="col-span-4 bg-white rounded-3xl !p-6 flex flex-col justify-center items-center relative">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute bottom-32 right-12 w-36 h-48 bg-white rounded-md shadow-md">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="absolute bottom-10 flex gap-3.5">
                <button
                  className=" backdrop-blur-lg text-white !p-3 rounded-3xl shadow font-nueue text-sm mt-4"
                  onClick={toggleVideo}
                >
                  <PiVideoCamera size={24} />
                </button>
                <button
                  className="bg-red-500 text-white !p-3 rounded-3xl shadow font-nueue text-sm mt-4"
                  onClick={endCall}
                >
                  <PiPhoneFill size={24} />
                </button>
                <button
                  className=" backdrop-blur-lg text-white !p-3 rounded-3xl shadow font-nueue text-sm mt-4"
                  onClick={toggleAudio}
                >
                  <PiMicrophone size={22} />
                </button>
              </div>
            </div>
          ) : (
            // Get Started UI
            <div className="col-span-4 bg-white rounded-3xl !p-6 flex flex-col justify-center items-center">
              <div className="flex">
                <img
                  src={starz}
                  alt=""
                  className="w-12 h-12 object-contain rounded-full translate-x-3"
                />
                <img
                  src={img1}
                  alt=""
                  className="w-18 h-20 object-cover rounded-full -translate-x-3 -translate-y-2"
                />
              </div>
              <h1 className="font-bebas text-3xl">
                How to integrate with ease
              </h1>
              <div className="font-nueue text-gray-400 flex gap-1.5 items-center !py-4 text-sm">
                <PiClock className="text-gray-400" />
                <p>30:00 Mins</p>
              </div>
              <button
                className="gradient text-white !p-2 !px-6 rounded-3xl shadow font-nueue text-sm"
                onClick={startCall}
              >
                Get Started
              </button>
            </div>
          )}

          <div className="col-span-3 flex flex-col gap-3.5">
            <PerformanceRating />
            <AIChatIntro />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Power;
