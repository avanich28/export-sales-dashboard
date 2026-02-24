import Link from "next/link";
import { type PropsWithChildren } from "react";

type LinkButtonStyles = "primary" | "secondary";
type LinkButtonColors = "primary" | "green";

const defaultStyles: Record<LinkButtonStyles, string> = {
  primary:
    "px-2 sm:px-3 lg:px-4 py-1 rounded-md active:scale-[0.96] uppercase font-bold text-xs sm:text-sm lg:text-base",
  secondary:
    "w-full uppercase text-center tracking-wider font-semibold sm:font-bold text-xs sm:text-sm lg:text-base whitespace-nowrap p-1 hover:bg-hover",
};

const defaultColors: Record<LinkButtonColors, string> = {
  primary:
    "text-headContrast bg-containerContrast hover:text-textContrast hover:bg-hover  ",
  green: "text-textColorButton bg-green-700 hover:bg-green-600",
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
