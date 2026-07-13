type InputProps = {
  ref?: React.Ref<HTMLInputElement>;
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
  hasState: boolean;
  // FIXME
  value?: undefined;
  setValue?: undefined;
};

function Input({
  type = "text",
  name,
  placeholder = "",
  defaultValue = undefined,
  isPending,
  minLength = 1,
  maxLength = 1000,
  min = 0,
  max = 1000000000,
  pattern = undefined,
  inputMode = "text",
  hasState = false,
  value,
  setValue,
}: InputProps) {
  // NOTE For the case that cannot use 'required'
  if (hasState)
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
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

  if (!hasState)
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
