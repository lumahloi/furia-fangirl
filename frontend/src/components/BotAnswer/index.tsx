import {
  botAnswerContainer,
  avatarStyles,
  botNameStyles,
  messageBubble,
  messageText,
} from "../../styles/components/BotAnswer.styles";
import { Box, Typography, Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { keyframes } from '@mui/system';

interface BotAnswerProps {
  message: string;
  skipTypewriter?: boolean;
  typingSpeed?: number;
  fromHistoryWithCss?: boolean; // novo prop para diferenciar
}

function BotAnswer({
  message,
  skipTypewriter = true,
  typingSpeed = 50,
  fromHistoryWithCss = false,
}: BotAnswerProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const cleanMessage = (message ?? "").replace(/\bundefined\b/g, "");
  const [displayedMessage, setDisplayedMessage] = useState(
    skipTypewriter ? cleanMessage : ""
  );
  // Efeito de máquina de escrever
  const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
  `;

  // Efeito de piscar do cursor
  const blinkCaret = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #ffffff }
  `;

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessage]);

  useEffect(() => {
    if (skipTypewriter) {
      setDisplayedMessage(cleanMessage);
      return;
    }

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

      <Box
        sx={{
          ...messageBubble,
          ...(fromHistoryWithCss && {
            animation: `${typewriter} 0.7s steps(20, end), ${blinkCaret} 0.3s step-end infinite`,
          }),
        }}
      >
        <Typography variant="body1" sx={messageText}>
          {cleanMessage}
        </Typography>
      </Box>

      <div ref={messageEndRef} />
    </Box>
  );
}

export default BotAnswer;
