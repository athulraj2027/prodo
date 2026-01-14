import React from "react";

const Loading = () => {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg text-white">
      <span className="loading loading-infinity loading-xl"></span>
      <p className="mt-2 text-sm">Please wait</p>
    </div>
  );
};

export default Loading;
