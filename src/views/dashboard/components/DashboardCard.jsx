// import percentage from "../../../assets/img/dashboards/dashboard component/percentage.png";
// import { PiCaretRight } from "react-icons/pi";
// import SegmentedProgressBars from "./SegmentedProgressBars";

// const DashboardCard = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//       <div className="bg-white !p-3 !px-5 rounded-[20px] flex flex-col justify-between items-center">
//         <h1 className="font-nueue text-grey-tint tracking-tight !py-2 !pb-3 font-extrabold">
//           LEARNING JOURNEY
//         </h1>
//         <div className="w-full">
//           <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
//             <div>
//               <p className="bg-yellow-tint !px-3 !p-1 text-center rounded-3xl text-xs">
//                 01
//               </p>
//             </div>
//             <div className="font-nueue">
//               <p className="font-extrabold text-sm">Total power skills</p>
//             </div>
//           </div>
//           <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
//             <div>
//               <p className="bg-[#EE89DF] text-white !px-3 !p-1 text-center rounded-3xl text-xs">
//                 02
//               </p>
//             </div>
//             <div className="font-nueue">
//               <p className="font-extrabold text-sm">Total power skills</p>
//             </div>
//           </div>
//           <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
//             <div>
//               <p className="bg-sidebar-color text-white !px-3 !p-1 text-center rounded-3xl text-xs">
//                 03
//               </p>
//             </div>
//             <div className="font-nueue">
//               <p className="font-extrabold text-sm">Total power skills</p>
//             </div>
//           </div>
//           <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
//             <div>
//               <p className="bg-[#509999] text-white !px-3 !p-1 text-center rounded-3xl text-xs">
//                 04
//               </p>
//             </div>
//             <div className="font-nueue">
//               <p className="font-extrabold text-sm">Total power skills</p>
//             </div>
//           </div>
//           <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
//             <div>
//               <p className="bg-yellow-tint !px-3 !p-1 text-center rounded-3xl text-xs">
//                 05
//               </p>
//             </div>
//             <div className="font-nueue">
//               <p className="font-extrabold text-sm">Total power skills</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-white !p-3 rounded-[20px] flex flex-col justify-center items-center">
//         <h1 className="font-nueue text-grey-tint tracking-tight !py-2 font-extrabold">
//           YOUR TOP SCORE
//         </h1>
//         <div className="w-full h-full  ">
//           {/* <img
//             src={content}
//             alt=""
//             className="w-full h-full object-cover object-center"
//           /> */}
//           <SegmentedProgressBars />
//         </div>
//         <h4 className="font-nueue text-black text-4xl font-bold tracking-tight !-mt-11 !mb-2">
//           660
//         </h4>
//         <p className="font-nueue tracking-tight font-extrabold">
//           Your Quiz Score is average
//         </p>
//         <p className="font-nueue text-xs text-grey-tint tracking-tighter">
//           Last Check on 21 Apr
//         </p>
//         <p className="text-grey-tint !p-2 !px-2 text-center text-xs bg-[#EAEAEA] tracking-tighter !my-4 rounded-md">
//           What these stats mean?
//         </p>
//       </div>

//       <div className="bg-white !p-4 rounded-[20px] flex flex-col justify-between items-center">
//         <h1 className="font-nueue text-grey-tint tracking-tight font-extrabold !pt-1">
//           ROLE PLAY STATS
//         </h1>
//         {/* <div className=" flex !my-4">
//           <img
//             src={star}
//             alt=""
//             className=" w-16 h-16 translate-x-2.5 object-contain"
//           />
//           <img
//             src={box}
//             alt=""
//             className=" w-16 h-16 -translate-x-2.5 object-contain"
//           />
//         </div> */}
//         <div className="flex items-center  bg-whitish !p-1.5 !px-2.5 !my-4 rounded-full">
//           <h4 className="font-nueue text-black text-2xl lg:text-2xl font-bold tracking-tight  !mb-2 !mt-3">
//             37
//           </h4>
//           <div className="w-5 h-5  rounded-full ">
//             <img
//               src={percentage}
//               alt=""
//               className=" w-full h-full object-contain"
//             />
//           </div>
//         </div>
//         <div className="w-full">
//           <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
//             <div className="font-nueue">
//               <p className="font-extrabold text-sm">Total role play</p>
//               <p className="flex items-center gap-1 !pt-1 text-grey-tint text-xs">
//                 This week <PiCaretRight />
//               </p>
//             </div>
//             <div>
//               <p className="bg-blue-tint !px-3 !p-1 text-center rounded-3xl text-xs">
//                 09
//               </p>
//             </div>
//           </div>
//           <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
//             <div className="font-nueue">
//               <p className="font-extrabold text-sm">Total power skills</p>
//               <p className="flex items-center gap-1 !pt-1 text-grey-tint text-xs">
//                 This week <PiCaretRight />
//               </p>
//             </div>
//             <div>
//               <p className="bg-yellow-tint !px-3 !p-1 text-center rounded-3xl text-xs">
//                 09
//               </p>
//             </div>
//           </div>
//           <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
//             <div className="font-nueue">
//               <p className=" font-extrabold text-sm">Role minutes played</p>
//               <p className="flex items-center gap-1 !pt-1 text-grey-tint text-xs">
//                 This week <PiCaretRight />
//               </p>
//             </div>
//             <div>
//               <span className="text-xs tracking-tighter text-white rounded-xl bg-purple-shade !p-2 !px-2">
//                 576 Mins
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCard;

import percentage from "../../../assets/img/dashboards/dashboard component/percentage.png";
import { PiCaretRight } from "react-icons/pi";
import SegmentedProgressBars from "./SegmentedProgressBars";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const DashboardCard = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-5"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
    >
      {/* Learning Journey Card */}
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        className="bg-white !p-3 !px-5 rounded-[20px] flex flex-col justify-between items-center shadow-md"
      >
        <h1 className="font-nueue text-grey-tint tracking-tight !py-2 !pb-3 font-extrabold">
          LEARNING JOURNEY
        </h1>
        <div className="w-full">
          {["#55c05b", "#EE89DF", "#509999", "#FFA500", "#4f45f0"].map(
            (color, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3"
              >
                <p
                  style={{ backgroundColor: color }}
                  className="text-white !px-3 !p-1 text-center rounded-3xl text-xs"
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="font-extrabold text-sm font-nueue">
                  Total power skills
                </p>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      {/* Your Top Score Card */}
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        className="bg-white !p-3 rounded-[20px] flex flex-col justify-center items-center shadow-md"
      >
        <h1 className="font-nueue text-grey-tint tracking-tight !py-2 font-extrabold">
          YOUR TOP SCORE
        </h1>
        <div className="w-full h-full">
          <SegmentedProgressBars />
        </div>
        <h4 className="font-nueue text-black text-4xl font-bold tracking-tight m!t-3 !mb-2">
          660
        </h4>
        <p className="font-nueue tracking-tight font-extrabold">
          Your Quiz Score is average
        </p>
        <p className="font-nueue text-xs text-grey-tint tracking-tighter">
          Last Check on 21 Apr
        </p>
        <motion.p
          whileHover={{ scale: 1.05 }}
          className="text-grey-tint !p-2 !px-2 text-center text-xs bg-[#EAEAEA] tracking-tighter !my-4 rounded-md cursor-pointer"
        >
          What these stats mean?
        </motion.p>
      </motion.div>

      {/* Role Play Stats Card */}
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        className="bg-white !p-4 rounded-[20px] flex flex-col justify-between items-center shadow-md"
      >
        <h1 className="font-nueue text-grey-tint tracking-tight font-extrabold !pt-1">
          ROLE PLAY STATS
        </h1>
        <motion.div className="flex items-center bg-whitish !p-1.5 !px-2.5 !my-4 rounded-full">
          <h4 className="font-nueue text-black text-xl font-bold tracking-tight !mb-2 !mt-3">
            37
          </h4>
          <div className="w-5 h-5 rounded-full !mt-1">
            <img
              src={percentage}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>
        <div className="w-full">
          {[
            { title: "Total role play", color: "#509999", number: "12" },
            { title: "Total power skills", color: "#4f45f0", number: "09" },
            { title: "Role minutes played", color: "#EE89DF", number: "45" },
          ].map(({ title, color, number }, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3"
            >
              <div>
                <p className="font-medium text-sm">{title}</p>
                <p className="flex items-center gap-1 !pt-1 text-grey-tint text-xs">
                  This week <PiCaretRight />
                </p>
              </div>

              <p
                style={{ backgroundColor: color }}
                className="text-white !px-3 !p-1 text-center rounded-3xl text-xs"
              >
                {number}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardCard;
