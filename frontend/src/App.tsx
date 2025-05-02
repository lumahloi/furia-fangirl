import { container } from "./styles/components/App.styles";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import theme from "./config/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={container}>
        <Sidebar />
        <Chat />
      </Box>
    </ThemeProvider>
  );
}

export default App;
