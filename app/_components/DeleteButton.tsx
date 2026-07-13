import { HiTrash } from "react-icons/hi2";
import Button from "./Button";

function DeleteButton({ onClick }) {
  return (
    <Button
      btnType="button"
      type="secondary"
      color="secondary"
      onClick={onClick}
    >
      <span>
        <HiTrash />
      </span>
      <span>Delete</span>
    </Button>
  );
}

export default DeleteButton;
