"use client";

import { useActivePage } from "@/app/_contexts/ActivePageContext";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { CgClose } from "react-icons/cg";
import { PiListBold } from "react-icons/pi";
import Sidebar from "./Sidebar";

function DropDown() {
  const { openDropDown, setOpenDropDown } = useActivePage();
  const ref = useOutsideClick(() => setOpenDropDown(false));

  return (
    <>
      {/* FIXME Clean code with modal */}
      <button
        onClick={() => setOpenDropDown(true)}
        className="sm:hidden hover:bg-hoverContrast p-1 rounded-md focus:outline-2 focus:outline-hover transition-[background-color] duration-300"
      >
        <PiListBold />
      </button>
      <div
        className={`fixed z-10 sm:hidden h-screen w-screen text-textContrast bg-modalContrast inset-0 min-h-max flex items-start gap-3 sidebarTransition ${
          openDropDown ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          ref={ref}
          className={`z-20 max-h-screen overflow-auto ${
            openDropDown ? "animate-fade-in-right" : "animate-fade-out-left"
          }`}
        >
          <Sidebar />
        </div>
        <button
          onClick={() => setOpenDropDown(false)}
          className={`z-20 mt-5 text-xl p-1 rounded-full focus:outline-2 transition-all duration-100`}
        >
          <CgClose />
        </button>
      </div>
    </>
  );
}

export default DropDown;
