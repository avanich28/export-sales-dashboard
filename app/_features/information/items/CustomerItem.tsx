import Container from "@/app/_components/Container";
import { useInformation } from "@/app/_contexts/InformationContext";
import { customerDetails } from "../constants";

function DetailDefaultStyle({ text1, text2 }) {
  return (
    <>
      <span className="font-semibold">{text1}</span>
      <span className="text-headContrast normal-case">{text2}</span>
    </>
  );
}

function CustomerItem({ info }) {
  const { curCustomerDetail } = useInformation();

  const {
    customerCompany,
    incoterm,
    portOfUnload,
    creditTerm,
    currency,
    address,
    buyerName,
    buyerEmail,
  } = info;

  return (
    <>
      {curCustomerDetail === customerDetails[0] ? (
        <>
          <td className="font-semibold">{customerCompany}</td>
          <td className="uppercase">{incoterm}</td>
          <td>{portOfUnload}</td>
          <td className="normal-case">{creditTerm}</td>
          <td>{currency}</td>
        </>
      ) : (
        <>
          <td>
            <Container type="table">
              <DetailDefaultStyle text1={customerCompany} text2={address} />
            </Container>
          </td>
          <td>
            <Container type="table">
              <DetailDefaultStyle text1={buyerName} text2={buyerEmail} />
            </Container>
          </td>
        </>
      )}
    </>
  );
}

export default CustomerItem;
