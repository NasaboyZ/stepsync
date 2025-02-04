"use client";


import React, { useState } from "react";
import Link from "next/link";
import {

  Drawer,
  List,
  ListItem,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  MdOutlineSpaceDashboard as DashboardIcon,
  MdFitnessCenter as WorkoutIcon,
  MdEmojiEvents as ChallengesIcon,

} from "react-icons/md";

import styles from "./authenticated.module.css";
import Logo from "@/components/logo/logo";

export default function AuthenticatedNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };



  return (
    <div className={styles.container}>
      {isLargeScreen ? (
        <aside className={styles.permanentDrawer}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          <List>
            <ListItem className={styles.listItem}>
              <ListItemIcon className={styles.listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <Link href="/dashboard" className={styles.listItemText}>
                Dashboard
              </Link>
            </ListItem>
            <ListItem className={styles.listItem}>
              <ListItemIcon className={styles.listItemIcon}>
                <WorkoutIcon />
              </ListItemIcon>
              <Link href="/workout" className={styles.listItemText}>
                Workout
              </Link>
            </ListItem>
            <ListItem className={styles.listItem}>
              <ListItemIcon className={styles.listItemIcon}>
                <ChallengesIcon />
              </ListItemIcon>
              <Link href="/challenges" className={styles.listItemText}>
                Challenges
              </Link>
            </ListItem>

            
          </List>
        </aside>
      ) : (
        <Drawer open={drawerOpen} onClose={toggleDrawer}></Drawer>
      )}
    </div>
  );
}
