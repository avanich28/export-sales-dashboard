type FileInputProps = {
  name: string;
  isPending: boolean;
};

function FileInput({ name, isPending }: FileInputProps) {
  return (
    <input
      type="file"
      name={name}
      accept="image/*"
      disabled={isPending}
      // NOTE Add transition in CSS
      className="text-xs sm:text-sm lg:text-base tracking-wide sm:tracking-wider file:px-2 sm:file:px-3 lg:file:px-4 file:py-1 file:mr-2 sm:file:mr-4 lg:file:mr-6 file:rounded-md file:font-semibold file:text-headContrast file:uppercase  file:bg-containerContrast hover:file:bg-hover hover:file:text-textContrast"
      required
    />
  );
}

export default FileInput;
