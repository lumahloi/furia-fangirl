import { useState, useEffect } from "react";
import { Message } from "../types/messages";

export default function useChat() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Função auxiliar para a mensagem padrão
  const getDefaultMessage = (): Message[] => [
    {
      id: 1,
      text: "Olá, eu sou a Fani! Sou a maior fã do time de CS da FURIA do universo ٩(^ᗜ^ )و ´-!! Me faça qualquer pergunta sobre que vou te responder.",
      isUser: false,
    }
  ];

  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    
    if (savedMessages) {
      try {
        // Decodificação segura para caracteres especiais
        const decodedMessages = decodeURIComponent(escape(window.atob(savedMessages)));
        return JSON.parse(decodedMessages);
      } catch (error) {
        console.error("Erro ao decodificar mensagens:", error);
        // Fallback para mensagem padrão se houver erro
        return getDefaultMessage();
      }
    }
    
    return getDefaultMessage();
  });

  // Ao salvar no localStorage (em outro useEffect):
  useEffect(() => {
    if (messages.length > 0) {
      const encodedMessages = window.btoa(unescape(encodeURIComponent(JSON.stringify(messages))));
      localStorage.setItem("chatMessages", encodedMessages);
    }
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
      if (!apiUrl) throw new Error("API URL is not defined");

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

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
        text: "Não estou me sentindo muito bem no momento, que tal tentar me perguntar de novo mais tarde?",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    input,
    setInput,
    isLoading,
    messages,
    handleSubmit,
  };
}