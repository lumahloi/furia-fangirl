import { useEffect, useRef } from 'react';
import { Box, Typography, Avatar, keyframes } from '@mui/material';

interface BotAnswerProps {
  message: string;
}

// Animação de entrada suave
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animação de "pulsação" sutil no avatar
const subtlePulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

function BotAnswer({ message }: BotAnswerProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2,
        animation: `${fadeIn} 0.5s ease-out forwards`,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Avatar 
          alt="Chat Bot" 
          src="/static/images/avatar/1.jpg"
          sx={{
            animation: `${subtlePulse} 2s ease-in-out infinite`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(5deg)'
            }
          }}
        />
        <Typography 
          variant="h6"
          sx={{
            transition: 'all 0.3s ease',
            color: "#3e3f3f"
          }}
        >
          Mascote
        </Typography>
      </Box>
      
      <Box 
        sx={{ 
          p: 2, 
          backgroundColor: '#363737', 
          borderRadius: 10,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          }
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#ffffff',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            lineHeight: 1.6,
          }}
        >
          {message}
        </Typography>
      </Box>
      
      <div ref={messageEndRef} />
    </Box>
  );
}

export default BotAnswer;