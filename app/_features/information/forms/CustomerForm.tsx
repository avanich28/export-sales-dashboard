"use client";

import FormBox from "@/app/_components/FormBox";
import FormRow from "@/app/_components/FormRow";
import Input from "@/app/_components/Input";
import InputField from "@/app/_components/InputField";
import Select from "@/app/_components/Select";
import SubmitButton from "@/app/_components/SubmitButton";
import { addAndUpdateCustomer } from "@/app/_lib/actions";
import { submitButtonMessage, triggerToast } from "@/app/_utils/helpers";
import { FormError } from "@/app/_utils/types";
import { useActionState, useEffect, useState } from "react";
import { currency, incoterms } from "../constants";

const initialState: FormError = {
  error: false,
  message: undefined,
};

function CustomerForm({ isEdit = false, info = undefined }) {
  const [state, formAction, isPending] = useActionState(
    addAndUpdateCustomer,
    initialState,
  );
  // NOTE Setting the select initial value from prop (info) when editing only
  const [selectInitialValue, setSelectInitialValue] = useState({
    initialIncoterm: incoterms[0],
    initialCurrency: currency[0],
  });
  const { initialIncoterm, initialCurrency } = selectInitialValue;

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
          initialIncoterm: info.incoterm,
          initialCurrency: info.currency,
        });
    },
    [isEdit, state, info?.incoterm, info?.currency],
  );

  return (
    <FormBox action={formAction} type="secondary">
      {isEdit && (
        <Input
          name="customerId"
          type="hidden"
          isPending={isPending}
          defaultValue={info.id}
        />
      )}
      <FormRow label="customer company">
        <Input
          name="customerCompany"
          isPending={isPending}
          defaultValue={isEdit ? info.customerCompany : ""}
        />
      </FormRow>
      <FormRow label="incoterm">
        <Select
          key={"incoterm" + initialIncoterm + initialCurrency}
          name="incoterm"
          data={incoterms}
          value={initialIncoterm}
          onChange={(e) =>
            setSelectInitialValue({
              ...selectInitialValue,
              initialIncoterm: e.target.value,
            })
          }
          addClassName={isPending ? "pointer-events-none" : ""}
        />
      </FormRow>
      <FormRow label="port of unload">
        <Input
          name="portOfUnload"
          isPending={isPending}
          defaultValue={isEdit ? info.portOfUnload : ""}
        />
      </FormRow>
      <FormRow label="credit term">
        <Input
          name="creditTerm"
          isPending={isPending}
          defaultValue={isEdit ? info.creditTerm : ""}
        />
      </FormRow>
      <FormRow label="currency">
        <Select
          key={"currency" + initialIncoterm + initialCurrency}
          name="currency"
          data={currency}
          value={initialCurrency}
          onChange={(e) =>
            setSelectInitialValue({
              ...selectInitialValue,
              initialCurrency: e.target.value,
            })
          }
          addClassName={isPending ? "pointer-events-none" : ""}
        />
      </FormRow>
      <FormRow label="address">
        <Input
          name="address"
          isPending={isPending}
          defaultValue={isEdit ? info.address : ""}
        />
      </FormRow>
      <InputField header="buyer">
        <FormRow label="name">
          <Input
            name="buyerName"
            isPending={isPending}
            defaultValue={isEdit ? info.buyerName : ""}
          />
        </FormRow>
        <FormRow label="email">
          <Input
            name="buyerEmail"
            type="email"
            isPending={isPending}
            defaultValue={isEdit ? info.buyerEmail : ""}
          />
        </FormRow>
      </InputField>
      <SubmitButton>{submitButtonMessage(isEdit)} Customer</SubmitButton>
    </FormBox>
  );
}

export default CustomerForm;
