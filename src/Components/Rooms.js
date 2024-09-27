// src/components/Rooms.js
import React, { useState } from 'react';
import '../styles/Rooms.css'; // Ensure your styles are updated to include modal styling
import standard from '../images/Standard.jpg';
import conference from '../images/Conference.jpg';
import queen from '../images/Queen.jpg'; // Ensure your images are imported
import RoomModal from './RoomCard'; // Import RoomModal

function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({
    roomType: '',
    bedType: '',
    minPrice: '',
    maxPrice: '',
    amenities: {
      wifi: false,
      gym: false,
      spa: false,
      parking: false,
    },
  });

  const rooms = [
    {
      id: 1,
      name: "Standard Deluxe",
      type: "Standard Room",
      bedType: "Double Bed",
      amenities: "TV, Local WiFi",
      price: 1858.99,
      image: standard, // Use the imported image
    },
    {
      id: 2,
      name: "Business Meeting Deluxe",
      type: "Meeting Room",
      bedType: "N/A",
      amenities: "TV, Local WiFi, 5 Wines",
      price: 3050.00,
      image: conference, // Use the imported image
    },
    {
      id: 3,
      name: "Queen Deluxe",
      type: "Queen's Room",
      bedType: "Queen's Bed",
      amenities: "TV, Personal WiFi, 2-course meals",
      price: 6058.00,
      image: queen, // Use the imported image
    },
  ];

  const openModal = (room) => {
    setSelectedRoom(room);
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  const toggleFilterModal = () => {
    setShowFilter(prev => !prev);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilter((prev) => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [name]: checked,
        },
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const filteredRooms = rooms.filter(room => {
    const meetsRoomType = filter.roomType ? room.type === filter.roomType : true;
    const meetsBedType = filter.bedType ? room.bedType === filter.bedType : true;
    const meetsPriceRange =
      (filter.minPrice ? room.price >= filter.minPrice : true) &&
      (filter.maxPrice ? room.price <= filter.maxPrice : true);
    const meetsAmenities = Object.entries(filter.amenities).every(([key, value]) => {
      return !value || room.amenities.includes(key);
    });

    return meetsRoomType && meetsBedType && meetsPriceRange && meetsAmenities;
  });

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
              <select name="roomType" onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Standard Room">Standard Room</option>
                <option value="Meeting Room">Meeting Room</option>
                <option value="Queen's Room">Queen's Room</option>
              </select>

              <label>Bed Type:</label>
              <select name="bedType" onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Single Bed">Single Bed</option>
                <option value="Double Bed">Double Bed</option>
                <option value="Queen's Bed">Queen's Bed</option>
              </select>

              <label>Price Range:</label>
              <input type="number" name="minPrice" placeholder="Min Price" onChange={handleFilterChange} />
              - <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleFilterChange} />

              <label>Amenities:</label>
              <div>
                <input type="checkbox" id="wifi" name="wifi" onChange={handleFilterChange} />
                <label htmlFor="wifi">WiFi</label>

                <input type="checkbox" id="gym" name="gym" onChange={handleFilterChange} />
                <label htmlFor="gym">Gym</label>

                <input type="checkbox" id="spa" name="spa" onChange={handleFilterChange} />
                <label htmlFor="spa">Spa</label>

                <input type="checkbox" id="parking" name="parking" onChange={handleFilterChange} />
                <label htmlFor="parking">Parking</label>
              </div>

              <button type="button" className="apply-filters" onClick={toggleFilterModal}>Apply Filters</button>
              <button type="button" className="close-modal" onClick={toggleFilterModal}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* Room Cards */}
      <div className="room-cards">
        {filteredRooms.map((room) => (
          <div 
            key={room.id} 
            className="room-card" 
            onClick={() => openModal(room)}
          >
            <img src={room.image} alt={room.name} />
            <div className="room-info">
              <h2>{room.name}</h2>
              <p>Room Type: {room.type}</p>
              <p>Price: R{room.price.toFixed(2)} Per Night</p>
              <p>Bed Type: {room.bedType}</p>
              <p>Amenities : {room.amenities}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && <RoomModal room={selectedRoom} onClose={closeModal} />}
    </section>
  );
}

export default Rooms;
