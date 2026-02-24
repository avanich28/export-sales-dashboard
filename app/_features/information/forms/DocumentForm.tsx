"use client";

import FormBox from "@/app/_components/FormBox";
import FormRow from "@/app/_components/FormRow";
import Input from "@/app/_components/Input";
import Select from "@/app/_components/Select";
import SubmitButton from "@/app/_components/SubmitButton";
import { addAndUpdateDocument } from "@/app/_lib/actions";
import { submitButtonMessage, triggerToast } from "@/app/_utils/helpers";
import { FormError } from "@/app/_utils/types";
import { useActionState, useEffect, useState } from "react";

const initialState: FormError = {
  error: false,
};

function convertArrToString(arr) {
  return arr.join(", ");
}

function DocumentForm({ customers, isEdit = false, info = undefined }) {
  const [state, formAction, isPending] = useActionState(
    addAndUpdateDocument,
    initialState,
  );
  const [selectInitialValue, setSelectInitialValue] = useState({
    initialCustomer: customers[0],
  });

  const { initialCustomer } = selectInitialValue;

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
        });
    },
    [isEdit, state, info?.customerId, info?.customer.customerCompany],
  );

  return (
    <FormBox action={formAction} type="secondary">
      {isEdit && (
        <Input
          name="documentId"
          type="hidden"
          isPending={isPending}
          defaultValue={info.id}
        />
      )}
      <FormRow label="customer">
        <Select
          key={initialCustomer}
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
      <FormRow label="courier">
        <Input
          name="courier"
          isPending={isPending}
          placeholder="doc A, doc B, doc C"
          defaultValue={isEdit ? convertArrToString(info.courier) : ""}
        />
      </FormRow>
      <FormRow label="email">
        <Input
          name="email"
          isPending={isPending}
          placeholder="doc A, doc B, doc C"
          defaultValue={isEdit ? convertArrToString(info.email) : ""}
        />
      </FormRow>
      <FormRow label="driver">
        <Input
          name="driver"
          isPending={isPending}
          placeholder="doc A, doc B, doc C"
          defaultValue={isEdit ? convertArrToString(info.driver) : ""}
        />
      </FormRow>
      <SubmitButton>{submitButtonMessage(isEdit)} document list</SubmitButton>
    </FormBox>
  );
}

export default DocumentForm;
