import { DateTime } from "luxon";

export function formatDateToSpanish(input: string): string {
  const date = DateTime.fromISO(input);
  if (!date.isValid) {
    return "-";
  }
  return date.setLocale("es").toFormat("dd LLL HH:mm");
}

export function formatDate(input: Date, formatString: string): string {
  const date = DateTime.fromJSDate(input);
  if (!date.isValid) {
    return "-";
  }
  return date.setLocale("es").toFormat(formatString);
}

export function formatNumberToCurrency(input: number): string {
  let formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(input);
  formattedNumber = formattedNumber.replace("$", "$ ");
  // formattedNumber = formattedNumber.replace(",", ".");
  return formattedNumber;
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function boolToString(bool: boolean) {
  return bool ? "1" : "0";
}

//db formatters
export function formatMovementType(movementType: number) {
  switch (movementType) {
    case 0:
      return "Carga";
    case 1:
      return "Baja";
    case 2:
      return "Transferencia";
    default:
      return "Error";
  }
}

export function removeDuplicates(arr: any[]) {
  const seen = new Set();
  return arr.filter((item) => {
    if (seen.has(item.nombre)) {
      return false;
    } else {
      seen.add(item.nombre);
      return true;
    }
  });
}
