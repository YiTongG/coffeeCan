import { useState, useEffect, useContext } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      localStorage.removeItem("currentUser"); // Clear localStorage
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>CoffeeCan</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/list">Trends</Link>
        <Link to="/">Contact</Link>
        <Link to="/">About</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar || "/noavatar.jpg"}
              alt="User Avatar"
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu Icon"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/list">Trends</Link>
          <Link to="/">Contact</Link>
          <Link to="/">About</Link>
          {!currentUser && (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
