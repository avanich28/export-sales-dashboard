"use client";

import { memo, useState } from "react";

type SelectStyles = "primary" | "secondary";

const defaultStyles: Record<SelectStyles, string> = {
  primary: "border rounded-md px-2 capitalize text-sm sm:text-base lg:text-lg",
  secondary:
    "border-b pr-[3vw] font-semibold sm:font-bold sm:text-lg md:text-xl lg:text-2xl text-headContrast capitalize",
};

type LinkOption = {
  value: string;
  text: string;
};

// FIXME
type SelectProps = {
  name: string;
  data: LinkOption[] | string[];
  initialValue: string;
  value: any;
  onChange: "";
  type?: SelectStyles;
  addClassName?: string;
};

function Select({
  name,
  data,
  value,
  onChange,
  type = "primary",
  addClassName = "",
}: SelectProps) {
  return (
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={`py-1 bg-bgContrast border-borderContrast capitalize tracking-wide sm:tracking-wide primaryTransition ${defaultStyles[type]} ${addClassName}`}
    >
      {(data as string[]).map((value) => (
        <option key={value} value={value}>
          {value.split("-").join(" ")}
        </option>
      ))}
    </select>
  );
}

export default memo(Select);
