import React, { useState } from "react";

import styles from "./Welcome.module.scss";
import CardUser from "@/components/ui/CardUser";
import InputDate from "@/components/ui/InputDate";
import currentDate from "@/util/currentDate";
import CardInfo from "@/components/ui/CardInfo";
import BarGraph from "@/components/ui/BarGraph";
import { Column, Row } from "@/components/layout/Generic";

import { data, options } from "@/data/barGraph";

const Welcome = () => {
  const [date, setDate] = useState({ value: currentDate(), isValid: true });

  const handleOnClickClaim = (id: string) => {
    alert(id);
  };

  const handleOnchageDate = (e: any) => {
    setDate({
      value: e.target.value,
      isValid: true,
    });
  };

  const claimUrgent = [
    {
      type: "Reclamo por accidente",
      id: "ad8wd46-a5s1dw-8d43a5sd1-1as5d - 1",
    },
    {
      type: "Reclamo por accidente 1",
      id: "ad8wd46-a5s1dw-8d43a5sd1-1as5d - 2",
    },
    {
      type: "Reclamo por accidente 2",
      id: "ad8wd46-a5s1dw-8d43a5sd1-1as5d - 3",
    },
    {
      type: "Reclamo por accidente 3",
      id: "ad8wd46-a5s1dw-8d43a5sd1-1as5d - 4",
    },
    {
      type: "Reclamo por accidenten4",
      id: "ad8wd46-a5s1dw-8d43a5sd1-1as5d - 5",
    },
    {
      type: "Reclamo por accidente",
      id: "ad8wd46-a5s1dw-8d43a5sd1-1as5d - 1",
    },
    {
      type: "Reclamo por accidente 1",
      id: "ad8wd46-a5s1dw-8d43a5sd1-1as5d - 2",
    },
    {
      type: "Reclamo por accidente 2",
      id: "ad8wd46-a5s1dw-8d43a5sd1-1as5d - 3",
    },
    {
      type: "Reclamo por accidente 3",
      id: "ad8wd46-a5s1dw-8d43a5sd1-1as5d - 4",
    },
    {
      type: "Reclamo por accidenten4",
      id: "ad8wd46-a5s1dw-8d43a5sd1-1as5d - 5",
    },
  ];

  return (
    <>
      <div className={styles.welcome}>
        <Row gap="22px">
          <CardInfo title="Total de reclamos" icon="campaign" value="2698988" />
          <CardInfo title="Reclamos urgentes" icon="warning" value="268" />
          <CardInfo title="Reclamos sin gestión" icon="problem" value="2698" />

          <div className={styles.contenDate}>
            <InputDate
              width="218px"
              onChange={handleOnchageDate}
              value={date.value}
              label="Fecha"
              name="date"
            />
          </div>
        </Row>
        <Row gap="22px">
          <BarGraph data={data} options={options} title="Total de reclamos" />
          <div className={styles.claimUrgent}>
            <h1 className={styles.titleClaim}>
              Reclamos Urgentes ({claimUrgent.length})
            </h1>
            <div className={styles.claimContenItem}>
              {claimUrgent.map((item, key) => (
                <div className={styles.claimItem} key={key}>
                  <span>{key + 1}</span> <p>{item.type}</p>
                  <a href="#" onClick={() => handleOnClickClaim(item.id)}>
                    Revisar
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};
export default Welcome;
