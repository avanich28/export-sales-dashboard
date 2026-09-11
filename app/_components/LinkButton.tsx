import Link from "next/link";
import { type PropsWithChildren } from "react";

type LinkButtonStyles = "primary" | "secondary" | "tertiary" | "iconButton";
type LinkButtonColors = "primary" | "secondary" | "green" | "blue";

const defaultStyles: Record<LinkButtonStyles, string> = {
  primary:
    "px-2 sm:px-3 lg:px-4 py-1 rounded-md active:scale-[0.96] uppercase font-bold text-xs sm:text-sm lg:text-base",
  secondary:
    "w-full uppercase text-center tracking-wider font-semibold sm:font-bold text-xs sm:text-sm lg:text-base whitespace-nowrap p-1",
  tertiary: "flex items-center gap-3",
  iconButton:
    "p-1 sm:p-2 rounded-md text-sm sm:text-base lg:text-lg border border-borderContrast",
};

const defaultColors: Record<LinkButtonColors, string> = {
  primary:
    "text-headContrast bg-containerContrast hover:text-textContrast hover:bg-hover",
  secondary: "hover:text-hover",
  green: "text-textColorButton bg-green-700 hover:bg-green-600",
  blue: "text-textColorButton bg-sky-800 hover:bg-sky-700",
};

type LinkButtonProps = PropsWithChildren<{
  href: string;
  type?: LinkButtonStyles;
  color?: LinkButtonColors;
  addClassName?: string;
  onClick?: undefined; // FIXME
}>;

function LinkButton({
  children,
  href,
  type = "primary",
  color = "primary",
  addClassName = "",
  onClick = undefined,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${defaultStyles[type]} ${defaultColors[color]} ${addClassName} primaryTransition`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
