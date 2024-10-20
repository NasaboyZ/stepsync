import React from "react";
import Style from "./herosection.module.css";

export function Herosection() {
  return (
    <div className={Style["Herosection__wrapper"]}>
      <h1>Tracke deinen Erfolg</h1>
      <button className={Style["Herosection__button"]}>Registrieren</button>
    </div>
  );
}
