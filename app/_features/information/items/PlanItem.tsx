function PlanItem({ info }) {
  const {
    customer: { customerCompany },
    POReceive,
    load,
    transitTime,
    due,
  } = info;

  return (
    <>
      <td className="font-semibold">{customerCompany}</td>
      <td>Week {POReceive}</td>
      <td>Week {load}</td>
      <td>Week {transitTime}</td>
      <td>Week {due}</td>
    </>
  );
}

export default PlanItem;
