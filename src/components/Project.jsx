import PropTypes from 'prop-types';

const Project = ({ title, imageUrl, deployedLink, githubLink }) => {
    return (
      <div className="project-card">
        <a href={deployedLink} target="_blank" rel="noopener noreferrer">
          <img src={imageUrl} alt={title} className="project-image" />
        </a>
        <h3>{title}</h3>
        <div className="project-links">
          <a href={deployedLink} target="_blank" rel="noopener noreferrer">Deployed App</a>
          <a href={githubLink} target="_blank" rel="noopener noreferrer">GitHub Repo</a>
        </div>
      </div>
    );
  };
  
  Project.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    deployedLink: PropTypes.string.isRequired,
    githubLink: PropTypes.string.isRequired,
  };
  
  export default Project;