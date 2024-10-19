const formatNumber = (value: number | null | undefined) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  if (value) return formatter.format(value);
  return '$0.00';
}

export {
  formatNumber
}