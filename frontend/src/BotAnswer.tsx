import { useEffect, useRef, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import {
  botAnswerContainer,
  avatarStyles,
  botNameStyles,
  messageBubble,
  messageText,
} from "./styles/BotAnswerStyles";

interface BotAnswerProps {
  message: string;
}

function BotAnswer({ message }: BotAnswerProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedMessage(prev => prev + message[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50); // Ajuste este valor para mudar a velocidade

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, message]);

    // Reset quando receber uma nova mensagem
    useEffect(() => {
      setDisplayedMessage("");
      setCurrentIndex(0);
    }, [message]);

  return (
    <Box sx={botAnswerContainer}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar
          alt="Chat Bot"
          src="/img/fangirl.png"
          sx={avatarStyles}
        />
        <Typography variant="h6" sx={botNameStyles}>
          Fani
        </Typography>
      </Box>

      <Box sx={messageBubble}>
        <Typography variant="body1" sx={messageText}>
          {displayedMessage}
        </Typography>
      </Box>

      <div ref={messageEndRef} />
    </Box>
  );
}

export default BotAnswer;
