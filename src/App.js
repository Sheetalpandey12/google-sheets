import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ResultPage from './components/ResultPage';
import ChartPage from "./components/ChartPage";
// import GoogleSheet from './components/GoogleSheet';

function App() {
  return (
    <Router> {/* Wrap the entire routing logic with Router */}
      <div className="App">
        <Routes>
          <Route path="/" element={<ResultPage />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
