import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Bar from "@/components/ui/Bar";
import ContainerForm from "@/components/ui/ContainerForm";
import InputText from "@/components/ui/InputText";
import { unFormatRut, formatRut } from "@/utils/format";
import { isValidRut } from "@/utils/validate";
import Button from "@/components/ui/Button";
import { Central, Left, Right, Option } from "@/components/layout/Option";
import { Column, Row } from "@/components/layout/Generic";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import styles from "./User.module.scss";
import ClaimType from "@/components/ui/CardType";
import { useClaim, usePerson } from "@/store/hooks";
import ScreenLoader from "@/components/layout/ScreenLoader";

const User = () => {
  const dataForm = {
    rut: { value: "", isValid: true },
    name: { value: "", isValid: true },
    paternallastname: { value: "", isValid: true },
    maternallastname: { value: "", isValid: true },
    phone: { value: "", isValid: true },
    email: { value: "", isValid: true },
  };
  const [form, setForm] = useState(dataForm);
  const [errorForm, setErrorForm] = useState(false);
  const { createPerson, getByRutPerson, isLoadingPerson, person } = usePerson();
  const { createClaim, claim } = useClaim();
  const [clicked, setClicked] = useState(false);

  const router = useRouter();
  const { claimId } = router.query;

  const handleOnchange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };

  useEffect(() => {
    if (person.id !== "") {
      setForm({
        rut: { value: person.rut, isValid: true },
        name: { value: person.name || "", isValid: true },
        paternallastname: {
          value: person.paternallastname || "",
          isValid: true,
        },
        maternallastname: {
          value: person.maternallastname || "",
          isValid: true,
        },
        email: { value: person.email || "", isValid: true },
        phone: { value: person.phone || "", isValid: true },
      });
    }
  }, [person]);

  const handleOnchangeRut = (e: any) => {
    setForm({
      ...form,
      rut: {
        value: e.target.value,
        isValid: isValidRut(e.target.value.trim()),
      },
      name: { value: "", isValid: true },
      paternallastname: { value: "", isValid: true },
      maternallastname: { value: "", isValid: true },
      email: { value: "", isValid: true },
      phone: { value: "", isValid: true },
    });
  };

  const handleOnFocusRut = (e: any) => {
    setForm({
      ...form,
      rut: {
        value: unFormatRut(form.rut.value),
        isValid: isValidRut(unFormatRut(e.target.value.trim())),
      },
    });
  };

  const handleOnBlurRut = (e: any) => {
    setForm({
      ...form,
      rut: {
        value: formatRut(form.rut.value),
        isValid: isValidRut(unFormatRut(e.target.value.trim())),
      },
    });
    getByRutPerson(formatRut(form.rut.value));
  };

  const handleOnClick = async () => {
    if (errorForm) {
      createPerson(
        form.rut.value,
        form.name.value,
        form.paternallastname.value,
        form.maternallastname.value,
        form.email.value,
        form.phone.value
      );

      if (claimId) {
        router.push({
          pathname: "/claim",
          query: { claimId: claimId },
        });
      } else {
        createClaim();
        setClicked(true);
      }
    }
  };

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

  useEffect(() => {
    if (claim.id !== "" && clicked) {
      router.push({
        pathname: "/claim",
        query: { claimId: claim.id },
      });
    }
  }, [claim, clicked]);

  return (
    <>
      <Bar type="top" />

      <Option>
        <Left>
          <BreadCrumbs path={router.pathname} />
        </Left>
        <Central
          onClick={handleOnClick}
          buttonTitle="Siguiente"
          title="Mis Datos"
          disabled={!errorForm}
        >
          <Column gap="20px">
            <Column gap="5px">
              <Row gap="5px">
                <InputText
                  type="text"
                  onChange={handleOnchangeRut}
                  onFocus={handleOnFocusRut}
                  onBlur={handleOnBlurRut}
                  value={form.rut.value}
                  label="Rut"
                  name="rut"
                  width="200px"
                  isValid={form.rut.isValid ? "inputText" : "unInputText"}
                />
                <ClaimType width="95px" />
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
          </Column>
        </Central>
        <div className={styles.userRight}>
          <Column gap="30px">
            <h1 className={styles.titleUser}>Portal reclamo</h1>
            <h2 className={styles.infoUser}>
              Gracias por considerar nuestro portal de reclamos para expresar su
              inquietud. Valoramos su confianza y estamos aquí para ayudarle en
              cualquier asunto que desee plantear.
            </h2>
          </Column>
        </div>
      </Option>

      <Bar type="bottom" />
      {isLoadingPerson && <ScreenLoader />}
    </>
  );
};

export default User;
