import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
