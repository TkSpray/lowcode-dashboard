export function generateId(randomLength = 16) {
  return Number(
    Math.random()
      .toString()
      .substring(2, 2 + randomLength) + Date.now()
  ).toString(36);
}

export function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
