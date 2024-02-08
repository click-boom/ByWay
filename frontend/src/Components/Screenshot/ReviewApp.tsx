// App.jsx
import { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
// import ReviewCard from '../Screenshot/ReviewCard';

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIncrement = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handleDecrement = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/planTrip/getreview');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='flex flex-col justify-center items-center w-full h-screen space-y-16'>
      <h1 className='font-bold text-4xl border-b-4 border-blue-300 pb-1'>Our Reviews</h1>
      <ReviewCard
        reviews={reviews}
        currentIndex={currentIndex}
        Increment={handleIncrement}
        Decrement={handleDecrement}
      />
    </section>
  );
};

export default App;
