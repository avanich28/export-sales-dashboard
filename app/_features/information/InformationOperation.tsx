"use client";

import AddingButton from "@/app/_components/AddingButton";
import Container from "@/app/_components/Container";
import LinkButton from "@/app/_components/LinkButton";
import Modal from "@/app/_components/Modal";
import Select from "@/app/_components/Select";
import { useInformation } from "@/app/_contexts/InformationContext";
import AddItemModal from "./AddItemModal";
import {
  allInformationPages,
  customerDetails,
  informationDefault,
  transportationModes,
} from "./constants";

function InformationOperation({ customers }) {
  const {
    curInformation,
    setCurInformation,
    curCustomerDetail,
    setCurCustomerDetail,
    curTransportationMode,
    setCurTransportationMode,
  } = useInformation();

  const hasTransportationMode =
    informationDefault[curInformation]?.hasTransportationMode;

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <Container type="secondary">
        {allInformationPages.map((page, i) => (
          <LinkButton
            key={page}
            href={`/main/information/${i}-${page}`}
            onClick={() => setCurInformation(page)}
            type="secondary"
            addClassName={`${
              page === curInformation ? "bg-hover text-textContrast" : ""
            }`}
          >
            {page.split(/(?=[A-Z])/).join(" ")}
          </LinkButton>
        ))}
      </Container>

      <div className="flex h-[30px] sm:h-[35px] lg:h-[39px]">
        {/* NOTE customer page */}
        {curInformation === allInformationPages[0] && (
          <Select
            name="customer-details"
            data={customerDetails}
            value={curCustomerDetail}
            onChange={(e) => setCurCustomerDetail(e.target.value)}
            type="secondary"
          />
        )}
        {/* NOTE shipment plan & contact page */}
        {hasTransportationMode && (
          <Select
            name="transportation-modes"
            data={transportationModes}
            value={curTransportationMode}
            onChange={(e) => setCurTransportationMode(e.target.value)}
            type="secondary"
          />
        )}
        <Modal>
          <Modal.Open opens="informationForm">
            {/* FIXME */}
            <AddingButton />
          </Modal.Open>
          <AddItemModal curInformation={curInformation} customers={customers} />
        </Modal>
      </div>
    </div>
  );
}

export default InformationOperation;
