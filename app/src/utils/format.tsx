const unFormatRut = (rut: string) => {
  return rut?.split(".").join("").split("-").join("");
};

const formatRut = (rut: string) => {
  return unFormatRut(rut)
    ?.replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, "$1.$2.$3-$4")
    .toUpperCase();
};

const unFormatPrice = (price: number) => {
  return price.toString().split(".").join("");
};

const formatPrice = (price: number) => {
  return unFormatPrice(price).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const unFormatPlate = (plate: string) => {
  return plate ? plate.split(".").join("").split("-").join("") : "";
};

const formatPlate = (plate: string) => {
  return unFormatPlate(plate)
    .replace(/^([A-Za-z0-9]{6})([A-Za-z0-9])$/, "$1-$2")
    .toUpperCase();
};

const unFormatPBV = (weight: string) => {
  return weight
    .replace(/[^\d.-]/g, "")
    .split(".")
    .join("");
};

const formatPBV = (weight: string) => {
  return unFormatPlate(weight)
    .replace(/^([A-Za-z0-9]{6})([A-Za-z0-9])$/, "$1-$2")
    .toUpperCase();
};

export {
  unFormatPBV,
  unFormatRut,
  formatRut,
  unFormatPrice,
  formatPrice,
  unFormatPlate,
  formatPlate,
};
