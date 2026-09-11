"use client";

import Modal from "@/app/_components/Modal";
import ItemListModal from "./ItemListModal";

function ItemDetailModal({
  modalName,
  href,
  purchaseOrderNumber,
  detail,
  items,
}) {
  return (
    <Modal>
      <Modal.Open opens={modalName}>
        <button className="font-semibold hover:text-hover cursor-pointer primaryTransition">
          {purchaseOrderNumber}
        </button>
      </Modal.Open>
      <Modal.Window name={modalName}>
        <ItemListModal
          href={href}
          purchaseOrderNumber={purchaseOrderNumber}
          detail={detail}
          items={items}
        />
      </Modal.Window>
    </Modal>
  );
}

export default ItemDetailModal;
