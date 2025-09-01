import { PropsWithChildren } from "react";

type FormBoxStyles = "primary" | "secondary";

const defaultStyles: Record<FormBoxStyles, string> = {
  primary: "w-full",
  secondary: "sm:w-[40vw]",
};

type FormBoxProps = PropsWithChildren<{
  name: string;
  action: (formData: FormData) => void;
  type?: FormBoxStyles;
  addClassName?: string;
}>;

function FormBox({
  children,
  name,
  action,
  type = "primary",
  addClassName = "",
}: FormBoxProps) {
  return (
    <form
      action={action}
      className={`${defaultStyles[type]} ${addClassName} flex flex-col gap-2 px-[2vw] py-[4vh] border border-containerContrast rounded-md capitalize tracking-wide sm:tracking-wider [&>button]:ml-auto primaryTransition`}
    >
      <h2 className="mb-1 uppercase font-semibold sm:font-bold sm:text-lg lg:text-xl">
        {name}
      </h2>

      {children}
    </form>
  );
}

export default FormBox;
