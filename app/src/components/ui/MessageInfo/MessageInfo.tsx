import React, { useState } from "react";

import styles from "./MessageInfo.module.scss";

interface IntMessageInfo {
  msg: string;
  type: "error" | "success" | "alert";
}

const MessageInfo = ({ msg, type }: IntMessageInfo) => {
  const [display, setDisplay] = useState("flex");

  const handleOnClick = () => {
    setDisplay("none");
  };

  return (
    <div className={styles[type]} style={{ display }}>
      <h5>{msg}</h5>
      <span onClick={handleOnClick} className="material-symbols-outlined">
        close
      </span>
    </div>
  );
};

export default MessageInfo;
