export const AUTH_ERROR_MESSAGE = "You must be logged in!";

export const SUCCESS_CREATED_DATA_MESSAGE = "Successfully created";

export const SUCCESS_DELETED_DATA_MESSAGE = "Successfully deleted";

export const months = [
  "all-months",
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const curYear = new Date().getFullYear();

export const years = [
  ...new Array(5).fill(0).map((_, i) => String(curYear - i + 1)),
];

export function convertDateStringToUTC(date) {
  const [year, month, day] = date.split("-");
  const utcDate = new Date(Date.UTC(year, month - 1, day));

  return utcDate;
}

export function formatDateToDDMMYY(date) {
  const day = date.getDate().toString();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);

  return `${day} ${month} ${year}`;
}
