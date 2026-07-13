import Heading from "@/app/_components/Heading";
import AddOrderForm from "@/app/_features/sales/AddOrderForm";
import {
  getAllCustomerPortOfUnloads,
  getAllCustomers,
  getInformationData,
} from "@/app/_lib/data-services";

async function Page() {
  const customers = await getAllCustomers(true);
  const ports = await getAllCustomerPortOfUnloads();
  const products = await getInformationData("product", false);

  return (
    <main>
      <Heading>Add order</Heading>
      <AddOrderForm customers={customers} ports={ports} products={products} />
    </main>
  );
}

export default Page;
