import React from "react";
import styles from "./CardPerson.module.scss";
import IPerson from "@/interfaces/person";
import { Row, Column } from "@/components/layout/Generic";
import InputDisabled from "../InputDisabled";
import CardType from "../CardType";
interface ICardPerson {
  data: IPerson;
}
const CardPerson = ({ data }: ICardPerson) => {
  return (
    <div className={styles.cardPerson}>
      <Column gap="5px">
        <div className={styles.cardPersonTilte}>Datos del reclamante</div>
        <Row gap="5px">
          <InputDisabled label="Rut" value={data.rut} width="200px" />
          <CardType width="100px" />
        </Row>
        <InputDisabled label="Nombre" value={data.name} width="305px" />
        <InputDisabled
          label="Apellido paterno"
          value={data.paternallastname}
          width="305px"
        />
        <InputDisabled
          label="Apellido materno"
          value={data.maternallastname}
          width="305px"
        />
        <InputDisabled
          label="Correo electrónico"
          value={data.email}
          width="305px"
        />
        <InputDisabled label="Teléfono" value={data.phone} width="305px" />
      </Column>
    </div>
  );
};

export default CardPerson;
