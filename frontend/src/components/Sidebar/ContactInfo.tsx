import {
  contactIcons,
  contactInfoContainer,
  developerInfoContainer,
  profileImageContainer,
} from "../../styles/components/Sidebar.styles";
import { LinkedIn, GitHub, Mail, Web, PictureAsPdf } from "@mui/icons-material";
import { Box, Typography, Link } from "@mui/material";
import theme from "../../config/theme"

export default function ContactInfo() {
  return (
    <Box sx={contactInfoContainer}>
      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.contrastText }}>
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
          <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main }}>Lumah Pereira</Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.contrastText }}>
          Informações de contato
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link
            href="https://www.linkedin.com/in/lumah-pereira/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn sx={contactIcons} />
          </Link>
          <Link
            href="https://github.com/lumahloi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub sx={contactIcons} />
          </Link>
          <Link
            href="mailto:lumah.pereira26@gmail.com?subject=FANGIRL&body=Adorei o seu projeto!"
            sx={contactIcons}
          >
            <Mail />
          </Link>
          <Link
            href="https://lumah-pereira.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
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
  );
}
