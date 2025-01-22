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
          } ${" xl:h-screen z-50 max-xl:absolute max-xl:h-max"}`}
        >
          <div className="p-4 border-b-2 flex items-center justify-center">
            <Icon
              icon="gg:menu"
              width="40"
              height="40"
              onClick={() => {
                setShow(true);
              }}
              className="hover:text-[#6418C3] cursor-pointer"
            />
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
                    ? "text-[#6418C3] bg-[#6418c330] rounded-full"
                    : "hover:text-[#6418C3] hover:bg-[#6418c330] hover:rounded-full"
                } ${"flex items-center justify-center p-3.5 cursor-pointer"}`}
              >
                <Icon icon={item.icon} width="20" height="20" />
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
              <img src={logo} className="w-[60px] h-full" /> TurloackCityNews
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
                  ? "text-[#6418C3] bg-[#6418c330] rounded-e-full"
                  : "hover:text-[#6418C3] hover:bg-[#6418c330] hover:rounded-e-full"
              } ${"flex items-center gap-3 cursor-pointer px-3 py-2.5"}`}
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
