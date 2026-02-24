type InputProps = {
  type?: string; // FIXME "text" | "email"
  name: string;
  placeholder?: string;
  defaultValue?: string;
  isPending: boolean;
  minLength?: undefined | number;
  maxLength?: undefined | number;
  min?: undefined | number;
  max?: undefined | number;
  pattern?: undefined | string;
  // NOTE Instructs the browser which keyboard to display.
  // Active when using browser in mobile
  inputMode?:
    | "none"
    | "text"
    | "decimal"
    | "numeric"
    | "tel"
    | "search"
    | "email"
    | "url";
};

function Input({
  type = "text",
  name,
  placeholder = "",
  defaultValue = "",
  isPending,
  minLength = 1,
  maxLength = 1000,
  min = 0,
  max = 1000000000,
  pattern = undefined,
  inputMode = "text",
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={isPending}
      minLength={type === "text" ? minLength : undefined}
      maxLength={type === "text" ? maxLength : undefined}
      min={type === "number" ? min : undefined}
      max={type === "number" ? max : undefined}
      pattern={pattern}
      inputMode={inputMode}
      className="px-2 py-1 bg-inputContrast rounded-md primaryTransition"
      required
    />
  );
}

export default Input;
