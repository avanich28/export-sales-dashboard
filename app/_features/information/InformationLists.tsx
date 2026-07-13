"use client";

import KebabMenu from "@/app/_components/KebabMenu";
import Table from "@/app/_components/Table";
import TableRow from "@/app/_components/TableRow";
import { useInformation } from "@/app/_contexts/InformationContext";
import { deleteItem } from "@/app/_lib/actions";
import { getParamsWithoutId, triggerToast } from "@/app/_utils/helpers";
import { allInformationPages, informationDefault } from "./constants";
import EditInformationItemModal from "./EditInformationItemModal";

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

  async function handleInformationItemDelete(info) {
    const modelName = getParamsWithoutId(informationId);
    const id = info.id;
    const path = `/information/${informationId}`;

    const { error, message } = await deleteItem(modelName, id, path);
    triggerToast(error, message);
  }

  return (
    <Table header={curInformationHeader}>
      {items.map((info) => (
        <TableRow key={`${curInformation}-${info.id}`}>
          {item(info)}
          <td>
            <KebabMenu
              opens="informationEditForm"
              handleDelete={async () => await handleInformationItemDelete(info)}
            >
              <EditInformationItemModal
                curInformation={curInformation}
                info={info}
                customers={customers}
              />
            </KebabMenu>
          </td>
        </TableRow>
      ))}
    </Table>
  );
}

export default InformationLists;
