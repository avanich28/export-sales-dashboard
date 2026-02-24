import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { HiTrash } from "react-icons/hi2";
import EditItemModal from "../_features/information/EditItemModal";
import { useOutsideClick } from "../_hooks/useOutsideClick";
import { deleteItem } from "../_lib/actions";
import { getParamsWithoutId, triggerToast } from "../_utils/helpers";
import Button from "./Button";
import Modal from "./Modal";

function KebabMenu({ informationId, info, customers }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  async function handleDeleteClick() {
    const modelName = getParamsWithoutId(informationId);
    const id = info.id;

    const { error, message } = await deleteItem(modelName, id, informationId);
    triggerToast(error, message);
  }

  return (
    <Modal>
      <div className="relative" ref={ref}>
        <button onClick={() => setIsOpen((is) => !is)}>
          <HiDotsVertical />
        </button>
        {isOpen && (
          <div className="absolute flex flex-col gap-2 p-2 right-0 rounded-sm bg-containerContrast border border-borderContrast">
            <Modal.Open opens="informationEditForm">
              <Button btnType="button" type="secondary" color="secondary">
                <span>
                  <FaEdit />
                </span>
                <span>Edit</span>
              </Button>
            </Modal.Open>
            <Button
              btnType="button"
              type="secondary"
              color="secondary"
              onClick={handleDeleteClick}
            >
              <span>
                <HiTrash />
              </span>
              <span>Delete</span>
            </Button>
          </div>
        )}
      </div>
      <EditItemModal
        curInformation={getParamsWithoutId(informationId)}
        info={info}
        customers={customers}
      />
    </Modal>
  );
}

export default KebabMenu;
