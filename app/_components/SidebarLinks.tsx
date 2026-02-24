"use client";

import { useActivePage } from "@/app/_contexts/ActivePageContext";
import { FaHome } from "react-icons/fa";
import { FaShip } from "react-icons/fa6";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";
import { IoCalendar } from "react-icons/io5";
import SidebarLinkButton from "./SidebarLinkButton";

const defaultLinks = [
  { href: "/", icon: <FaHome /> },
  { href: "/sales", icon: <IoCalendar /> },
  { href: "/shipment-schedule", icon: <FaShip /> },
  { href: "/information", icon: <HiDocumentMagnifyingGlass /> },
];

function SidebarLinks() {
  const { curPage, setCurPage, setOpenDropDown } = useActivePage();

  return (
    <div className="flex flex-col gap-1 sm:gap-2 font-medium capitalize text-headContrast tracking-wider">
      {defaultLinks.map(({ href, icon }) => (
        <SidebarLinkButton
          key={href}
          href={href}
          icon={icon}
          curPage={curPage}
          onClick={() => {
            setCurPage(href);
            setOpenDropDown(false);
          }}
        />
      ))}
    </div>
  );
}

export default SidebarLinks;
