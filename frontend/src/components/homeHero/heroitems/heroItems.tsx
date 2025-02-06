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

        <motion.div
          className="box"
          whileHover={{ scale: [null, 1.5, 1.4] }}
          transition={{ duration: 0.3 }}
        >
          <Button
            label="Registrieren"
            style={ButtonStyle.SECONDARY}
            href="/registration"
          ></Button>
        </motion.div>

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
              alt="Hinten Links Bild"
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
              alt="Vorderseite des Handys"
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
              alt="Hinten Rechts Bild"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
