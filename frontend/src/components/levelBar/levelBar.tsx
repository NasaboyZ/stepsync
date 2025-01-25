import { Box, LinearProgress, Typography } from "@mui/material";
import styles from "./levelBar.module.css";

interface LevelBarProps {
  level: number;
  currentXP: number;
  requiredXP: number;
}

export default function LevelBar({
  level,
  currentXP,
  requiredXP,
}: LevelBarProps) {
  const progress = (currentXP / requiredXP) * 100;

  return (
    <Box className={styles.levelBarContainer}>
      <Box className={styles.levelBarHeader}>
        <Typography variant="body1" fontWeight="bold">
          Level {level}
        </Typography>
        <Typography variant="body2">{currentXP} XP</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        className={styles.progressBar}
      />
      <Typography variant="body2" className={styles.requiredXP}>
        {requiredXP} XP
      </Typography>
    </Box>
  );
}
