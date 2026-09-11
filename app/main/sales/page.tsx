import Heading from "@/app/_components/Heading";
import SalesLists from "@/app/_features/sales/SalesLists";
import SalesOperation from "@/app/_features/sales/SalesOperation";
import { getAllCustomers } from "@/app/_lib/data-services";

export const metadata = {
  title: "Sales",
};

async function Page({ searchParams }) {
  const query = await searchParams;
  const customers = await getAllCustomers(true);

  return (
    <div className="h-full flex flex-col gap-3">
      <header>
        <Heading>Sales</Heading>
        <SalesOperation customers={customers} />
      </header>
      <SalesLists query={query} />
    </div>
  );
}

export default Page;
