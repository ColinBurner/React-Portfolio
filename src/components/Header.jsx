import { NavLink } from 'react-router-dom';
import { useLayoutEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
     // Helper function to stop animations
    const stopAnimations = useCallback(() => {
        const navLinks = document.querySelectorAll(".nav-links li a");
        navLinks.forEach(link => {
            const parentLi = link.closest("li");

            // Ensure any running tweens are stopped and reset inactive links
            gsap.killTweensOf(parentLi);  
            gsap.to(parentLi, { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(link, { textShadow: "none", duration: 0.3 });  // Reset text shadow
        });
    }, []);

    // Function to apply animations
    const applyAnimations = useCallback(() => {
        const navLinks = document.querySelectorAll(".nav-links li a");
        stopAnimations();  // First, reset everything

        navLinks.forEach((link) => {
            const parentLi = link.closest("li");

            // Apply glow effect to inactive links
            if (!link.classList.contains('active')) {
                gsap.to(link, {
                    textShadow: "0px 0px 20px rgba(255, 165, 0, 0.9)", // Orange glow
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                });
            }

            // Apply dance effect to active link
            if (link.classList.contains('active')) {
                gsap.to(parentLi, {
                    rotation: 360,
                    y: -5,
                    duration: 1.7,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                });
            }
        });
    }, [stopAnimations]);

    useLayoutEffect(() => {
        const navLinks = document.querySelectorAll(".nav-links li a");

        // Apply animations initially
        applyAnimations();

        // Click listener to reset and re-apply animations after a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                setTimeout(() => {
                    applyAnimations();  // Re-apply animations after click
                }, 100);
            });
        });

        // Pulsing glow effect for the title 
        const title = document.querySelector(".gradient-text");
        if (title) {
            gsap.to(title, {
                textShadow: "0px 0px 20px rgba(255, 104, 16, 1)", // Glow effect
                duration: 1.5,
                yoyo: true,
                repeat: -1,
                ease: "power1.inOut",
            });
        }
    }, [applyAnimations]);

    return (
        <header className="main-header">
            <h1 className="gradient-text">Colin 'Burner' Taaffe</h1>
            <nav>
                <ul className="nav-links">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>About Me</NavLink></li>
                    <li><NavLink to="/portfolio" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink></li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
                    <li><NavLink to="/resume" className={({ isActive }) => isActive ? 'active' : ''}>Resume</NavLink></li>
                    <li><NavLink to="/photos" className={({ isActive }) => isActive ? 'active' : ''}>Photos</NavLink></li>
                    <li><NavLink to="/comments" className={({ isActive }) => isActive ? 'active' : ''}>Comments</NavLink></li>
                </ul>
            </nav>
            <DarkModeToggle />
        </header>
    );
};

export default Header;