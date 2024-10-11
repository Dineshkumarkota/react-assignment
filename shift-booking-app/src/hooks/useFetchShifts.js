// useFetchShifts.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchShifts = () => {
    const [shifts, setShifts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/shifts');
                setShifts(response.data);
            } catch (err) {
                setError('Error fetching shifts. Please try again later.');
                console.error('Error fetching shifts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchShifts();
    }, []);

    return { shifts, setShifts, loading, error };
};

export default useFetchShifts;


