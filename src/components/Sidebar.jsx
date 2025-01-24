import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../assets/logo.png";
import { Icon } from "@iconify-icon/react";
import { SidebarData } from "../utils/SidebarData";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearReducer } from "../store/slices/authSlice";

function Sidebar() {
  const [show, setShow] = useState(false);
  const [ShowSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  function Logout() {
    dispatch(clearReducer());
    navigate("/");
  }

  return (
    <>
      {/* Working on fixing responsive managing toggle and trying to apply hide property on scroll */}
      {!show && (
        <div
          className={`${
            ShowSidebar ? "" : "xl:bg-white max-xl:bg-transparent"
          } ${" xl:h-screen z-50 max-xl:absolute max-xl:h-max w-[15%]"}`}
        >
          <div className="px-3 py-[18px] border-b-2 max-xl:border-0  max-xl:!pb-0 max-xl:!pt-6   flex items-center justify-start">
            <Icon
              icon="gg:menu"
              width="40"
              height="40"
              onClick={() => {
                setShow(true);
              }}
              className="hover:text-[#6418C3] cursor-pointer xl:hidden"
            />
            <div className="flex items-center gap-1 max-xl:hidden">
              <img src={logo} className="w-[60px] h-full" />{" "}
              <strong>Turlock News</strong>
            </div>
          </div>
          <div className="p-3 max-xl:bg-white max-xl:hidden">
            {SidebarData.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  if (item.key == "Logout") {
                    Logout();
                  } else {
                    navigate(item.path);
                  }
                }}
                className={`${
                  location.pathname.includes(item.location)
                    ? "text-[#6418C3] border-r-[3px] border-[#6418C3] "
                    : "hover:text-[#6418C3] hover:border-r-[3px] border-[#6418C3] "
                } ${"flex items-center gap-3 cursor-pointer px-1 py-2 my-2"}`}
              >
                <Icon icon={item.icon} width="20" height="20" />
                <p className="mb-0 font-semibold">{item.key}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <Offcanvas
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <Offcanvas.Header closeButton className="border-b-2 items-center">
          <Offcanvas.Title>
            <div className="flex items-center gap-3">
              <img src={logo} className="w-[60px] h-full" />{" "}
              <strong>Turlock News</strong>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="!px-0">
          {SidebarData.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (item.key == "Logout") {
                  Logout();
                } else {
                  navigate(item.path);
                }
              }}
              className={`${
                location.pathname.includes(item.location)
                  ? "text-[#6418C3] border-r-[3px] border-[#6418C3] "
                  : "hover:text-[#6418C3] hover:border-r-[3px] border-[#6418C3] "
              } ${"flex items-center gap-3 cursor-pointer px-4 py-2 my-2"}`}
            >
              <Icon icon={item.icon} width="20" height="20" />
              <p className="mb-0 font-semibold">{item.key}</p>
            </div>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
