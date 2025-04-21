import React from "react";
import CalendarPicker from "./CalendarPicker";
import NavHeader from "../../../layouts/NavHeader";
import { motion } from "framer-motion";

const CalendarPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Page Load Animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full overflow-hidden !py-4"
    >
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
          <NavHeader header={"CALENDAR"} />
          <div className="lg:my-30">
            <CalendarPicker />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarPage;
