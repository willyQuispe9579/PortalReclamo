import { useState } from "react";
import styles from "./InputFile.module.scss";
import Loader from "../Loader";
import LoaderCircle from "../LoaderCircle";
interface IFile {
  text: string;
  onFileChange: (file: File | null) => void;
  file: string;
  loader: boolean;
}
const InputFile = ({ text, onFileChange, loader, file }: IFile) => {
  const [isfile, setIsFile] = useState(false);

  const handleFileChange = (e: any) => {
    const files = e.target.files[0] || null;
    onFileChange(files);
    setIsFile(true);
  };

  return (
    <div className={styles.inputFile}>
      <input
        type="file"
        id="file"
        name="file"
        disabled={false}
        accept=".png, .jpg, .jpeg, .pdf"
        onChange={handleFileChange}
      />
      <label htmlFor="file" id="file">
        <span className="material-symbols-outlined" id="iconUpload">
          {loader ? <LoaderCircle width="80px" /> : "cloud_upload"}
        </span>
        <p>Adjuntar evidencia</p>
      </label>
    </div>
  );
};

export default InputFile;
