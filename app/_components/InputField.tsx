import { PropsWithChildren } from "react";

type InputFieldStyles = "primary";

const defaultStyles: Record<InputFieldStyles, string> = {
  primary: "sm:text-lg lg:text-xl mb-1 sm:mb-2",
};

type InputFieldProps = PropsWithChildren<{
  header: string;
  type: string;
  addClassName?: string;
}>;

function InputField({
  children,
  header,
  type = "primary",
  addClassName,
}: InputFieldProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend
        className={`uppercase text-center font-semibold sm:font-bold ${defaultStyles[type]} ${addClassName}`}
      >
        {header}
      </legend>
      {children}
    </fieldset>
  );
}

export default InputField;
