function InputField({ children, header }) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="uppercase text-center font-semibold sm:font-bold">
        {header}
      </legend>
      {children}
    </fieldset>
  );
}

export default InputField;
