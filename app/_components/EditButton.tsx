import { AiFillEdit } from "react-icons/ai";
import Button from "./Button";

function EditButton({ onClick }) {
  return (
    <Button
      btnType="button"
      type="secondary"
      color="secondary"
      onClick={onClick}
    >
      <span>
        <AiFillEdit />
      </span>
      <span>Edit</span>
    </Button>
  );
}

export default EditButton;
