"use client";

import Button from "@/app/_components/Button";
import Container from "@/app/_components/Container";
import LinkButton from "@/app/_components/LinkButton";
import Select from "@/app/_components/Select";
import { months, years } from "@/app/_utils/constants";
import { createQueryString } from "@/app/_utils/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LuListFilter } from "react-icons/lu";
import { defaultOrderStatus, defaultSalesSorts } from "./constants";

function SalesOperation({ customers }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const curStatus = searchParams.get("status") || defaultOrderStatus[0];
  const curCustomer = searchParams.get("customer") || "all-customers";
  const curSort = searchParams.get("sort") || defaultSalesSorts[0];
  const curMonth = searchParams.get("month") || months[0];
  const curYear = searchParams.get("year") || years[1];

  function onChangeQuery(name, value) {
    const queryString = createQueryString(searchParams, name, value);
    router.push(pathname + "?" + queryString);
  }

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex justify-between gap-2">
        <Container type="secondary" addClassName="w-[50%]">
          {defaultOrderStatus.map((status) => (
            <Button
              key={status}
              btnType="button"
              type="tertiary"
              color="tertiary"
              addClassName={`${status === curStatus ? "bg-hover text-textContrast" : ""}`}
              onClick={() => onChangeQuery("status", status)}
            >
              {status}
            </Button>
          ))}
        </Container>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-base sm:text-lg lg:text-xl">
            <LuListFilter />
          </span>
          <Select
            name="customers"
            data={["all-customers", ...customers]}
            value={curCustomer}
            onChange={(e) => onChangeQuery("customer", e.target.value)}
          />
          <Select
            name="sorts"
            data={defaultSalesSorts}
            value={curSort}
            onChange={(e) => onChangeQuery("sort", e.target.value)}
          />
          <Select
            name="month"
            data={months}
            value={curMonth}
            onChange={(e) => onChangeQuery("month", e.target.value)}
          />
          <Select
            name="year"
            data={years}
            value={curYear}
            onChange={(e) => onChangeQuery("year", e.target.value)}
          />
        </div>
      </div>

      <LinkButton
        color="green"
        href="/main/sales/add-order"
        addClassName="rounded-md ml-auto self-center"
      >
        Add Order +
      </LinkButton>
    </div>
  );
}

export default SalesOperation;
