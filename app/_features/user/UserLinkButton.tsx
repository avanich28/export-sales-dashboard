"use client";

import { useActivePage } from "@/app/_contexts/ActivePageContext";
import Link from "next/link";
import { PiUserFill } from "react-icons/pi";

function UserLinkButton({ children, name }) {
  const { curPage, setCurPage } = useActivePage();
  const href = "/main/user";
  const isActive = curPage === href ? "text-hover [&>div]:border-hover" : "";

  return (
    <>
      {name && (
        <>
          <Link
            href={href}
            onClick={() => setCurPage(href)}
            className={`${isActive} sm:hidden primaryTransition`}
          >
            <PiUserFill />
          </Link>
          <Link
            href={href}
            onClick={() => setCurPage(href)}
            className={`${isActive} hidden sm:inline-flex items-center gap-2 lg:gap-3 uppercase text-base tracking-wider hover:[&>div]:border-hover primaryTransition`}
          >
            {children}
            <span>{name.length > 8 ? name.slice(0, 8) + "." : name}</span>
          </Link>
        </>
      )}
    </>
  );
}

export default UserLinkButton;
