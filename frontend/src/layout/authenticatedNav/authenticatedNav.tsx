"use client";

import { signOut } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  MdOutlineSpaceDashboard as DashboardIcon,
  MdFitnessCenter as WorkoutIcon,
  MdEmojiEvents as ChallengesIcon,
  MdLogout as LogoutIcon,
} from "react-icons/md";

import styles from "./authenticated.module.css";
import { UserProfile } from "@/types/interfaces/userProfile";
import { fetchUserData } from "@/utils/api";

export default function AuthenticatedNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUserData(token)
        .then((userData) => setUser(userData))
        .catch((error) =>
          console.error("Fehler beim Laden der Benutzerdaten:", error)
        );
    }
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className={styles.container}>
      {isLargeScreen ? (
        <aside className={styles.permanentDrawer}>
          {user?.avatar && (
            <div className={styles.avatarContainer}>
              <Avatar
                src={user.avatar.url}
                alt={user.username}
                className={styles.avatar}
              />
            </div>
          )}
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

            <ListItem onClick={handleSignOut} className={styles.listItem}>
              <ListItemIcon className={styles.listItemIcon}>
                <LogoutIcon />
              </ListItemIcon>
              <Typography className={styles.listItemText}>Logout</Typography>
            </ListItem>
          </List>
        </aside>
      ) : (
        <Drawer open={drawerOpen} onClose={toggleDrawer}></Drawer>
      )}
    </div>
  );
}
