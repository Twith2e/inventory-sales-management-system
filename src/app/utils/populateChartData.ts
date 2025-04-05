export const dataPopulator = (limit: number, values: Array<number>) => {
  const zerosNeeded = Math.max(0, limit - values.length);
  return Array(zerosNeeded).fill('0').concat(values);
};
