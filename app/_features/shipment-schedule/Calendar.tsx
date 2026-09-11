import { defaultSalesSorts } from "@/app/_features/sales/constants";
import { getAllPurchaseOrders } from "@/app/_lib/data-services";
import { months } from "@/app/_utils/constants";
import { getDaysInMonth, monthAbbrToNumber } from "@/app/_utils/helpers";
import { getISOWeek } from "date-fns";
import ShipmentLists from "./ShipmentLists";

async function Calendar({ query }) {
  const {
    month = months[new Date().getMonth() + 1],
    year = new Date().getFullYear(),
  } = query;
  const calendar = getDaysInMonth(year, monthAbbrToNumber(month));
  const orders = await getAllPurchaseOrders(
    defaultSalesSorts[2],
    "all",
    "all-customers",
    month, // string
    year,
  );
  const calendarLength = calendar.length;

  return (
    <div className="w-full">
      <table className="table-auto w-full tracking-wide sm:tracking-wider text-xs sm:text-sm lg:text-base">
        <thead className="text-headContrast primaryTransition">
          <tr className="uppercase">
            <th>no.</th>
            <th>order no.</th>
            <th>customer</th>
            <th>load</th>
            <th>status</th>
            <th>
              <div className="flex flex-col justify-center items-end">
                <div>Week</div>
                <div>Date</div>
                <div>Day</div>
              </div>
            </th>
            <th>
              <div
                className="border-y grid grid-cols-31"
                style={{
                  gridTemplateColumns: `repeat(${calendarLength}, minmax(0, 1fr))`,
                }}
              >
                {calendar.map((fullDate) => {
                  const [day, month, date, year] = fullDate.split(" ");

                  const reviseDate = date[0] === "0" ? date.slice(1) : date;

                  return (
                    <div
                      key={`${date}-${month}-${year}`}
                      className={`w-full flex flex-col font-medium items-center p-1 sm:p-2 ${day === "Sun" ? "text-red-600" : day === "Sat" ? "text-purple-500" : ""}`}
                    >
                      <div>W{getISOWeek(new Date(fullDate))}</div>
                      <div>{reviseDate}</div>
                      <div>{day[0]}</div>
                    </div>
                  );
                })}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="[&>*]:h-[40px] [&>*]:sm:h-[50px] [&>*]:lg:h-[58px] font-light sm:font-normal primaryTransition">
          <ShipmentLists calendarLength={calendarLength} orders={orders} />
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
