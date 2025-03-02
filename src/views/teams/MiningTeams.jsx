import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Back from "../../components/Back";
import profile from "./../../assets/img/dashboards/teams/avatar7.jpg";
import { PiClock } from "react-icons/pi";

const MiningTeams = () => {
  return (
    <section className="!px-10">
      <div>
        <Back route={"/teams"} />
      </div>
      <div className="grid lg:grid-cols-5 gap-10 !py-8">
        <div className="flex flex-col  gap-4 !p-4 bg-white  !mb-5 rounded-lg shadow-md lg:col-span-3  col-span-5 ">
          <h1 className="text-2xl text-center font-bold font-nueue tracking-tight">
            Mining Team
          </h1>
          <div className="flex items-center bg-whitish !p-3 rounded-2xl">
            {/* Image Section */}
            <div className="w-12 h-12 flex-shrink-0">
              <img
                src={profile}
                alt="Chapter"
                className="w-full h-full object-cover rounded-md"
              />
              <div>
                <h3>SARAH martins</h3>
                <p>s</p>
              </div>
            </div>

            {/* Text + Progress Section */}
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold font-bebas">Chapter</h3>
                <p className="text-sm text-gray-500 font-nueue flex gap-1.5 items-center">
                  <PiClock /> Mins
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 col-span-5">Hello</div>
      </div>
    </section>
  );
};

export default MiningTeams;
