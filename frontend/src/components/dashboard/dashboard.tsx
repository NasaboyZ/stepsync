"use client";

import { useState } from "react";
import styles from "./dashboard.module.css";
import {
  MdDashboard,
  MdLogout,
  MdDirectionsRun,
  MdEmojiEvents,
  MdMenu,
} from "react-icons/md";
import {
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import DashboardGrafik from "./dashboardGrafik";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.area}
        >
          <Box sx={{ flexGrow: 1, p: 2 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h4" component="h2">
                Dashboard
              </Typography>
            </Paper>
          </Box>
          <DashboardGrafik />
        </motion.div>
      </Box>

      <div className={styles["burger-menu"]}>
        <IconButton onClick={toggleMenu} sx={{ color: "white" }}>
          <MdMenu size={24} />
        </IconButton>
      </div>

      <nav className={`${styles["main-menu"]} ${isMenuOpen ? styles.open : ""}`}>
        <motion.ul variants={container} initial="hidden" animate="show">
          <motion.li variants={item}>
            <Tooltip title="Dashboard" placement="right">
              <a href="/dashboard">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <IconButton className={styles["nav-icon"]}>
                    <MdDashboard size={24} />
                  </IconButton>
                </motion.div>
                <span className={styles["nav-text"]}>Dashboard</span>
              </a>
            </Tooltip>
          </motion.li>

          <motion.li variants={item}>
            <Tooltip title="Workout" placement="right">
              <a href="/workout">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconButton className={styles["nav-icon"]}>
                    <MdDirectionsRun size={24} />
                  </IconButton>
                </motion.div>
                <span className={styles["nav-text"]}>Workout</span>
              </a>
            </Tooltip>
          </motion.li>

          <motion.li variants={item}>
            <Tooltip title="Gruppen Forum" placement="right">
              <a href="#">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconButton className={styles["nav-icon"]}>
                    <MdEmojiEvents size={24} />
                  </IconButton>
                </motion.div>
                <span className={styles["nav-text"]}>Challenges</span>
              </a>
            </Tooltip>
          </motion.li>
        </motion.ul>

        <motion.ul
          className={styles.logout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Tooltip title="Abmelden" placement="right">
              <a href="#">
                <IconButton className={styles["nav-icon"]}>
                  <MdLogout size={24} />
                </IconButton>
                <span className={styles["nav-text"]}>Abmelden</span>
              </a>
            </Tooltip>
          </motion.li>
        </motion.ul>
      </nav>
    </>
  );
}
