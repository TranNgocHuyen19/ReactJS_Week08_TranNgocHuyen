import { NavLink } from "react-router";

const NavLinkItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "bg-pink-600 text-white p-2 rounded-sm" : "hover:text-pink-600 p-2 "
      }
    >
      {children}
    </NavLink>
  );
};

export default NavLinkItem;
