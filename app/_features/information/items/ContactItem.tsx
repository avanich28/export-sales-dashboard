"use client";

import Container from "@/app/_components/Container";
import {
  checkAndReviseAbbreviation,
  splitCamelCase,
} from "@/app/_utils/helpers";
import { documentTypes } from "../constants";

function DetailPrimaryDefaultStyle({ header, text }) {
  return (
    <>
      <span className="font-semibold">{header}</span>
      <span className="text-headContrast">{text}</span>
    </>
  );
}

function DetailSecondaryDefaultStyle({ header, name, email, tel }) {
  return (
    <>
      <span className="font-semibold mt-1">
        {checkAndReviseAbbreviation(header)}
      </span>
      <span className="text-headContrast font-semibold">{name}</span>
      <span className="text-headContrast lowercase">{email}</span>
      <span className="text-headContrast">{tel}</span>
    </>
  );
}

function ContactItem({ info }) {
  const {
    customer: { customerCompany },
    freight,
    shipping,
  } = info;

  return (
    <>
      <td className="font-semibold">{customerCompany}</td>
      <td>
        <Container type="table" addClassName="[&>span:nth-child(3)]:mt-1">
          <DetailPrimaryDefaultStyle header="freight" text={freight} />
          <DetailPrimaryDefaultStyle header="shipping" text={shipping} />
        </Container>
      </td>
      <td>
        <Container type="table" addClassName="mb-1">
          {documentTypes.map((doc) => {
            const header = splitCamelCase(doc);

            // NOTE booking, blOrAwb, exportEntry, form,
            const { name, email, tel } = info[doc];

            return (
              <DetailSecondaryDefaultStyle
                key={`${header}-${name}`}
                header={header}
                name={name}
                email={email}
                tel={tel}
              />
            );
          })}
        </Container>
      </td>
    </>
  );
}

export default ContactItem;
