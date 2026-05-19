import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
import AdminLayout from "./layout/AdminLayout";
import OrderPage from "./page/Admin/OrderPage";
import EditOrderPage from "./page/Admin/action/EditOrderPage";
import VehicleListPage from "./page/Admin/VehicleListPage";
import DashboardPage from "./page/Admin/DashboardPage";
import UserLogPage from "./page/Admin/UserLogPage";
import EditTruckPage from "./page/Admin/action/EditTruckPage";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, authLoading, logout } = useUserAuth(); // ✅ grab authLoading

  if (authLoading) return null; // or a spinner

  if (allowedRole && user?.role !== allowedRole) return <WarningPage />;
  return children;
};

function App() {
  const { refreshLoad, setRefreshLoad } = useUserAuth();

  const handleLoadingComplete = () => {
    setRefreshLoad((prev) => (prev === "refreshLoad" ? null : prev));
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
  } else if (refreshLoad === "unauthorized") {
    return (
      <div>
        <WarningPage />
      </div>
    );
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
              {/* Client Routes */}
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/rent" element={<RentPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/trucks" element={<Truck />} />
              <Route path="/success" element={<NotificationPage />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Admin Routes */}
              <Route path="/adminSign" element={<AdminSignIn />} />
              <Route
                path="/admin"
                element={<AdminLayout />}
              >
                <Route path="orders" element={<ProtectedRoute allowedRole={"Admin"}>
                  <OrderPage />
                </ProtectedRoute>} />
                <Route path="editOrder" element={<ProtectedRoute allowedRole={"Admin"}>
                  <EditOrderPage />
                </ProtectedRoute>} />
                <Route path="vehicles" element={<ProtectedRoute allowedRole={"Admin"}>
                  <VehicleListPage />
                </ProtectedRoute>} />
                <Route path="dashboard" element={<ProtectedRoute allowedRole={"Admin"}>
                  <DashboardPage />
                </ProtectedRoute>} />
                <Route path="userlog" element={<ProtectedRoute allowedRole={"Admin"}>
                  <UserLogPage />
                </ProtectedRoute>} />
                <Route path="editVehicle" element={<ProtectedRoute allowedRole={"Admin"}>
                  <EditTruckPage />
                </ProtectedRoute>} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
