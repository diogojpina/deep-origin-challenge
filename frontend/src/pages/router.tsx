import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./home/home.page";
import LoginPage from "./auth/login.page";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
