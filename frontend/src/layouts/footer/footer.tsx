"use client";

import FooterNav from "@/components/footerNav/footerNav";
import Style from "./footer.module.css";
import { Button, ButtonStyle } from "@/components/button/button";

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

      <Button
        label="start now!"
        onClick={() => console.log("Clickt on!")}
        style={ButtonStyle.PRIMARY}
      />

      <FooterNav />
    </footer>
  );
}
