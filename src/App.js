import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Quiz from './Quiz';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React from 'react';
// import HomePage from './HomePage';

// function App() {
//   return (
//     <div className="App">
//       <HomePage />
//     </div>
//   );
// }

// export default App;