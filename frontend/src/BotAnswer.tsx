import { useEffect, useRef } from "react";
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

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Box sx={botAnswerContainer}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar
          alt="Chat Bot"
          src="/static/images/avatar/1.jpg"
          sx={avatarStyles}
        />
        <Typography variant="h6" sx={botNameStyles}>
          Mascote
        </Typography>
      </Box>

      <Box sx={messageBubble}>
        <Typography variant="body1" sx={messageText}>
          {message}
        </Typography>
      </Box>

      <div ref={messageEndRef} />
    </Box>
  );
}

export default BotAnswer;
