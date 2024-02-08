import React from "react";
import { Feature } from "./featureData";

const FeatureCard: React.FC<Feature> = ({ id, title, description, icon }) => (
  
  <div
    key={id}
    className=" shadow-md hover:shadow-lg duration-300 p-6 rounded-md bg-slate-50"
  >
    <div className="border rounded-full inline-block p-4 border-slate-800 mb-3">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-green-600 mb-3">{title}</h3>
    <p className="text-lg text-gray-500">{description}</p>
   
  </div>
  
 
);

export default FeatureCard;
