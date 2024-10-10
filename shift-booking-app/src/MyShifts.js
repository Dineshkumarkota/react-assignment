// src/MyShifts.js
import React from 'react';

const MyShifts = ({ bookedShifts }) => {
  // Group shifts by date
  const groupedShifts = bookedShifts.reduce((acc, shift) => {
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

