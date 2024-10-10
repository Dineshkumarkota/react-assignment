// src/AvailableShifts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableShifts = () => {
  const [shifts, setShifts] = useState([]);
  const [city, setCity] = useState('');  // For filtering by city
  const [bookedShifts, setBookedShifts] = useState([]); // For tracking booked shifts

  useEffect(() => {
    // Fetch available shifts from the API
    const fetchShifts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/available-shifts');
        setShifts(response.data);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    };

    fetchShifts();
  }, []);

  // Filter shifts by city
  const filteredShifts = city
    ? shifts.filter(shift => shift.city.toLowerCase().includes(city.toLowerCase()))
    : shifts;

    const handleBookShift = async (shiftId) => {
        try {
          // Send booking request to the API
          await axios.post(`http://localhost:8080/book-shift/${shiftId}`);
          // Update local state
          setBookedShifts([...bookedShifts, shiftId]);
          console.log('Shift booked:', shiftId);
        } catch (error) {
          console.error('Error booking shift:', error);
        }
      };

      const handleCancelShift = async (shiftId) => {
        try {
          // Send cancellation request to the API
          await axios.delete(`http://localhost:8080/cancel-shift/${shiftId}`);
          // Update local state
          setBookedShifts(bookedShifts.filter((id) => id !== shiftId));
          console.log('Shift canceled:', shiftId);
        } catch (error) {
          console.error('Error canceling shift:', error);
        }
      };

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
