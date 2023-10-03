const regexCombobox = /[^0]/;
const numberRegEx = /^\d{9}$/;
const rutRegEx = /^[0-9]+[0-9|k|K]$/i;
const emailRegEx = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

export { numberRegEx, rutRegEx, emailRegEx, regexCombobox };
