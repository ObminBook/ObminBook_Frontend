export function transformDate(isoDate: string) {
  const date = new Date(isoDate);

  const formatter = new Intl.DateTimeFormat('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedDate = formatter.format(date);

  return formattedDate;
}
