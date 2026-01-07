import Lottie from "lottie-react";
import animationData from "../assets/empty box3.json";

const Empty = () => {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden">

      {/* Animation container */}
      <div className="w-full h-full flex items-center justify-center">
        <Lottie 
          animationData={animationData} 
          loop 
          className="w-full h-full"
        />
      </div>

    </div>
  );
};

export default Empty;
