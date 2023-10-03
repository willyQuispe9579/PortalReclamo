import React from "react";
import styles from "./Claim.module.scss";
import TableClaim from "@/components/ui/TableClaim";

const Claim = () => {
  return (
    <div className={styles.claim}>
      <TableClaim />
    </div>
  );
};

export default Claim;
