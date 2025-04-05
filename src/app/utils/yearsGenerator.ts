export const yearsGenerator = (limit: number) => {
  const years = [];
  for (let index = limit; index > 0; index--) {
    years.unshift(new Date().getFullYear() - index);
  }
  years.unshift(new Date().getFullYear());
  return years;
};
