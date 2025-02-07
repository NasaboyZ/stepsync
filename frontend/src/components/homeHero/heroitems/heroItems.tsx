"use client";
import Style from "./heroItems.module.css";
import Image from "next/image";
import { Button, ButtonStyle } from "../../button/Button";
import { motion } from "framer-motion";

import Typography from "@/components/typography/typography";
import useHeroStore from "@/store/heroStore";

export default function HeroItems() {
  const { images, animations } = useHeroStore();

  return (
    <>
      <div className={Style["hero_wrapper"]}>
        <Typography variant="h1">Tracke deinen Erfolg</Typography>

        <Button
          label="Registrieren"
          style={ButtonStyle.SECONDARY}
          href="/registration"
        ></Button>

        <div className={Style["phones_container"]}>
          <motion.div
            className={Style["hero_image_bg_left"]}
            initial={animations.backLeft.initial}
            animate={animations.backLeft.animate}
            transition={{ duration: 0.5 }}
            layout
          >
            <Image
              className={Style["image"]}
              src={images.backLeft}
              alt="Man macht Deadlifting"
            />
          </motion.div>

          <motion.div
            className={Style["hero_image_front"]}
            initial={animations.front.initial}
            animate={animations.front.animate}
            transition={{ duration: 0.5 }}
            layout
          >
            <Image
              src={images.front}
              className={Style["image"]}
              alt="Hendy zeigt einen Futuristischen Man der in einer Laufban steht und sich Bereit mach loss zu rennen um die Olympischen Spiele zu gewinnen"
            />
          </motion.div>

          <motion.div
            className={Style["hero_image_bg_right"]}
            initial={animations.backRight.initial}
            animate={animations.backRight.animate}
            transition={{ duration: 0.5 }}
            layout
          >
            <Image
              className={Style["image"]}
              src={images.backRight}
              alt="Alter dicker man mit Rosa Legins joggt"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
