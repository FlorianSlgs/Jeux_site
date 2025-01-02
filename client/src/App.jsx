import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './pages/quiz';
import Categories from './pages/categories';
import Home from './pages/home';
import Header from './components/header';
import Footer from './components/footer';
import HomeButton from './components/homeButton';
 
const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <HomeButton />

          <Routes>
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/" element={<Home />} />
          </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;

