import { type PropsWithChildren } from "react";

type ButtonTypes = "submit" | "button" | "reset";
type ButtonStyles =
  | "primary"
  | "secondary"
  | "tertiary"
  | "closeModal"
  | "dropDown"
  | "quantity";
type ButtonColors =
  | "primary"
  | "secondary"
  | "tertiary"
  | "red"
  | "green"
  | "none"
  | "dropDown";

const defaultStyles: Record<ButtonStyles, string> = {
  primary:
    "px-2 sm:px-3 lg:px-4 py-1 rounded-md active:scale-[0.96] uppercase font-bold tracking-wide sm:tracking-wider text-xs sm:text-sm lg:text-base primaryTransition",
  secondary: "flex items-center gap-3 primaryTransition",
  tertiary:
    "w-full uppercase text-center tracking-wider font-semibold sm:font-bold text-xs sm:text-sm lg:text-base whitespace-nowrap p-1 primaryTransition",
  closeModal:
    "text-lg p-1 rounded-full focus:outline-2 transition-all duration-100",
  dropDown:
    "sm:hidden p-1 rounded-md focus:outline-2 transition-[background-color] duration-300",
  quantity: "text-xl active:scale-[0.96] primaryTransition",
};

const defaultColors: Record<ButtonColors, string> = {
  primary: "bg-containerContrast hover:bg-hover",
  secondary: "hover:text-hover",
  tertiary:
    "text-headContrast bg-containerContrast hover:text-textContrast hover:bg-hover",
  red: "text-textColorButton bg-red-700 hover:bg-red-600",
  green: "text-textColorButton bg-green-700 hover:bg-green-600",
  none: "",
  dropDown: "hover:bg-hoverContrast focus:outline-hover",
};

type ButtonProps = PropsWithChildren<{
  onClick: () => void;
  btnType?: ButtonTypes;
  type?: ButtonStyles;
  color?: ButtonColors;
  addClassName?: string;
}>;

function Button({
  children,
  onClick,
  btnType = "submit",
  type = "primary",
  color = "primary",
  addClassName = "",
}: ButtonProps) {
  return (
    <button
      type={btnType}
      onClick={onClick}
      className={`${defaultStyles[type]} ${defaultColors[color]} ${addClassName}`}
    >
      {children}
    </button>
  );
}

export default Button;
