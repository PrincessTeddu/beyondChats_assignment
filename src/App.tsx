import { useState } from 'react';
import { Box, Chip, IconButton, Paper, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  text: string;
  isUser: boolean;
}

// Predefined responses for specific keywords
const predefinedResponses: Record<string, string> = {
  hello: 'Hi there! How can I help you today?',
  help: 'Sure, I can help. What do you need assistance with?',
  product: 'Our product is top-notch. What would you like to know about it?',
  price: 'For pricing details, please visit our website or contact sales.',
  track: 'You can track your order using the tracking number on our website.',
  return: 'Our return policy allows returns within 30 days of purchase.',
  warranty: 'Our products come with a 1-year warranty.',
  'how are you': "I'm doing well, thank you for asking! How can I assist you?",
  bye: 'Goodbye! Have a great day!',
};

// Initial suggestions
const initialSuggestions = [
  "What's your return policy?",
  'Do you offer warranties?',
  'How can I track my order?',
  'Tell me about your product',
];

export function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>(initialSuggestions);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    // Generate AI response based on user input
    let responseText = 'I understand your query. Let me help you with that...';
    
    // Check for keywords in the input and provide relevant responses
    const lowercaseInput = input.toLowerCase();
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowercaseInput.includes(keyword)) {
        responseText = response;
        break;
      }
    }

    const aiResponse: Message = {
      text: responseText,
      isUser: false
    };
    setMessages(prev => [...prev, aiResponse]);
    setInput('');

    // Update suggestions based on the conversation
    if (lowercaseInput.includes('product')) {
      setSuggestions(['Tell me more about features', 'What are the specifications?', 'Is there a demo?']);
    } else if (lowercaseInput.includes('return')) {
      setSuggestions(['How long does the return process take?', 'What items are non-returnable?', 'Can I get a refund?']);
    } else {
      // Revert to initial suggestions if no specific keywords are matched
      setSuggestions(initialSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 2, maxWidth: '800px', mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
        BeyondChats Assistant
      </Typography>
      
      <Paper elevation={3} sx={{ flex: 1, mb: 2, p: 2, overflow: 'auto' }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              mb: 1
            }}
          >
            <Paper
              sx={{
                p: 1,
                backgroundColor: message.isUser ? '#1976d2' : '#f5f5f5',
                color: message.isUser ? 'white' : 'black',
                maxWidth: '70%'
              }}
            >
              <Typography>{message.text}</Typography>
            </Paper>
          </Box>
        ))}
      </Paper>

      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        {suggestions.map((suggestion, index) => (
          <Chip
            key={index}
            label={suggestion}
            onClick={() => handleSuggestionClick(suggestion)}
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{ bgcolor: '#1976d2', color: 'white', '&:hover': { bgcolor: '#1565c0' } }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}