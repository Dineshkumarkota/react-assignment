import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableShifts = () => {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/shifts');
                setShifts(response.data);
            } catch (err) {
                setError('Error fetching shifts');
                console.error('Error fetching shifts:', err);
            } finally {
                setLoading(false); // Ensure loading is set to false here
            }
        };

        fetchShifts();
    }, []);

    const handleBookShift = async (id) => {
        try {
            // Send the POST request to book the shift
            await axios.post(`http://127.0.0.1:8080/shifts/${id}/book`);
            
            // Update the shifts state to mark the shift as booked
            setShifts(prevShifts =>
                prevShifts.map(shift =>
                    shift.id === id ? { ...shift, booked: true } : shift
                )
            );
            alert('Shift booked successfully!');
        } catch (error) {
            console.error('Error booking shift:', error);
            if (error.response) {
                alert(error.response.data.error || 'Error booking the shift');
            } else {
                alert('Error connecting to the server');
            }
        }
    };
    if (loading) return <p>Loading shifts...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="available-shifts-container">
            <h2>Available Shifts</h2>
            {shifts.length > 0 ? (
                shifts.map(shift => (
                    <div className="shift-card" key={shift.id}>
                        <h3>{shift.area}</h3>
                        <p>{new Date(shift.startTime).toLocaleString()} - {new Date(shift.endTime).toLocaleString()}</p>
                        <button
                            onClick={() => handleBookShift(shift.id)}
                            className="book-button" // Ensure this matches your CSS
                            disabled={shift.booked || new Date(shift.startTime) <= new Date()} // Disable if booked or started
                        >
                            {shift.booked ? 'Booked' : 'Book'}
                        </button>
                    </div>
                ))
            ) : (
                <p>No available shifts at the moment.</p>
            )}
        </div>
    );
};

export default AvailableShifts;
