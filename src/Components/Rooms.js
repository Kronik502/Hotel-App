import React, { useState } from 'react';
import './Rooms.css'; // Ensure your styles are updated to include modal styling
import standard from '../Components/Standard.jpg';
import conference from '../Components/Conference.jpg';
import queen from '../Components/Queen.jpg'; // Ensure your images are imported

function Rooms() {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilterModal = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section className="rooms-section">
      <button title='Filter Booking' className='Filter' onClick={toggleFilterModal}>Filter Booking</button>

      {/* Modal for Filter */}
      {showFilter && (
        <div className="filter-modal">
          <div className="filter-content">
            <h2>Filter Your Booking</h2>
            <form>
              <label>Room Type:</label>
              <select>
                <option value="standard">Standard Room</option>
                <option value="meeting">Meeting Room</option>
                <option value="queen">Queen's Room</option>
              </select>

              <label>Bed Type:</label>
              <select>
                <option value="single">Single Bed</option>
                <option value="double">Double Bed</option>
                <option value="queen">Queen's Bed</option>
              </select>

              <label>Price Range:</label>
              <input type="number" placeholder="Min Price" /> - <input type="number" placeholder="Max Price" />

              <label>Amenities:</label>
              <div>
                <input type="checkbox" id="wifi" name="wifi" />
                <label htmlFor="wifi">WiFi</label>

                <input type="checkbox" id="gym" name="gym" />
                <label htmlFor="gym">Gym</label>

                <input type="checkbox" id="spa" name="spa" />
                <label htmlFor="spa">Spa</label>

                <input type="checkbox" id="parking" name="parking" />
                <label htmlFor="parking">Parking</label>
              </div>

              <button type="submit" className="apply-filters">Apply Filters</button>
              <button type="button" className="close-modal" onClick={toggleFilterModal}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Room Cards */}
      <div className="room-card">
        <img src={standard} alt="Standard Deluxe Room" />
        <div className="room-info">
          <h2>Standard Deluxe</h2>
          <p>Room Type: Standard Room</p>
          <p>Bed Type: Double Bed</p>
          <p>Amenities: TV, Local WiFi</p>
          <p>Price: R 1858.99 Per Night</p>
        </div>
      </div>

      <div className="room-card">
        <img src={conference} alt="Business Meeting Room" />
        <div className="room-info">
          <h2>Business Meeting Deluxe</h2>
          <p>Room Type: Meeting Room</p>
          <p>Max Guests: 15</p>
          <p>Amenities: TV, Local WiFi, 5 Wines</p>
          <p>Price: R 3050.00 Per Night</p>
        </div>
      </div>

      <div className="room-card">
        <img src={queen} alt="Queen Deluxe Room" />
        <div className="room-info">
          <h2>Queen Deluxe</h2>
          <p>Room Type: Queen's Room</p>
          <p>Bed Type: Queen's Bed</p>
          <p>Amenities: TV, Personal WiFi, 2-course meals, unlimited talking phone</p>
          <p>Price: R 6058.00 Per Night</p>
        </div>
      </div>

      <button title='View More' className='View'>View More</button>
    </section>
  );
}

export default Rooms;
