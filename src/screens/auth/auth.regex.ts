export const validationPatterns = {
  default: {
    pattern:
      /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ' -]{2,30}(?: [a-zA-Zа-яА-ЯґҐєЄіІїЇ' -]{2,30})*$/,
    messages: {
      minLength: "Min 2 characters",
      maxLength: "Max 30 characters",
    },
  },
  name: {
    pattern:
      /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ' -]{2,30}(?: [a-zA-Zа-яА-ЯґҐєЄіІїЇ' -]{2,30})*$/,
    messages: {
      required: "Name is required",
      invalid: "Enter a valid name (2-30 chars)",
      minLength: "Min 2 characters",
      maxLength: "Max 30 characters",
    },
  },
  email: {
    pattern: /^(root|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
    messages: {
      required: "Email is required",
      invalid: "Enter a valid email",
    },
  },
  password: {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    messages: {
      required: "Password is required",
      invalid: "8+ chars with 1 uppercase, 1 lowercase, 1 number",
      minLength: "Minimum 8 characters",
      mismatch: "Passwords don't match",
    },
  },
};
