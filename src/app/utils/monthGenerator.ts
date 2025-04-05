export const rangeGenerator = (month: string): string[] => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let count = 1;
  for (let index = 0; index < months.length; index++) {
    if (month.toLowerCase() !== months[index].toLowerCase()) {
      ++count;
    } else {
      break;
    }
  }
  return months.slice(0, count);
};

export const monthGenerator = (month: number): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[month - 1];
};
