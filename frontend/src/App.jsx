import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import Footer from "./components/Footer";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import Navbar from "./components/Navbar";
import AdminSignIn from "./page/AdminSignIn";
import RentPage from "./page/RentPage";

function App() {
  return (
    <div>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <BrowserRouter>
          <Navbar />
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/admin" element={<AdminSignIn />} />
              <Route path="/rent" element={<RentPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
        <Footer />
    </div>
  );
}

export default App;
