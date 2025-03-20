import percentage from "../../../assets/img/dashboards/dashboard component/percentage.png";
import { PiCaretRight } from "react-icons/pi";
import SegmentedProgressBars from "./SegmentedProgressBars";

const DashboardCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-white !p-3 !px-5 rounded-[20px] flex flex-col justify-between items-center">
        <h1 className="font-nueue text-grey-tint tracking-tight !py-2 !pb-3 font-extrabold">
          LEARNING JOURNEY
        </h1>
        <div className="w-full">
          <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
            <div>
              <p className="bg-yellow-tint !px-3 !p-1 text-center rounded-3xl text-xs">
                01
              </p>
            </div>
            <div className="font-nueue">
              <p className="font-extrabold text-sm">Total power skills</p>
            </div>
          </div>
          <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
            <div>
              <p className="bg-[#EE89DF] text-white !px-3 !p-1 text-center rounded-3xl text-xs">
                02
              </p>
            </div>
            <div className="font-nueue">
              <p className="font-extrabold text-sm">Total power skills</p>
            </div>
          </div>
          <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
            <div>
              <p className="bg-sidebar-color text-white !px-3 !p-1 text-center rounded-3xl text-xs">
                03
              </p>
            </div>
            <div className="font-nueue">
              <p className="font-extrabold text-sm">Total power skills</p>
            </div>
          </div>
          <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
            <div>
              <p className="bg-[#509999] text-white !px-3 !p-1 text-center rounded-3xl text-xs">
                04
              </p>
            </div>
            <div className="font-nueue">
              <p className="font-extrabold text-sm">Total power skills</p>
            </div>
          </div>
          <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
            <div>
              <p className="bg-yellow-tint !px-3 !p-1 text-center rounded-3xl text-xs">
                05
              </p>
            </div>
            <div className="font-nueue">
              <p className="font-extrabold text-sm">Total power skills</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white !p-3 rounded-[20px] flex flex-col justify-center items-center">
        <h1 className="font-nueue text-grey-tint tracking-tight !py-2 font-extrabold">
          YOUR TOP SCORE
        </h1>
        <div className="w-full h-full  ">
          {/* <img
            src={content}
            alt=""
            className="w-full h-full object-cover object-center"
          /> */}
          <SegmentedProgressBars />
        </div>
        <h4 className="font-nueue text-black text-4xl font-bold tracking-tight !-mt-11 !mb-2">
          660
        </h4>
        <p className="font-nueue tracking-tight font-extrabold">
          Your Quiz Score is average
        </p>
        <p className="font-nueue text-xs text-grey-tint tracking-tighter">
          Last Check on 21 Apr
        </p>
        <p className="text-grey-tint !p-2 !px-2 text-center text-xs bg-[#EAEAEA] tracking-tighter !my-4 rounded-md">
          What these stats mean?
        </p>
      </div>

      <div className="bg-white !p-4 rounded-[20px] flex flex-col justify-between items-center">
        <h1 className="font-nueue text-grey-tint tracking-tight font-extrabold !pt-1">
          ROLE PLAY STATS
        </h1>
        {/* <div className=" flex !my-4">
          <img
            src={star}
            alt=""
            className=" w-16 h-16 translate-x-2.5 object-contain"
          />
          <img
            src={box}
            alt=""
            className=" w-16 h-16 -translate-x-2.5 object-contain"
          />
        </div> */}
        <div className="flex items-center  bg-whitish !p-1.5 !px-2.5 !my-4 rounded-full">
          <h4 className="font-nueue text-black text-2xl lg:text-2xl font-bold tracking-tight  !mb-2 !mt-3">
            37
          </h4>
          <div className="w-5 h-5  rounded-full ">
            <img
              src={percentage}
              alt=""
              className=" w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
            <div className="font-nueue">
              <p className="font-extrabold text-sm">Total role play</p>
              <p className="flex items-center gap-1 !pt-1 text-grey-tint text-xs">
                This week <PiCaretRight />
              </p>
            </div>
            <div>
              <p className="bg-blue-tint !px-3 !p-1 text-center rounded-3xl text-xs">
                09
              </p>
            </div>
          </div>
          <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
            <div className="font-nueue">
              <p className="font-extrabold text-sm">Total power skills</p>
              <p className="flex items-center gap-1 !pt-1 text-grey-tint text-xs">
                This week <PiCaretRight />
              </p>
            </div>
            <div>
              <p className="bg-yellow-tint !px-3 !p-1 text-center rounded-3xl text-xs">
                09
              </p>
            </div>
          </div>
          <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
            <div className="font-nueue">
              <p className=" font-extrabold text-sm">Role minutes played</p>
              <p className="flex items-center gap-1 !pt-1 text-grey-tint text-xs">
                This week <PiCaretRight />
              </p>
            </div>
            <div>
              <span className="text-xs tracking-tighter text-white rounded-xl bg-purple-shade !p-2 !px-2">
                576 Mins
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-white !p-3 !px-5 rounded-[20px] flex flex-col justify-center items-center">
        <h1 className="font-nueue text-grey-tint tracking-tight !py-2 !pb-3 font-extrabold">
          MORE STATS
        </h1>
        <div className="w-14 h-12 !p-2 rounded-full bg-whitish !my-3">
          <img
            src={percentage}
            alt=""
            className=" w-full h-full object-contain"
          />
        </div>
        <h4 className="font-nueue text-black text-4xl font-bold tracking-tight  !mb-2 !mt-3">
          37
        </h4>
        <p className="font-nueue tracking-tight font-extrabold">
          How many scenarios left to play
        </p>
        <p className="font-nueue text-xs text-grey-tint tracking-tighter">
          Last Check on 21 Apr
        </p>
        <div className="flex bg-whitish justify-between items-center w-full rounded-2xl !p-3 !px-6 !mt-3">
          <div className="font-nueue">
            <p className=" font-extrabold text-sm">Role minutes played</p>
            <p className="flex items-center gap-1 !pt-1 text-grey-tint text-xs">
              This week <PiCaretRight />
            </p>
          </div>
          <div>
            <span className="text-xs tracking-tighter text-white rounded-xl bg-purple-shade !p-2 !px-2">
              576 Mins
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardCard;
