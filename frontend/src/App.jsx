import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./app.css";
import Footer from "./components/Footer";
import SignIn from "./page/SignIn";
import SignUp from "./page/SignUp";
import AdminSignIn from "./page/Admin/AdminSignIn";
import RentPage from "./page/RentPage";
import Home from "./page/Home";
import Truck from "./page/Truck";
import { useUserAuth } from "./hooks/useUserAuth";
import NotificationPage from "./components/NotificationPage";
import Orders from "./page/Orders";
import ContactPage from "./page/ContactPage";
import LoadingPage from "./components/LoadingPage";
import WarningPage from "./components/WarningPage";

function App() {
  const { refreshLoad, setRefreshLoad } = useUserAuth();
  const ProtectedRoute = ({ Children, allowedRole }) => {
    const { user } = useUserAuth();
    if (!user) {
      return <Navigate to={"/"} replace />;
    }
    if (allowedRole && user.role !== allowedRole)
      return <Navigate to={"/home"} replace />;
    return Children;
  };

   const handleLoadingComplete = () => {
    setRefreshLoad(
      (prev) => (prev === "refreshLoad" ? null : prev)
   );
  };

  if (refreshLoad === "refreshLoad") {
    return (
      <LoadingPage
        onComplete={handleLoadingComplete}
        brand="SSK TRUCKING"
        tagline="Client Portal · Loading please wait..."
        tips={[
          "Revving up the engines...",
          "Checking vehicle availability...",
          "Syncing your account data...",
          "Almost there! Hang tight...",
        ]}
        duration={3000}
      />
    );
  } else if(refreshLoad === "unauthorized"){
    return (
      <div>
        <WarningPage />
      </div>
    )
  }

  return (
    <>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <BrowserRouter>
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
              <Route path="/home" element={<Home />} />
              <Route path="/trucks" element={<Truck />} />
              <Route path="/success" element={<NotificationPage />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </BrowserRouter>
        
      </div>
    </>
  );
}

export default App;
