"use client";

import FormBox from "@/app/_components/FormBox";
import FormRow from "@/app/_components/FormRow";
import Input from "@/app/_components/Input";
import InputField from "@/app/_components/InputField";
import Select from "@/app/_components/Select";
import SubmitButton from "@/app/_components/SubmitButton";

import { addAndUpdateShipmentContact } from "@/app/_lib/actions";
import {
  splitCamelCase,
  submitButtonMessage,
  triggerToast,
} from "@/app/_utils/helpers";
import { FormError } from "@/app/_utils/types";
import { useActionState, useEffect, useState } from "react";
import { documentTypes, transportationModes } from "../constants";

const initialState: FormError = {
  error: false,
};

function ContactForm({ customers, isEdit = false, info = undefined }) {
  const [state, formAction, isPending] = useActionState(
    addAndUpdateShipmentContact,
    initialState,
  );
  const [selectInitialValue, setSelectInitialValue] = useState({
    initialCustomer: customers[0],
    initialTransportationMode: transportationModes[0],
  });
  const { initialCustomer, initialTransportationMode } = selectInitialValue;

  useEffect(
    function () {
      const { error, message } = state;
      triggerToast(error, message);
    },
    [state],
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
      info?.customer.customerCompany,
      info?.transportationMode,
    ],
  );

  return (
    <FormBox action={formAction} type="secondary">
      <FormRow label="transportation mode">
        {isEdit && (
          <Input
            name="contactId"
            type="hidden"
            isPending={isPending}
            defaultValue={info.id}
          />
        )}
        <Select
          key={
            "transportationMode" + initialTransportationMode + initialCustomer
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
      <FormRow label="customer">
        <Select
          key={"customer" + initialTransportationMode + initialCustomer}
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
      <FormRow label="freight company">
        <Input
          name="freight"
          isPending={isPending}
          defaultValue={isEdit ? info.freight : ""}
        />
      </FormRow>
      <FormRow label="shipping company">
        <Input
          name="shipping"
          isPending={isPending}
          defaultValue={isEdit ? info.shipping : ""}
        />
      </FormRow>
      {documentTypes.map((doc) => {
        const header = splitCamelCase(doc);

        return (
          <InputField key={header} header={header}>
            <FormRow label="name">
              <Input
                name={`${doc}Name`}
                isPending={isPending}
                defaultValue={isEdit ? info[doc]?.name : ""}
              />
            </FormRow>
            <FormRow label="email">
              <Input
                name={`${doc}Email`}
                isPending={isPending}
                defaultValue={isEdit ? info[doc]?.email : ""}
              />
            </FormRow>
            <FormRow label="tel">
              <Input
                name={`${doc}Tel`}
                isPending={isPending}
                defaultValue={isEdit ? info[doc]?.tel : ""}
              />
            </FormRow>
          </InputField>
        );
      })}
      <SubmitButton>{submitButtonMessage(isEdit)} Contact</SubmitButton>
    </FormBox>
  );
}

export default ContactForm;
