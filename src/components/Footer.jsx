import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { gsap } from 'gsap';
import PropTypes from 'prop-types';

const Footer = ({ setIsAdmin }) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Monitor Firebase Authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);

            // Check if the current user is the admin
            if (currentUser?.email === 'b2rn3r@yahoo.com') {
                setIsAdmin(true);  
            } else {
                setIsAdmin(false); 
            }
        });
        return () => unsubscribe();
    }, [setIsAdmin]);

    // GSAP explosion button effect
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

    // Explosion effect when clicking the button
    const handleExplosion = () => {
        const elements = document.querySelectorAll('body *');

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
                    onComplete: () => {
                        elements.forEach(el => {
                            gsap.set(el, { clearProps: "transform" });
                        });
                    }
                });
            }
        });
    };

    // Handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
            setShowLogin(false); // Hide login form after successful login
        } catch (err) {
            console.error('Login error: ', err);
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (err) {
            console.error('Logout error: ', err);
        }
    };

    return (
        <footer className="main-footer">
            <p>Connect with me:</p>
            <ul>
                <li><a href="https://github.com/ColinBurner" target="_blank" rel="noreferrer"><img src="/Github.png" alt="GitHub" className="footer-icon" /></a></li>
                <li><a href="https://linkedin.com/in/colin-taaffe" target="_blank" rel="noreferrer"><img src="/LinkedIn.png" alt="LinkedIn" className="footer-icon" /></a></li>
                <li><a href="https://x.com/Burner_MN" target="_blank" rel="noreferrer"><img src="/X.png" alt="X" className="footer-icon x-icon" /></a></li>
            </ul>

            <button className="explode-button" onClick={handleExplosion}>Definitely Don't Click Me 🤫</button>

            <div className="auth-section">
                {user ? (
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                ) : (
                    <>
                        <button onClick={() => setShowLogin(true)} className="admin-login-btn">
                            Admin Login
                        </button>

                        {showLogin && (
                            <form onSubmit={handleLogin} className="login-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="submit" className="login-submit-btn">Login</button>
                            </form>
                        )}
                    </>
                )}
            </div>
        </footer>
    );
};

// Adding PropTypes validation for setIsAdmin
Footer.propTypes = {
    setIsAdmin: PropTypes.func.isRequired,
};

export default Footer;