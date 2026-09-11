"use client";

import KebabMenu from "@/app/_components/KebabMenu";
import { deleteItem } from "@/app/_lib/actions";

import { formatDateToDDMMYY, triggerToast } from "@/app/_utils/helpers";
import ItemDetailModal from "./ItemDetailModal";

function SalesItem({ order }) {
  const {
    id,
    purchaseOrderNumber,
    customer: { customerCompany },
    portOfUnload,
    status,
    total,
    loading,
    ETA,
    rev,
    note,
    items,
  } = order;

  const href = `/main/sales/${id}`;

  const detail = {
    customer: customerCompany,
    ETA: formatDateToDDMMYY(ETA),
    rev,
    note,
  };

  async function handlePurchaseOrderItemDelete() {
    const path = "/sales";

    const { error, message } = await deleteItem("purchaseOrder", id, path);
    triggerToast(error, message);
  }

  return (
    <>
      <td>
        <ItemDetailModal
          href={href}
          modalName="orderDetail"
          purchaseOrderNumber={purchaseOrderNumber}
          detail={detail}
          items={JSON.parse(items)}
        />
      </td>
      <td>{customerCompany}</td>
      <td>{portOfUnload}</td>
      <td>{status}</td>
      <td>{total}</td>
      <td>{formatDateToDDMMYY(loading)}</td>
      <td>{formatDateToDDMMYY(ETA)}</td>
      <td>
        <KebabMenu
          href={href}
          handleDelete={async () => await handlePurchaseOrderItemDelete()}
          hasModal={false}
        />
      </td>
    </>
  );
}

export default SalesItem;
