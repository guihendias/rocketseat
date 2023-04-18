import dayjs from "dayjs";

export function generateDatesFromYearStart() {
  const firstDayOfTheYear = dayjs().startOf("year");
  const today = dayjs();

  const dates = [];
  let currentDate = firstDayOfTheYear;

  while (currentDate.isBefore(today)) {
    dates.push(currentDate.toDate());
    currentDate = currentDate.add(1, "day");
  }

  return dates;
}
