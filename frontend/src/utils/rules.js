export const rules = {
  required: value => !!value || "Required.",
  min: value => value.length >= 6 || "Min 6 characters",
  emailFormat: value => /.+@.+\..+/.test(value) || "E-mail must be valid"
};
