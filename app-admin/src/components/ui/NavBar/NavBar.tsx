import React from "react";
import styles from "./NavBar.module.scss";
import { useRouter } from "next/router";
import { optionMenu } from "@/data/menu";

const NavBar = () => {
  const router = useRouter();

  const handleOnclickPath = (path: string) => {
    router.push(path);
  };
  return (
    <nav className={styles.navBar}>
      {optionMenu.map((item: any, key: number) => (
        <div
          key={key}
          className={styles.itemNav}
          onClick={() => handleOnclickPath(item.path)}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <p>{item.title}</p>
        </div>
      ))}
    </nav>
  );
};

export default NavBar;
