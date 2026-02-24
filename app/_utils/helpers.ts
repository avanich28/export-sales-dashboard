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
  if (error && message) toast.error(message);

  if (!error && message) toast.success(message);
}
