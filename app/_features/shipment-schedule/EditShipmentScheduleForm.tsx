"use client";

import DateInput from "@/app/_components/DateInput";
import FormBox from "@/app/_components/FormBox";
import FormRow from "@/app/_components/FormRow";
import Input from "@/app/_components/Input";
import LinkButton from "@/app/_components/LinkButton";
import Select from "@/app/_components/Select";
import SubmitButton from "@/app/_components/SubmitButton";
import { updateShipmentSchedule } from "@/app/_lib/actions";
import { convertFullDateToYYYYMMDD, triggerToast } from "@/app/_utils/helpers";
import { FormError } from "@/app/_utils/types";
import { useActionState, useEffect, useState } from "react";
import { defaultOrderStatus } from "../sales/constants";

const initialState: FormError = {
  error: false,
};

function EditShipmentScheduleForm({ shipment }) {
  const [state, formAction, isPending] = useActionState(
    updateShipmentSchedule,
    initialState,
  );
  const [curLoading, setCurLoading] = useState("");
  const [curStatus, setCurStatus] = useState("");
  const {
    id,
    purchaseOrderNumber,
    customer: { id: customerId, customerCompany },
    portOfUnload,
    ETA,
    rev,
    note,
    items,
    loading,
    status,
  } = shipment;

  useEffect(
    function () {
      const { error, message } = state;
      triggerToast(error, message);
    },
    [state],
  );

  useEffect(
    function () {
      setCurLoading(convertFullDateToYYYYMMDD(loading));
      setCurStatus(status);
    },
    [loading, status],
  );

  return (
    <FormBox
      name={`Order: ${purchaseOrderNumber} (${customerCompany})`}
      action={formAction}
      type="secondary"
    >
      {/* NOTE hidden */}
      <Input
        name="purchaseOrderId"
        type="hidden"
        isPending={isPending}
        defaultValue={id}
      />
      <Input
        name="purchaseOrderNumber"
        type="hidden"
        isPending={isPending}
        defaultValue={purchaseOrderNumber}
      />
      <Input
        name="customer"
        type="hidden"
        isPending={isPending}
        // NOTE id NOT string
        defaultValue={customerId}
      />
      <Input
        name="portOfUnload"
        type="hidden"
        isPending={isPending}
        defaultValue={portOfUnload}
      />
      <Input
        name="ETA"
        type="hidden"
        isPending={isPending}
        defaultValue={convertFullDateToYYYYMMDD(ETA)}
      />
      <Input
        name="rev"
        type="hidden"
        isPending={isPending}
        defaultValue={rev}
      />
      <Input
        name="note"
        type="hidden"
        isPending={isPending}
        defaultValue={note}
      />
      <Input
        name="itemList"
        type="hidden"
        isPending={isPending}
        defaultValue={items}
      />

      <FormRow label="loading">
        <DateInput
          name="loading"
          value={curLoading}
          onChange={setCurLoading}
          isPending={isPending}
        />
      </FormRow>
      <FormRow label="status">
        <Select
          key={curStatus}
          name="status"
          data={defaultOrderStatus.slice(1)}
          value={curStatus}
          onChange={(e) => setCurStatus(e.target.value)}
          addClassName={isPending ? "pointer-events-none" : ""}
        />
      </FormRow>
      <div className="flex ml-auto gap-1 sm:gap-2 lg:gap-3">
        <LinkButton
          color="blue"
          href="/main/shipment-schedule"
          addClassName={`tracking-wide sm:tracking-wider inline-block ${isPending ? "pointer-events-none" : ""}`}
        >
          Go back
        </LinkButton>
        <SubmitButton pendingLabel="...editing">Edit</SubmitButton>
      </div>
    </FormBox>
  );
}

export default EditShipmentScheduleForm;
