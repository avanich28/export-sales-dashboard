import { useFormStatus } from "react-dom";
import { type PropsWithChildren } from "react";

type SubmitButtonStyles = "primary";

const defaultStyles: Record<SubmitButtonStyles, string> = {
  primary:
    "px-2 sm:px-3 lg:px-4 py-1 rounded-md active:scale-[0.96] text-headContrast uppercase font-bold tracking-wide sm:tracking-wider text-xs sm:text-sm lg:text-base primaryTransition bg-containerContrast hover:bg-hover hover:text-textContrast",
};

type SubmitButtonProps = PropsWithChildren<{
  pendingLabel?: string;
  type?: SubmitButtonStyles;
  addClassName?: string | "";
}>;

function SubmitButton({
  children,
  pendingLabel = "submitting...",
  type = "primary",
  addClassName = "",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${defaultStyles[type]} ${addClassName}`}
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
