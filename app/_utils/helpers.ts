import toast from "react-hot-toast";

export function getRawData(formData) {
  return Object.fromEntries(formData.entries());
}

export function splitCamelCase(str) {
  return str.match(/([A-Z]?[a-z]+)/g)?.join(" ");
}

const abbreviationsArr = ["bl", "awb"];

export function checkAndReviseAbbreviation(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) =>
      abbreviationsArr.includes(word) ? word.toUpperCase() : word,
    )
    .join(" ");
}

export function getParamsWithoutId(paramsId) {
  return paramsId.split("-")[1];
}

export function convertToCapitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function submitButtonMessage(isEdit) {
  return isEdit ? "Edit a" : "Create a new";
}

export function triggerToast(error, message) {
  if (error && message) toast?.error(message);

  if (!error && message) toast?.success(message);
}

export function getCustomerId(customer: string): number {
  return Number(customer.split("-")[0]);
}

export function convertCustomerSelectValueStr(id, company) {
  return `${id}-${company.toLowerCase().split(" ").join("-")}`;
}

export function monthAbbrToNumber(monthAbbr) {
  const date = new Date(`${monthAbbr} 1, 2026`);
  return date.getMonth();
}

export function convertFullDateToYYYYMMDD(date) {
  return date.toLocaleDateString("en-CA");
}

export function formatDateToDDMMYY(date) {
  const day = date.getDate().toString();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);

  return `${day} ${month} ${year}`;
}

export function getDaysInMonth(year, month) {
  // month is 0-indexed (0 = January)
  const dayInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let day = 1; day <= dayInMonth; day++) {
    days.push(new Date(year, month, day).toDateString());
  }

  return days;
}

export function convertDateStringToUTC(date) {
  const [year, month, day] = date.split("-");
  const utcDate = new Date(Date.UTC(year, month - 1, day));

  return utcDate;
}

export function createQueryString(
  curSearchParams,
  name: string,
  value: string,
): string {
  // Current params
  const params = new URLSearchParams(curSearchParams.toString());
  // Change to obj
  const queries = {
    ...Object.fromEntries(params.entries()),
    [name]: value,
  };

  Object.entries(queries).forEach(([key, value]) => {
    if (value === null) params.delete(key);
    else params.set(key, value);
  });

  return params.toString();
}
