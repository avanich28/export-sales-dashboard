import Modal from "@/app/_components/Modal";
import { allInformationPages, informationDefault } from "./constants";
import CustomerForm from "./forms/CustomerForm";

function EditItemModal({ curInformation, info, customers }) {
  return (
    <Modal.Window name="informationEditForm">
      {curInformation === allInformationPages[0]
        ? // NOTE customers page
          informationDefault[curInformation].form(true, info)
        : informationDefault[curInformation].form(customers, true, info)}
    </Modal.Window>
  );
}

export default EditItemModal;
