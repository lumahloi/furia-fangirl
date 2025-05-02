import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Link,
} from "@mui/material";
import {
  LinkedIn,
  GitHub,
  Mail,
  Web,
  Send,
  PictureAsPdf,
} from "@mui/icons-material";
import {
  chatBox,
  chatBoxBox,
  userBubble,
  messageBox,
  breakText,
  userInput,
  buttonSubmit,
  profileImageContainer,
  textFieldStyles,
  contactIcons,
  sideBarContainer,
  contactInfoContainer,
  developerInfoContainer,
  imgAvatar,
  textAvatar,
  sideBar
} from "./styles/AppStyles";
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
            text: "Olá, eu sou a Fani! Sou a maior fã do time de CS da FURIA do universo ٩(^ᗜ^ )و ´-!! Me faça qualquer pergunta sobre que vou te responder.",
            isUser: false,
          },
        ];
  });

  const apiUrl =
    process.env.REACT_APP_API_URL;

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
        if (!apiUrl) {
            throw new Error("API URL is not defined. Please check your environment variables.");
        }
        
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: input }),
            mode: 'cors',
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
            text: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.",
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
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      <Container sx={sideBar}>
        <Box sx={sideBarContainer}>
          <Box sx={imgAvatar}>
            <img src="img/avatar.png" alt="" />
          </Box>
          <Typography variant="h5" fontWeight="bold" sx={textAvatar}>
            Fani, a Fangirl
          </Typography>
        </Box>

        <Box sx={contactInfoContainer}>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#817d4e' }}>
              Desenvolvido por
            </Typography>
            <Box sx={developerInfoContainer}>
              <Box sx={profileImageContainer}>
                <img
                  src="https://github.com/lumahloi.png"
                  alt="Lumah Pereira Github"
                  loading="lazy"
                />
              </Box>
              <Typography variant="subtitle1">Lumah Pereira</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom sx={{ color: '#817d4e' }}>
              Informações de contato
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link href="https://www.linkedin.com/in/lumah-pereira/" target="_blank" rel="noopener noreferrer">
                <LinkedIn sx={contactIcons} />
              </Link>
              <Link href="https://github.com/lumahloi" target="_blank" rel="noopener noreferrer">
                <GitHub sx={contactIcons} />
              </Link>
              <Link
                href="mailto:lumah.pereira26@gmail.com?subject=FANGIRL&body=Adorei o seu projeto!"
                sx={contactIcons}
              >
                <Mail />
              </Link>
              <Link href="https://lumah-pereira.vercel.app/" target="_blank" rel="noopener noreferrer">
                <Web sx={contactIcons} />
              </Link>
              <Link
                href="cv/lumah-pereira.pdf"
                download="lumah-pereira.pdf"
                sx={contactIcons}
              >
                <PictureAsPdf />
              </Link>
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
              <BotAnswer message="Huum, deixa eu pensar um pouquinho..." />
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
        </Box>
      </Container>
    </Box>
  );
}

export default App;
