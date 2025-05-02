import { useState, useEffect } from "react";
import { Message } from "../types/messages";

export default function useChat() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getDefaultMessage = (): (Message & { isFromHistory: boolean })[] => [
    {
      id: 1,
      text: "Olá, eu sou a Fani! Sou a maior fã do time de CS da FURIA do universo ٩(^ᗜ^ )و ´-!! Me faça qualquer pergunta sobre que vou te responder.",
      isUser: false,
      isFromHistory: true,
    },
  ];

  const [messages, setMessages] = useState<(Message & { isFromHistory: boolean })[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");

    if (savedMessages) {
      try {
        const decodedMessages = decodeURIComponent(escape(window.atob(savedMessages)));
        const parsedMessages: Message[] = JSON.parse(decodedMessages);
        return parsedMessages.map((msg) => ({ ...msg, isFromHistory: true }));
      } catch (error) {
        console.error("Erro ao decodificar mensagens:", error);
        return getDefaultMessage();
      }
    }

    return getDefaultMessage();
  });

  useEffect(() => {
    const messagesToSave = messages.map(({ isFromHistory, ...rest }) => rest);
    const encodedMessages = window.btoa(
      unescape(encodeURIComponent(JSON.stringify(messagesToSave)))
    );
    localStorage.setItem("chatMessages", encodedMessages);
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const userMessage = {
      id: Date.now(),
      text: input || "", // garante que é string
      isUser: true,
      isFromHistory: false,
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
  
    try {
      if (!apiUrl) throw new Error("API URL is not defined");
  
      const res = await Promise.race([
        fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input }),
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 15000) // 15 segundos de timeout
        ),
      ]);

      if (!(res instanceof Response)) {
        throw new Error("Unexpected response type");
      }
  
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  
      const data: { response: string } = await res.json();
  
      const botMessage = {
        id: Date.now() + 1,
        text: data.response || "", 
        isUser: false,
        isFromHistory: false,
      };
  
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: unknown) {
      console.error("Error:", error);
    
      const errorMessage = {
        id: Date.now() + 1,
        text:
          error instanceof Error && error.message === "Request timed out"
            ? "Desculpe, a resposta está demorando mais do que o esperado. Tente novamente mais tarde."
            : "Não estou me sentindo muito bem no momento, que tal tentar me perguntar de novo mais tarde?",
        isUser: false,
        isFromHistory: false,
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
