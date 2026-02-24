import Container from "@/app/_components/Container";

function DocumentItem({ info }) {
  const {
    customer: { customerCompany },
    courier,
    email,
    driver,
  } = info;

  return (
    <>
      <td className="font-semibold">{customerCompany}</td>
      {/* FIXME Change to object.map and add uppercase (BL Form COO) in form */}
      <td>
        <Container type="table" addClassName="my-1">
          {courier.map((doc) => (
            <span key={`courier-${doc}`}>{doc}</span>
          ))}
        </Container>
      </td>
      <td>
        <Container type="table" addClassName="my-1">
          {email.map((doc) => (
            <span key={`email-${doc}`}>{doc}</span>
          ))}
        </Container>
      </td>
      <td>
        <Container type="table" addClassName="my-1">
          {driver.map((doc) => (
            <span key={`driver-${doc}`}>{doc}</span>
          ))}
        </Container>
      </td>
    </>
  );
}

export default DocumentItem;
