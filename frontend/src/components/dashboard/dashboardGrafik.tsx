import { Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function DashboardGrafik() {
  // Beispieldaten für den BMI-Verlauf
  const bmiData = [
    { datum: "01.01", bmi: 22.5 },
    { datum: "01.02", bmi: 23.1 },
    { datum: "01.03", bmi: 22.8 },
    { datum: "01.04", bmi: 22.3 },
    { datum: "01.05", bmi: 21.9 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ p: 2, m: 1 }}>
        <Box sx={{ width: "100%", height: 250 }}>
          <h2>BMI Verlauf</h2>
          <LineChart
            width={400}
            height={200}
            data={bmiData}
            margin={{
              top: 5,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="datum" />
            <YAxis domain={[18, 35]} /> {/* BMI Normalbereich */}
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="bmi"
              stroke="#8884d8"
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </Box>
      </Paper>
    </motion.div>
  );
}
