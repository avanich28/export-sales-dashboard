import { type PropsWithChildren } from "react";

type ButtonTypes = "submit" | "button" | "reset";
type ButtonStyles = "primary" | "secondary" | "closeModal" | "dropDown";
type ButtonColors =
  | "primary"
  | "secondary"
  | "red"
  | "green"
  | "closeModal"
  | "dropDown";

const defaultStyles: Record<ButtonStyles, string> = {
  primary:
    "px-2 sm:px-3 lg:px-4 py-1 rounded-md active:scale-[0.96] uppercase font-bold tracking-wide sm:tracking-wider text-xs sm:text-sm lg:text-base primaryTransition",
  secondary: "flex items-center gap-3 primaryTransition",
  closeModal:
    "text-lg p-1 rounded-full focus:outline-2 transition-all duration-100",
  dropDown:
    "sm:hidden p-1 rounded-md focus:outline-2 transition-[background-color] duration-300",
};

const defaultColors: Record<ButtonColors, string> = {
  primary: "bg-containerContrast hover:bg-hover",
  secondary: "hover:text-hover",
  red: "text-textColorButton bg-red-700 hover:bg-red-600",
  green: "text-textColorButton bg-green-700 hover:bg-green-600",
  closeModal: "",
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
