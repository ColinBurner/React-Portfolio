import { NavLink } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
    useLayoutEffect(() => {
        const navLinks = document.querySelectorAll(".nav-links li");

        // Add hover animation for each list item
        navLinks.forEach((link) => {
            link.addEventListener("mouseenter", () => {
                gsap.to(link, {
                    rotation: 3,  
                    y: -10,  
                    duration: 0.2, 
                    ease: "power1.inOut",
                    repeat: 3,  
                    yoyo: true,  
                });
            });

            // On mouse leave - reset to original state
            link.addEventListener("mouseleave", () => {
                gsap.to(link, {
                    rotation: 0,  
                    y: 0,  
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    
        // Pulsing glow effect
        const title = document.querySelector(".gradient-text");
        if (title) {
            gsap.to(title, {
                textShadow: "0px 0px 20px rgba(255, 104, 16, 1)",
                duration: 1.5,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut"
            });
        }
    }, []);

    return (
        <header className="main-header">
            <h1 className="gradient-text">Colin 'Burner' Taaffe"</h1>
            <nav>
                <ul className="nav-links">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>About Me</NavLink></li>
                    <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? 'active' : ''}>Portfolio</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
                    <li><NavLink to="/resume" className={({ isActive }) => isActive ? 'active' : ''}>Resume</NavLink></li>
                    <li><NavLink to="/photos" className={({ isActive }) => isActive ? 'active' : ''}>Photos</NavLink></li>
                </ul>
            </nav>
            <DarkModeToggle />
        </header>
    );
};

export default Header;