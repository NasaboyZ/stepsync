import React from "react";
import { FaRunning } from "react-icons/fa";
import { Button, ButtonStyle } from "../button/Button";

import styles from "./emptystateCompomemt.module.css";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Lass uns loslegen!",
  description = "Starte deine Fitness Reise, indem du deine erste Workout erstellst.",
  buttonText = "Workout erstellen",
  onButtonClick = () => {},
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <FaRunning className={styles.icon} />
        </div>

        <div className={styles.textContainer}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <Button
            label={buttonText}
            onClick={onButtonClick}
            style={ButtonStyle.PRIMARY_DARK}
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
