import React from "react";
import styles from "./contentWrapper.module.scss";

const ContentWrapper = ({ children }) => {
  return <div className={styles.contentWrapper}>{children}</div>;
};

export default ContentWrapper;
