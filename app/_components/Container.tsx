const defaultStyles = {
  primary: "",
  secondary:
    "min-w-auto rounded-md flex items-center justify-evenly gap-[2px] sm:gap-[3px] lg:gap-1 overflow-hidden primaryTransition",
  table: "flex flex-col items-start",
};

function Container({ children, type = "primary", addClassName = "" }) {
  return (
    <div className={`${defaultStyles[type]} ${addClassName}`}>{children}</div>
  );
}

export default Container;
