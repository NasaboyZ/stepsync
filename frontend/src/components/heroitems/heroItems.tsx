"use client";
import Style from "./heroItems.module.css";
import Image from "next/image";
import asset from "../../assets/phone-front.png";
import { Button, ButtonStyle } from "../button/button";
import { motion } from "framer-motion";

export default function HeroItems() {
  return (
    <>
      <div className={Style["hero_wrapper"]}>
        <h1 className={Style["hero_title"]}>Tracke deinen Erfolg</h1>
        <motion.div
          className="box"
          whileHover={{ scale: [null, 1.5, 1.4] }}
          transition={{ duration: 0.3 }}
        >
          <Button label="Registrieren" style={ButtonStyle.SECONDARY}></Button>
        </motion.div>

        <Image
          className={Style["hero_image"]}
          src={asset}
          width={500}
          height={500}
          alt="Bild von der Vorderseite des Handys"
        />
      </div>
      <p className={Style["hero_text"]}>
        Erlebe echte Motivation mit StepSync! Unsere Ziele und Challenges
        treiben dich an und zeigen deinen Fortschritt. Verfolge deine
        Verbesserungen genau und werde Teil einer engagierten Community. Kein
        leeres Gerede, sondern echte Fitnessziele – dokumentiere deinen Weg mit
        uns!
      </p>
    </>
  );
}
