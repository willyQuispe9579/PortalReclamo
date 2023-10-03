import React, { useEffect, useState } from "react";
import styles from "./ClaimDetail.module.scss";
import InputDisabled from "@/components/ui/InputDisabled";
import { Column, Row } from "@/components/layout/Generic";
import { useClaim } from "@/store/hooks";
import { format } from "date-fns";
import { useRouter } from "next/router";
import CardPerson from "@/components/ui/CardPerson";
import { data } from "@/data/barGraph";
import TexTareaInfo from "@/components/ui/TexTareaInfo";
import TexTarea from "@/components/ui/TexTarea";
import Button from "@/components/ui/Button";
const ClaimDetail = () => {
  const { claimData } = useClaim();
  const emailResponse = claimData?.person_data?.email;
  const router = useRouter();
  const [form, setForm] = useState({
    response: { value: "", isValid: true },
  });

  const handleOnchange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: {
        value: e.target.value,
        isValid: e.target.value !== "" ? true : false,
      },
    });
  };
  const hnadleOclickRespose = () => {
    alert("Exito");
  };
  return (
    <div className={styles.claimDetail}>
      <div className={styles.claimInfoDetail}>
        <Column gap="5px">
          <div className={styles.claimInfoDetailTitle}>
            Información del reclamo
          </div>
          <Row gap="5px">
            <InputDisabled
              width="200px"
              value={format(new Date(claimData.endingDate), "dd/MM/yyyy HH:mm")}
              label="Fecha de creacíon"
            />
            <div className={styles.cardLevel}>
              <span>{claimData.level}</span>
            </div>
          </Row>
          <InputDisabled
            width="320px"
            value={claimData.type_claim}
            label="Tipo de reclamo"
          />
          <TexTareaInfo
            label="Cuerpo de reclamo"
            width="320px"
            value={claimData.body_claim}
          />
        </Column>
      </div>
      <div className={styles.claimPerson}>
        <CardPerson data={claimData.person_data} />
      </div>
      <div className={styles.claimFilesDetail}>
        <div className={styles.claimFilesDetailTitle}>
          Archivos adjuntos ({claimData.claim_file_data.length})
        </div>
        <div className={styles.contentImg}>
          {claimData.claim_file_data.map((item, key) => (
            <img key={key} src={item.url} alt={item.public_id} />
          ))}
        </div>
      </div>
      <div className={styles.claimDetailAccion}>
        <div className={styles.claimDetailAccionTitle}>Acciones</div>
        <div className={styles.claimDetailAccionConten}>
          <Column gap="5px">
            <InputDisabled
              width="280px"
              label="Correo de Respuesta"
              value={emailResponse}
            />
            <TexTarea
              label="Respuesta"
              isValid={form.response.isValid ? "texTarea" : "unTexTarea"}
              onChange={handleOnchange}
              value={form.response.value}
              name="claim"
              width="280px"
            />
            <Button
              onClick={hnadleOclickRespose}
              width="200px"
              valor="Responder"
              height="50px"
            />
          </Column>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetail;
