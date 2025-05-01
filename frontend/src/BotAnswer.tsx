import { useEffect, useRef } from "react";
import { Box, Typography, Avatar } from "@mui/material";

interface BotAnswerProps {
  message: string;
}

function BotAnswer({ message }: BotAnswerProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar alt="Chat Bot" src="/static/images/avatar/1.jpg" />
        <Typography variant="h6">Mascote</Typography>
      </Box>
      <Box
        sx={{
          p: 2,
          backgroundColor: "#363737",
          borderRadius: 10,
          whiteSpace: "pre-wrap"
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#ffffff",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {message}
        </Typography>
      </Box>
      <div ref={messageEndRef} /> {/* Âncora para o scroll */}
    </Box>
  );
}

export default BotAnswer;
