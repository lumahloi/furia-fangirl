import { chatBox } from "../../styles/components/Chat.styles";
import { Container, Box } from "@mui/material";
import useChat from "../../hooks/useChat";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function Chat() {
  const { input, setInput, isLoading, messages, handleSubmit } = useChat();

  return (
    <Container sx={{ minWidth: "80vw" }}>
      <Box sx={chatBox}>
        <MessageList messages={messages} isLoading={isLoading} />
        <ChatInput
          input={input}
          setInput={setInput}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Container>
  );
}
