import Table from "@/app/_components/Table";
import TableRow from "@/app/_components/TableRow";
import { itemListHeader } from "./constants";

function ItemListModal({ purchaseOrderNumber, customer, ETA, note, items }) {
  return (
    <div>
      <div className="text-sm md:text-md lg:text-lg tracking-wide font-medium mb-2">
        <div className="flex justify-between gap-3">
          <span>Order: {purchaseOrderNumber}</span>
          <span>Customer: {customer}</span>
          <span>ETA: {ETA}</span>
        </div>
        <div className="">Note: {note}</div>
      </div>

      <div className="w-[70vw] h-[70vh] md:w-[50vw] md:h-[50vh]">
        <Table header={itemListHeader} hasKebab={false}>
          {items.map((item) => {
            const { itemNumber, description, quantity } = item;

            return (
              <TableRow key={itemNumber}>
                <td>{itemNumber}</td>
                <td>{description}</td>
                <td>{quantity}</td>
              </TableRow>
            );
          })}
        </Table>
      </div>
    </div>
  );
}

export default ItemListModal;
