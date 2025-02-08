"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Skeleton,
  Button,
} from "@mui/material";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import styles from "./profileBioCard.module.css";
import { UserProfile } from "@/types/interfaces/userProfile";
import { fetchUserData } from "@/utils/api";

export default function ProfileBioCard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchUserProfile() {
      if (session?.accessToken) {
        try {
          const profileData = await fetchUserData(session.accessToken);
          setUserProfile(profileData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    }

    fetchUserProfile();
  }, [session]);

  if (!userProfile) {
    // Skeleton Loader grund Gerüst
    return (
      <Card className={styles.bioCard}>
        <CardContent>
          <div className={styles.cardContent}>
            <div className={styles.avatarSection}>
              <Skeleton variant="circular" width={80} height={80} />
            </div>

            <div className={styles.infoSection}>
              <Skeleton variant="text" width="100%" height={30} />

              <Grid container spacing={2}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <Skeleton variant="text" width="80%" height={20} />
                    </Grid>
                    <Grid item xs={6}>
                      <Skeleton variant="text" width="60%" height={20} />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={styles.bioCard}>
        <CardContent>
          <div className={styles.cardContent}>
            <div className={styles.headerSection}>
              <div className={styles.leftSection}>
                <div className={styles.avatarSection}>
                  <Avatar
                    className={styles.avatar}
                    src={userProfile?.avatar?.url}
                  >
                    {userProfile?.username
                      ? userProfile.username[0].toUpperCase()
                      : "?"}
                  </Avatar>
                </div>
                <div className={styles.headerInfo}>
                  <Typography variant="h5" className={styles.username}>
                    {userProfile.username}
                  </Typography>
                  <Typography variant="body2" className={styles.statsInfo}>
                    {userProfile.age} Jahre{" "}
                    <span className={styles.divider}>|</span>
                    {userProfile.workouts} Workouts diesen Monat
                  </Typography>
                  <Typography variant="body2" className={styles.physicalInfo}>
                    {userProfile.height && `${userProfile.height}cm`}{" "}
                    <span className={styles.divider}>|</span>
                    {userProfile.weight && `${userProfile.weight}kg`}{" "}
                    <span className={styles.divider}>|</span>
                    {userProfile.goal}
                  </Typography>
                  <Typography variant="caption" className={styles.memberSince}>
                    Mitglied seit {userProfile.memberSince}
                  </Typography>
                </div>
              </div>
              <Button
                variant="contained"
                color="primary"
                className={styles.editButton}
                onClick={() => {
                  /* TODO: Implement edit functionality */
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
