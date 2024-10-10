import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// Fetch all shifts
export const fetchShifts = async () => {
  const response = await axios.get(`${BASE_URL}/shifts`);
  return response.data;
};

// Book a shift
export const bookShift = async (shiftId) => {
  await axios.post(`${BASE_URL}/shifts/${shiftId}/book`);
};

// Cancel a shift
export const cancelShift = async (shiftId) => {
  await axios.post(`${BASE_URL}/shifts/${shiftId}/cancel`);
};
