import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppointmentPage from "./pages/AppointmentPage";
import VideosPage from "./pages/VideosPage";
import VerifyOtp from "./pages/VerifyOtp";


function App() {
  return (
    <Router>
      <div className>
        <Routes>
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/videos" element={< VideosPage/>} />
          <Route path="/verify" element={< VerifyOtp/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
