"use client";

import { useActivePage } from "@/app/_contexts/ActivePageContext";
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { CgClose } from "react-icons/cg";
import { PiListBold } from "react-icons/pi";
import Button from "./Button";
import Sidebar from "./Sidebar";

function DropDown() {
  const { openDropDown, setOpenDropDown } = useActivePage();
  const ref = useOutsideClick(() => setOpenDropDown(false));

  return (
    <>
      <Button
        onClick={() => setOpenDropDown(true)}
        type="dropDown"
        color="dropDown"
      >
        <PiListBold />
      </Button>
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
        <Button
          onClick={() => setOpenDropDown(false)}
          type="closeModal"
          color="closeModal"
          addClassName="z-20 mt-5"
        >
          <CgClose />
        </Button>
      </div>
    </>
  );
}

export default DropDown;
