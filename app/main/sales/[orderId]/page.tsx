import Heading from "@/app/_components/Heading";
import AddOrderForm from "@/app/_features/sales/AddOrderForm";
import {
  getAllCustomerPortOfUnloads,
  getAllCustomers,
  getInformationData,
  getPurchaseOrder,
} from "@/app/_lib/data-services";

async function Page({ params }) {
  const { orderId } = await params;
  const curOrder = await getPurchaseOrder(orderId);
  const customers = await getAllCustomers(true);
  const ports = await getAllCustomerPortOfUnloads();
  const products = await getInformationData("product", false);

  return (
    <main>
      <Heading>Edit order</Heading>
      <AddOrderForm
        customers={customers}
        ports={ports}
        products={products}
        isEdit={true}
        info={curOrder}
      />
    </main>
  );
}

export default Page;
