'use client'; // Директива для работы на клиенте

import { FC } from "react";
import styles from "./Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2025 Moscow. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
