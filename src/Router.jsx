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
import CreateBannerAds from "./screens/bannerAndAds/CreateBannerAds";
import BannerList from "./screens/bannerAndAds/BannerList";
import CommentList from "./screens/commentList/CommentList";
import Reporters from "./screens/reporters/Reporters";
import Subscription from "./screens/subscription/Subscription";
import CreatePlans from "./screens/subscription/CreatePlans";

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
        <Route path="/Ads-promo-banners" element={<BannerList />} />
        <Route path="/Ads-promo-banners/Create" element={<CreateBannerAds />} />
        <Route path="/Comments" element={<CommentList />} />
        <Route path="/Reporters" element={<Reporters />} />
        <Route path="/Subscription" element={<Subscription />} />
        <Route path="/Subscription/Create" element={<CreatePlans />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
