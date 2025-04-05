export const currencyFormatter = (amount: number) => {
  return Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};
