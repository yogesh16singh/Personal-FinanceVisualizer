"use client";
import { FaChartBar, FaDollarSign, FaList } from "react-icons/fa";
import { LuPanelRightOpen, LuPanelRightClose } from "react-icons/lu";
import AnimatedCircle from "./AnimatedCircle";
import Link from "next/link";
const Sidebar = ({ minimized, toggleMinimize, setOpen, open }) => {
  const menuItems = [
    { icon: <FaChartBar />, label: "Dashboard", to: "/" },
    { icon: <FaDollarSign />, label: "Transactions", to: "/transactions" },
    { icon: <FaList />, label: "Category Budget", to: "/category" },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white h-full transition-all duration-300  overflow-hidden lg:relative lg:left-0 lg:z-[1] z-[10] absolute ${
        open ? "left-0" : "left-[-100%]"
      } ${minimized ? "w-16" : "w-64"}`}
    >
      <AnimatedCircle />
      <div
        className={`p-4 flex items-center h-16 relative z-[2] ${
          minimized ? "justify-center" : "justify-between "
        }`}
      >
        <span className={`${minimized ? "hidden" : "block"} text-xl font-bold`}>
          Finance
        </span>
        <button
          onClick={open ? () => setOpen(false) : toggleMinimize}
          className={`text-white `}
        >
          {minimized ? (
            <LuPanelRightClose size={24} />
          ) : (
            <LuPanelRightOpen size={24} />
          )}
        </button>
      </div>
      <nav className="mt-4 relative z-[2]">
        {menuItems.map((item, index) => (
          <Link
            href={item.to}
            key={index}
            className={`flex items-center p-3 hover:bg-gray-700 cursor-pointer h-12 ${
              minimized && "justify-center px-0 "
            }`}
            onClick={() => setOpen(false)}
          >
            {item.icon}
            {!minimized && <span className="ml-3">{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
