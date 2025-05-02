import {
  imgAvatar,
  textAvatar,
  sideBarContainer,
} from "../../styles/components/Sidebar.styles";
import { Box, Typography } from "@mui/material";

export default function ProfileCard() {
  return (
    <Box sx={sideBarContainer}>
      <Box sx={imgAvatar}>
        <img src="images/avatar.png" alt="Fani" />
      </Box>
      <Typography variant="h5" fontWeight="bold" sx={textAvatar}>
        Fani, a Fangirl
      </Typography>
    </Box>
  );
}
