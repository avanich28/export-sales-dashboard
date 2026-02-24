import Modal from "@/app/_components/Modal";
import { allInformationPages, informationDefault } from "./constants";

function AddItemModal({ curInformation, customers }) {
  return (
    <Modal.Window name="informationForm">
      {curInformation === allInformationPages[0]
        ? // NOTE customers page
          informationDefault[curInformation]?.form()
        : informationDefault[curInformation]?.form(customers)}
    </Modal.Window>
  );
}

export default AddItemModal;
