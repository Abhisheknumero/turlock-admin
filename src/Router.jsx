import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Post from "./screens/postScreens/Post";
import PostCreate from "./screens/postScreens/PostCreate";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Post" element={<Post />} />
        <Route path="/Post/Create" element={<PostCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
