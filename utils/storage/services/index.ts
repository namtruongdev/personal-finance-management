const getBase64 = (img: Blob, callback: Function) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export { getBase64 };
