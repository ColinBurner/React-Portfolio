import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import Photos from './pages/Photos';
import Comments from './pages/Comments';

function App() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is an admin when the app loads
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.email === 'b2rn3r@yahoo.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/resume" element={<PageWrapper><Resume /></PageWrapper>} />
          <Route path="/photos" element={<PageWrapper><Photos /></PageWrapper>} />
          <Route path="/comments" element={<PageWrapper><Comments isAdmin={isAdmin} /></PageWrapper>} /> 
        </Routes>
      </AnimatePresence>
      <Footer setIsAdmin={setIsAdmin} />
    </>
  );
}

// PageWrapper handles the animation for each route change
const PageWrapper = ({ children }) => {
  const isSmallScreen = window.innerWidth < 768;

  return (
    <motion.div
      // Conditionally apply animations based on screen size
      initial={isSmallScreen 
        ? { opacity: 0, y: 20 }      
        : { opacity: 0, x: -100 }}   
      animate={{ opacity: 1, x: 0, y: 0 }}  
      exit={isSmallScreen 
        ? { opacity: 0, y: -20 }     
        : { opacity: 0, x: 100 }}   
      transition={{
        duration: isSmallScreen ? 0.4 : 0.9, 
      }}
    >
      {children}
    </motion.div>
  );
};

// Add prop-types validation for the 'children' prop
PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;