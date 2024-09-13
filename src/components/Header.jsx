import { NavLink } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const Header = () => {
    useLayoutEffect(() => {
        const navLinks = document.querySelectorAll(".nav-links li");

        // Add hover animation for each list item
        navLinks.forEach((link) => {
            // On mouse enter - wiggle/dance effect
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
    }, []);

    return (
        <header className="main-header">
            <h1>Colin 'Burner' Taaffe</h1>
            <nav>
                <ul className="nav-links">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>About Me</NavLink></li>
                    <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? 'active' : ''}>Portfolio</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
                    <li><NavLink to="/resume" className={({ isActive }) => isActive ? 'active' : ''}>Resume</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;