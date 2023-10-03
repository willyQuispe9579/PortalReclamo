import React from 'react'

import styles from './ScreenMain.module.scss'

const ScreenMain = ({ children }: any) => {
    return <section className={styles.screenMain}>{children}</section>;
  };
  

export default ScreenMain