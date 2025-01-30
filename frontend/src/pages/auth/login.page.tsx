import { useState } from "react";
import { AuthService } from "../../services";
import { useNavigate } from "react-router";
import { Layout } from "../../components/layout/layout";
import { Box } from "../../components/ui";

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
    <Layout>
      <Box>
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
      </Box>
    </Layout>
  );
};

export default LoginPage;
