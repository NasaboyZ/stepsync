"use client";

import React, { useState, useEffect } from "react";
import { WorkoutCard } from "../Cards/cards";
import { Fab, Modal, Box, Grid } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useSession } from "next-auth/react";

export interface WorkoutData {
  id?: number;
  category: string;
  description: string;
  weight: number;
  repetitions: number;
  user_id?: number;
}

export default function WorkoutItems() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedWorkouts, setSavedWorkouts] = useState<WorkoutData[]>([]);
  const [editingWorkout, setEditingWorkout] = useState<WorkoutData | null>(
    null
  );

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveWorkout = async (workoutData: WorkoutData) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server Antwort:", {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        throw new Error(
          `Fehler beim Speichern des Workouts: ${response.status} ${response.statusText}`
        );
      }

      const savedWorkout = await response.json();
      setSavedWorkouts([...savedWorkouts, savedWorkout]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Detaillierter Fehler beim Speichern:", error);
      // Optional: Fügen Sie hier einen Toast oder eine andere UI-Benachrichtigung hinzu
      throw error; // Fehler weiterleiten, damit er in der Entwicklerkonsole sichtbar ist
    }
  };

  const handleEdit = (workout: WorkoutData) => {
    setEditingWorkout(workout);
    setIsModalOpen(true);
  };

  const handleUpdate = async (workoutData: WorkoutData) => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) {
        throw new Error(
          `Fehler beim Aktualisieren des Workouts: ${response.status}`
        );
      }

      const updatedWorkout = await response.json();
      setSavedWorkouts(
        savedWorkouts.map((workout) =>
          workout.id === updatedWorkout.workout.id
            ? updatedWorkout.workout
            : workout
        )
      );
      setIsModalOpen(false);
      setEditingWorkout(null);
    } catch (error) {
      console.error("Fehler beim Aktualisieren:", error);
    }
  };

  const handleSaveOrUpdate = (workoutData: WorkoutData) => {
    if (editingWorkout) {
      handleUpdate({ ...workoutData, id: editingWorkout.id });
    } else {
      handleSaveWorkout(workoutData);
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/workouts`;
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Fehler beim Laden der Workouts");
        }

        const data = await response.json();
        setSavedWorkouts(data.workouts || []);
      } catch (error) {
        console.error("Fehler beim Laden der Workouts:", error);
        setSavedWorkouts([]);
      }
    };

    if (session?.accessToken) {
      fetchWorkouts();
    }
  }, [session]);

  return (
    <>
      <Grid container spacing={2}>
        {savedWorkouts.map((workout, index) => (
          <Grid item xs={12} sm={6} md={4} key={workout.id || index}>
            <WorkoutCard
              variant="primary"
              initialData={workout}
              readOnly={true}
              onEdit={() => handleEdit(workout)}
              onDelete={() => {}} // TODO: Implement delete functionality
            />
          </Grid>
        ))}
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
                  maxWidth: "90%",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <WorkoutCard
                  variant="primary"
                  initialData={editingWorkout || undefined}
                  onSave={handleSaveOrUpdate}
                />
              </Box>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
