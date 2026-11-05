export function validatePassword(password) {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  return "";
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ? ""
    : "Please enter a valid email address.";
}

export function validateUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? ""
      : "Photo URL must start with http:// or https://";
  } catch {
    return "Please enter a valid photo URL.";
  }
}
