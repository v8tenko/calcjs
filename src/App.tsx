import React from 'react';
import './App.css';
import Calculator from "./components/Calculator/Calculator";

function App() {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                height: 500,
                width: 400
            }}>
                <Calculator />
            </div>
        </div>
    );
}

export default App;
