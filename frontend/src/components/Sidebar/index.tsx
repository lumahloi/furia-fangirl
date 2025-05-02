import { sideBar } from "../../styles/components/Sidebar.styles";
import { Container } from "@mui/material";
import ContactInfo from "./ContactInfo";
import ProfileCard from "./ProfileCard";

export default function Sidebar() {
  return (
    <Container sx={sideBar}>
      <ProfileCard />
      <ContactInfo />
    </Container>
  );
}
