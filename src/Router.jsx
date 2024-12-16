import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Post from "./screens/postScreens/Post";
import PostCreate from "./screens/postScreens/PostCreate";
import Category from "./screens/postScreens/Category";
import CreateCategory from "./screens/postScreens/CreateCategory";
import CreateMedia from "./screens/mediaScreens/CreateMedia";
import Media from "./screens/mediaScreens/Media";
import GalleryList from "./screens/mediaScreens/GalleryList";
import Reels from "./screens/reelsSection/Reels";
import CreateReels from "./screens/reelsSection/CreateReels";

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
        <Route path="/Media/Gallery-list" element={<GalleryList />} />
        <Route path="/Reels" element={<Reels />} />
        <Route path="/Reels/Create" element={<CreateReels />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
