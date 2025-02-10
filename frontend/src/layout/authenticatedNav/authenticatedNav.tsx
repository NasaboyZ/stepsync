"use client";

import React from "react";
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

export default function AuthenticatedNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleLinkClick = () => {
    if (!isLargeScreen) {
      onClose();
    }
  };

  const navigationItems = [
    {
      icon: <DashboardIcon />,
      text: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <WorkoutIcon />,
      text: "Workout",
      href: "/workout",
    },
    {
      icon: <ChallengesIcon />,
      text: "Challenges",
      href: "/challenges",
    },
  ];

  return (
    <div className={styles.container}>
      {isLargeScreen ? (
        <aside className={styles.permanentDrawer}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          <List>
            {navigationItems.map((item) => (
              <ListItem
                key={item.href}
                className={styles.listItem}
                component={Link}
                href={item.href}
                onClick={handleLinkClick}
              >
                <ListItemIcon className={styles.listItemIcon}>
                  {item.icon}
                </ListItemIcon>
                <span className={styles.listItemText}>{item.text}</span>
              </ListItem>
            ))}
          </List>
        </aside>
      ) : (
        <Drawer open={isOpen} onClose={onClose} className={styles.mobileDrawer}>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          <List>
            {navigationItems.map((item) => (
              <ListItem
                key={item.href}
                className={styles.listItem}
                component={Link}
                href={item.href}
                onClick={handleLinkClick}
              >
                <ListItemIcon className={styles.listItemIcon}>
                  {item.icon}
                </ListItemIcon>
                <span className={styles.listItemText}>{item.text}</span>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </div>
  );
}
