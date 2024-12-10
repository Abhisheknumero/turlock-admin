import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import demoPofile from "../assets/demoProfile.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearReducer } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

function Header() {
  const { userdetail } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  function Logout() {
    dispatch(clearReducer());
    navigate("/");
  }

  // ====function to hide dropdown on click outside====
  $(document).mouseup(function (e) {
    if (
      $(e.target).closest(".notifyBlock").length === 0 &&
      $(e.target).closest(".block_notify").length === 0
    ) {
      setShow(false);
    }
  });
  return (
    <div className="w-full flex items-center justify-end py-[19px] pr-8 border-b-2">
      <div
        onClick={() => {
          setShow(!show);
        }}
        className="flex items-center gap-2 relative cursor-pointer notifyBlock"
      >
        <div className="rounded-full w-[50px] h-[50px] object-cover">
          <img src={demoPofile} className="w-full h-full" />
        </div>
        <p className="mb-0 font-semibold text-lg">{userdetail?.firstName}</p>
        <Icon
          icon={`${show ? "icon-park:up" : "icon-park:down"}`}
          width="25"
          height="25"
        />
        {show && <HeadDropdown Logout={Logout} />}
      </div>
    </div>
  );
}

export default Header;

const HeadDropdown = ({ Logout }) => {
  return (
    <div className="rounded-md shadow-2xlxl absolute w-full top-8 bg-white py-2 z-50">
      <p
        onClick={() => {
          Logout();
        }}
        className="text-[#4b5563] font-semibold text-sm mb-0 py-2 px-3 hover:bg-[#ff6d6d33] cursor-pointer"
      >
        Logout
      </p>
    </div>
  );
};
