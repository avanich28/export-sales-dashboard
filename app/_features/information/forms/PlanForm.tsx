"use client";

import FormBox from "@/app/_components/FormBox";
import FormRow from "@/app/_components/FormRow";
import Input from "@/app/_components/Input";
import Select from "@/app/_components/Select";
import SubmitButton from "@/app/_components/SubmitButton";
import { addAndUpdatePlan } from "@/app/_lib/actions";
import { submitButtonMessage, triggerToast } from "@/app/_utils/helpers";
import { FormError } from "@/app/_utils/types";
import { useActionState, useEffect, useState } from "react";
import { transportationModes } from "../constants";

const initialState: FormError = {
  error: false,
};

function PlanForm({ customers, isEdit = false, info = undefined }) {
  const [state, formAction, isPending] = useActionState(
    addAndUpdatePlan,
    initialState,
  );
  const [selectInitialValue, setSelectInitialValue] = useState({
    initialCustomer: customers[0],
    initialTransportationMode: transportationModes[0],
  });
  const { initialCustomer, initialTransportationMode } = selectInitialValue;

  useEffect(
    function () {
      triggerToast(state.error, state.message);
    },
    [state.error, state.message],
  );

  useEffect(
    function () {
      if (isEdit && state)
        setSelectInitialValue({
          initialCustomer: `${info.customerId}-${info.customer.customerCompany}`,
          initialTransportationMode: info.transportationMode,
        });
    },
    [
      isEdit,
      state,
      info?.customerId,
      info?.customerCompany,
      info?.transportationMode,
    ],
  );

  return (
    <FormBox action={formAction} type="secondary">
      <FormRow label="customer">
        {isEdit && (
          <Input
            name="planId"
            type="hidden"
            isPending={isPending}
            defaultValue={info.id}
          />
        )}
        <Select
          key={"customer" + initialCustomer + initialTransportationMode}
          name="customer"
          value={initialCustomer}
          onChange={(e) =>
            setSelectInitialValue({
              ...selectInitialValue,
              initialCustomer: e.target.value,
            })
          }
          data={customers}
          addClassName={isPending ? "pointer-events-none" : ""}
        />
      </FormRow>
      <FormRow label="transportation mode">
        <Select
          key={
            "transportationMode" + initialCustomer + initialTransportationMode
          }
          name="transportationMode"
          value={initialTransportationMode}
          onChange={(e) =>
            setSelectInitialValue({
              ...selectInitialValue,
              initialTransportationMode: e.target.value,
            })
          }
          data={transportationModes}
          addClassName={isPending ? "pointer-events-none" : ""}
        />
      </FormRow>
      <FormRow label="PO Receive (Week no.)">
        <Input
          name="POReceive"
          type="number"
          isPending={isPending}
          defaultValue={isEdit ? info.POReceive : ""}
        />
      </FormRow>
      <FormRow label="load (Week no.)">
        <Input
          name="load"
          type="number"
          isPending={isPending}
          defaultValue={isEdit ? info.load : ""}
        />
      </FormRow>
      <FormRow label="transit time (Week no.)">
        <Input
          name="transitTime"
          type="number"
          isPending={isPending}
          defaultValue={isEdit ? info.transitTime : ""}
        />
      </FormRow>
      <FormRow label="due (Week no.)">
        <Input
          name="due"
          type="number"
          isPending={isPending}
          defaultValue={isEdit ? info.due : ""}
        />
      </FormRow>
      <SubmitButton>{submitButtonMessage(isEdit)} Shipment Plan</SubmitButton>
    </FormBox>
  );
}

export default PlanForm;
