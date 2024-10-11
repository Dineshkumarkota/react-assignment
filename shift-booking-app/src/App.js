// App.js
import React from 'react';
import MyShifts from './components/MyShifts';
import AvailableShifts from './components/AvailableShifts';

const App = () => {
    return (
        <div className="App">
            <h1>Shift Booking Application</h1>
            <MyShifts />
            <AvailableShifts />
        </div>
    );
};

export default App;
