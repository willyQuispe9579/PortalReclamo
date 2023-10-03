import path from "path";
const typeFile = (url: string) => {
  const index = url.indexOf("?");
  if (index !== -1) {
    url = url.substring(0, index);
  }
  const extension = path.extname(url);
  let typeFile = "";

  switch (extension) {
    case ".pdf":
      typeFile = "PDF";
      break;
    case ".jpg":
    case ".jpeg":
    case ".png":
      typeFile = "Imagen";
      break;
    default:
      typeFile = "Desconocido";
  }

  return typeFile;
};
export default typeFile;
