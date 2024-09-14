import { gsap } from 'gsap';

const Footer = () => {
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
                gsap.to(elements, {
                    x: 0, 
                    y: 0, 
                    rotation: 0, 
                    duration: 1, 
                    ease: "power3.inOut", 
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
          <button className="explode-button" onClick={handleExplosion}>Don't Click Me 🤫</button> 
        </footer>
      );
  };
  
  export default Footer;