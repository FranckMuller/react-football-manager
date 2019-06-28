const getCroppedImg = (image, crop, fileName) => {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject, fileUrl) => {
    canvas.toBlob(blob => {
      if (!blob) {
        //reject(new Error('Canvas is empty'));
        console.error("Canvas is empty");
        return;
      }
      blob.name = fileName;
      window.URL.revokeObjectURL(fileUrl);
      fileUrl = window.URL.createObjectURL(blob);
      resolve(fileUrl);
    }, "image/jpeg");
  });
};

export {
  getCroppedImg
};