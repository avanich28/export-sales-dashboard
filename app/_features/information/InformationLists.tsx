"use client";

import Table from "@/app/_components/Table";
import TableRow from "@/app/_components/TableRow";
import { useInformation } from "@/app/_contexts/InformationContext";
import { getParamsWithoutId } from "@/app/_utils/helpers";
import { allInformationPages, informationDefault } from "./constants";

function InformationLists({ informationId, data, customers }) {
  const { curCustomerDetail, curTransportationMode } = useInformation();
  const curInformation = getParamsWithoutId(informationId);
  const { header, hasTransportationMode, item } =
    informationDefault[curInformation];

  // FIXME info.header !== [] => access obj value with property with useState()?
  const curInformationHeader =
    curInformation === allInformationPages[0]
      ? header[curCustomerDetail]
      : header;

  const items = hasTransportationMode
    ? data.filter((info) => info.transportationMode === curTransportationMode)
    : data;

  const defaultTableRowProps = {
    informationId,
    customers,
  };

  return (
    <Table header={curInformationHeader}>
      {items.map((info) => (
        <TableRow
          key={`${curInformation}-${info.id}`}
          info={info}
          {...defaultTableRowProps}
        >
          {item(info)}
        </TableRow>
      ))}
    </Table>
  );
}

export default InformationLists;
