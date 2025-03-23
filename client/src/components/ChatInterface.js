import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Box, Typography } from '@mui/material';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      try {
        const response = await axios.post('/api/chat', { message: input });
        setMessages([...messages, { text: input, sender: 'user' }, { text: response.data.response, sender: 'bot' }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages([...messages, { text: input, sender: 'user' }, { text: 'Error processing request.', sender: 'bot' }]);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ height: '500px', overflowY: 'auto', marginBottom: '1rem' }}>
        {messages.map((message, index) => (
          <Typography key={index} variant="body1" sx={{ textAlign: message.sender === 'user' ? 'right' : 'left' }}>
            {message.text}
          </Typography>
        ))}
      </Box>
      <Box sx={{ display: 'flex' }}>
        <TextField fullWidth value={input} onChange={(e) => setInput(e.target.value)} />
        <Button variant="contained" onClick={sendMessage}>Send</Button>
      </Box>
    </Container>
  );
}

export default ChatInterface;
