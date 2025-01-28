import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./home/home,page";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
