import { useNavigate } from "react-router-dom";
import "./Feed.css";
import CreatePost from "../components/CreatePost";

const Feed = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="feed-container">
      <header className="feed-header">
        <h2>Social</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <CreatePost />

      <div className="posts">
        <div className="post-card">
          <div className="post-header">
            <span className="username">@jarvis</span>
          </div>

          <p className="post-text">
            This is my first post 
          </p>

          <img
            className="post-image"
            src="https://via.placeholder.com/400"
            alt="post"
          />

          <div className="post-actions">
            <span>❤️ 3</span>
            <span>💬 1</span>
          </div>
        </div>

        {/*yahan multiple posts map karengee later */}
      </div>
    </div>
  );
};

export default Feed;
