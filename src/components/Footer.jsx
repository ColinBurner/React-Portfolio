import { useEffect } from 'react';
import { gsap } from 'gsap';

const Footer = () => {
    useEffect(() => {
        const button = document.querySelector(".explode-button");

        // Animate the hover effect
        button.addEventListener("mouseenter", () => {
            gsap.to(button, {
                scale: 1.8, 
                boxShadow: "0px 0px 20px 10px rgba(255, 0, 0, 0.8)", 
                duration: 0.5, 
                ease: "power2.out",
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button, {
                scale: 1, 
                boxShadow: "none", 
                duration: 0.5,
                ease: "power2.out",
            });
        });
    }, []);

    const handleExplosion = () => {
        const elements = document.querySelectorAll('body *'); 

        // Animate explosion effect
    gsap.to(elements, {
        x: () => gsap.utils.random(-500, 500), 
        y: () => gsap.utils.random(-500, 500),
        rotation: () => gsap.utils.random(-360, 360), 
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
            // Bring everything back to normal after explosion
            gsap.to(elements, {
                x: 0,
                y: 0,
                rotation: 0,
                duration: 1,
                ease: "power3.inOut",
                onComplete: () => {
                    // Clear the inline transform styles after resetting
                    elements.forEach(el => {
                        gsap.set(el, { clearProps: "transform" });
                    });
                }
            });
        }
    });
};

    return (
        <footer className="main-footer">
          <p>Connect with me:</p>
          <ul>
            <li><a href="https://github.com/ColinBurner" target="_blank" rel="noreferrer"><img src="/Github.png" alt="GitHub" className="footer-icon" /></a></li>
            <li><a href="https://linkedin.com/in/colin-taaffe" target="_blank" rel="noreferrer"><img src="/LinkedIn.png" alt="LinkedIn" className="footer-icon" /></a></li>
            <li><a href="https://x.com/Burner_MN" target="_blank" rel="noreferrer"><img src="/X.png" alt="X" className="footer-icon" /></a></li>
          </ul>
          <button className="explode-button" onClick={handleExplosion}>Definitely Don't Click Me 🤫</button> 
        </footer>
      );
  };
  
  export default Footer;