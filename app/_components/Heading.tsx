const defaultStyles = {
  primary:
    "uppercase font-semibold sm:font-bold text-2xl sm:text-3xl lg:text-4xl tracking-wide sm:tracking-wider",
};

function Heading({ children, type = "primary", addClassName = "" }) {
  return (
    <h1 className={`${defaultStyles[type]} ${addClassName}`}>{children}</h1>
  );
}

export default Heading;
