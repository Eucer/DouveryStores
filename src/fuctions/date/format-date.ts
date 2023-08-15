function getMonthName(numMonth: any) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[numMonth];
}

export function addLeadingZero(value: any) {
  return value.toString().padStart(2, "0");
}
export function truncarDecimales(numero: number, decimales: any) {
  const factor = Math.pow(10, decimales);
  return Math.trunc(numero * factor) / factor;
}

export function formatDateWithMinutes(isoDate: any) {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear();
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());

  return `${month} ${day}, ${year} at ${hours}:${minutes}`;
}

export function formatDate(isoDate: any) {
  const date = new Date(isoDate);
  const day = date.getDate();
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
export function formatDateMili(milliseconds: any): string {
  const numericMilli = Number(milliseconds);

  if (isNaN(numericMilli)) {
    console.error("Input cannot be converted to a valid number.");
    return "Invalid Date";
  }

  const date = new Date(numericMilli);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  return `${formattedMonth}/${formattedDay}/${year}`;
}
