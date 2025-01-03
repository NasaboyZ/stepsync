"use client";

import React, { useState, useEffect } from "react";

import { Fab, Modal, Box, Grid } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { WorkoutData } from "@/types/interfaces/workoutData";
import { fetchWorkouts } from "@/utils/api";
import { WorkoutCard } from "../workoutCard/workoutCard";
import { createWorkout } from "@/services/servicesWorkout";
import { useRouter } from "next/navigation";

export default function WorkoutItems() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedWorkouts, setSavedWorkouts] = useState<WorkoutData[]>([]);
  const [editingWorkout, setEditingWorkout] = useState<WorkoutData | null>(
    null
  );
  const router = useRouter();
  //TODO:Validierung einfügen
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleEdit = (workout: WorkoutData) => {
    setEditingWorkout(workout);
    setIsModalOpen(true);
  };

  const handleDelete = async (workoutId: number) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ id: workoutId }),
      });

      if (!response.ok) {
        throw new Error(`Fehler beim Löschen des Workouts: ${response.status}`);
      }

      setSavedWorkouts(
        savedWorkouts.filter((workout) => workout.id !== workoutId)
      );
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  const handleSave = async (workoutData: WorkoutData) => {
    console.log("workoutData", workoutData);
    await createWorkout(
      workoutData,
      session?.accessToken ?? undefined,
      router,
      handleCloseModal
    );
  };

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        if (!session?.accessToken) return;
        const workoutsData = await fetchWorkouts(session.accessToken);
        setSavedWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        console.log("Geladene Workouts:", workoutsData);
      } catch (error) {
        console.error("Fehler beim Laden der Workouts:", error);
        setSavedWorkouts([]);
      }
    };

    if (session?.accessToken) {
      loadWorkouts();
    }
  }, [session]);

  return (
    <>
      <Grid container spacing={2}>
        {savedWorkouts && savedWorkouts.length > 0 ? (
          savedWorkouts.map((workout, index) => (
            <Grid item xs={12} sm={6} md={4} key={workout.id || index}>
              <WorkoutCard
                variant="primary"
                initialData={workout}
                readOnly={true}
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
        >
          <FaPlus />
        </Fab>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="workout-modal"
            aria-describedby="workout-card-modal"
            closeAfterTransition
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <WorkoutCard
                  variant="primary"
                  initialData={editingWorkout || undefined}
                  onSave={handleSave}
                  showSaveButton={true}
                />
              </Box>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
