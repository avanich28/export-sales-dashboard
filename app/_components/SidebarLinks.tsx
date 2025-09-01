"use client";

import { useActivePage } from "@/app/_contexts/ActivePageContext";
import { FaHome } from "react-icons/fa";
import { FaShip } from "react-icons/fa6";
import { HiDocumentMagnifyingGlass, HiDocumentText } from "react-icons/hi2";
import { IoCalendar } from "react-icons/io5";
import SidebarLinkButton from "./SidebarLinkButton";

const defaultLinks = [
  { href: "/", icon: <FaHome /> },
  { href: "/purchase-order", icon: <IoCalendar /> },
  { href: "/shipment-schedule", icon: <FaShip /> },
  { href: "/invoice", icon: <HiDocumentText /> },
  { href: "/information", icon: <HiDocumentMagnifyingGlass /> },
];

// FIXME Handle an active link when access via url
function SidebarLinks() {
  const { curPage, setCurPage, setOpenDropDown } = useActivePage();

  return (
    <div className="flex flex-col gap-1 sm:gap-2 font-medium capitalize text-headContrast tracking-wider">
      {defaultLinks.map(({ href, icon }) => {
        const revisedHref = "/main" + href;

        return (
          <SidebarLinkButton
            key={href}
            href={revisedHref}
            icon={icon}
            curPage={curPage}
            onClick={() => {
              setCurPage(revisedHref);
              setOpenDropDown(false);
            }}
          />
        );
      })}
    </div>
  );
}

export default SidebarLinks;
