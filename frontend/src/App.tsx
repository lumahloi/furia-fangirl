import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { LinkedIn, GitHub, Mail, Web, Send } from "@mui/icons-material";
import {
  chatBox,
  userBubble,
  chatBoxBox,
  messageBox,
  breakText,
  userInput,
  buttonSubmit,
} from "./styles/ComponentsStyles";
import BotAnswer from "./BotAnswer";
import "./styles/App.css";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            id: 1,
            text: "Faça uma pergunta, eu sei tudo sobre a FURIA!",
            isUser: false,
          },
        ];
  });

  const apiUrl =
    process.env.REACT_APP_API_URL || "http://localhost:5000/api/query";

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.response,
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Ocorreu um erro ao processar sua solicitação.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Container sx={{ maxWidth: "20vw" }}>
        <Box
          sx={{ minHeight: "20vh", alignContent: "start", marginTop: "50px" }}
        >
          <Typography variant="h5" color="white" fontWeight="bold">
            NomeMuitoCriativo
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Box>
            <Typography variant="h6" gutterBottom color="white">
              Desenvolvidor por
            </Typography>
            <Typography variant="subtitle1" color="white">
              Lumah Pereira
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="white">
              Informações de contato
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <LinkedIn sx={{ color: "white" }} />
              <GitHub sx={{ color: "white" }} />
              <Mail sx={{ color: "white" }} />
              <Web sx={{ color: "white" }} />
            </Box>
          </Box>
        </Box>
      </Container>

      <Container sx={{ minWidth: "80vw" }}>
        <Box sx={chatBox}>
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
                <BotAnswer key={message.id} message={message.text} />
              )
            )}
            {isLoading && (
              <BotAnswer message="Processando sua solicitação..." />
            )}
            <div ref={messagesEndRef} />
          </Box>

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
                placeholder="Digite sua mensagem..."
                disabled={isLoading}
                onChange={(e) => setInput(e.target.value)}
                value={input}
                sx={{
                  transition: "all 3s ease",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 4,
                    "&.Mui-focused fieldset": {
                      borderColor: "#363737",
                    },
                    "&:hover fieldset": {
                      borderColor: "#5e6060",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                color="primary"
                sx={buttonSubmit}
              >
                {isLoading ? <CircularProgress size={24} /> : <Send />}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
