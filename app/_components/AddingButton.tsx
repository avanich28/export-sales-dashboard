import Button from "./Button";

function AddingButton({ onClick }) {
  return (
    <Button
      btnType="button"
      color="green"
      addClassName="ml-auto self-center active:scale-[0.96]"
      onClick={onClick}
    >
      + Add
    </Button>
  );
}

export default AddingButton;
