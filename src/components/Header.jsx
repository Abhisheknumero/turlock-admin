import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import demoPofile from "../assets/demoProfile.svg";

function Header() {
  return (
    <div className="w-full flex items-center justify-end py-[19px] pr-8 border-b-2">
      <div className="flex items-center gap-2">
        <div className="rounded-full w-[50px] h-[50px] object-cover">
          <img src={demoPofile} className="w-full h-full" />
        </div>
        <p className="mb-0 font-semibold text-lg">Abhishek</p>
        <Icon icon="icon-park:down" width="25" height="25" />
      </div>
    </div>
  );
}

export default Header;
