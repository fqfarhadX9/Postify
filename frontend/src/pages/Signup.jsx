import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/sign-up",
        {
          username,
          email,
          password,
        }
      );

      console.log(res.data);

      localStorage.setItem("token", res.data.token);

      alert("Signup successful");
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-box">
      <h3>Signup</h3>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button>Create Account</button>
      </form>
    </div>
  );
}

export default Signup;
