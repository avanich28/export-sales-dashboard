"use client";

import KebabMenu from "@/app/_components/KebabMenu";
import Modal from "@/app/_components/Modal";
import { deleteItem } from "@/app/_lib/actions";
import { formatDateToDDMMYY } from "@/app/_utils/constants";
import { triggerToast } from "@/app/_utils/helpers";
import ItemListModal from "./ItemListModal";

function SalesItem({ customers, order }) {
  const {
    id,
    purchaseOrderNumber,
    customer,
    portOfUnload,
    status,
    total,
    loading,
    ETA,
    note,
    items,
  } = order;

  async function handlePurchaseOrderItemDelete() {
    const path = "/sales";

    const { error, message } = await deleteItem("purchaseOrder", id, path);
    triggerToast(error, message);
  }

  return (
    <>
      <td>
        <Modal>
          <Modal.Open opens="itemList">
            <button className="hover:text-hover cursor-pointer primaryTransition">
              {purchaseOrderNumber}
            </button>
          </Modal.Open>
          <Modal.Window name="itemList">
            <ItemListModal
              purchaseOrderNumber={purchaseOrderNumber}
              customer={customer.customerCompany}
              ETA={formatDateToDDMMYY(ETA)}
              note={note}
              items={JSON.parse(items)}
            />
          </Modal.Window>
        </Modal>
      </td>
      <td>{customer.customerCompany}</td>
      <td>{portOfUnload}</td>
      <td>{status}</td>
      <td>{total}</td>
      <td>{formatDateToDDMMYY(loading)}</td>
      <td>{formatDateToDDMMYY(ETA)}</td>
      <td>
        <KebabMenu
          href={`/main/sales/${id}`}
          handleDelete={async () => await handlePurchaseOrderItemDelete()}
          hasModal={false}
        />
      </td>
    </>
  );
}

export default SalesItem;
