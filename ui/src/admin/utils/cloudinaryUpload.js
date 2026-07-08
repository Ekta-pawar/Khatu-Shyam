const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Uploads a file straight from the browser to Cloudinary using an unsigned
// preset, bypassing our own server entirely. This keeps large video uploads
// fast (single hop) and lets us report real upload progress, which a plain
// fetch()-based request to our own backend cannot provide.
export const uploadToCloudinary = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        let message = "Upload to Cloudinary failed";
        try {
          message = JSON.parse(xhr.responseText)?.error?.message || message;
        } catch {
          // response wasn't JSON — keep the default message
        }
        reject(new Error(message));
      }
    };

    xhr.onerror = () => reject(new Error("Network error while uploading"));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    xhr.send(formData);
  });
};
