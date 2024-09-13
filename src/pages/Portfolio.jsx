import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Portfolio = () => {
    useEffect(() => {
        gsap.from(".project", {
          scrollTrigger: {
            trigger: ".projects",
            start: "top 80%", 
            end: "bottom 60%",
            toggleActions: "play none none reverse"
          },
          opacity: 0,
          y: 50,
          duration: 1.5,
          stagger: 0.3 
        });
      }, []);

    return (
      <section className="portfolio-section">
        <div className="projects">
        <div className="project">Project 1</div>
        <div className="project">Project 2</div>
        <div className="project">Project 3</div>
        <div className="project">Project 4</div>
        <div className="project">Project 5</div>
        <div className="project">Project 6</div>
      </div>
      </section>
    );
  };
  
  export default Portfolio;