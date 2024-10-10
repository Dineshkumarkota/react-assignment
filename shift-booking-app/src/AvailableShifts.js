// src/AvailableShifts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableShifts = ({setBookedShifts}) => {
  const [shifts, setShifts] = useState([]);
  const [city, setCity] = useState('');
  const [bookedShifts, setBookedShifts] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchShifts = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get('http://localhost:8080/available-shifts');
        setShifts(response.data);
      } catch (error) {
        setError('Error fetching shifts. Please try again later.'); // Set error message
        console.error('Error fetching shifts:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchShifts();
  }, []);

  const filteredShifts = city
    ? shifts.filter((shift) => shift.city.toLowerCase().includes(city.toLowerCase()))
    : shifts;

  const handleToggleShift = async (shiftId) => {
    if (bookedShifts.includes(shiftId)) {
      // Cancel Shift
      await handleCancelShift(shiftId);
    } else {
      // Book Shift
      await handleBookShift(shiftId);
    }
  };

  const handleBookShift = async (shiftId) => {
    try {
      await axios.post(`http://localhost:8080/book-shift/${shiftId}`);
      setBookedShifts((prev) => [...prev, shiftId]); // Update booked shifts
    } catch (error) {
      console.error('Error booking shift:', error);
    }
  };

  const handleCancelShift = async (shiftId) => {
    try {
      await axios.delete(`http://localhost:8080/cancel-shift/${shiftId}`);
      setBookedShifts((prev) => prev.filter((id) => id !== shiftId)); // Update booked shifts
    } catch (error) {
      console.error('Error canceling shift:', error);
    }
  };

  // Loading and Error Handling
  if (loading) return <p>Loading shifts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Shifts</h2>
      
      {/* City Filter */}
      <div>
        <label htmlFor="city-filter">Filter by City: </label>
        <input
          type="text"
          id="city-filter"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
      </div>

      {/* Shift List */}
      {filteredShifts.length === 0 ? (
        <p>No available shifts found.</p>
      ) : (
        <ul>
          {filteredShifts.map((shift) => (
            <li key={shift.id}>
              <span>{shift.date} - {shift.city}</span>
              <button onClick={() => handleToggleShift(shift.id)}>
                {bookedShifts.includes(shift.id) ? 'Cancel' : 'Book'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvailableShifts;
