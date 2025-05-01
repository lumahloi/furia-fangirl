import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { LinkedIn, GitHub, Mail, Web, Send } from '@mui/icons-material';
import BotAnswer from './BotAnswer'; 

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

function App() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [
      { id: 1, text: 'Faça uma pergunta, eu sei tudo sobre a FURIA!', isUser: false }
    ];
  });

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/query';

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isUser: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.response,
        isUser: false
      };
      
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Ocorreu um erro ao processar sua solicitação.',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Container sx={{ maxWidth:'20vw' }}>
        <Box sx={{ minHeight:'20vh', alignContent: 'start', marginTop: '50px' }}>
          <Typography variant="h5">NomeMuitoCriativo</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Box>
            <Typography variant="h6" gutterBottom>Desenvolvidor por</Typography>
            <Typography variant="subtitle1">Lumah Pereira</Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>Informações de contato</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <LinkedIn />
              <GitHub />
              <Mail />
              <Web />
            </Box>
          </Box>
        </Box>
      </Container>

      <Container sx={{ minWidth:'80vw' }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '90vh',
          marginTop: '40px',
          width: '100%',
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          <Box sx={{
            flexGrow: 1,
            overflowY: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}>
            {messages.map((message) => 
              message.isUser ? (
                <Box 
                  key={message.id} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignSelf: 'flex-end', 
                    maxWidth: '100%',
                    width: 'fit-content'
                  }}
                >
                  <Box sx={{ borderRadius: 4, width: '100%' }}>
                    <Box sx={{ 
                      p: 2, 
                      backgroundColor: '#eeeeee', 
                      borderRadius: 10,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word', 
                      overflowWrap: 'break-word', 
                      minWidth: '50px', 
                      maxWidth: '100%', 
                      display: 'inline-block' 
                    }}>
                      <Typography variant="body1" sx={{
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}>
                        {message.text}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <BotAnswer key={message.id} message={message.text} />
              )
            )}
            {isLoading && (
              <BotAnswer message="Processando sua solicitação..." />
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box 
            component="form" 
            onSubmit={handleSubmit}
            id="user-input"
            sx={{ 
              p: 2,
              borderTop: '1px solid #e0e0e0',
              bgcolor: 'background.paper'
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              <TextField
                multiline
                maxRows={4}
                fullWidth
                variant="outlined"
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                  }
                }}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                color="primary"
                sx={{ 
                  height: '56px',
                  width: '56px',
                  alignSelf: 'flex-end'
                }}
              >
                {isLoading ? <CircularProgress size={24} /> : <Send />}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>     
    </Box>
  );
}

export default App;