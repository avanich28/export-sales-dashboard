import Heading from "@/app/_components/Heading";
import InformationOperation from "@/app/_features/information/InformationOperation";
import { getAllCustomers } from "@/app/_lib/data-services";

export const metadata = {
  title: "Information",
};

async function Layout({ children }: { children: React.ReactNode }) {
  const customers = await getAllCustomers(true);

  return (
    <div className="h-full flex flex-col gap-3">
      <header>
        <Heading>Information</Heading>
        <InformationOperation customers={customers} />
      </header>
      {children}
    </div>
  );
}

export default Layout;
