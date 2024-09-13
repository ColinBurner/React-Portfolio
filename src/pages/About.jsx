import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

const About = () => {
    useLayoutEffect(() => {
        const profilePic = document.querySelector(".profile-pic");
    
        if (profilePic) {
          // Initial entrance animation
          gsap.fromTo(
            profilePic,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out", autoAlpha: 1 }
          );
    
          // Hover effect
          profilePic.addEventListener("mouseenter", () => {
            gsap.to(profilePic, {
              scale: 1.5, 
              rotation: 5,
              duration: 0.3, 
              ease: "power2.inOut"
            });
          });
    
          // Revert when hover ends
          profilePic.addEventListener("mouseleave", () => {
            gsap.to(profilePic, {
              scale: 1, 
              rotation: 0, 
              duration: 0.3,
              ease: "power2.inOut"
            });
          });
        } else {
          console.warn(".profile-pic not found in the DOM");
        }
      }, []);

    return (
      <section className="about-section">
        <h2>About Me</h2>
        <img 
          src="/Me-and-Ragnar.jpg" 
          alt="Me-and-Ragnar" 
          className="profile-pic"
        />
        <p>
          Welcome! My name is Colin and I created this portfolio in the University of Minnesota coding bootcamp! I am a father, an avid gamer and I have 3 cats (Ragnar is the one pictured!) 
          I have been interested in web development since the days of adjusting my own HTML on MySpace. 
          I spent almost 20 years working in production/warehouse management before finally deciding it was time to find a career that I felt fulfilled me. 
        </p>
      </section>
    );
  };
  
  export default About;