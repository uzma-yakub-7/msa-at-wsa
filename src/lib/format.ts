/**
 * Formats a Postgres DATE value as "Friday, September 12, 2026".
 *
 * Accepts either a string ("2026-09-12", possibly with a time suffix) or a
 * Date object, because different Postgres drivers return DATE columns
 * differently. Both branches deliberately avoid handing a bare date string
 * to `new Date(...)`, which JavaScript parses as UTC and can silently
 * display as the *previous* day in US timezones — a classic off-by-one bug
 * for anything date-only.
 */
export function formatEventDate(value: string | Date): string {
  let year: number;
  let month: number; // 1-12
  let day: number;

  if (value instanceof Date) {
    year = value.getUTCFullYear();
    month = value.getUTCMonth() + 1;
    day = value.getUTCDate();
  } else {
    const [y, m, d] = String(value).slice(0, 10).split("-").map(Number);
    year = y;
    month = m;
    day = d;
  }

  const localDate = new Date(year, month - 1, day);
  return localDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
