import React from "react";

const ScoreProgress = ({ score }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative h-12 w-12 flex bg-white items-center justify-center rounded-full">
      <svg className="h-10 w-10 -rotate-90">
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (score / 100) * circumference}
          className="text-blue-500"
        />
      </svg>
      <span className="absolute text-xs text-blue-500 font-bold">
        {parseInt(score)}
      </span>
    </div>
  );
};

export default ScoreProgress;
