import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AppointmentPage from "./pages/AppointmentPage";
import VideosPage from "./pages/VideosPage";


function App() {
  return (
    <Router>
      <Navbar />
      <div className>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/videos" element={< VideosPage/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
