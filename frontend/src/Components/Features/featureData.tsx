import React from "react";

import { FaMapSigns } from "react-icons/fa";
import { FaClockRotateLeft, FaRegCommentDots } from "react-icons/fa6";
import { LuMousePointerClick } from "react-icons/lu";
import { MdOutlineContactSupport } from "react-icons/md";
import { RiCustomerServiceLine } from "react-icons/ri";


export type Feature = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export const features = [
  {
    id: 1,
    title: "User-friendly Interface",
    description:
      "Enjoy a sleek and intuitive interface for a seamless user experience.",
    icon: <LuMousePointerClick 
    size={35}/>,
  },
  {
    id: 2,
    title: "Destination Discovery",
    description:
      "Explore a wide range of destinations with detailed information and stunning visuals.",
    icon: <FaMapSigns size={35} />,
  },
  {
    id: 3,
    title: "Customized Trip Planning",
    description:
      "Plan your trip the way you want with customizable itineraries and activities.",
    icon: <MdOutlineContactSupport size={35} />,
  },
  {
    id: 4,
    title: "Customer Reviews and Ratings",
    description:
      "Make informed decisions with genuine reviews and ratings from fellow travelers.",
    icon: <FaRegCommentDots size={35} />,
  },
  {
    id: 5,
    title: "Dedicated Client Support",
    description:
      "Receive personalized assistance from our dedicated support team throughout your journey.",
    icon: <RiCustomerServiceLine size={35} />,
  },
  {
    id: 6,
    title: "24-Hour Cancellation Policy",
    description:
      "Enjoy flexibility with our 24-hour cancellation policy for added peace of mind.",
    icon: <FaClockRotateLeft size={35} />,
  },
];

