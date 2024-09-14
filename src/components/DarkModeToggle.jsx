import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // On component mount, check if dark mode is saved in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('theme') === 'dark';
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;