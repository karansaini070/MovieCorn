import Lottie from "lottie-react";
import animationData from "../assets/Page Not Found 404.json";

const NotFound = () => {
  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center overflow-hidden">

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

export default NotFound;
