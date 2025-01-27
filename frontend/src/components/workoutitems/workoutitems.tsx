"use client";

import React, { useState, useEffect } from "react";

import { Fab, Modal, Box, Grid, Tabs, Tab, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { WorkoutData } from "@/types/interfaces/workoutData";
import { fetchWorkouts } from "@/utils/api";
import { WorkoutCard } from "../workoutCard/workoutCard";
import {
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "@/services/servicesWorkout";
import { useRouter } from "next/navigation";
import styles from "./workoutitems.module.css";

export default function WorkoutItems() {
  const { data: session } = useSession();
  const [savedWorkouts, setSavedWorkouts] = useState<WorkoutData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<WorkoutData | null>(
    null
  );
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const loadWorkouts = async () => {
      if (session?.accessToken) {
        const workoutsData = await fetchWorkouts(session.accessToken);
        setSavedWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
      }
    };
    loadWorkouts();
  }, [session]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWorkout(null);
  };

  const handleEdit = (workout: WorkoutData) => {
    setEditingWorkout(workout);
    setIsModalOpen(true);
  };

  const handleDelete = async (workoutId: number) => {
    try {
      await deleteWorkout(
        workoutId,
        session?.accessToken ?? undefined,
        router,
        () => {
          handleCloseModal();
          const loadWorkouts = async () => {
            if (session?.accessToken) {
              const workoutsData = await fetchWorkouts(session.accessToken);
              setSavedWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
            }
          };
          loadWorkouts();
        }
      );
    } catch (error) {
      console.error("Fehler beim Löschen des Workouts:", error);
    }
  };

  const handleSave = async (workoutData: WorkoutData) => {
    try {
      if (editingWorkout?.id) {
        const updatedWorkoutData = {
          ...workoutData,
          id: editingWorkout.id,
        };

        await updateWorkout(
          updatedWorkoutData,
          session?.accessToken ?? undefined,
          router,
          () => {
            setIsModalOpen(false);
            const loadWorkouts = async () => {
              if (session?.accessToken) {
                const workoutsData = await fetchWorkouts(session.accessToken);
                setSavedWorkouts(
                  Array.isArray(workoutsData) ? workoutsData : []
                );
              }
            };
            loadWorkouts();
          }
        );
      } else {
        await createWorkout(
          workoutData,
          session?.accessToken ?? undefined,
          router,
          () => {
            setIsModalOpen(false);
            const loadWorkouts = async () => {
              if (session?.accessToken) {
                const workoutsData = await fetchWorkouts(session.accessToken);
                setSavedWorkouts(
                  Array.isArray(workoutsData) ? workoutsData : []
                );
              }
            };
            loadWorkouts();
          }
        );
      }
    } catch (error) {
      console.error("Fehler beim Speichern des Workouts:", error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const filteredWorkouts = savedWorkouts.filter((workout) => {
    if (selectedTab === 0) return true;
    if (selectedTab === 1) return workout.category === "krafttraining";
    if (selectedTab === 2) return workout.category === "cardio";
    return true;
  });

  return (
    <>
      <Typography variant="h4" component="h1" className={styles.workoutHeader}>
        Workouts
      </Typography>

      <Box className={styles.tabsContainer}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="workout periods"
          className={styles.tabs}
          TabIndicatorProps={{
            className: styles.tabIndicator,
          }}
        >
          <Tab
            label="Alle"
            className={`${styles.tab} ${
              selectedTab === 0 ? styles.selected : ""
            }`}
          />
          <Tab
            label="Krafttraining"
            className={`${styles.tab} ${
              selectedTab === 1 ? styles.selected : ""
            }`}
          />
          <Tab
            label="Cardio"
            className={`${styles.tab} ${
              selectedTab === 2 ? styles.selected : ""
            }`}
          />
        </Tabs>
      </Box>

      <Grid container spacing={2}>
        {filteredWorkouts && filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout, index) => (
            <Grid item xs={12} key={workout.id || index}>
              <WorkoutCard
                variant="primary"
                initialData={workout}
                onEdit={() => handleEdit(workout)}
                onDelete={() => workout.id && handleDelete(workout.id)}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <p>Keine Workouts gefunden</p>
          </Grid>
        )}
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
      >
        <Fab
          color="primary"
          aria-label="add workout"
          onClick={handleOpenModal}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={styles.fabButton}
        >
          <FaPlus />
        </Fab>
      </motion.div>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="workout-modal"
        className={styles.modal}
      >
        <Box className={styles.modalContent}>
          <WorkoutCard
            variant="primary"
            initialData={
              editingWorkout || {
                category: "krafttraining",
                title: "",
                description: "",
                weight: 0,
                repetitions: 0,
              }
            }
            isEditing={true}
            onSave={handleSave}
          />
        </Box>
      </Modal>
    </>
  );
}
