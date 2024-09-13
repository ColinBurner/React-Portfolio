import avatar from '../assets/Me-and-Ragnar.jpg'; 

const About = () => {
  return (
    <section>
      <h2>About Me!</h2>
      <img src={avatar} alt="Me-and-Ragnar" style={{ width: '150px', borderRadius: '50%' }} />
      <p></p>
    </section>
  );
};

export default About;