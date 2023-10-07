import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Bar from "@/components/ui/Bar";
import { Option, Left, Central } from "@/components/layout/Option";
import { Overlay, Modal, ModalBody, ModalTitle } from "@/components/ui/Modal";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Column, Row } from "@/components/layout/Generic";
import styles from "./Claim.module.scss";
import ComboBox from "@/components/ui/ComboBox";
import TexTarea from "@/components/ui/TexTarea";
import FileUpload from "@/components/ui/FileUpload";
import ButtonIcon from "@/components/ui/ButtonIcon";
import InputText from "@/components/ui/InputText";
import ScreenLoader from "@/components/layout/ScreenLoader";
import {
  useFile,
  usePerson,
  useTypeClaim,
  useClaimDetail,
  useClaimData,
} from "@/store/hooks";
import FileList from "@/components/ui/FileList";
import InputRadio from "@/components/ui/InputRadio";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";
import { addMonths, format, parse, isValid, isDate } from "date-fns";

const Claim = () => {
  const router = useRouter();
  const { claimId } = router.query;
  const [form, setForm] = useState({
    type: { value: "", isValid: true },
    district: { value: "", isValid: true },
    street: { value: "", isValid: true },
    number: { value: "", isValid: true },
    date: { value: format(new Date(), "dd/MM/yyyy"), isValid: true },
    hour: { value: format(new Date(), "HH:mm"), isValid: true },
    level: { value: "", isValid: true },
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

  const [level, setLevel] = useState("");

  const handleRadioChange = (value: string) => {
    setLevel(value);
    setForm({
      ...form,
      level: {
        value: value,
        isValid: value !== "" ? true : false,
      },
    });
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

  const address = claimDetail?.address.split(",");

  useEffect(() => {
    if (claimDetail.claim_id !== "") {
      setForm({
        type: { value: claimDetail.type_id, isValid: true },
        claim: { value: claimDetail.claim_body, isValid: true },
        district: { value: address?.[0], isValid: true },
        street: { value: address?.[1], isValid: true },
        number: { value: address?.[2], isValid: true },
        date: { value: claimDetail.date, isValid: true },
        hour: { value: claimDetail.hour, isValid: true },
        level: { value: claimDetail.level, isValid: true },
      });
      setLevel(claimDetail.level);
    }
  }, [claimDetail]);

  useEffect(() => {
    if (
      form.claim.value !== "" &&
      form.type.value !== "" &&
      form.claim.isValid &&
      form.type.isValid &&
      form.district.value !== "" &&
      form.district.isValid &&
      form.street.value !== "" &&
      form.street.isValid &&
      form.number.value !== "" &&
      form.number.isValid &&
      form.date.value !== "" &&
      form.date.isValid &&
      form.hour.value !== "" &&
      form.hour.isValid &&
      form.level.value !== "" &&
      form.level.isValid
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

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  const handleOnchangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      date: {
        value: formatearFechaEnTiempoReal(e.target.value),
        isValid: /^\d{2}\/\d{2}\/\d{4}$/.test(e.target.value?.trim()),
      },
    });
  };

  const handleOnBlurDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      date: {
        value: form.date.value?.trim(),
        isValid: isValid(parse(e.target.value, "dd/MM/yyyy", new Date())),
      },
    });
  };

  const formatearFechaEnTiempoReal = (valorInput: string): string => {
    const valorLimpio = valorInput.replace(/[^0-9]/g, "");
    let fechaFormateada = "";
    for (let i = 0; i < valorLimpio.length; i++) {
      if (i === 2 || i === 4) {
        fechaFormateada += "/" + valorLimpio[i];
      } else {
        fechaFormateada += valorLimpio[i];
      }
    }

    return fechaFormateada;
  };

  const handleOnchangeHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      hour: {
        value: formatearHoraEnTiempoReal(e.target.value),
        isValid: /^\d{2}:\d{2}$/.test(e.target.value),
      },
    });
  };

  const handleOnBlurHour = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      hour: {
        value: form.hour.value?.trim(),
        isValid: isValid(parse(e.target.value, "HH:mm", new Date())),
      },
    });
  };

  const formatearHoraEnTiempoReal = (valorInput: string): string => {
    const valorLimpio = valorInput.replace(/[^0-9]/g, "");
    let horaFormateada = "";
    for (let i = 0; i < valorLimpio.length; i++) {
      if (i === 2) {
        horaFormateada += ":" + valorLimpio[i];
      } else {
        horaFormateada += valorLimpio[i];
      }
    }
    return horaFormateada;
  };

  const onclick = async () => {
    if (isValidForm && person.id !== "" && claimId) {
      createClaimDetail(
        claimId.toString(),
        form.claim.value,
        form.type.value,
        person.id,
        `${form.district.value}, ${form.street.value}, ${form.number.value}`,
        form.hour.value,
        form.date.value,
        level
      );
      router.push({
        pathname: "/send",
        query: { claimId: claimId },
      });
    }
  };
  const handleOnclickShare = () => {};
  return (
    <>
      <Bar type="top" />
      <Header>
        <div className={styles.buttonNavegation}>
          <ButtonIcon
            icon="chevron_left"
            typeButton="square"
            onClick={() => {
              router.push({
                pathname: "/user",
                query: { claimId: claimId },
              });
            }}
          />
        </div>
        Mi reclamo
      </Header>
      <Option>
        <Left>
          <BreadCrumbs path={router.pathname} />{" "}
          <Link onClick={handleOnclickShare} valor="Compartir Portal reclamo" />
        </Left>
        <Central>
          <Column gap="5px">
            <Row gap="5px">
              <ComboBox
                value={form.type.value}
                onChange={handleOnchange}
                isValid={form.type.isValid ? "comboBox" : "unComboBox"}
                width="347px"
                label="Tipo de reclamo"
                data={newData}
                valueName="id"
                textName="typename"
                name="type"
              />
            </Row>
            <Row gap="5px">
              <InputText
                type="text"
                onChange={handleOnchange}
                value={form.district.value}
                label="Comuna"
                name="district"
                width="150px"
                isValid={form.district.isValid ? "inputText" : "unInputText"}
              />
              <InputText
                type="text"
                onChange={handleOnchange}
                value={form.street.value}
                label="Calle"
                name="street"
                width="100px"
                isValid={form.street.isValid ? "inputText" : "unInputText"}
              />
              <InputText
                type="text"
                onChange={handleOnchange}
                value={form.number.value}
                label="Numero"
                name="number"
                width="88px"
                isValid={form.number.isValid ? "inputText" : "unInputText"}
              />
            </Row>
            <Row gap="5px">
              <InputText
                type="text"
                onChange={handleOnchangeDate}
                onBlur={handleOnBlurDate}
                value={form.date.value}
                label="Fecha"
                name="date"
                width="150px"
                isValid={form.date.isValid ? "inputText" : "unInputText"}
              />
              <InputText
                type="text"
                onChange={handleOnchangeHour}
                onBlur={handleOnBlurHour}
                value={form.hour.value}
                label="Hora"
                name="hour"
                width="195px"
                isValid={form.hour.isValid ? "inputText" : "unInputText"}
              />
            </Row>
            <TexTarea
              label="Descripcion"
              isValid={form.claim.isValid ? "texTarea" : "unTexTarea"}
              onChange={handleOnchange}
              value={form.claim.value}
              name="claim"
              width="347px"
            />
            <InputRadio
              options={[
                { value: "menor", label: "Menor" },
                { value: "moderado", label: "Moderado" },
                { value: "grave", label: "Grave" },
              ]}
              width="112px"
              selectedOption={level}
              onChange={handleRadioChange}
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
      <Footer>
        <Button
          text="Siguiente"
          onClick={onclick}
          width="190px"
          disabled={!isValidForm}
        />
      </Footer>
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
