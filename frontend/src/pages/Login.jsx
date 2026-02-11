import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const res = await axios.post(
        `${API_URL}/api/auth/log-in`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/feed");

    } catch (err) {
      console.log(err);
      setError(
        "Invalid email or password"
      );
    }
  };

  return (
    <div className="auth-box">
      <h3>Login</h3>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button>Login</button>
      </form>

      <p className="auth-switch">
        Don’t have an account?{" "}
        <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
