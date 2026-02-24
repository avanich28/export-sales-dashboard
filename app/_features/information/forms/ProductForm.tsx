"use client";

import FileInput from "@/app/_components/FileInput";
import FormBox from "@/app/_components/FormBox";
import FormRow from "@/app/_components/FormRow";
import Input from "@/app/_components/Input";
import Select from "@/app/_components/Select";
import SubmitButton from "@/app/_components/SubmitButton";
import { addAndUpdateProduct } from "@/app/_lib/actions";
import { submitButtonMessage, triggerToast } from "@/app/_utils/helpers";
import { FormError } from "@/app/_utils/types";
import { useActionState, useEffect, useState } from "react";
import { currency } from "../constants";

const initialState: FormError = {
  error: false,
};

function ProductForm({ customers, isEdit = false, info = undefined }) {
  const [state, formAction, isPending] = useActionState(
    addAndUpdateProduct,
    initialState,
  );
  const [selectInitialValue, setSelectInitialValue] = useState({
    initialCustomer: customers[0],
    initialCurrency: currency[0],
  });
  const { initialCustomer, initialCurrency } = selectInitialValue;
  const decimalPattern = "^([0-9]{0,10})?(\.[0-9]{1,4})?$";

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
          initialCurrency: info.currency,
        });
    },
    [isEdit, state, info?.customerId, info?.customerCompany, info?.currency],
  );

  return (
    <FormBox action={formAction} type="secondary">
      {isEdit && (
        <Input
          name="productId"
          type="hidden"
          isPending={isPending}
          defaultValue={info.id}
        />
      )}
      <FormRow label="image">
        <FileInput
          name="image"
          isPending={isPending}
          required={isEdit ? false : true}
        />
      </FormRow>
      <FormRow label="code">
        <Input
          name="code"
          placeholder="001"
          isPending={isPending}
          minLength={3}
          maxLength={3}
          pattern="[0-9]{3}"
          inputMode="numeric"
          defaultValue={isEdit ? info.code : ""}
        />
      </FormRow>
      <FormRow label="description">
        <Input
          name="description"
          isPending={isPending}
          maxLength={20}
          defaultValue={isEdit ? info.description : ""}
        />
      </FormRow>
      <FormRow label="customer">
        <Select
          key={"customer" + initialCustomer + initialCurrency}
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
      <FormRow label="HS Code">
        <Input
          name="HSCode"
          isPending={isPending}
          minLength={8}
          maxLength={8}
          pattern="[0-9]{8}"
          inputMode="numeric"
          defaultValue={isEdit ? info.HSCode : ""}
        />
      </FormRow>
      <FormRow label="currency">
        <Select
          key={"currency" + initialCustomer + initialCurrency}
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
      <FormRow label="direct exchange rate (THB)">
        <Input
          type="text"
          name="directExchangeRate"
          isPending={isPending}
          maxLength={4}
          pattern={decimalPattern}
          inputMode="decimal"
          defaultValue={isEdit ? info.directExchangeRate : ""}
        />
      </FormRow>
      <FormRow label="price">
        <Input
          type="text"
          name="price"
          isPending={isPending}
          maxLength={6}
          pattern={decimalPattern}
          inputMode="decimal"
          defaultValue={isEdit ? info.price : ""}
        />
      </FormRow>
      <SubmitButton>{submitButtonMessage(isEdit)} Product</SubmitButton>
    </FormBox>
  );
}

export default ProductForm;
