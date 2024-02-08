// ReferencePackageItem.js
import React from 'react';


const ReferencePackageItem = ({ package_title, imgSrc, price, about, discount, duration }) => {
  return (
    <div className="card group">
      <div className="poster relative overflow-hidden">
        <img src={imgSrc} alt={package_title} className="w-full h-full object-cover transition-transform duration-300 transform scale-100 group-hover:scale-110" />
      </div>
      <div className="details bg-green-900 bg-opacity-50 p-6 text-black opacity-100 transition-opacity duration-300">
        <h1 className="text-2xl font-bold mb-2">{package_title}</h1>
        <h2 className="text-sm font-light mb-4">{duration} Days</h2>
        <div className="rating flex gap-1">
          <i className="fas fa-star text-yellow-400"></i>
          <i className="fas fa-star text-yellow-400"></i>
          <i className="fas fa-star text-yellow-400"></i>
          <i className="fas fa-star text-yellow-400"></i>
          <i className="far fa-star"></i>
          <span>{discount > 0 ? `${discount}% off` : ''}</span>
        </div>
        <p className="desc text-sm opacity-80 mb-4">{about}</p>
        <div className="tags flex gap-2 mb-4">
          <span className="tag bg-white bg-opacity-40 text-white px-3 py-1 rounded-full">{price} USD</span>
        </div>
      </div>
    </div>
  );
};

export default ReferencePackageItem;
