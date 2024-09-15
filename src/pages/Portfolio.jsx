import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Project from '../components/Project';

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

    const projects = [
        {
            title: 'Dungeon Mate',
            imageUrl: './Dungeon-Mate.png',
            deployedLink: 'https://google.com',
            githubLink: 'https://github.com/iKeyToLife/Dungeon-Mate'
        },
        {
            title: 'Pokémon Battle Simulator',
            imageUrl: './Pokemon-Battle-Simulator.png',
            deployedLink: 'https://bryan-mcintyre.github.io/Pokemon-Battle-Simulator/',
            githubLink: 'https://github.com/bryan-mcintyre/Pokemon-Battle-Simulator'
        },
        {
            title: 'Weather Dashboard',
            imageUrl: './Weather-Dashboard.png',
            deployedLink: 'https://colinburner.github.io/Weather-Dashboard/',
            githubLink: 'https://github.com/ColinBurner/Weather-Dashboard'
        },
        {
            title: 'Pokémon Battle Simulator V2',
            imageUrl: './Pokemon-Battle-Simulator-V2.png',
            deployedLink: 'https://pokemon-battle-bfgc.onrender.com/',
            githubLink: 'https://github.com/iKeyToLife/Pokemon-Battle-V2'
        },
        {
            title: 'Task Board',
            imageUrl: './Task-Board.png',
            deployedLink: 'https://colinburner.github.io/Task-board/',
            githubLink: 'https://github.com/ColinBurner/Task-board'
        },
        {
            title: 'Note Taker Express',
            imageUrl: './Note-Taker-Express.png',
            deployedLink: 'https://note-taker-express-ff89.onrender.com/',
            githubLink: 'https://github.com/ColinBurner/Note-Taker-Express'
        },
    ];

    return (
        <section className="portfolio-section">
            <h2>Projects</h2>
            <div className="projects">
                {projects.map((project, index) => (
                    <Project
                        key={index}
                        title={project.title}
                        imageUrl={project.imageUrl}
                        deployedLink={project.deployedLink}
                        githubLink={project.githubLink}
                    />
                ))}
            </div>
        </section>
    );
};

export default Portfolio;