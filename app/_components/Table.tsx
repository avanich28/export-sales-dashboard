import { type PropsWithChildren } from "react";

type TableProps = PropsWithChildren<{
  header: string[];
}>;

function Table({ children, header }: TableProps) {
  return (
    <main className="relative w-full h-full rounded-md overflow-auto">
      <table className="absolute w-full max-w-full table-auto tracking-wide sm:tracking-wider">
        <thead className="z-1 sticky top-0 bg-borderContrast text-xs sm:text-sm lg:text-base h-[30px] sm:h-[35px] lg:h-[40px] uppercase primaryTransition">
          <tr className="[&>*]:font-medium text-headContrast primaryTransition">
            {header?.map((word) => (
              <th key={word}>{word}</th>
            ))}
            {/* NOTE For Kebab Menu */}
            <th></th>
          </tr>
        </thead>
        <tbody className="[&>*]:h-[40px] [&>*]:sm:h-[50px] [&>*]:lg:h-[58px] capitalize">
          {children}
        </tbody>
      </table>
    </main>
  );
}

export default Table;
