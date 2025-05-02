import {
  botAnswerContainer,
  avatarStyles,
  botNameStyles,
  messageBubble,
  messageText,
} from "../../styles/components/BotAnswer.styles";
import { Box, Typography, Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface BotAnswerProps {
  message: string;
  skipTypewriter?: boolean; // Nome mais explícito
  typingSpeed?: number;
}

function BotAnswer({
  message,
  skipTypewriter = true,
  typingSpeed = 50,
}: BotAnswerProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const cleanMessage = message.replace(/\bundefined\b/g, '');
  
  const [displayedMessage, setDisplayedMessage] = useState(
    skipTypewriter ? cleanMessage : ""
  );

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessage]);

  useEffect(() => {
    if (skipTypewriter) {
      // já inicializado no estado; nada a fazer
      return;
    }

    setDisplayedMessage("");
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < cleanMessage.length) {
        setDisplayedMessage((prev) => prev + cleanMessage[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [cleanMessage, skipTypewriter, typingSpeed]);

  return (
    <Box sx={botAnswerContainer}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar alt="Chat Bot" src="images/fangirl.png" sx={avatarStyles} />
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
