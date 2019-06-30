export class OwnDate {
  day: number;
  month: number;
  year: number;
  minute: number;
  hour: number;
}

export function now(): OwnDate {
  const date = new Date();
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    minute: date.getMinutes(),
    hour: date.getHours(),
  };
}
