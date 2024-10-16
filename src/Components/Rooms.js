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
  const [visibleRooms, setVisibleRooms] = useState(5);

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
      setFilter(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [name]: checked,
        },
      }));
    } else {
      setFilter(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const filteredRooms = rooms.filter(room => {
    const meetsRoomType = filter.roomType ? room.type === filter.roomType : true;
    const meetsBedType = filter.bedType ? room.bedType === filter.bedType : true;

    const minPrice = parseFloat(filter.minPrice) || 0;
    const maxPrice = parseFloat(filter.maxPrice) || Infinity;

    const meetsPriceRange =
      (minPrice ? room.price >= minPrice : true) &&
      (maxPrice ? room.price <= maxPrice : true);

    const meetsAmenities = Object.entries(filter.amenities).every(([key, value]) => {
      return !value || (Array.isArray(room.amenities) && room.amenities.includes(key));
    });

    return meetsRoomType && meetsBedType && meetsPriceRange && meetsAmenities;
  });

  const handleRatingUpdate = async (roomId, newRating) => {
    const roomRef = doc(db, 'rooms', roomId);
    try {
      await updateDoc(roomRef, { rating: newRating });
      setRooms(prevRooms =>
        prevRooms.map(room => (room.id === roomId ? { ...room, rating: newRating } : room))
      );
    } catch (error) {
      console.error("Error updating rating: ", error);
    }
  };

  const handleViewMore = () => {
    setVisibleRooms(prev => prev + 5);
  };

  return (
    <section className="rooms-section container">
      <button className='btn btn-primary mb-3' onClick={toggleFilterModal}>Filter Booking</button>

      {showFilter && (
        <div className="filter-modal">
          <div className="filter-content">
            <h2>Filter Your Booking</h2>
            <form>
              <div className="form-group">
                <label>Room Type:</label>
                <select name="roomType" className="form-control" onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="Standard Room">Standard Room</option>
                  <option value="Meeting Room">Meeting Room</option>
                  <option value="Queen's Room">Queen's Room</option>
                </select>
              </div>

              <div className="form-group">
                <label>Bed Type:</label>
                <select name="bedType" className="form-control" onChange={handleFilterChange}>
                  <option value="">All</option>
                  <option value="Single Bed">Single Bed</option>
                  <option value="Double Bed">Double Bed</option>
                  <option value="Queen's Bed">Queen's Bed</option>
                </select>
              </div>

              <div className="form-group">
                <label>Price Range:</label>
                <div className="d-flex">
                  <input type="number" name="minPrice" className="form-control" placeholder="Min Price" onChange={handleFilterChange} />
                  <input type="number" name="maxPrice" className="form-control ml-2" placeholder="Max Price" onChange={handleFilterChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Amenities:</label>
                <div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="wifi" name="wifi" onChange={handleFilterChange} />
                    <label className="form-check-label" htmlFor="wifi">WiFi</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="gym" name="gym" onChange={handleFilterChange} />
                    <label className="form-check-label" htmlFor="gym">Gym</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="spa" name="spa" onChange={handleFilterChange} />
                    <label className="form-check-label" htmlFor="spa">Spa</label>
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="parking" name="parking" onChange={handleFilterChange} />
                    <label className="form-check-label" htmlFor="parking">Parking</label>
                  </div>
                </div>
              </div>

              <button type="button" className="btn btn-success" onClick={toggleFilterModal}>Apply Filters</button>
              <button type="button" className="btn btn-danger" onClick={toggleFilterModal}>Close</button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {filteredRooms.slice(0, visibleRooms).map(room => (
          <div key={room.id} className="col-md-4">
            <div className="room-card card mb-4" onClick={() => openModal(room)}>
              <img src={room.image || standard} className="card-img-top" alt={room.name} />
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">Room Type: {room.type}</p>
                <p className="card-text">Price: R{room.price.toFixed(2)} Per Night</p>
                <p className="card-text">Bed Type: {room.bedType}</p>
                <p className="card-text">Amenities: {Array.isArray(room.amenities) ? room.amenities.join(', ') : 'No amenities listed'}</p>
                <Rating rating={room.rating || 0} onUpdate={(newRating) => handleRatingUpdate(room.id, newRating)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && <RoomModal room={selectedRoom} onClose={closeModal} />}
      
      {visibleRooms < filteredRooms.length && (
        <button className="btn btn-secondary" onClick={handleViewMore}>View More</button>
      )}
    </section>
  );
}

export default Rooms;
