import React, { useState } from "react";
import styles from "./Shared.module.scss";
import Link from "../Link";
import ButtonIcon from "../ButtonIcon";
import { Overlay, Modal, ModalBody, ModalTitle } from "../Modal";

const Shared = () => {
  const [modal, setModal] = useState<boolean>(false);
  const handleOnClickShare = () => {
    setModal(true);
  };
  return (
    <div className={styles.shared}>
      <Link onClick={handleOnClickShare} valor="Compartir Portal reclamo" />
      <Overlay active={modal}>
        <Modal>
          <ModalTitle>
            <h1>Compartir</h1>
            <ButtonIcon
              onClick={() => setModal(false)}
              typeButton="square"
              icon="close"
            />
          </ModalTitle>
          <ModalBody>
            <div className={styles.contenIcons}>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://app-portalreclamo.onrender.com"
                target="_blank"
              >
                <img src="icons/fa.svg" alt="Icon" />
                <p>Facebook</p>
              </a>
              <a
                href="https://twitter.com/intent/tweet?url=https://app-portalreclamo.onrender.com&text=PortalReclamo"
                target="_blank"
              >
                <img src="icons/tw.svg" alt="Icon" />
                <p>Twitter</p>
              </a>
              <a
                href="https://www.linkedin.com/shareArticle?url=https://app-portalreclamo.onrender.com"
                target="_blank"
              >
                <img src="icons/lin.svg" alt="Icon" />
                <p>Linkedin</p>
              </a>
              <a
                href="whatsapp://send?text=https://app-portalreclamo.onrender.com"
                target="_blank"
              >
                <img src="icons/wa.svg" alt="Icon" />
                <p>Whatsapp</p>
              </a>
            </div>
          </ModalBody>
        </Modal>
      </Overlay>
    </div>
  );
};

export default Shared;
