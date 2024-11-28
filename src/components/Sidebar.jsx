import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../assets/logo.png";
import { Icon } from "@iconify-icon/react";
import { SidebarData } from "../utils/SidebarData";

function Sidebar() {
  const [show, setShow] = useState(true);

  return (
    <>
      {!show && (
        <div className="bg-white h-screen">
          <div className="p-4 border-b-2 flex items-center justify-center">
            <Icon
              icon="gg:menu"
              width="40"
              height="40"
              onClick={() => {
                setShow(true);
              }}
              className="hover:text-[#D10505] cursor-pointer"
            />
          </div>
          <div className="p-3">
            {SidebarData.map((item, index) => (
              <div className="flex items-center justify-center p-3.5 hover:text-[#D10505] hover:bg-[#ff6d6d33] hover:rounded-full cursor-pointer">
                <Icon icon={item.icon} width="20" height="20" key={index} />
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
              className="flex items-center gap-3 hover:text-[#D10505] cursor-pointer hover:rounded-e-full px-3 py-2.5 hover:bg-[#ff6d6d33]"
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
