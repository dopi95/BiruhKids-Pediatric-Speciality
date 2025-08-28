import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentPage from "./pages/AppointmentPage";
import VideosPage from "./pages/VideosPage";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <Router>
      <div className>
        <Routes>
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/videos" element={< VideosPage/>} />
          <Route path="/verify" element={< VerifyOtp/>} />
          <Route path="/reset-password" element={< ResetPassword/>} />



        </Routes>
      </div>
    </Router>
  );
}

export default App;
