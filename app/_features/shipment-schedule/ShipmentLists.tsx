import { formatDateToDDMMYY } from "@/app/_utils/helpers";
import { FaTruckFront } from "react-icons/fa6";
import ItemDetailModal from "../sales/ItemDetailModal";

function ShipmentLists({ calendarLength, orders }) {
  console.log(orders);
  return (
    <>
      {orders.map((order, i) => {
        const {
          id,
          purchaseOrderNumber,
          customer: { customerCompany },
          loading,
          status,
          rev,
          note,
          items,
        } = order;

        const detail = {
          customer: customerCompany,
          status,
          rev,
          note,
        };

        return (
          <tr
            key={id}
            className="border-b border-borderContrast odd:bg-bgContrast even:bg-containerContrast"
          >
            <td>{i + 1}</td>
            <td>
              <ItemDetailModal
                modalName="shipmentDetail"
                href={`/main/shipment-schedule/${id}`}
                purchaseOrderNumber={purchaseOrderNumber}
                detail={detail}
                items={JSON.parse(items)}
              />
            </td>
            <td>{customerCompany}</td>
            <td>{formatDateToDDMMYY(loading)}</td>
            <td>{status}</td>
            <td></td>
            <td
              className={`h-[40px] sm:h-[50px] lg:h-[58px] grid place-items-center text-hover`}
              style={{
                gridTemplateColumns: `repeat(${calendarLength}, minmax(0, 1fr))`,
              }}
            >
              {new Array(calendarLength).fill(0).map((_, i) =>
                loading.getDate() === i + 1 ? (
                  <div key={i}>
                    <FaTruckFront />
                  </div>
                ) : (
                  <div key={i}></div>
                ),
              )}
            </td>
          </tr>
        );
      })}
    </>
  );
}

export default ShipmentLists;
