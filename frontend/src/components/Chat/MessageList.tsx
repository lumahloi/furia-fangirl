import {
  messageBox,
  userBubble,
  breakText,
  chatBoxBox,
} from "../../styles/components/Chat.styles";
import { Box, Typography } from "@mui/material";
import { Message } from "../../types/messages";
import BotAnswer from "../BotAnswer";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  return (
    <Box sx={chatBoxBox}>
      {messages.map((message) =>
        message.isUser ? (
          <Box key={message.id} sx={messageBox}>
            <Box sx={{ borderRadius: 4, width: "100%" }}>
              <Box sx={userBubble}>
                <Typography variant="body1" sx={breakText}>
                  {message.text}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <BotAnswer
            key={message.id}
            message={message.text}
            skipTypewriter={!!localStorage.getItem("chatMessages")}
          />
        )
      )}
      {isLoading && (
        <BotAnswer message="Huum, deixa eu pensar um pouquinho..." />
      )}
    </Box>
  );
}
