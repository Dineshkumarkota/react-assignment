// src/MyShifts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyShifts = ({ bookedShifts, setBookedShifts }) => {
  const [myShifts, setMyShifts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchMyShifts = async () => {
      setLoading(true); // Set loading to true
      setError(null); // Reset error state
      try {
        const response = await axios.get('http://localhost:8080/my-shifts');
        setMyShifts(response.data);
      } catch (error) {
        setError('Error fetching my shifts: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchMyShifts();
  }, []);

  const handleCancelShift = async (shiftId) => {
    try {
      await axios.delete(`http://localhost:8080/cancel-shift/${shiftId}`);
      setBookedShifts((prev) => prev.filter((shift) => shift.id !== shiftId));
      console.log('Shift canceled:', shiftId);
    } catch (error) {
      console.error('Error canceling shift:', error);
    }
  };

  // Group shifts by date
  const groupedShifts = myShifts.reduce((acc, shift) => {
    const date = shift.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(shift);
    return acc;
  }, {});

  return (
    <div>
      <h2>My Shifts</h2>
      {/* Show loading indicator */}
      {loading && <p>Loading my shifts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}

      {Object.keys(groupedShifts).length === 0 ? (
        <p>No booked shifts found.</p>
      ) : (
        Object.entries(groupedShifts).map(([date, shifts]) => (
          <div key={date}>
            <h3>{date}</h3>
            <ul>
              {shifts.map((shift) => (
                <li key={shift.id}>
                  {shift.city}
                  <button onClick={() => handleCancelShift(shift.id)}>Cancel</button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MyShifts;
