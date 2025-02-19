import React from "react";
import LearningModuleCard from "./LearningModuleCard";

const LearningModule = () => {
  return (
    <section>
      <h1 className="font-bebas tracking-tight text-3xl lg:text-5xl !py-4">
        LEARNING MODULES
      </h1>
      {/* <div className="grid lg:grid-cols-3 !my-8 gap-5"> */}
      <div className="flex lg:grid lg:grid-cols-3 gap-[20px] overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide">
        <LearningModuleCard bgModule="learning-module-1" />
        <LearningModuleCard bgModule="learning-module-2" />
        <LearningModuleCard bgModule="learning-module-3" />
      </div>
    </section>
  );
};

export default LearningModule;
