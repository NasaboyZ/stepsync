"use client";
import Style from "./heroItems.module.css";
import Image from "next/image";
import iphonefront from "../../assets/phone-front.png";
import iphonehintellinks from "../../assets/hintenlinks.png";
import iphonehintenrechts from "../../assets/hintenrechts.png";
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

        <motion.div
          className={Style["hero_image_bg_left"]}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={iphonehintellinks}
            width={500}
            height={500}
            alt="Hinten Links Bild"
          />
        </motion.div>

        <motion.div
          className={Style["hero_image_bg_right"]}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={iphonehintenrechts}
            width={490}
            height={490}
            alt="Hinten Rechts Bild"
          />
        </motion.div>

        
        <motion.div
          className={Style["hero_image_front"]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={iphonefront}
            width={500}
            height={500}
            alt="Vorderseite des Handys"
          />
        </motion.div>
      </div>

      <div className={Style["container_hero_text"]}>
        <p className={Style["hero_text"]}>
          Erlebe echte Motivation mit StepSync! Unsere Ziele und Challenges
          treiben dich an und zeigen deinen Fortschritt. Verfolge deine
          Verbesserungen genau und werde Teil einer engagierten Community. Kein
          leeres Gerede, sondern echte Fitnessziele – dokumentiere deinen Weg
          mit uns!
        </p>
      </div>
      <Button style={ButtonStyle.PRIMARY} label="Erfahre mehr" />
    </>
  );
}
