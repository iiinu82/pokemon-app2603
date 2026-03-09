import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import styles from "./MyNavbar.module.css";

const MyNavbar = ({
  GENERATION_START_IDS,
  setStartId,
  handleSearch,
  numberOfViews,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar
      className={styles.navbar}
      bg="dark"
      variant="dark"
      expand="xl"
      fixed="top"
      expanded={expanded} // ← 状態を渡す
      onToggle={() => setExpanded(!expanded)} // ← トグルボタン押下時も同期
    >
      <Container>
        <Navbar.Brand>ポケモン図鑑</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onToggle={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {Object.keys(GENERATION_START_IDS).map((gen) => (
              <Nav.Link
                key={gen}
                onClick={() => {
                  const id = GENERATION_START_IDS[gen];
                  setStartId(id);
                  handleSearch(id, numberOfViews);
                  setExpanded(false);
                }}
                style={{ cursor: "pointer", color: "#4a0e0e" }}
              >
                {gen}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
