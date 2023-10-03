import React from "react";
import IFile from "@/interfaces/file";
import LoaderCircle from "../LoaderCircle";
import styles from "./FileList.module.scss";

interface IFileList {
  url: string;
  public_id: string;
  isLoading: boolean;
  onClickPreview: any;
  onClickRemove: any;
}
const FileList = ({
  url,
  public_id,
  isLoading,
  onClickPreview,
  onClickRemove,
}: IFileList) => {
  return (
    <li className={styles.fileList}>
      <span onClick={onClickPreview}>Ver</span>
      <p>{public_id}</p>
      <span className="material-symbols-outlined" onClick={onClickRemove}>
        {isLoading ? <LoaderCircle width="30px" /> : "delete"}
      </span>
    </li>
  );
};

export default FileList;
