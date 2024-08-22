export function dateToYYYYMMDDHHMMSSFFFString(date: Date) {
  return date
    .toISOString()
    .replace(/-/g, '')
    .replace(/[TZ.:]/g, '');
}

export function dateToYYYYMMDDString(date: Date) {
  return date.toISOString().substring(0, 10).replace(/-/g, '');
}
