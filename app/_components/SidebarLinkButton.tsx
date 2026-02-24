import Link from "next/link";

function SidebarLinkButton({
  href,
  icon,
  curPage,
  onClick,
  addClassName = "",
}) {
  const isActive =
    href === curPage
      ? "bg-bgContrast text-textContrast [&>span]:text-hover"
      : "";

  return (
    <Link
      href={"/main" + href}
      onClick={onClick}
      className={`${addClassName} ${isActive} px-4 py-[10px] sm:py-[14px] lg:py-[16px] flex items-center gap-3 sm:gap-4 lg:gap-5 rounded-sm text-sm sm:text-base lg:text-lg hover:bg-bgContrast hover:text-textContrast hover:[&>span]:text-hover primaryTransition`}
    >
      <span className="text-xl sm:text-2xl lg:text-3xl text-icon primaryTransition">
        {icon}
      </span>

      <div>{href === "/" ? "home" : href.slice(1).replace("-", " ")}</div>
    </Link>
  );
}

export default SidebarLinkButton;
