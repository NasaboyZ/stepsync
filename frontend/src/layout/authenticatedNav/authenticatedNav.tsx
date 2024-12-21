"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  AiOutlineMenu as MenuIcon,
  AiFillHome as HomeIcon,
  AiFillDashboard as DashboardIcon,
  AiOutlineLogout as ExitToAppIcon,
} from "react-icons/ai";
import styles from "./authenticated.module.css";
import DashboardItems from "@/components/dashboardItems/dashboarditems";
import WorkoutItems from "@/components/workoutitems/workoutitems";
import ChallengesItems from "@/components/challengesitems/challengesItems";

export default function AuthenticatedNav() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderContent = () => {
    switch (pathname) {
      case "/dashboard":
        return <DashboardItems />;
      case "/workout":
        return <WorkoutItems />;
      case "/challenges":
        return <ChallengesItems />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {isLargeScreen ? (
        <aside className={styles.permanentDrawer}>
          <List>
            <ListItem className={styles.listItem}>
              <ListItemIcon className={styles.listItemIcon}>
                <HomeIcon />
              </ListItemIcon>
              <Link href="/dashboard" className={styles.listItemText}>
                Dashboard
              </Link>
            </ListItem>
            <ListItem className={styles.listItem}>
              <ListItemIcon className={styles.listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <Link href="/workout" className={styles.listItemText}>
                Workout
              </Link>
            </ListItem>
            <ListItem className={styles.listItem}>
              <ListItemIcon className={styles.listItemIcon}>
                <ExitToAppIcon />
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
      <main className={styles.mainContent}>
        <AppBar position="static" className={styles.appBar}>
          <Toolbar>
            {!isLargeScreen && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleDrawer}
                className={styles.menuButton}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" className={styles.title}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={styles.content}>{renderContent()}</div>
      </main>
    </div>
  );
}
