import React, { useState } from 'react';
import { Box, Container, Typography, Avatar, TextField, Button, CircularProgress } from '@mui/material';
import { LinkedIn, GitHub, Web, Mail, Send } from '@mui/icons-material';
import BotAnswer from './BotAnswer';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

function App(){
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: '', isUser: false }
  ]);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/query';

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
            gap: 3
          }}>
            <BotAnswer message="aaaaaaaaaaaaaaa" />

            {messages.slice(1).map((message) => 
              message.isUser ? (
                <Box 
                  key={message.id} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2, 
                    alignSelf: 'flex-end', 
                    maxWidth: '80%' 
                  }}
                >
                  <Box sx={{ p: 2, borderRadius: 4 }}>
                    <Box sx={{ 
                      p: 2, 
                      backgroundColor: '#eeeeee', 
                      borderRadius: 10 
                    }}>
                      <Typography variant="body1">{message.text}</Typography>
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