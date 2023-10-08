export function appendDataToFormData(formData, fileData) {
  const data = new FormData();

  // Append formData keys and values to data
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });

  // Append fileData keys and values to data under "files" key
  Object.entries(fileData).forEach(([key, value]) => {
    const filename = generateUniqueFilename();
    const image = decode64Image(value);

    data.append("files", image, filename);
  });

  return data;
}
function decode64Image(value) {
  const base64String = value
    .split(",")[1]
    .replace(/-/g, "+")
    .replace(/_/g, "/"); // Retrieve the base64 encoded image from Redux state
  const binaryString = atob(base64String);
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([uint8Array], { type: "image/png" });
  return blob;
}

function generateUniqueFilename() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  const timestamp = Date.now();
  return `${timestamp}_${result}.png`;
}
