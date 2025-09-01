"use client";

import { createContext, useContext, useState } from "react";

const ActivePageContext = createContext();

function ActivePageProvider({ children }) {
  // initial = link url FIXME
  const [curPage, setCurPage] = useState("/");
  const [openDropDown, setOpenDropDown] = useState(false);

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
