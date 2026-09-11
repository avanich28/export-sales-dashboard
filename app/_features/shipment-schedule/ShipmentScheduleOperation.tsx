"use client";

import Select from "@/app/_components/Select";
import { months, years } from "@/app/_utils/constants";
import { createQueryString } from "@/app/_utils/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function ShipmentScheduleOperation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const curMonth =
    searchParams.get("month") || months[new Date().getMonth() + 1];
  const curYear = searchParams.get("year") || new Date().getFullYear();

  function onChangeQuery(name, value) {
    const queryString = createQueryString(searchParams, name, value);
    router.push(pathname + "?" + queryString);
  }

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      <button>
        <IoIosArrowBack />
      </button>
      <Select
        name="months"
        data={months.slice(1)}
        value={curMonth}
        onChange={(e) => onChangeQuery("month", e.target.value)}
      />
      <Select
        name="years"
        data={years}
        value={curYear}
        onChange={(e) => onChangeQuery("year", e.target.value)}
      />
      <button>
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default ShipmentScheduleOperation;
