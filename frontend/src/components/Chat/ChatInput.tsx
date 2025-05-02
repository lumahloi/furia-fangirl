import {
  userInput,
  textFieldStyles,
  buttonSubmit,
} from "../../styles/components/Chat.styles";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { Send } from "@mui/icons-material";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function ChatInput({
  input,
  isLoading,
  setInput,
  handleSubmit,
}: ChatInputProps) {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      id="user-input"
      sx={userInput}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "flex-end" }}>
        <TextField
          multiline
          maxRows={4}
          fullWidth
          variant="outlined"
          placeholder="Faça sua pergunta..."
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          sx={textFieldStyles}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          sx={buttonSubmit}
        >
          {isLoading ? <CircularProgress size={24} /> : <Send />}
        </Button>
      </Box>
    </Box>
  );
}
