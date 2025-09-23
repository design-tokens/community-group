export function getFormattedDate(
	date: string | number | Date,
) {
	const dateObject = new Date(date);

  return dateObject.toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function getW3FormattedDate(
	date: string | number | Date,
) {
	const dateObject = new Date(date);

  return dateObject.toISOString();
}