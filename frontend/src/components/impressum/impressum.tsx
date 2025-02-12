"use client";

import { Container, Paper, Box } from "@mui/material";
import Typography from "@/components/typography/typography";
import styles from "./impressum.module.css";

export default function Impressum() {
  return (
    <Container maxWidth="lg" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Box className={styles.titleContainer}>
          <Typography variant="h2" align="center" color="white">
            Impressum
          </Typography>
        </Box>

        <Box className={styles.contentContainer}>
          <Typography variant="body1" color="white">
            StepSync GmbH
            <br />
            Bahnhofstrasse 10
            <br />
            8001 Zürich
            <br />
            josef@step-sync.ch
            <br />
            Josef Leite
            <br />
            +41 79 999 99 99
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
