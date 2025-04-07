import { NavLink } from "react-router";
import NavLinkItem from "../NavItem/NavItem";

const Sidebar = () => {
  return (
    <div className="h-full text-left flex flex-col space-y-4 p-5  shadow-md text-gray-700">
      <div>
        <img src={"images/Image 1858.png"} alt="" />
      </div>
      <NavLinkItem to="/">Dashboard</NavLinkItem>
      <NavLinkItem to="/projects">Projects</NavLinkItem>
      <NavLinkItem to="/teams">Teams</NavLinkItem>
      <NavLinkItem to="/analytics">Analytics</NavLinkItem>
      <NavLinkItem to="/messages">Messages</NavLinkItem>
      <NavLinkItem to="/integrations">Integrations</NavLinkItem>
      <div className=" mt-8">
        <img src={"images/Group.png"} alt="" className="h-full w-full" />
      </div>
      <div className="text-center">
        <p className="font-bold text-2xl mb-2">V2.0 is available</p>
        <button className="p-2 w-full rounded-sm text-center border border-blue-400 text-blue-400">
          Try now
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
