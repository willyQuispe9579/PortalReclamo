import React, { useState, useEffect } from "react";
import styles from "./User.module.scss";
import { Row, Column } from "@/components/layout/Generic";
import LogoUser from "@/components/ui/LogoUser";
import InputDisabled from "@/components/ui/InputDisabled";
import CardType from "@/components/ui/CardType";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import CheckBox from "@/components/ui/CheckBox";
import { useUser } from "@/store/hooks";
import { useRouter } from "next/router";

const User = () => {
  const dataForm = {
    rut: { value: "", isValid: true },
    name: { value: "", isValid: true },
    paternallastname: { value: "", isValid: true },
    maternallastname: { value: "", isValid: true },
    phone: { value: "", isValid: true },
    email: { value: "", isValid: true },
  };

  const dataFormAc = {
    password: { value: "", isValid: true },
    confirmPassword: { value: "", isValid: true },
  };

  const [form, setForm] = useState(dataForm);
  const [formAc, setFormAc] = useState(dataFormAc);
  const [isChecked, setIsChecked] = useState(true);
  const [errorForm, setErrorForm] = useState(false);
  const { user, createUser, removeUser, isLoadingUser } = useUser();
  const router = useRouter();

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleOnchange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };
  const handleOnchangeFormAc = (e: any) => {
    setFormAc({
      ...formAc,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };
  useEffect(() => {
    if (user.id !== "") {
      setForm({
        rut: { value: user.rut, isValid: true },
        name: { value: user.name || "", isValid: true },
        paternallastname: {
          value: user.paternallastname || "",
          isValid: true,
        },
        maternallastname: {
          value: user.maternallastname || "",
          isValid: true,
        },
        email: { value: user.email || "", isValid: true },
        phone: { value: user.phone || "", isValid: true },
      });
    }
  }, [user]);

  useEffect(() => {
    if (
      form.name.value !== "" &&
      form.name.isValid &&
      form.paternallastname.value !== "" &&
      form.paternallastname.isValid &&
      form.maternallastname.value !== "" &&
      form.maternallastname.isValid &&
      form.email.value !== "" &&
      form.email.isValid &&
      form.phone.value !== "" &&
      form.phone.isValid
    ) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
    }
  }, [form]);

  const handleOnSubmitRemove = () => {
    if (!isChecked) {
      // removeUser(user.id);
    }
    router.push("/login");
  };

  const handleOnSubmit = () => {
    if (errorForm) {
      createUser(
        form.rut.value,
        form.name.value,
        form.paternallastname.value,
        form.maternallastname.value,
        form.email.value,
        form.phone.value
      );
      console.log("datos actualizados");
    }
  };

  return (
    <div className={styles.user}>
      <div className={styles.userInfo}>
        <div className={styles.contenLogo}>
          <LogoUser img={user.photo} width="170px" />
        </div>
        <Column gap="20px">
          <Column gap="5px">
            <Row gap="5px">
              <InputDisabled value={form.rut.value} label="Rut" width="200px" />
              <CardType width="95px" />
            </Row>
            <InputText
              type="text"
              onChange={handleOnchange}
              value={form.name.value}
              label="Nombres"
              name="name"
              width="300px"
              isValid={form.name.isValid ? "inputText" : "unInputText"}
            />
            <InputText
              type="text"
              onChange={handleOnchange}
              value={form.paternallastname.value}
              label="Apellido paterno"
              name="paternallastname"
              width="300px"
              isValid={
                form.paternallastname.isValid ? "inputText" : "unInputText"
              }
            />
            <InputText
              type="text"
              onChange={handleOnchange}
              value={form.maternallastname.value}
              label="Apellido materno"
              name="maternallastname"
              width="300px"
              isValid={
                form.maternallastname.isValid ? "inputText" : "unInputText"
              }
            />
            <InputText
              type="text"
              onChange={handleOnchange}
              value={form.email.value}
              label="Correo electrónico"
              name="email"
              width="300px"
              isValid={form.email.isValid ? "inputText" : "unInputText"}
            />
            <InputText
              type="text"
              onChange={handleOnchange}
              value={form.phone.value}
              label="Teléfono"
              name="phone"
              width="300px"
              isValid={form.phone.isValid ? "inputText" : "unInputText"}
            />
          </Column>
          <Button
            width="190px"
            height="40px"
            valor="Guardar"
            onClick={handleOnSubmit}
            disabled={!errorForm}
            isLoading={isLoadingUser}
          />
        </Column>
      </div>
      <Column gap="23px">
        <div className={styles.userAccount}>
          <div className={styles.userAccountTitle}> Mi cuenta</div>
          <Column gap="20px">
            <Column gap="5px">
              <InputDisabled
                value={form.email.value}
                label="Correo electrónico"
                width="300px"
              />
              <InputText
                type="text"
                onChange={handleOnchangeFormAc}
                value={formAc.password.value}
                label="Contraseña"
                name="password"
                width="300px"
                isValid={formAc.password.isValid ? "inputText" : "unInputText"}
              />
              <InputText
                type="text"
                onChange={handleOnchangeFormAc}
                value={formAc.confirmPassword.value}
                label="Confirmar contraseña"
                name="confirmPassword"
                width="300px"
                isValid={
                  formAc.confirmPassword.isValid ? "inputText" : "unInputText"
                }
              />
            </Column>
            <Button
              width="190px"
              height="40px"
              valor="Guardar"
              onClick={handleOnSubmit}
            />
          </Column>
        </div>
        <div className={styles.userDelete}>
          <div className={styles.userAccountTitle}>Eliminar mi cuenta</div>
          <Column gap="10px">
            <CheckBox
              onChange={handleCheckBoxChange}
              checked={isChecked}
              valor="Marca la casilla para confirmar"
            />
            <Button
              width="190px"
              height="40px"
              valor="Eliminar"
              disabled={!isChecked && user.id ? false : true}
              onClick={handleOnSubmitRemove}
              isLoading={isLoadingUser}
            />
          </Column>
        </div>
      </Column>
    </div>
  );
};

export default User;
