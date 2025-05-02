import { SxProps, Theme } from "@mui/material";
import theme from "../../config/theme"

export const chatBox: SxProps<Theme> = {
  height: "95vh",
  margin: "20px auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "1rem",
  backgroundColor: theme.palette.secondary.light,
  borderRadius: "10px"
};

export const chatBoxBox: SxProps<Theme> = {
  overflowY: "auto",
  flexGrow: 1,
  padding: "1rem",
};

export const userBubble: SxProps<Theme> = {
  backgroundColor: theme.palette.secondary.dark,
  padding: "1rem",
  borderRadius: "30px",
  maxWidth: "100%",
  marginLeft: "auto",
  textAlign: "end",
  width: "fit-content",
  marginBottom: "25px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
};

export const messageBox: SxProps<Theme> = {
  display: "flex",
  marginBottom: "1rem",
};

export const breakText: SxProps<Theme> = {
  wordBreak: "break-word",
};

export const userInput: SxProps<Theme> = {
  padding: "1rem",
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "1rem",
  boxShadow: '1px 1px 30px rgba(0,0,0,0.2)',
};

export const textFieldStyles: SxProps<Theme> = {
  backgroundColor: theme.palette.secondary.main,
  borderRadius: "4px",
  transition: 'all 0.3s ease-in-out', // Transição geral

  // Efeito hover suave
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'all 0.3s ease-in-out'
  },

  // Efeito ao clicar (active)
  '&:active': {
    transition: 'all 0.2s ease-in-out'
  },

  // Foco acessível
  '&.Mui-focused': {
    transition: 'all 0.3s ease-in-out'
  }
};

export const buttonSubmit: SxProps<Theme> = {
  minHeight: '56px',       
  padding: '16px 24px',   
  fontSize: '1rem',        
  lineHeight: 1.5,         
  
  "&:hover": {
    color: theme.palette.primary.contrastText,
    backgroundColor: 'white'
  },
  
  // Adicionando estados adicionais (opcional)
  "&:disabled": {
    opacity: 0.7,
  },
  alignItems: 'center',
  justifyContent: 'center',
  display: 'inline-flex',
};