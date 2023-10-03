import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Bar from "@/components/ui/Bar";
import { Option, Left, Central, Right } from "@/components/layout/Option";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import { Column, Row } from "@/components/layout/Generic";
import styles from "./Send.module.scss";
import { Modal, Overlay, ModalTitle, ModalBody } from "@/components/ui/Modal";
import Message from "@/components/ui/Message";
import CheckBox from "@/components/ui/CheckBox";
import {
  useClaim,
  useClaimData,
  useClaimDetail,
  useFile,
  usePerson,
} from "@/store/hooks";
import MessageInfo from "@/components/ui/MessageInfo";
import ScreenLoader from "@/components/layout/ScreenLoader";
import CardSimple from "@/components/ui/CardSimple";
import InputInfo from "@/components/ui/InputInfo";
import TexTareaInfo from "@/components/ui/TexTareaInfo";
const Send = () => {
  const router = useRouter();
  const [modal, setModal] = useState(false);

  const conditions = [
    {
      label: "Asegure la veracidad de la información en el reclamo.",
    },
    {
      label: " Asumir la responsabilidad legal correspondiente.",
    },
    {
      label: "Uso adecuado del portal reclamo",
    },
  ];

  const { isLoadingClaim, isErrorClaim, errorClaim } = useClaim();
  const { fileList } = useFile();
  const { person } = usePerson();
  const { claimDetail } = useClaimDetail();
  const { claimData, isLoadingClaimData } = useClaimData();

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  const onClick = () => {
    if (person.id !== "") {
      setModal(true);
    }
  };

  const handleOnClickMessage = () => {
    setModal(false);
    router.push('https://www.munistgo.cl/')
  };

  return (
    <>
      <Bar type="top" />
      <Option>
        <Left>
          <BreadCrumbs path={router.pathname} />
        </Left>
        <Central
          onClick={onClick}
          buttonTitle="Enviar"
          title="Enviar mi reclamo"
          disabled={isChecked}
        >
          <div className={styles.claimInfo}>
            <Column gap="5px">
              <Row gap="5px">
                <InputInfo
                  width="250px"
                  label="Nombre"
                  value={` ${person.name} ${person.paternallastname} ${person.maternallastname}`}
                />
                <InputInfo
                  width="100px"
                  label="Archivos"
                  value={`${fileList.length}`}
                />
              </Row>
              <InputInfo
                width="350px"
                label="Correo Electrónico"
                value={`${person.email}`}
              />
              <InputInfo
                width="350px"
                label="Tipo de reclamo"
                value={`${claimData.type_claim}`}
              />
              <TexTareaInfo
                width="350px"
                label="Mi reclamo"
                value={` ${claimDetail.claim_body}`}
              />
            </Column>
          </div>
          <div className={styles.sendCenter}>
            <CheckBox
              onChange={handleCheckBoxChange}
              checked={isChecked}
              valor="Aceptar terminos y condiciones"
            />
          </div>
        </Central>
        <div className={styles.sendRight}>
          {conditions.map((item, key) => (
            <CardSimple key={key} text={item.label} />
          ))}
          <CheckBox
            onChange={handleCheckBoxChange}
            checked={isChecked}
            valor="Aceptar todo"
          />
        </div>
      </Option>

      <Bar type="bottom" />

      <Overlay active={modal}>
        <Modal>
          <ModalBody>
            <Message
              onClick={handleOnClickMessage}
              textButton="Terminar"
              title="¡Gracias por registrar su reclamo!"
            >
              <h1 className={styles.menssageFinal}>
                Apreciamos su retroalimentación y estamos trabajando
                diligentemente para resolver su inquietud. Mantendremos una
                comunicación abierta y le informaremos sobre cualquier avance.
                Por favor revisar su correo.
              </h1>
              <h2 className={styles.menssageFinal}>
                ¡Gracias por confiar en nosotros!
              </h2>
            </Message>
          </ModalBody>
        </Modal>
      </Overlay>
      {isLoadingClaim || (isLoadingClaimData && <ScreenLoader />)}
      {isErrorClaim && <MessageInfo type="error" msg={errorClaim} />}
    </>
  );
};

export default Send;
