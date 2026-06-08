/** Normalizes RTK Query / fetch errors to a single user-facing string. */
export const getErrorMessage = (error, fallback = "Something went wrong. Please try again") => {
  if (!error) return fallback;

  const data = error.data;
  if (data?.errors?.length) {
    const first = data.errors[0];
    return typeof first === "string" ? first : first.message || fallback;
  }

  return data?.message || error.error || fallback;
};
