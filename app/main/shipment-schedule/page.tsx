import Heading from "@/app/_components/Heading";
import Calendar from "@/app/_features/shipment-schedule/Calendar";
import ShipmentScheduleOperation from "@/app/_features/shipment-schedule/ShipmentScheduleOperation";

export const metadata = {
  title: "Shipment Schedule",
};

async function Page({ searchParams }) {
  const query = await searchParams;

  return (
    <main>
      <Heading>Shipment Schedule</Heading>
      <div className="flex flex-col gap-2 sm:gap-4">
        <ShipmentScheduleOperation />
        <Calendar query={query} />
      </div>
    </main>
  );
}

export default Page;
