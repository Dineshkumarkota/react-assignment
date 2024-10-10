import React,{useState} from 'react';
import AvailableShifts from './AvailableShifts';
import MyShifts from './MyShifts';
function App() {
  const [bookedShifts, setBookedShifts] = useState([]);
  return (
    <div>
    <h1>Shift Booking Application</h1>
    <AvailableShifts setBookedShifts={setBookedShifts} />
    <MyShifts bookedShifts={bookedShifts} />
  </div>
);
}

export default App;
