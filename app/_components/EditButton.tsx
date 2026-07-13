import { FaEdit } from "react-icons/fa";
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
        <FaEdit />
      </span>
      <span>Edit</span>
    </Button>
  );
}

export default EditButton;
