import coin1 from "../../../assets/img/dashboards/quiz/coins1.png";
import ProgressBar from "./ProgressBar";
import QuizQuestion from "./QuizQuestion";

const Quiz = () => {
  return (
    <div className="bg-white !p-4 lg:!px-10 min-h-96 w-full rounded-3xl overflow-clip flex flex-col justify-center items-center relative">
      <div className="flex justify-center items-center  !py-7 ">
        <div className="absolute w-1/4  h-50 -top-10 -left-10">
          {/* <img src={coin1} alt="" className="w-full  h-full object-cover" /> */}
        </div>
        <div className="flex flex-col justify-center items-center font-nueue">
          <h1 className="font-bebas lg:text-3xl !pb-2">MINING QUIZ</h1>
          <p className="text-center w-[55%] tracking-tight">
            Step into the exhilarating world of CryptoMineQuest, where your
            knowledge is the key to unlocking treasures in the blockchain
            universe! 💎
          </p>
          <div className="flex items-center gap-2.5 !pt-3">
            <p className="bg-whitish !p-1 !px-2 rounded-xl text-sm">Beginner</p>
            <p className="text-sm">Intermediate</p>
            <p className="text-sm">Expert</p>
          </div>
        </div>
        <div className="absolute -top-10 right-0 w-1/3 h-84 ">
          {/* <img src={coin1} alt="" className="w-full  h-full object-cover" /> */}
        </div>
      </div>
      <div className="w-2/3">
        <ProgressBar percentage={70} />
      </div>
      <div className="bg-whitish w-full !p-6 !my-8 rounded-3xl relative z-10">
        {/* <h1 className="font-bebas lg:text-3xl mb-4">
          What does “mining” in cryptocurrency refer to?
        </h1> */}
        <QuizQuestion />
      </div>
    </div>
  );
};

export default Quiz;
