import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Signup } from "../../commonServices";
import "../../App.css";

export default function SignUpPage() {
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("username");
    if (token) navigate("/imageUploader");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const temp = await Signup({ password, username });
    if (temp.error) setError(!!temp.error);
    else navigate("/");
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="text-center m-5-auto">
        <h2>Join us</h2>
        <h5>Create your personal account</h5>
        {error && (
          <Alert className="mt-10" severity="error">
            User already exist.
          </Alert>
        )}
        <form className="form">
          <p>
            <label>Username</label>
            <br />
            <input
              type="text"
              name="first_name"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </p>
          <p>
            <label>Password</label>
            <br />
            <input
              type="password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <p>
            <button className="sub_btn" type="submit" onClick={handleSubmit}>
              Register
            </button>
          </p>
        </form>
        <footer>
          <div>
            <Link to="/">Back to Homepage</Link>.
          </div>
        </footer>
      </div>
    </div>
  );
}
