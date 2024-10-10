// src/AvailableShifts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableShifts = ({ setBookedShifts }) => {
  const [shifts, setShifts] = useState([]);
  const [city, setCity] = useState('');
  const [bookedShifts, setBookedShiftsState] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchShifts = async () => {
      setLoading(true); // Set loading to true
      setError(null); // Reset error state
      try {
        const response = await axios.get('http://localhost:8080/available-shifts');
        setShifts(response.data);
      } catch (error) {
        setError('Error fetching shifts: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchShifts();
  }, []);

  const filteredShifts = city
    ? shifts.filter(shift => shift.city.toLowerCase().includes(city.toLowerCase()))
    : shifts;

  const handleBookShift = async (shiftId) => {
    try {
      await axios.post(`http://localhost:8080/book-shift/${shiftId}`);
      setBookedShifts([...bookedShifts, shiftId]);
      console.log('Shift booked:', shiftId);
    } catch (error) {
      console.error('Error booking shift:', error);
    }
  };

  const handleCancelShift = async (shiftId) => {
    try {
      await axios.delete(`http://localhost:8080/cancel-shift/${shiftId}`);
      setBookedShifts(bookedShifts.filter((id) => id !== shiftId));
      console.log('Shift canceled:', shiftId);
    } catch (error) {
      console.error('Error canceling shift:', error);
    }
  };

  return (
    <div>
      <h2>Available Shifts</h2>
      {/* Show loading indicator */}
      {loading && <p>Loading shifts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}

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

      <ul>
        {filteredShifts.map((shift) => (
          <li key={shift.id}>
            <span>{shift.date} - {shift.city}</span>
            <button onClick={() => handleBookShift(shift.id)}>Book</button>
            <button onClick={() => handleCancelShift(shift.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableShifts;
