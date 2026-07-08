import { useState } from "react";

export function ImageWithFallback({ src, alt, className, ...props }) {
  const [failed, setFailed] = useState(false);

  if (failed && alt) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 p-2 text-center text-xs text-gray-500 ${className || ""}`}
        {...props}
      >
        {alt}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}
