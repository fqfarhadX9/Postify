import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="app-name">Postify</h1>
        <p className="tagline">Share thoughts. Connect people.</p>

        <p className="description">
          Postify is a simple social app where you can post updates,
          like posts, and join conversations easily.
        </p>

        <div className="home-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button className="outline" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
