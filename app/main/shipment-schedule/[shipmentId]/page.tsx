import Heading from "@/app/_components/Heading";
import EditShipmentScheduleForm from "@/app/_features/shipment-schedule/EditShipmentScheduleForm";
import { getPurchaseOrder } from "@/app/_lib/data-services";

async function Page({ params }) {
  const { shipmentId } = await params;
  const data = await getPurchaseOrder(shipmentId);

  return (
    <>
      <Heading>Edit shipment</Heading>
      <main className="flex justify-center">
        <EditShipmentScheduleForm shipment={data} />
      </main>
    </>
  );
}

export default Page;
