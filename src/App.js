import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MahalakshmiGarmentsCard from './components/MahalakshmiGarmentsCard';
import Contact from './components/Contact';
import ExploreUs from './components/ExploreUs'; // ⬅️ Import the new ExploreUs component
import Directions from './components/Directions'; 

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MahalakshmiGarmentsCard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collections" element={<ExploreUs />} /> {/* ✅ New route */}
          <Route path="/directions" element={<Directions />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
