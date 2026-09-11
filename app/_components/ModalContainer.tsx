function ModalContainer({ children }) {
  return (
    <div className="p-3 sm:p-4 lg:p-5 bg-bgContrast rounded-lg sm:rounded-xl">
      {children}
    </div>
  );
}

export default ModalContainer;
