const Resume = () => {
  const downloadPDF = () => {
    const pdfUrl = "/Colin_Taaffe_Resume.pdf"; 
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = "Colin_Taaffe_Resume.pdf"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
  };

  return (
    <section className="resume-section">
      <h2>
        <button onClick={downloadPDF}>
          Download My Resume
        </button>
      </h2>
      
      <h3>Proficiencies:</h3>
      <ul>
        <li>JavaScript</li>
        <li>React</li>
        <li>Node.js</li>
        <li>CSS</li>
        <li>HTML</li>
        <li>MongoDB</li>
        <li>PostgreSQL</li>
        <li>GSAP</li>
      </ul>
    </section>
  );
};

export default Resume;