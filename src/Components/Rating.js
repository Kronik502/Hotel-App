import React, { useState, useEffect } from 'react';
import '../styles/Rating.css'; // Add CSS for styling stars

const Rating = ({ rating, onUpdate }) => {
  // Ensure tempRating is always a number
  const [tempRating, setTempRating] = useState(Number(rating) || 0);

  useEffect(() => {
    // Ensure to always set tempRating as a number
    setTempRating(Number(rating) || 0);
  }, [rating]);

  const handleStarClick = (star) => {
    setTempRating(star);
    onUpdate(star); // Call the onUpdate function passed as a prop
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= tempRating ? 'filled' : ''}`}
          onClick={() => handleStarClick(star)}
          style={{ cursor: 'pointer' }}
        >
          ★
        </span>
      ))}
      <span> {typeof tempRating === 'number' ? tempRating.toFixed(1) : '0.0'}</span>
    </div>
  );
};

export default Rating;
