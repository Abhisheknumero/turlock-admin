import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Post from "./screens/postScreens/Post";
import PostCreate from "./screens/postScreens/PostCreate";
import Category from "./screens/postScreens/Category";
import CreateCategory from "./screens/postScreens/CreateCategory";
import CreateMedia from "./screens/mediaScreens/CreateMedia";
import Media from "./screens/mediaScreens/Media";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Post/Post-List" element={<Post />} />
        <Route path="/Post/Create" element={<PostCreate />} />
        <Route path="/Post/Category" element={<Category />} />
        <Route path="/Post/Category/Create" element={<CreateCategory />} />
        <Route path="/Media/Create" element={<CreateMedia />} />
        <Route path="/Media" element={<Media />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
