import { useState } from "react";
import { AuthService } from "../../services";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AuthService.login(username, password)
      .then(() => navigate("/"))
      .catch((e) => {
        alert("User and/or password invalid!");
      });
  };

  return (
    <div>
      <form onSubmit={login}>
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
