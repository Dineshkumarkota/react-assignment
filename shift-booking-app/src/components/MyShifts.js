// MyShifts.js
import React from 'react';
import useFetch from '../hooks/useFetchShifts';

const MyShifts = () => {
    const { data: shifts = [], loading, error } = useFetch('/shifts'); // Default to empty array

    const cancelShift = async (id) => {
        try {
            const response = await fetch(`/shifts/${id}/cancel`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to cancel shift');
            }
            const updatedShift = await response.json();
            console.log('Canceled shift:', updatedShift);
        } catch (error) {
            console.error('Error canceling shift:', error);
        }
    };

    if (loading) return <div>Loading your shifts...</div>;
    if (error) return <div>Error loading shifts: {error.message}</div>;

    // Filter to show only booked shifts
    const bookedShifts = shifts.filter(shift => shift.booked);

    return (
        <div>
            <h2>Your Shifts</h2>
            <ul>
                {bookedShifts.length > 0 ? (
                    bookedShifts.map(shift => (
                        <li key={shift.id}>
                            {`${shift.area}: ${new Date(shift.startTime).toLocaleTimeString()} - ${new Date(shift.endTime).toLocaleTimeString()}`}
                            <button onClick={() => cancelShift(shift.id)}>Cancel</button>
                        </li>
                    ))
                ) : (
                    <li>No booked shifts found.</li>
                )}
            </ul>
        </div>
    );
};

export default MyShifts;





