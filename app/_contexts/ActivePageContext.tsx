"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const ActivePageContext = createContext();

function ActivePageProvider({ children }) {
  // NOTE Handle url changed (reload page)
  const pathname = usePathname();
  const initialCurPage = "/" + (pathname.split("/")[2] || "");
  const [curPage, setCurPage] = useState(initialCurPage);
  const [openDropDown, setOpenDropDown] = useState(false);

  // NOTE Handle switching from other pages which are not within sidebar page lists (ex. log out and log in again)
  useEffect(
    function () {
      if (initialCurPage !== curPage) setCurPage(initialCurPage);
    },
    [initialCurPage, curPage],
  );

  return (
    <ActivePageContext.Provider
      value={{ curPage, setCurPage, openDropDown, setOpenDropDown }}
    >
      {children}
    </ActivePageContext.Provider>
  );
}

function useActivePage() {
  const context = useContext(ActivePageContext);
  if (context === undefined)
    throw new Error("ActivePageContext was used outside provider!");

  return context;
}

export { ActivePageProvider, useActivePage };
