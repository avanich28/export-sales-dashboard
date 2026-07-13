function TableRow({ children }) {
  return (
    <tr className="odd:bg-bgContrast even:bg-containerContrast border-b border-borderContrast font-light sm:font-normal text-xs sm:text-sm lg:text-base primaryTransition">
      {children}
    </tr>
  );
}

export default TableRow;
