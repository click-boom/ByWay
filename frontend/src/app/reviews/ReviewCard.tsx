import React, { useState } from 'react';

interface Review {
  id: number;
  fullName: string;
  date: string;
  title: string;
  selectCountry: string;
  reviewDetails: string;
}

interface CardProps {
  reviews: Review[];
  currentIndex: number;
  Decrement: () => void;
  Increment: () => void;
}

const ReviewCard: React.FC<CardProps> = (props) => {
  const { reviews, currentIndex, Decrement, Increment } = props;
  const review = reviews[currentIndex];
  const [showMore, setShowMore] = useState(false);

  return (
    <div className='card-container flex flex-col w-full sm:w-96 md:w-800 mx-auto bg-white shadow-md rounded-lg p-8 space-y-3'>
      <div className='flex justify-end'>
        <a
          className='flex justify-center items-center bg-green-600 text-white font-mono font-bold text-lg rounded-md p-1'
          href="./reviews"
        >
          Write a review
        </a>
      </div>

      <div className='border-b-2 w-full'></div>
      {review && (
        <div key={review.id}>
          <div className='text-container'>
            <div className='name-country flex gap-2'>
              <p className='name whitespace-nowrap font-bold font-mono text-lg'>{review.fullName}</p>
            </div>
            <div>
              <p className='date font-mono'>{review.date}</p>
            </div>
          </div>
          <div className='title-desc font-mono'>
            <h5 className='title mt-2 font-mono font-bold'>{review.title.toUpperCase()}</h5>
            <p className={`description ${showMore ? 'h-auto' : 'h-20 overflow-hidden'}`}>
              {review.reviewDetails}
            </p>
            {review.reviewDetails.length > 200 && (
              <button
                className='text-blue-500 cursor-pointer'
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        </div>
      )}
      <div className='border-b-2 w-full'></div>
      <div className='button-container flex justify-center items-center space-x-1'>
        <button
          className='font-bold text-7xl p-1 hover:text-blue-200 rounded-xl'
          onClick={Decrement}
        >
          &#x2190;
        </button>
        <button
          className='font-bold text-7xl p-1 hover:text-blue-200 rounded-xl'
          onClick={Increment}
        >
          &#x2192;
        </button>
      </div>
    </div>
  );
};
export default ReviewCard