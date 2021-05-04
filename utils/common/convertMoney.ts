const numberToVND = (number: number) =>
  number.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

export { numberToVND };
