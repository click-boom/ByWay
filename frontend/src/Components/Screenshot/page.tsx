"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import App from '../../app/reviews/ReviewApp';
import SectionTitle from '../Common/SectionTitle';


interface Photo {
  id: number;
  image: Buffer;
}


const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    axios.get('http://localhost:8081/planTrip/getphoto')
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });
  }, []);

  const handleIncrement = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handleDecrement = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const backgroundImageStyle = photos.length > 0
    ? { backgroundImage: `url(data:image/jpeg;base64,${Buffer.from(photos[currentIndex]?.image).toString('base64')})` }
    : {};

  return (
    <div className='flex flex-col justify-center items-center min-w-0 max-w-6xl mx-auto p-10 rounded-md mt-72'>
      
      <SectionTitle title='Screenshot Testimonials' mb='1' paragraph=''/>
      <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
        <div
          style={{ ...backgroundImageStyle }}
          className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
        ></div>
        {/* Left Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft onClick={handleDecrement} size={30} />
        </div>
        {/* Right Arrow */}
        <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight onClick={handleIncrement} size={30} />
        </div>
        <div className='flex top-4 justify-center py-2'>
          {photos.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${currentIndex === slideIndex ? 'text-blue-500' : 'text-gray-300'}`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>

      <div>
        <App/>
      
      </div>

    </div>
  );
};

export default PhotoGallery;
