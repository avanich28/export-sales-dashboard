"use client";

import Button from "@/app/_components/Button";
import DateInput from "@/app/_components/DateInput";
import FormRow from "@/app/_components/FormRow";
import Input from "@/app/_components/Input";
import InputField from "@/app/_components/InputField";
import LinkButton from "@/app/_components/LinkButton";
import SearchSelect from "@/app/_components/SearchSelect";
import Select from "@/app/_components/Select";
import SubmitButton from "@/app/_components/SubmitButton";
import Table from "@/app/_components/Table";
import TableRow from "@/app/_components/TableRow";
import { addAndUpdatePurchaseOrder } from "@/app/_lib/actions";
import {
  convertCustomerSelectValueStr,
  convertFullDateToYYYYMMDD,
  triggerToast,
} from "@/app/_utils/helpers";
import { FormError } from "@/app/_utils/types";
import { useActionState, useEffect, useState, useTransition } from "react";
import { HiMinusCircle } from "react-icons/hi2";
import { IoIosAddCircle } from "react-icons/io";
import { defaultOrderStatus, itemListHeader } from "./constants";

const initialState: FormError = {
  error: false,
};

function AddOrderForm({
  customers,
  ports,
  products,
  isEdit = false,
  info = undefined,
}) {
  const [state, formAction] = useActionState(
    addAndUpdatePurchaseOrder,
    initialState,
  );
  const [isPending, startTransition] = useTransition();
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("");
  const [selectInitialValue, setSelectInitialValue] = useState({
    initialCustomer: customers[0],
    initialStatus: defaultOrderStatus[0],
  });

  const [portOfUnload, setPortOfUnload] = useState(
    ports.find(({ id }) => id === Number(customers[0].split("-")[0]))
      .portOfUnload,
  );

  const [loading, setLoading] = useState("");
  const [expectedArrival, setExpectedArrival] = useState("");

  const [rev, setRev] = useState("00");
  const [note, setNote] = useState("");

  const [item, setItem] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemList, setItemList] = useState([]);

  const { initialCustomer, initialStatus } = selectInitialValue;
  const productOptions = products?.map(({ id, code, description }) => ({
    value: id,
    label: code + " - " + description,
  }));

  useEffect(
    function () {
      const { error, message } = state;
      triggerToast(error, message);
    },
    [state],
  );

  useEffect(
    function () {
      if (isEdit) {
        const {
          purchaseOrderNumber,
          customerId,
          customer,
          status,
          loading,
          ETA,
          rev,
          note,
          items,
        } = info;

        setPurchaseOrderNumber(purchaseOrderNumber);

        setSelectInitialValue({
          initialCustomer: convertCustomerSelectValueStr(
            customerId,
            customer.customerCompany,
          ),
          initialStatus: status,
        });

        setLoading(convertFullDateToYYYYMMDD(loading));
        setExpectedArrival(convertFullDateToYYYYMMDD(ETA));

        setRev(rev);
        setNote(note);

        setItemList(JSON.parse(items));
      }
    },
    [isEdit, info],
  );

  useEffect(
    function () {
      const customerId = Number(initialCustomer.split("-")[0]);
      const portOfUnload = ports.find(
        ({ id }) => id === customerId,
      ).portOfUnload;
      setPortOfUnload(portOfUnload);
    },
    [initialCustomer],
  );

  function addItem() {
    const itemId = item.value;
    const [itemNumber, description] = item.label.split("-");

    const index = itemList.findIndex((item) => item.itemId === itemId);

    if (index > -1)
      setItemList((list) => {
        const newList = [...list];

        newList[index] = {
          ...newList[index],
          quantity: newList[index].quantity + itemQuantity,
        };

        return newList;
      });
    else
      setItemList([
        ...itemList,
        {
          // NOTE Item no NOT id from database
          itemId,
          itemNumber,
          description,
          quantity: itemQuantity,
        },
      ]);

    setItem(null);
    setItemQuantity(1);
  }

  function increaseQuantity(itemId) {
    setItemList((list) => {
      const newList = list.map((item) =>
        item.itemId === itemId ? { ...item, quantity: item.quantity++ } : item,
      );
      return newList;
    });
  }

  function decreaseQuantity(itemId) {
    setItemList((list) => {
      const newList = list
        .map((item) =>
          item.itemId === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item.itemId === itemId && Number(item.quantity) === 1
              ? null
              : item,
        )
        .filter((item) => item !== null);

      return newList;
    });
  }

  function handleReset() {
    setPurchaseOrderNumber("");

    setSelectInitialValue({
      initialCustomer: customers[0],
      initialStatus: defaultOrderStatus[0],
    });

    setPortOfUnload(
      ports.find(({ id }) => id === Number(customers[0].split("-")[0]))
        .portOfUnload,
    );

    setLoading("");
    setExpectedArrival("");

    setNote("");

    setItemList([]);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (itemList.length < 1) {
      triggerToast(true, "Forget to add item!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.append("itemList", JSON.stringify(itemList));

    startTransition(() => formAction(formData));

    if (!isEdit) handleReset();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      {isEdit && (
        <Input
          name="purchaseOrderId"
          type="hidden"
          defaultValue={Number(info.id)}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {/* NOTE 1 */}
        <div className="flex flex-col gap-1 sm:gap-2 ">
          <InputField header="details">
            <FormRow label="purchase order number">
              <Input
                hasState={true}
                value={purchaseOrderNumber}
                setValue={setPurchaseOrderNumber}
                name="purchaseOrderNumber"
                isPending={isPending}
              />
            </FormRow>
            <FormRow label="customer">
              <Select
                key={initialCustomer}
                name="customer"
                data={customers}
                value={initialCustomer}
                onChange={(e) =>
                  setSelectInitialValue({
                    ...selectInitialValue,
                    initialCustomer: e.target.value,
                  })
                }
                addClassName={isPending ? "pointer-events-none" : ""}
                isPending={isPending}
              />
            </FormRow>
            <FormRow label="port of unload">
              <Input
                hasState={true}
                name="portOfUnload"
                value={portOfUnload}
                setValue={setPortOfUnload}
                isPending={isPending}
              />
            </FormRow>
            <FormRow label="status">
              <Select
                key={initialStatus}
                name="status"
                data={defaultOrderStatus.slice(1)}
                value={initialStatus}
                onChange={(e) =>
                  setSelectInitialValue({
                    ...selectInitialValue,
                    initialStatus: e.target.value,
                  })
                }
                addClassName={isPending ? "pointer-events-none" : ""}
              />
            </FormRow>
            <div className="flex gap-1 sm:gap-2">
              <FormRow label="loading">
                <DateInput
                  name="loading"
                  value={loading}
                  onChange={setLoading}
                  isPending={isPending}
                />
              </FormRow>
              <FormRow label="ETA">
                <DateInput
                  name="ETA"
                  value={expectedArrival}
                  onChange={setExpectedArrival}
                  isPending={isPending}
                />
              </FormRow>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <FormRow label="rev">
                <Input
                  hasState={true}
                  value={rev}
                  setValue={setRev}
                  name="rev"
                  placeholder="Enter the PO revision..."
                  isPending={isPending}
                />
              </FormRow>
              <FormRow label="note">
                <Input
                  hasState={true}
                  value={note}
                  setValue={setNote}
                  name="note"
                  isPending={isPending}
                />
              </FormRow>
            </div>
          </InputField>
        </div>

        {/* NOTE 2 */}
        <div className="mt-4 sm:mt-0 flex flex-col gap-2 sm:gap-3">
          <InputField header="items">
            <div className="flex gap-1 sm:gap-2">
              <FormRow label="item no. - description">
                <SearchSelect
                  options={productOptions}
                  value={item}
                  onChange={setItem}
                />
              </FormRow>

              <div className="w-full flex gap-1">
                <FormRow label="quantity">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <input
                      type="number"
                      name="quantity"
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(Number(e.target.value))}
                      min={1}
                      disabled={isPending}
                      className="w-full px-2 py-1 bg-inputContrast rounded-md primaryTransition"
                    />
                    <Button
                      btnType="button"
                      color="green"
                      onClick={addItem}
                      addClassName={`ml-auto ${isPending ? "pointer-events-none" : ""}`}
                    >
                      +
                    </Button>
                  </div>
                </FormRow>
              </div>
            </div>
          </InputField>

          <Table header={itemListHeader} hasKebab={false}>
            {itemList.map(({ itemId, itemNumber, description, quantity }) => (
              <TableRow key={itemId}>
                <td>{itemNumber}</td>
                <td>{description}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => decreaseQuantity(itemId)}
                      btnType="button"
                      type="quantity"
                      color="secondary"
                    >
                      <HiMinusCircle />
                    </Button>
                    <span className="px-2">{quantity}</span>
                    <Button
                      onClick={() => increaseQuantity(itemId)}
                      btnType="button"
                      type="quantity"
                      color="secondary"
                    >
                      <IoIosAddCircle />
                    </Button>
                  </div>
                </td>
              </TableRow>
            ))}
          </Table>
        </div>

        {/* NOTE 3 */}
        <div className="sm:col-start-2 mt-2 sm:mt-4 flex justify-end gap-1 sm:gap-2 lg:gap-3">
          <LinkButton
            color="blue"
            href="/main/sales"
            addClassName={`tracking-wide sm:tracking-wider inline-block ${isPending ? "pointer-events-none" : ""}`}
          >
            Go back
          </LinkButton>
          {!isEdit && (
            <Button
              btnType="button"
              color="green"
              onClick={handleReset}
              addClassName={isPending ? "pointer-events-none" : ""}
            >
              Reset
            </Button>
          )}
          <SubmitButton pendingLabel={isEdit ? "...editing" : "...submitting"}>
            {isEdit ? "Edit" : "Submit"}
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}

export default AddOrderForm;
