import { SxProps } from '@mui/material';
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
  animation: `${subtlePulse} 2s ease-in-out infinite`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "rotate(5deg)",
  },
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

export const messageText = {
  color: "#ffffff",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: 1.6,
};