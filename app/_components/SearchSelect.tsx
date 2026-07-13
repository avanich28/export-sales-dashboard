import Select from "react-select";

function SearchSelect({ name, options, value, onChange }) {
  return (
    <Select
      name={name}
      isClearable={true}
      options={options}
      value={value}
      onChange={onChange}
      classNames={{
        input: () =>
          "!text-textContrast !primaryTransition !p-0 !m-0 !text-sm sm:!text-base lg:!text-lg",
        singleValue: () => "!text-textContrast !primaryTransition",
        // NOTE Need to adjust min-height
        control: () =>
          "!text-textContrast !bg-inputContrast !border-borderContrast !rounded-md !primaryTransition !p-0 !min-h-auto !border-none",
        valueContainer: () => "!py-0",
        clearIndicator: () => "!py-0",
        indicatorSeparator: () => "!py-0",
        // NOTE Ned to adjust height
        indicatorsContainer: () => "!py-0 !h-[28px] sm:!h-[32px] lg:!h-[36px]",
        menu: () => "!z-2 !bg-inputContrast",
        option: (state) =>
          `${state.isSelected ? "!text-textContrast" : state.isFocused ? "!bg-blue-300" : ""}`,
      }}
    />
  );
}

export default SearchSelect;
