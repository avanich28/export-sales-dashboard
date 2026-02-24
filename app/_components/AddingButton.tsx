import Button from "./Button";

function AddingButton({ onClick }) {
  return (
    <Button
      btnType="button"
      color="green"
      addClassName="ml-auto self-center"
      onClick={onClick}
    >
      + Add
    </Button>
  );
}

export default AddingButton;
