"use client";

import { Container, Paper, Box } from "@mui/material";
import Typography from "@/components/typography/typography";

export default function Impressum() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" align="center">
            Impressum
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body1">
            StepSync GmbH
            <br />
            Bahnhofstrasse 10
            <br />
            8001 Zürich
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
