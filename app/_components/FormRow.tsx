import { type PropsWithChildren } from "react";

type FormRowProps = PropsWithChildren<{
  label: string;
}>;

function FormRow({ children, label }: FormRowProps) {
  return (
    <div className="flex flex-col gap-1 text-sm sm:text-base lg:text-lg">
      <label className="capitalize text-headContrast font-medium sm:font-semibold primaryTransition">
        {label}
      </label>
      {children}
    </div>
  );
}

export default FormRow;
