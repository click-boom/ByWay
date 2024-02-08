"use client";
import React from "react";
import { IonIcon } from "@ionic/react";
import { logoFacebook, logoInstagram } from "ionicons/icons";

interface Link {
  name: string;
  link: string;
}

interface FooterProps {
  Icons: Link[];
}

const SocialIcons: React.FC<FooterProps> = ({ Icons }) => {
  return (
    <div className="text-green-600">
      {Icons.map((icon) => (
        <span
          key={icon.name}
          className="p-2 cursor-pointer inline-flex items-center
            rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-green-600
            duration-300 "
        >
          <IonIcon icon={icon.name} />
        </span>
      ))}
    </div>
  );
};

const Footer: React.FC = () => {
  const Icons = [
    {
      name: logoFacebook,
      link: "https://www.facebook.com/profile.php?id=61555729412778",
    },
    { name: logoInstagram, link: "https://www.instagram.com/byway_travel07/" },
    {
      
    },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="md:flex md:justify-center md:items-center sm:px-12 px-4 bg-[#ffffff19]">
        <div className="flex flex-col md:flex-row justify-between items-center text-center text-gray-400 text-sm py-5 w-full md:px-10">
          <div className="flex justify-start items-center mb-4 md:mb-0">
            <img src="/assets/logos/logodark.png" alt="logo" className="h-16" />
          </div>
          <div className="animate-pulse text-2xl text-green-500 mb-4 md:mb-0">
            Myway or Byway
          </div>
          <div className="flex justify-center items-center">
            <SocialIcons Icons={Icons} />
          </div>
        </div>
      </div>
      <div className=" border-gray-300 w-full"></div>
      <div className="text-center md:text-end text-gray-400 text-sm py-2 md:mr-10 ">
        <span>© 2020 Appy. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
