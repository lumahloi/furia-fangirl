import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // preto
      light: "#141414", // preto meio cinza mais claro
      dark: "#080808", // preto meio cinza mais escuro
      contrastText: "#817d4e" // amarelinho bege marrom
    },
    secondary: {
      main: "#ffffff", // branco
      light: "#f5f5f5", // cinzinha mais claro
      dark: "#bdbdbd", // cinzinha mais escuro
    },
    // error: {},
    // warning: {},
    // info: {},
    // success: {}    
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;