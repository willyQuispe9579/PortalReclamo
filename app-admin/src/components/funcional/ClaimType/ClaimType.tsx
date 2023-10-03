import React, { useEffect, useState } from "react";
import styles from "./ClaimType.module.scss";
import useClaimType from "@/store/hooks/useClaimType";
import InputText from "@/components/ui/InputText";
import { Overlay, Modal, ModalBody, ModalTitle } from "@/components/ui/Modal";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Button from "@/components/ui/Button";
import LoaderCircle from "@/components/ui/LoaderCircle";

const ClaimType = () => {
  const {
    getAllClaimType,
    updateClaimType,
    createClaimType,
    removeClaimType,
    claimTypeList,
    isLoadingClaimType,
  } = useClaimType();

  const [form, setForm] = useState({ value: "", id: "", isValid: true });
  const [crud, setCrud] = useState("edit");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getAllClaimType();
  }, []);

  const handleOnchangeEmail = (e: any) => {
    setForm({
      value: e.target.value,
      id: form.id,
      isValid: e.target.value.trim(),
    });
  };

  const handleOnUpdate = (id: string, valueName: string) => {
    setForm({
      value: valueName,
      id: id,
      isValid: true,
    });
    setCrud("edit");
    setModal(true);
  };

  const handleOnUpdateClaim = () => {
    if (form.id !== "" && form.value !== "") {
      updateClaimType(form.id, form.value);
      getAllClaimType();
      setModal(false);
    }
  };

  const handleOnDelete = (id: string, valueName: string) => {
    setForm({
      value: valueName,
      id: id,
      isValid: true,
    });
    setCrud("delete");
    setModal(true);
  };
  const handleOnDeleteConfirm = () => {
    if (form.id !== "") {
      removeClaimType(form.id);
      getAllClaimType();
      setModal(false);
    }
  };
  const handleOnDeleteCancel = () => {
    setModal(false);
  };

  const handleOnCreate = () => {
    if (form.value !== "") {
      createClaimType(form.value);
      getAllClaimType();
      setModal(false);
    }
  };

  return (
    <div className={styles.claimType}>
      <h1 className={styles.title}>Lista de tipos de reclamo</h1>
      <div className={styles.contenTable}>
        <table className={styles.tableClaimType}>
          <thead>
            <tr>
              <th style={{ width: "50px" }}>
                <span className="material-symbols-outlined">tag</span>
              </th>
              <th style={{ width: "400px" }}>Id</th>
              <th style={{ width: "400px" }}>Tipo de reclamo</th>
              <th style={{ width: "80px" }}>Editar</th>
              <th style={{ width: "80px" }}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingClaimType ? (
              <LoaderCircle width="50px" />
            ) : (
              claimTypeList.map((item, key) => (
                <tr
                  key={item.id}
                  style={{
                    background:
                      key % 2 === 0
                        ? "rgb(0, 46, 57, 0.1)"
                        : "rgb(0, 46, 57, 0.2)",
                  }}
                >
                  <td>{key + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.typename}</td>

                  <td>
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleOnUpdate(item.id, item.typename)}
                    >
                      edit_square
                    </span>
                  </td>
                  <td>
                    <span
                      className="material-symbols-outlined"
                      onClick={() => handleOnDelete(item.id, item.typename)}
                    >
                      delete
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.add}>
        <div className={styles.lenghtList}>
          Cantidad ( {claimTypeList.length} )
        </div>
        <ButtonIcon
          onClick={() => {
            setModal(true);
            setCrud("new");
          }}
          typeButton="square"
          icon="add"
        />
      </div>

      <Overlay active={modal}>
        <Modal>
          <ModalTitle>
            {crud === "edit" && <div> Editar</div>}
            {crud === "delete" && <div>Eliminar</div>}
            {crud === "new" && <div>Nuevo tipo de Reclamo</div>}
            <ButtonIcon
              onClick={() => setModal(false)}
              typeButton="square"
              icon="close"
            />
          </ModalTitle>
          <ModalBody>
            {crud == "edit" && (
              <div className={styles.contentUpdate}>
                <h1>ID {form.id}</h1>
                <div className={styles.contenForm}>
                  <InputText
                    onChange={handleOnchangeEmail}
                    value={form.value}
                    type="text"
                    label="Tipo de reclamo"
                    width="260px"
                    name="email"
                    isValid={form.isValid ? "inputText" : "unInputText"}
                  />

                  <button
                    className={styles.buttonUpdate}
                    onClick={handleOnUpdateClaim}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}

            {crud === "delete" && (
              <div className={styles.contentDelete}>
                <h1>Está seguro de que desea eliminar " {form.value} "</h1>

                <div className={styles.contenForm}>
                  <Button
                    onClick={handleOnDeleteCancel}
                    valor="Cancelar"
                    width="150px"
                    height="50px"
                    background="#c1c1c1"
                  />

                  <Button
                    onClick={handleOnDeleteConfirm}
                    valor="Aceptar"
                    width="150px"
                    height="50px"
                  />
                </div>
              </div>
            )}

            {crud === "new" && (
              <div className={styles.contentNew}>
                <h1>Ingrese el nombre del nuevo tipo</h1>
                <div className={styles.contenForm}>
                  <InputText
                    onChange={handleOnchangeEmail}
                    value={form.value}
                    type="text"
                    label="Tipo de reclamo"
                    width="260px"
                    name="email"
                    isValid={form.isValid ? "inputText" : "unInputText"}
                  />

                  <button
                    className={styles.buttonSave}
                    onClick={handleOnCreate}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}
          </ModalBody>
        </Modal>
      </Overlay>
    </div>
  );
};

export default ClaimType;
