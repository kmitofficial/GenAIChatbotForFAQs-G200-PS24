import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './css/Chatbot.css';

const Chatbot = () => {
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", sender: 'bot' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { text: inputMessage, sender: 'user' }]);
        setInputMessage('');


        try {
            const embeddings = "embed";
            // Call the backend API
            const response = await axios.post('http://localhost:5000/api/query', {
                query: inputMessage,
                embeddings
            });

            // Display the response from the backend
            setMessages((prev) => [...prev, { text: response.data.response, sender: 'bot' }]);
        } catch (error) {
            setMessages((prev) => [...prev, { text: "Error: Unable to fetch a response.", sender: 'bot' }]);
            console.error("Backend error:", error);
        }
    };


    const handleFeedbackSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/feedback', { feedback });
            console.log('Feedback submitted successfully:', response.data);
            alert('Thank you for your feedback!');
            setFeedback(''); // Reset feedback field
            setShowFeedback(false); // Close feedback modal
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback. Please try again.');
        }
    };

    return (
        <div>
            <button className="chat-button" onClick={() => setShowChat(!showChat)}>
                💬 Chat
            </button>
            {showChat && (
                <div className="chat-window">
                    {/* Sidebar */}
                    <div className="sidebar">
                        <h2 className="sidebar-title">KMIT Chatbot</h2>
                        <ul className="sidebar-links">
                            <li className="sidebar-item">Home</li>
                            <li className="sidebar-item">Settings</li>
                            <li className="sidebar-item">Help</li>
                        </ul>
                    </div>

                    {/* Main Chat Container */}
                    <div className="chat-container">
                        <div className="chat-header">KMIT Chatbot</div>
                        <div className="chat-messages">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`chat-bubble ${message.sender === 'user' ? 'user' : 'bot'}`}
                                >
                                    {message.text}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <form className="chat-input" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                className="input-field"
                            />
                            <button type="submit" className="send-button">Send</button>
                            <button
                                type="button"
                                className="chat-button-logout"
                                onClick={() => setShowChat(false)}
                            >
                                Close
                            </button>
                        </form>
                        <button
                            className="feedback-button"
                            onClick={() => setShowFeedback(!showFeedback)}
                        >
                            Feedback
                        </button>
                        {showFeedback && (
                            <div className="feedback-form">
                                <h3>Submit Feedback</h3>
                                <textarea
                                    placeholder="Write your feedback here..."
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="feedback-textarea"
                                />
                                <button onClick={handleFeedbackSubmit} className="send-button">
                                    Submit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;