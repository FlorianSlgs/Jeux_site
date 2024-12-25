import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './pages/quiz';
import Header from './components/header';
 
const App = () => {
  return (
    <Router>
      <div>
        <Header />

        <Routes>
          <Route path="/" element={<Quiz />} />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;

