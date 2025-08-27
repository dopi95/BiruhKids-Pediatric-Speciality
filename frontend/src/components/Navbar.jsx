import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <h1 className="font-bold">Clinic App</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
