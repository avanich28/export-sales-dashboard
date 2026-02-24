import InformationLists from "@/app/_features/information/InformationLists";
import { getAllCustomers, getInformationData } from "@/app/_lib/data-services";

async function Page({ params }) {
  const { informationId } = await params;
  const data = await getInformationData(informationId);
  const customers = await getAllCustomers(true);

  return (
    <InformationLists
      informationId={informationId}
      data={data}
      customers={customers}
    />
  );
}

export default Page;
