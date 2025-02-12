"use client";

import {
  Container,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Typography from "@/components/typography/typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import usePrivacyStore from "@/store/privacyStore";
import styles from "./datenschutzitems.module.css";

function isStringContent(
  content: string | { title: string; text: string }[]
): content is string {
  return typeof content === "string";
}

export default function DatenschutzItems() {
  const { sections } = usePrivacyStore();

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Box className={styles.titleContainer}>
          <Typography variant="h2" align="center" color="white">
            Datenschutzerklärung
          </Typography>
        </Box>

        <Box className={styles.accordionContainer}>
          {sections.map((section) => (
            <Accordion
              key={section.id}
              defaultExpanded={section.id === "general"}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h4">{section.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Array.isArray(section.content) ? (
                  section.content.map((item, index) => (
                    <Box key={index} className={styles.contentItem}>
                      <Box className={styles.itemTitle}>
                        <Typography variant="h4">{item.title}</Typography>
                      </Box>
                      <Typography variant="body1">{item.text}</Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1">
                    {isStringContent(section.content)
                      ? section.content.split("\n").map((line, index, arr) => (
                          <span key={index}>
                            {line}
                            {index < arr.length - 1 && <br />}
                          </span>
                        ))
                      : section.content}
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}
