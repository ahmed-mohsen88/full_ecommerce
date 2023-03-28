import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Details from "./pages/Details";
function App() {
  return (
    <BrowserRouter>
      <Container style={{ minWidth: "100%", paddingLeft: 0, paddingRight: 0 }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
