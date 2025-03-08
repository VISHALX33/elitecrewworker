import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkerForm from './components/WorkerForm';
import WorkerList from './components/WorkerList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
// import Services from './components/Services';

const App = () => {
  return (
    <Router>
      <Navbar/>
      
      <Routes>
        
        <Route path="/" element={<WorkerForm />} />

        <Route path="/workers" element={<WorkerList />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;