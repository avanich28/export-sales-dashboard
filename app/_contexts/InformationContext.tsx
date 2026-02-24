"use client";

import {
  customerDetails,
  transportationModes,
} from "@/app/_features/information/constants";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const InformationContext = createContext();

function InformationProvider({ children }) {
  // NOTE Handle url changed (reload page)
  const pathname = usePathname();
  const initialInformation = pathname.split("/").at(-1)?.split("-").at(-1);
  const [curInformation, setCurInformation] = useState(initialInformation);
  const [curCustomerDetail, setCurCustomerDetail] = useState(
    customerDetails[0],
  );
  const [curTransportationMode, setCurTransportationMode] = useState(
    transportationModes[0],
  );

  // NOTE Handle switching from other pages which are not within information page lists
  useEffect(
    function () {
      if (initialInformation !== curInformation)
        setCurInformation(initialInformation);
    },
    [initialInformation, curInformation],
  );

  useEffect(
    function () {
      setCurCustomerDetail(customerDetails[0]);
      setCurTransportationMode(transportationModes[0]);
    },
    [curInformation],
  );

  return (
    <InformationContext.Provider
      value={{
        curInformation,
        setCurInformation,
        curCustomerDetail,
        setCurCustomerDetail,
        curTransportationMode,
        setCurTransportationMode,
      }}
    >
      {children}
    </InformationContext.Provider>
  );
}

function useInformation() {
  const context = useContext(InformationContext);
  if (context === undefined)
    throw new Error("InformationContext was used outside provider!");

  return context;
}

export { InformationProvider, useInformation };
