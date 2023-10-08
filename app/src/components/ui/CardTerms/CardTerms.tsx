import React, { useState } from "react";
import styles from "./CardTerms.module.scss";
import Link from "../Link";
import ButtonIcon from "../ButtonIcon";
import { Overlay, Modal, ModalBody, ModalTitle } from "../Modal";

const CardTerms = () => {
  const [modal, setModal] = useState<boolean>(false);

  const handleOnClickShare = () => {
    setModal(!modal);
  };

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

  return (
    <div className={styles.cardTerms}>
      <Link onClick={handleOnClickShare} valor="Términos y condiciones" />

      <Overlay active={modal}>
        <Modal>
          <ModalTitle title="Términos y condiciones">
            <ButtonIcon
              onClick={() => setModal(false)}
              typeButton="square"
              icon="close"
            />
          </ModalTitle>
          <ModalBody>
            <div className={styles.contenMainTerms}>
              {conditions.map((item, key) => (
                <div key={key} className={styles.itemTerms}>
                  {item.label}
                </div>
              ))}
            </div>
          </ModalBody>
        </Modal>
      </Overlay>
    </div>
  );
};

export default CardTerms;
