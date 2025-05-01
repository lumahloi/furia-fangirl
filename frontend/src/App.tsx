import React, { useState } from 'react';
import { Box, Container, Typography, Avatar, TextField, Button, CircularProgress } from '@mui/material';
import { LinkedIn, GitHub, Web, Mail, Send } from '@mui/icons-material';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/query';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse('');
    
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Ocorreu um erro ao processar sua solicitação.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Container>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mt: 8 }}>NomeMuitoCriativo</Typography>
        </Box>

        <Box sx={{ mb: 10, display: 'flex', flexDirection: 'column', justifyItems: 'flex-start', gap: 5}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }} id="first-msg">
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography variant="h6" gutterBottom>Mascote</Typography>
            </Box>
            <Typography variant="body1" gutterBottom>
              Oiii
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                width: '100%',
                minHeight: '60px',
              }}

              id="user-input"
            >
              <TextField
                multiline
                maxRows={4}
                variant="outlined"
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                sx={{
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                  }
                }}
              />
              
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="large"
              >
                {isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  <Send color={input.trim() ? 'primary' : 'disabled'} />
                )}
              </Button>
            </Box>
          </form>

          <Box class="bot-answers" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography variant="h6" gutterBottom>Mascote</Typography>
            </Box>
            {response && !isLoading && (
              <Typography variant="body1" gutterBottom>
                {response}
              </Typography>
            )}

            {isLoading && (
              <Typography variant="body1" gutterBottom>
              Processando sua solicitação...
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
      
      <Container sx={{ display: 'flex', gap: 20 }}>
        <Box>
          <Typography variant="h5">NomeMuitoCriativo</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 10 }}>
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
    </Box>
  );
}

export default App;