import { keyframes } from '@mui/system';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const subtlePulse = keyframes`
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

export const botAnswerContainer = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  animation: `${fadeIn} 0.5s ease-out forwards`,
};

export const avatarStyles = {
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "rotate(5deg)",
  },
  '& img': {
    borderRadius: '50%',
    width: 50,
    height: 50,
    objectFit: 'cover',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
    }
  },
  backgroundColor: 'grey'
};

export const botNameStyles = {
  transition: "all 0.3s ease",
  color: "#3e3f3f",
};

export const messageBubble = {
  p: 2,
  backgroundColor: "#363737",
  borderRadius: 10,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  overflowWrap: "break-word",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
};

// Efeito de máquina de escrever
export const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

// Efeito de piscar do cursor
export const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #ffffff }
`;

export const messageText = {
  color: "#ffffff",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: 1.6,
  overflow: "hidden",
  display: "inline-block",
  verticalAlign: "top",
  animation: `
    ${typewriter} 0.7s steps(20, end),
    ${blinkCaret} 0.3s step-end infinite
  `,
  animationFillMode: "forwards" // Adicione isso para manter o estado final
};