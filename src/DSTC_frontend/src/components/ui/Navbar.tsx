import { Grid, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const states: any = {
  "/": {
    left: "6px",
    width: "61px",
  },
  "/about": {
    left: "81px",
    width: "65px",
  },
  "/blog": {
    left: "157px",
    width: "55px",
  },
  "/bookmarks": {
    left: "224px",
    width: "100px",
  },
  "/projects": {
    left: "340px",
    width: "79px",
  },
};

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  border-bottom: none;
  margin: 0;
  padding: 0;
  z-index: 1;
  font-weight: 500;
  transition: opacity 0.3s ease 0s;

  &:hover {
    opacity: 0.5;
  }
`;

const MenuContainer = styled(Container)`
  cursor: pointer;
`;

export interface NavProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Links = (): JSX.Element => (
  <>
    <StyledLink to="/learn">Learn</StyledLink>
    <StyledLink to="/about">Contribute</StyledLink>
    <StyledLink to="/blog">Blog</StyledLink>
  </>
);

const Nav = ({ isOpen, onOpen, onClose }: NavProps): JSX.Element => {
  const location = useLocation();
  let navStyle = states["/"];

  if (location.pathname !== "/") {
    for (const path of Object.keys(states).slice(1)) {
      if (location.pathname.startsWith(path)) {
        navStyle = states[path];
        break;
      }
    }
  }

  return (
    <Grid
      component="nav"
      px={["2rem", "2rem", "2rem", "0"]}
      container
      alignItems="center"
      justifyContent={["center", "center", "space-between"]}
      margin="3rem 0"
    >
      <Container sx={{ display: { xs: "none", md: "flex" } }}>
        <StyledLink to="/">Antoine Ordonez</StyledLink>
      </Container>
      <MenuContainer sx={{ display: { xs: "flex", md: "none" } }}>
        {isOpen ? (
          <CloseIcon
            sx={{ fontSize: "2rem", margin: "-0.3rem" }}
            onClick={(evt) => evt.type === "click" && onClose()}
          />
        ) : (
          <MenuIcon
            sx={{ fontSize: "1.6rem" }}
            onClick={(evt) => evt.type === "click" && onOpen()}
          />
        )}
      </MenuContainer>
      {isOpen && (
        <Grid container direction="column" sx={{ fontSize: "2rem" }} py="3rem">
          <Links />
        </Grid>
      )}
      <Container
        sx={{
          alignItems: "center",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: "25px",
            background: "rgba(0, 0, 0, 0.04)",
            padding: "15px",
            position: "relative",
          }}
        >
          <div
            style={{
              background: "white",
              position: "absolute",
              borderRadius: "25px",
              height: "85%",
              ...navStyle,
            }}
          />
          <Links />
        </Grid>
      </Container>
      <Container
        sx={{ alignItems: "flex-end", display: { xs: "none", md: "flex" } }}
      >
        <StyledLink to="mailto:hello@shellbear.me">Contact</StyledLink>
      </Container>
    </Grid>
  );
};

export default Nav;
