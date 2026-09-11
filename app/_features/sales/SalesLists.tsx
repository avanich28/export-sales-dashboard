import Table from "@/app/_components/Table";
import TableRow from "@/app/_components/TableRow";
import { getAllPurchaseOrders } from "@/app/_lib/data-services";
import { salesHeader } from "./constants";
import SalesItem from "./SalesItem";

async function SalesLists({ query }) {
  const { status, sort, customer, month, year } = query;

  const purchaseOrders = await getAllPurchaseOrders(
    sort,
    status,
    customer,
    month,
    year,
  );

  return (
    <Table header={salesHeader}>
      {purchaseOrders.map((order) => (
        <TableRow key={order.id}>
          <SalesItem order={order} />
        </TableRow>
      ))}
    </Table>
  );
}

export default SalesLists;
