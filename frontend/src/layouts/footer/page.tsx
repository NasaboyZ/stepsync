"use client";

import { Button } from "@/components/button/Button";
import FooterNav from "@/components/footerNav/FooterNav";
import Style from "./page.module.css";

// import style from "./page.module.css";

export function Footer() {
  return (
    // <footer className={style["footer"]}>
    //
    // </footer>
    <footer className={Style["footer"]}>
      <p>
        Bereit, deine Fitness zu steigern? Starte mit StepSync, werde jede
        Sekunde stärker.
      </p>

      <Button label="start now!" onClick={() => console.log("Clickt on!")} />

      <FooterNav />
    </footer>
  );
}
