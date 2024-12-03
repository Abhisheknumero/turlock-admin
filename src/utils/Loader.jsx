import { Icon } from "@iconify-icon/react";

export function Loader() {
  return (
    <div className="fixed w-full h-screen z-[9999]">
      <div className="flex items-center justify-center w-full h-full bg-[#ffffff8a]">
        <Icon
          icon="eos-icons:three-dots-loading"
          style={{ color: "#D10505" }}
          width={100}
        />
      </div>
    </div>
  );
}
