function Spinner({ addClassName = "" }) {
  return (
    <div
      className={`${addClassName} w-full flex justify-center items-center primaryTransition`}
    >
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
