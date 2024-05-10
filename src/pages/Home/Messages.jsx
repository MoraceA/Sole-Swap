import React, { useState, useEffect } from 'react';
import './Messages.css';
import { db } from '/Users/ariana/Documents/Sole-Swap/src/firebase.js';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";




// Component for user selection modal
const UserModal = ({ isOpen, onClose, users, onSelectUser }) => {
  const [search, setSearch] = useState(''); // State for search input value

    // Filtering users based on search input
  const filteredUsers = users.filter(user =>
    user && user.name && typeof user.name === 'string' && user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="modal">
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <ul className="user-list">
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

// Component for keyboard keys
const KeyboardKey = ({ value, onKeyPress }) => {
  return (
    <button className="keyboard-key" onClick={() => onKeyPress(value)}>
      {value}
    </button>
  );
};

// Main Messages component
const Messages = () => {
  const [messages, setMessages] = useState([]); // State for messages
  const [input, setInput] = useState(''); // State for message input
  const [isModalOpen, setModalOpen] = useState(false); // State for user modal visibility
  const [users, setUsers] = useState([]);  // State for users
  const [currentUser, setCurrentUser] = useState(null);  // State for current user



   // useEffect hook for fetching users and messages
  useEffect(() => {
      // Fetching users
    const usersQuery = collection(db, 'users');
    const unsubscribeUsers = onSnapshot(usersQuery, snapshot => {
      const fetchedUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      }));
      setUsers(fetchedUsers);
    });

       // Fetching messages
    const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribeMessages = onSnapshot(messagesQuery, snapshot => {
      const fetchedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(fetchedMessages);
    });

    return () => {
      unsubscribeUsers();  // Cleanup function to unsubscribe from users query
      unsubscribeMessages(); // Cleanup function to unsubscribe from messages query
    };
  }, []); // Empty dependency array to run only once on component mount

   // Function to handle input change
  const handleInputChange = (e) => setInput(e.target.value);

    // Function to handle send button click
  const handleSendClick = async () => {
    if (input.trim() && currentUser) {
      await addDoc(collection(db, 'messages'), {
        text: input,
        timestamp: serverTimestamp(),
        userId: currentUser.id,
        userName: currentUser.name
      });
      setInput('');    // Clearing input after sending message
    }
  };

    // Function to handle keyboard key press
  const handleKeyPress = (value) => {
    setInput(input + value);
  };

    // Function to handle backspace
  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="user-info" onClick={() => setModalOpen(true)}>
          <div className="avatar">
            <span role="img" aria-label="avatar">👤</span>
          </div>
          <h2 className="username">{currentUser ? currentUser.name : 'Select User'}</h2>
        </div>
        <div className="chat-date">
          November 09
        </div>
      </div>
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        users={users}
        onSelectUser={(user) => {
          setCurrentUser(user);
          console.log('Chat opened with:', user.name);
          setModalOpen(false);
        }}
      />
      <div className="messages-list">
        {messages.map(msg => (
          <div key={msg.id} className={`message-bubble ${msg.userId === currentUser?.id ? 'mine' : 'theirs'}`}>
            <div className="message-details">
              <span className="message-text">{msg.text}</span>
              <span className="message-time">{msg.timestamp?.toDate().toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="message-input-box">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="message-input"
          placeholder="Enter Message"
        />
        <button onClick={handleSendClick} className="send-button">SEND</button>
      </div>
      <div className="keyboard-container">
        <div className="keyboard-row">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(key => <KeyboardKey key={key} value={key} onKeyPress={handleKeyPress} />)}
        </div>
        <div className="keyboard-row">
          {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(key => <KeyboardKey key={key} value={key} onKeyPress={handleKeyPress} />)}
        </div>
        <div className="keyboard-row">
          {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(key => <KeyboardKey key={key} value={key} onKeyPress={handleKeyPress} />)}
        </div>
        <div className="keyboard-row">
          {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(key => <KeyboardKey key={key} value={key} onKeyPress={handleKeyPress} />)}
          <button className="keyboard-key" onClick={handleBackspace}>⌫</button>
        </div>
      </div>
    </div>
  );
};

export default Messages;