// src/MyShifts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyShifts = ({ bookedShifts }) => {
  const [myShifts, setMyShifts] = useState([]);

  useEffect(() => {
    const fetchMyShifts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/my-shifts');
        setMyShifts(response.data);
      } catch (error) {
        console.error('Error fetching my shifts:', error);
      }
    };

    fetchMyShifts();
  }, []);

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
