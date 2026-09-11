import LinkButton from "@/app/_components/LinkButton";
import ModalContainer from "@/app/_components/ModalContainer";
import Table from "@/app/_components/Table";
import TableRow from "@/app/_components/TableRow";
import { AiFillEdit } from "react-icons/ai";
import { itemListHeader } from "./constants";

function ItemListModal({ href, purchaseOrderNumber, detail, items }) {
  return (
    <ModalContainer>
      <div className="mb-2 sm:mb-3 lg:mb-3 font-light text-xs md:text-sm lg:text-base tracking-wide sm:tracking-wider capitalize">
        <div className="mb-1 sm:mb-2 lg:mb-3 text-lg sm:text-xl lg:text-2xl">
          <span className="font-light">Order:</span>
          <span className="font-medium"> {purchaseOrderNumber}</span>
        </div>
        <div className="flex">
          <div>
            {Object.entries(detail).map(([key, value]) => {
              return (
                <div key={key}>
                  <span className="text-headContrast">{key}:</span>
                  <span className="font-medium"> {value}</span>
                </div>
              );
            })}
          </div>
          <LinkButton
            href={href}
            type="iconButton"
            addClassName="ml-auto self-end"
          >
            <AiFillEdit />
          </LinkButton>
        </div>
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
    </ModalContainer>
  );
}

export default ItemListModal;
