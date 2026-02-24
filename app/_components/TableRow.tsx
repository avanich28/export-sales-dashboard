import KebabMenu from "./KebabMenu";

function TableRow({ children, informationId, info, customers }) {
  return (
    <tr className="odd:bg-bgContrast even:bg-containerContrast border-b border-borderContrast font-light sm:font-normal text-xs sm:text-sm  lg:text-base primaryTransition">
      {children}
      <td>
        <KebabMenu
          informationId={informationId}
          info={info}
          customers={customers}
        />
      </td>
    </tr>
  );
}

export default TableRow;
