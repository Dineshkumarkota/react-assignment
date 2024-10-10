// src/MyShifts.js
import React from 'react';
import axios from 'axios';

const MyShifts = ({ bookedShifts,setBookedShifts }) => {
  // Group shifts by date
  const groupedShifts = bookedShifts.reduce((acc, shift) => {
    const date = shift.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(shift);
    return acc;
  }, {});
  const handleCancelShift = async (shiftId) => {
    try {
      await axios.delete(`http://localhost:8080/cancel-shift/${shiftId}`);
      setBookedShifts((prev) => prev.filter((shift) => shift.id !== shiftId));
      console.log('Shift canceled:', shiftId);
    } catch (error) {
      console.error('Error canceling shift:', error);
    }
  };

  return (
    <div>
      <h2>My Shifts</h2>
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

