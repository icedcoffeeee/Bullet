export function getNumberOfDays(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function getWeekdayOffset(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}
