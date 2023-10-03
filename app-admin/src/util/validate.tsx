import { emailRegEx } from "./regEx";

const isValidEmail = (email: string) => {
 
  if (emailRegEx.test(email) || email === "") {
    return true;
  } else {
    return false;
  }
};

export { isValidEmail};
