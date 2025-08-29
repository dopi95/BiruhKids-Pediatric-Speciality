import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/about" element={<AboutPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
