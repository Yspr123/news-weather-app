import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Weather from "./components/Weather";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Navbar remains the same */}
        <Navbar />

        {/* Main container for routes */}
        <div className="container">
          <Routes>
            <Route path="/" element={<News category="general" />} />
            <Route path="/global" element={<News category="general" />} />
            <Route path="/technology" element={<News category="technology" />} />
            <Route path="/finance" element={<News category="business" />} />
            <Route path="/science" element={<News category="science" />} />

            {/* Weather route with updated component */}
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
