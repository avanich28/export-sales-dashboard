type InputProps = {
  type?: string;
  name: string;
  defaultValue?: string;
  isPending: boolean;
  minLength?: number;
  maxLength?: number;
};

function Input({
  type = "text",
  name,
  defaultValue = "",
  isPending,
  minLength = 1,
  maxLength = 30,
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      defaultValue={defaultValue}
      disabled={isPending}
      minLength={minLength}
      maxLength={maxLength}
      className="px-2 py-1 bg-inputContrast rounded-md primaryTransition"
      required
    />
  );
}

export default Input;
