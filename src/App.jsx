import React from 'react';
import Home from './essence/Home';
import Footer from './essence/Footer';
import Navbar from './essence/Navbar';
import About from './essence/About';
import Products from './essence/Products';
import Contact from './essence/Contact';

function App() {
 
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Products />
      <Contact />
      <Footer />
    </div>
  )
};

export default App;
