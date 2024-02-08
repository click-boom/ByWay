"use client";
import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";

const WalkingAnimation = () => {
  const [visibleLeftFoot, setVisibleLeftFoot] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleLeftFoot((prevVisible) => !prevVisible);
    }, 500); // Adjust the interval duration according to your preference

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      {/* Oval loader */}
      <Oval
        visible={true}
        height="150"
        width="150"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />

      {/* Walking animation inside the oval loader */}
      <svg
        fill="#2E8B57"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 515.458 515.458"
        xmlSpace="preserve"
        stroke="#2E8B57"
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <g>
          <path
            d="M298.794,386.711c27.805,9.522,52.357,15.587,87.633,26.427C372.875,584.374,210.952,516.371,298.794,386.711z M443.366,229.409c-1.826-51.415-10.882-118.86-83.017-108.292c-33.815,8.825-58.8,45.962-70.551,110.035 c-6.454,35.229-2.701,84.678,4.912,114.32c6.951,20.889,4.587,19.605,12.058,23.572c28.916,6.514,57.542,13.725,86.693,21.078 C423.075,369.209,447.397,258.182,443.366,229.409z M220.752,225.463c7.607-29.646,11.36-79.095,4.909-114.32 C213.919,47.067,188.931,9.924,155.11,1.105C82.975-9.463,73.919,57.981,72.093,109.399 c-4.031,28.768,20.294,139.802,49.911,160.711c29.149-7.353,57.771-14.558,86.696-21.078 C216.162,245.069,213.798,246.352,220.752,225.463z M129.029,293.132c13.547,171.234,175.47,103.231,87.63-26.427 C188.854,276.228,164.304,282.292,129.029,293.132z"
            style={{
              opacity: visibleLeftFoot ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          ></path>
        </g>
      </svg>
    </div>
  );
};

export default WalkingAnimation;
