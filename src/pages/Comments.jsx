import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import PropTypes from 'prop-types';

const Comments = ({ isAdmin }) => {
    // State to store comments along with their positions
    const [comments, setComments] = useState([]);
    // State to show/hide comment form
    const [showForm, setShowForm] = useState(false);
    // State for form inputs
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    // State to capture the maximum area for sticky notes
    const [maxDimensions, setMaxDimensions] = useState({ maxTop: 0, maxLeft: 0 });

    // Update the available area dynamically when the window resizes
    useEffect(() => {
        const updateDimensions = () => {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const footerHeight = document.querySelector('footer')?.offsetHeight || 0;
            const availableHeight = window.innerHeight - headerHeight - footerHeight - 225;
            const availableWidth = window.innerWidth - 180;

            setMaxDimensions({
                maxTop: availableHeight,
                maxLeft: availableWidth,
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Function to get random positions within the allowed area
    const getRandomPosition = () => {
        return {
            top: Math.floor(Math.random() * maxDimensions.maxTop) + 'px',
            left: Math.floor(Math.random() * maxDimensions.maxLeft) + 'px',
        };
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'comments'));
                const fetchedComments = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setComments(fetchedComments);
            } catch (err) {
                console.error("Error fetching comments: ", err);
            }
        };

        fetchComments();
    }, []);

    useEffect(() => {
        console.log("Admin Status: ", isAdmin);
      }, [isAdmin]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const position = getRandomPosition();
        const newComment = {
            name: name || 'Anonymous',
            text,
            position
        };

        try {
            // Save the comment to Firestore
            const docRef = await addDoc(collection(db, 'comments'), newComment);
            setComments([...comments, { ...newComment, id: docRef.id }]);
            setName('');
            setText('');
            setShowForm(false);
        } catch (err) {
            console.error('Error saving comment: ', err);
        }
    };

    // Handle comment deletion (visible to admin)
    const handleDelete = async (id) => {
        try {
          const docRef = doc(db, 'comments', String(id));  
          await deleteDoc(docRef);
          setComments(comments.filter(comment => comment.id !== id));  
        } catch (err) {
          console.error('Error deleting comment: ', err);
        }
      };

    return (
        <div className="comments-page">
            <h2>Comments</h2>

            <div className="comments-list" style={{ position: 'relative', height: '500px', overflow: 'hidden' }}>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment" style={{ position: 'absolute', ...comment.position }}>
                        <h4>{comment.name}</h4>
                        <p>{comment.text}</p>

                        {/* Conditionally render delete button for admin */}
                        {isAdmin && (
                            <button onClick={() => handleDelete(comment.id)}>Delete</button>
                        )}
                    </div>
                ))}
            </div>

            {/* Button to show comment form */}
            {!showForm && (
                <button onClick={() => setShowForm(true)}>
                    Leave a comment on my portfolio!
                </button>
            )}

            {/* Comment form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="comment-form">
                    <div className="form-group">
                        <label>Name (optional):</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name (or leave blank for anonymous)"
                        />
                    </div>

                    <div className="form-group">
                        <label>Comment:</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            maxLength="500"
                            placeholder="Your comment (max 500 characters)"
                            required
                        />
                    </div>

                    <button type="submit">Post Comment</button>
                </form>
            )}
        </div>
    );
};

// Adding PropTypes validation for isAdmin
Comments.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

export default Comments;