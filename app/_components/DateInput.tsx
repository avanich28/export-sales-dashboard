import { useRef } from "react";

function DateInput({ name, value, onChange, isPending }) {
  const dateInputRef = useRef<HTMLInputElement>(null);

  function openDatePicker() {
    dateInputRef.current?.showPicker();
  }

  return (
    <div className="relative w-full">
      <input
        ref={dateInputRef}
        type="date"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isPending}
        className="w-full px-2 py-1 bg-inputContrast rounded-md primaryTransition [&::-webkit-calendar-picker-indicator]:hidden"
        required
      />
      <button
        type="button"
        onClick={openDatePicker}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-textContrast hover:text-hover transition-colors primaryTransition"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  );
}

export default DateInput;
