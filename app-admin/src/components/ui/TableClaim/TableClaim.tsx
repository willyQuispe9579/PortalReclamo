import React from "react";
import styles from "./TableClaim.module.scss";
import { useClaim } from "@/store/hooks";
import { useRouter } from "next/router";
import { format } from "date-fns";

const TableClaim = () => {
  const headTable = [
    {
      width: "30px",
      value: "#",
    },
    {
      width: "200px",
      value: "Fecha / Hora",
    },
    {
      width: "250px",
      value: "Tipo de reclamo",
    },
    {
      width: "250px",
      value: "Nombre",
    },
    {
      width: "150px",
      value: "N° Archivos",
    },
    {
      width: "150px",
      value: "Nivel",
    },
    {
      width: "30px",
      value: "",
    },
  ];
  const router = useRouter();
  const { claimList } = useClaim();

  const handleOnclickClaimDetail = (claimId: string) => {
    router.push({
      pathname: "/claimDetail",
      query: { claimId: claimId },
    });
  };

  return (
    <div className={styles.tableClaimMain}>
      <table className={styles.tableClaim}>
        <thead>
          <tr>
            {headTable.map((item, key) => (
              <th key={key} style={{ width: item.width }}>
                {item.value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {claimList.map((item, idx: any) => (
            <tr
              key={idx}
              style={{
                background:
                  idx % 2 === 0 ? "rgb(0, 46, 57, 0.1)" : "rgb(0, 46, 57, 0.2)",
              }}
            >
              <td style={{ width: "30px" }}>{idx + 1}</td>
              <td style={{ width: "200px" }}>
                {format(new Date(item.endingDate), "dd/MM/yyyy HH:mm")}
              </td>
              <td style={{ width: "250px" }}>{item.type_claim}</td>
              <td
                style={{ width: "250px" }}
              >{`${item.person_data.name} ${item.person_data.paternallastname} ${item.person_data.maternallastname}`}</td>
              <td style={{ width: "150px" }}>{item.claim_file_data.length}</td>
              <td style={{ width: "150px" }}>
                <div className={styles.level}>
                  {item.claim_file_data.length}
                </div>
              </td>
              <td
                style={{ width: "30px" }}
                onClick={() => handleOnclickClaimDetail(item.claim_id)}
              >
                <span className="material-symbols-outlined">frame_inspect</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableClaim;
