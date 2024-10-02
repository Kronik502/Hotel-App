import React, { useState, useEffect } from 'react';
import '../styles/Rooms.css';
import standard from '../images/Standard.jpg';
import RoomModal from './RoomCard';
import Rating from './Rating';
import { db } from '../firebase'; 
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

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
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, 'rooms');
      const roomSnapshot = await getDocs(roomsCollection);
      const roomList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomList);
    };
    fetchRooms();
  }, []);

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
      return !value || (Array.isArray(room.amenities) && room.amenities.includes(key));
    });

    return meetsRoomType && meetsBedType && meetsPriceRange && meetsAmenities;
  });

  const handleRatingUpdate = async (roomId, newRating) => {
    const roomRef = doc(db, 'rooms', roomId);
    try {
      await updateDoc(roomRef, { rating: newRating });
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.id === roomId ? { ...room, rating: newRating } : room))
      );
    } catch (error) {
      console.error("Error updating rating: ", error);
    }
  };

  return (
    <section className="rooms-section">
      <button title='Filter Booking' className='Filter' onClick={toggleFilterModal}>Filter Booking</button>

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
              <input type="number" name="minPrice" placeholder="Min Price" onChange={handleFilterChange} /> - 
              <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleFilterChange} />

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

      <div className="room-cards">
        {filteredRooms.map((room) => (
          <div key={room.id} className="room-card" onClick={() => openModal(room)}>
            <img src={room.image || standard} alt={room.name} />
            <div className="room-info">
              <h2>{room.name}</h2>
              <p>Room Type: {room.type}</p>
              <p>Price: R{room.price.toFixed(2)} Per Night</p>
              <p>Bed Type: {room.bedType}</p>
              <p>Amenities: {Array.isArray(room.amenities) ? room.amenities.join(', ') : 'No amenities listed'}</p>
              <Rating rating={room.rating || 0} onUpdate={(newRating) => handleRatingUpdate(room.id, newRating)} />
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && <RoomModal room={selectedRoom} onClose={closeModal} />}
      <button className="view-more-btn1" onClick={() => alert('View More clicked!')}>View More</button>
    </section>
  );
}

export default Rooms;
