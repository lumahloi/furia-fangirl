import { SxProps, Theme } from "@mui/material";
import theme from "../../config/theme"

export const sideBar: SxProps<Theme> = {
  height: "100vh",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export const sideBarContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
};

export const imgAvatar: SxProps<Theme> = {
  width: 150,
  height: 150,
  borderRadius: "50%",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  backgroundColor: theme.palette.primary.contrastText
};

export const textAvatar: SxProps<Theme> = {
  color: theme.palette.primary.contrastText,
  textAlign: "center",
};

export const contactInfoContainer: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
};

export const developerInfoContainer: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "2rem",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
};

export const profileImageContainer: SxProps<Theme> = {
  width: 50,
  height: 50,
  borderRadius: "50%",
  overflow: "hidden",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export const contactIcons: SxProps<Theme> = {
  color: theme.palette.secondary.main,
  transition: "all 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.contrastText,
    transform: "translateY(-2px)",
  },
};