import { type PropsWithChildren } from "react";

type FormRowProps = PropsWithChildren<{
  label: string;
  addClassName?: string;
}>;

function FormRow({ children, label, addClassName = "" }: FormRowProps) {
  return (
    <div
      className={`w-full flex flex-col gap-1 text-sm sm:text-base lg:text-lg ${addClassName}`}
    >
      <label className="capitalize text-headContrast font-medium sm:font-semibold primaryTransition">
        {label}
      </label>
      {children}
    </div>
  );
}

export default FormRow;
