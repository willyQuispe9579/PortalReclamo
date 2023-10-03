import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Bar from "@/components/ui/Bar";
import { Option, Left, Central } from "@/components/layout/Option";
import { Overlay, Modal, ModalBody, ModalTitle } from "@/components/ui/Modal";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Column } from "@/components/layout/Generic";
import styles from "./Claim.module.scss";
import ComboBox from "@/components/ui/ComboBox";
import TexTarea from "@/components/ui/TexTarea";
import FileUpload from "@/components/ui/FileUpload";
import ButtonIcon from "@/components/ui/ButtonIcon";
import ScreenLoader from "@/components/layout/ScreenLoader";
import {
  useFile,
  usePerson,
  useTypeClaim,
  useClaimDetail,
  useClaimData,
} from "@/store/hooks";
import FileList from "@/components/ui/FileList";

const Claim = () => {
  const router = useRouter();
  const { claimId } = router.query;
  const [form, setForm] = useState({
    type: { value: "", isValid: true },
    claim: { value: "", isValid: true },
  });

  const [isValidForm, setIsValidForm] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [modal, setModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [onchange, setOnchange] = useState(false);
  const { getAllTypeClaim, listTypeClaim } = useTypeClaim();
  const newData = [{ id: "", typename: "Seleccione" }, ...listTypeClaim];
  const { person } = usePerson();
  const { addFile, fileList, removeFile, isLoadingFile } = useFile();
  const { createClaimDetail, claimDetail, isLoadingClaimDetail } =
    useClaimDetail();
  const { isLoadingClaimData } = useClaimData();

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
    setOnchange(true);
  };

  useEffect(() => {
    if (selectedFiles.length > 0 && claimId && onchange) {
      const formData = new FormData();
      if (Array.isArray(selectedFiles)) {
        selectedFiles.forEach((file, index) => {
          formData.append(`files`, file);
        });
      } else {
        formData.append("files", selectedFiles);
      }
      formData.append("claim_id", claimId?.toString() || "");
      addFile(formData);
      setOnchange(false);
    }
  }, [onchange]);

  const handleFilePreviewClick = (url: string) => {
    setModal(true);
    setPreviewImage(url);
  };

  const handleRemoveFile = (public_id: string) => {
    if (claimId) {
      removeFile(public_id, claimId?.toString());
    }
  };

  useEffect(() => {
    if (claimDetail) {
      setForm({
        type: { value: claimDetail.type_id, isValid: true },
        claim: { value: claimDetail.claim_body, isValid: true },
      });
    }
  }, [claimDetail]);

  useEffect(() => {
    if (
      form.claim.value !== "" &&
      form.type.value !== "" &&
      form.claim.isValid &&
      form.type.isValid
    ) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [form]);

  useEffect(() => {
    if (listTypeClaim) {
      getAllTypeClaim();
    }
  }, []);

  const handleOnchange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  const onclick = async () => {
    if (isValidForm && person.id !== "" && claimId) {
      createClaimDetail(
        claimId.toString(),
        form.claim.value,
        form.type.value,
        person.id
      );
      router.push({
        pathname: "/send",
        query: { claimId: claimId },
      });
    }
  };
  return (
    <>
      <Bar type="top" />
      <Option>
        <Left>
          <BreadCrumbs path={router.pathname} />
        </Left>
        <Central
          onClick={onclick}
          buttonTitle="Siguiente"
          title="Mi reclamo"
          disabled={!isValidForm}
        >
          <Column gap="10px">
            <ComboBox
              value={form.type.value}
              onChange={handleOnchange}
              isValid={form.type.isValid ? "comboBox" : "unComboBox"}
              width="320px"
              label="Tipo de reclamo"
              data={newData}
              valueName="id"
              textName="typename"
              name="type"
            />
            <TexTarea
              label="Descripcion"
              isValid={form.claim.isValid ? "texTarea" : "unTexTarea"}
              onChange={handleOnchange}
              value={form.claim.value}
              name="claim"
              width="520px"
            />
          </Column>
          <div className={styles.claimcenter}>
            <div className={styles.fileClaim}>
              {fileList.length <= 0 ? (
                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  loader={isLoadingFile}
                />
              ) : (
                <ul>
                  {fileList.map((file, index) => (
                    <FileList
                      key={index}
                      url={file.url}
                      isLoading={isLoadingFile}
                      public_id={file.public_id}
                      onClickPreview={() => handleFilePreviewClick(file.url)}
                      onClickRemove={() => {
                        handleRemoveFile(file.public_id);
                      }}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Central>
        <div className={styles.claimRight}>
          <div className={styles.fileClaim}>
            {fileList.length <= 0 ? (
              <FileUpload
                onFilesSelected={handleFilesSelected}
                loader={isLoadingFile}
              />
            ) : (
              <ul>
                {fileList.map((file, index) => (
                  <FileList
                    key={index}
                    url={file.url}
                    public_id={file.public_id}
                    isLoading={isLoadingFile}
                    onClickPreview={() => handleFilePreviewClick(file.url)}
                    onClickRemove={() => {
                      handleRemoveFile(file.public_id);
                    }}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </Option>
      <Bar type="bottom" />
      <Overlay active={modal}>
        <Modal>
          <ModalTitle>
            <ButtonIcon
              onClick={() => setModal(false)}
              typeButton="square"
              icon="close"
            />
          </ModalTitle>
          <ModalBody>
            <div className={styles.contenImg}>
              {previewImage && (
                <img width="100%" src={previewImage} alt="Preview" />
              )}
            </div>
          </ModalBody>
        </Modal>
      </Overlay>
      {isLoadingClaimDetail || (isLoadingClaimData && <ScreenLoader />)}
    </>
  );
};

export default Claim;
