import React, { useState } from "react";

import breadCrumbsOption from "@/data/breadCrumbsOption";
import styles from "./BreadCrumbs.module.scss";
import { useRouter } from "next/router";

interface IBreadCrumbs {
  path: string;
}

const BreadCrumbs = ({ path }: IBreadCrumbs) => {
  const router = useRouter();
  const { claimId } = router.query;
  const handleClickOption = (text: string) => {
    router.push({
      pathname: text,
      query: { claimId: claimId },
    });
  };

  var asset = 0;
  for (var i = 0; i < breadCrumbsOption.length; i++) {
    if (path === "/" && asset == 0) {
      breadCrumbsOption[i].class = "asset";
      asset = breadCrumbsOption[i].id;
      i++;
    }

    if (breadCrumbsOption[i].path !== path && asset == 0) {
      breadCrumbsOption[i].class = "prev";
    }

    if (breadCrumbsOption[i].path === path && asset == 0) {
      breadCrumbsOption[i].class = "asset";
      asset = breadCrumbsOption[i].id;
      i++;
    }

    if (asset > 0) {
      if (breadCrumbsOption.length !== i) {
        breadCrumbsOption[i].class = "next";
      }
    }
  }

  return (
    <div className={styles.breadCrumbs}>
      <div className={styles.content}>
        {breadCrumbsOption.map((item, key) => (
          <div
            key={key}
            className={styles[item.class]}
            onClick={() => handleClickOption(item.path)}
          >
            <h1>{item.id}</h1>
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
      <div className={styles.border}></div>
    </div>
  );
};

export default BreadCrumbs;
