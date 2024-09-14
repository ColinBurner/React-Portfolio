import { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message) newErrors.message = 'Message is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Send email via EmailJS
      emailjs
        .send('service_fj1cxxt', 'template_fg02s5f', formData, 'XUyTG6lJRcAX7XPwH')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          setSuccessMessage('Your message has been sent!');
          setErrorMessage(''); 
          setFormData({ name: '', email: '', message: '' }); 
        })
        .catch((err) => {
          console.log('FAILED...', err);
          setErrorMessage('Failed to send message. Please try again later.');
          setSuccessMessage(''); 
        });
    }
  };

  return (
    <section className="contact-section">
      <h2>Contact Me!</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span>{errors.name}</span>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}

        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <span>{errors.message}</span>}

        <button type="submit">Submit</button>

        {/* Show success or error messages */}
        {successMessage && <p style={{ color: 'OrangeRed', marginTop: '1rem' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red', marginTop: '1rem' }}>{errorMessage}</p>}
      </form>
    </section>
  );
};

export default Contact;