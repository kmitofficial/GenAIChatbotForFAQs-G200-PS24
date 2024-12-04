import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import CollegeWebsiteInterface from './components/CollegeWebsiteInterface';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CollegeWebsiteInterface />} />
      </Routes>
    </div>
  );
}

export default App;
