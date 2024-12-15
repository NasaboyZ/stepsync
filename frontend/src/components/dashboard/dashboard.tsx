"use client";

import { useState } from "react";
import styles from "./dashboard.module.css";
import {
  MdDashboard,
  MdLogout,
  MdDirectionsRun,
  MdEmojiEvents,
  MdMenu,
  MdPerson,
  MdEdit,
  MdSettings,
} from "react-icons/md";
import {
  Typography,
  IconButton,
  Tooltip,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ClickAwayListener,
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 24px",
              backgroundColor: "var(--brown-light)",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h6" sx={{ color: "var(--white)" }}>
                StepSync
              </Typography>
            </Box>

            <ClickAwayListener onClickAway={handleClickAway}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  padding: "4px 12px",
                  borderLeft: "2px solid var(--white)",
                  color: "var(--white)",
                  cursor: "pointer",
                }}
                onClick={handleClick}
              >
                <Avatar
                  src="/path-to-avatar.jpg"
                  alt="Profilbild"
                  sx={{ width: 32, height: 32 }}
                />
                <Typography>Max Mustermann</Typography>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={(e) => e.stopPropagation()}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      "& .MuiMenuItem-root": {
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                        gap: 1,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      /* Profilbild bearbeiten Logik */
                    }}
                  >
                    <ListItemIcon>
                      <MdPerson size={20} />
                    </ListItemIcon>
                    Profilbild bearbeiten
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      /* Persönliche Daten bearbeiten Logik */
                    }}
                  >
                    <ListItemIcon>
                      <MdEdit size={20} />
                    </ListItemIcon>
                    Persönliche Daten bearbeiten
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      /* Einstellungen Logik */
                    }}
                  >
                    <ListItemIcon>
                      <MdSettings size={20} />
                    </ListItemIcon>
                    Einstellungen
                  </MenuItem>
                </Menu>
              </Box>
            </ClickAwayListener>
          </Box>
          <DashboardGrafik />
        </motion.div>
      </Box>

      <div className={styles["burger-menu"]}>
        <IconButton onClick={toggleMenu} sx={{ color: "white" }}>
          <MdMenu size={24} />
        </IconButton>
      </div>

      <nav
        className={`${styles["main-menu"]} ${isMenuOpen ? styles.open : ""}`}
      >
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
