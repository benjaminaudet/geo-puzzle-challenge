import React from "react";

const Score = ({ score }) => {
  return (
    <div className="fixed flex justify-center items-center z-10 top-0 right-0 bg-black h-12 w-[30%] color-slate-500">
      Score : {parseInt((score.rows / score.totalTries) * 100)}
    </div>
  );
};

export default Score;
