// src/components/Hero.js
import React from 'react';
import './Hero.css';
import foodImage from './Food.jpg';
import gamingImage from './Games.jpg';
import fitnessImage from './Gym.jpg';
import chefImage from './Chef.jpg';

const Section = ({ image, alt, title, children, align }) => (
  <div className={`section ${align}`}>
    <div className="section-content">
      {title && <h3>{title}</h3>}
      {children}
    </div>
    <div className="section-image">
      <img src={image} alt={alt} />
    </div>
  </div>
);

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Our Deluxe Hotel</h1>
        <p>
          Welcome to Deluxe Hotel, where luxury meets comfort and every detail is crafted to 
          provide you with an unforgettable experience. Nestled in the heart of the city, our 
          hotel offers a tranquil escape from the hustle and bustle, while keeping you within 
          reach of all the vibrant attractions and cultural landmarks that make our location so unique.
        </p>
      </div>

      <Section image={foodImage} alt="Delicious Food" title = 'Enjoy Every Deluxe Moment With Us:'align="right">
        
        <p>
          Our commitment is to serve the finest and most exquisite meals at the hotel, where each 
          plate is a culinary masterpiece, offering you an unparalleled dining experience.
        </p>
      </Section>

      <Section image={gamingImage} alt="Gaming" title="Deluxe Gaming For Your Kids:" align="left">
        
        <ul>
          <li>PlayStation 4 & 5</li>
          <li>Family board games</li>
          <li>Monopoly, Snakes & Ladders</li>
          <li>Lego Toys, Dolls, and more</li>
        </ul>
      </Section>

      <Section image={chefImage} alt="Chef" title='Deluxe Food From Deluxe Chefs' align="right">
        <p>
          We're delighted to have a team of world-class chefs ready to create unforgettable meals, 
          ensuring that every bite is a delight.
        </p>
      </Section>

      <Section image={fitnessImage} alt="Fitness Center" title='Get The Deluxe Body You Are Wishing For' align="left">
        <p>
          We're here to elevate your fitness game with tailored workouts and expert support, 
          pushing you to reach your goals and redefine your limits.
        </p>
      </Section>
    </section>
  );
}

export default Hero;
