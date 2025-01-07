"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { fetchChallenges } from "@/utils/api";
import { Challenge } from "@/types/interfaces/challenges";
import { Fab, Modal, TextField, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import styles from "./challengesItems.module.css";
import { CreateChallenge } from "@/types/interfaces/challenges";
import { ChallengesCard } from "../challengersCard/challengesCard";

import { challengesSchema } from "@/validations/challenges-shema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createChallenge, updateChallenge } from "@/services/servicesChallenge";

const emptyChallenge: CreateChallenge = {
  title: "",
  description: "",
  goal: "",
};

export default function ChallengesItems() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChallenge, setNewChallenge] = useState<Challenge | CreateChallenge>(
    emptyChallenge
  );

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        if (!session?.accessToken) return;
        const challengesData = await fetchChallenges(session.accessToken);
        setChallenges(Array.isArray(challengesData) ? challengesData : []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ein Fehler ist aufgetreten"
        );
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, [session]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewChallenge(emptyChallenge);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (field: keyof CreateChallenge, value: string) => {
    setNewChallenge((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChallenge = async () => {
    if (!session?.accessToken) {
      console.log("Keine Authentifizierung vorhanden");
      return;
    }

    try {
      // Validiere die Eingaben mit dem Schema
      challengesSchema.parse(newChallenge);
      setValidationErrors({});

      if ("id" in newChallenge && newChallenge.id !== undefined) {
        // Wenn die Challenge eine ID hat, aktualisieren
        await updateChallenge(
          {
            id: newChallenge.id.toString(),
            title: newChallenge.title,
            description: newChallenge.description,
            goal: newChallenge.goal,
            status: newChallenge.status || "pending",
          },
          session.accessToken,
          router,
          () => {
            setIsModalOpen(false);
            // Aktualisiere die Challenge-Liste
            const loadChallenges = async () => {
              const challengesData = await fetchChallenges(
                session.accessToken!
              );
              setChallenges(
                Array.isArray(challengesData) ? challengesData : []
              );
            };
            loadChallenges();
          }
        );
      } else {
        // Wenn keine ID vorhanden ist, erstellen
        await createChallenge(
          {
            title: newChallenge.title,
            description: newChallenge.description,
            goal: newChallenge.goal,
            status: "pending",
          },
          session.accessToken,
          router,
          () => {
            setIsModalOpen(false);
            // Aktualisiere die Challenge-Liste
            const loadChallenges = async () => {
              const challengesData = await fetchChallenges(
                session.accessToken!
              );
              setChallenges(
                Array.isArray(challengesData) ? challengesData : []
              );
            };
            loadChallenges();
          }
        );
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setValidationErrors(errors);
      } else {
        console.error("Fehler beim Speichern der Challenge:", error);
      }
    }
  };

  const handleEditChallenge = (challenge: Challenge) => {
    setNewChallenge(challenge);
    setIsModalOpen(true);
  };

  if (loading) return <div>Lädt...</div>;
  if (error) return <div>Fehler: {error}</div>;

  return (
    <>
      <div className={styles.challengesContainer}>
        {challenges
          .filter((challenge) => challenge.status === "pending")
          .map((challenge) => (
            <ChallengesCard
              key={challenge.id}
              variant="primary"
              challenge={challenge}
              onEdit={() => handleEditChallenge(challenge)}
            />
          ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.fabButton}
      >
        <Fab
          color="primary"
          aria-label="add challenge"
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
            aria-labelledby="challenge-modal"
            closeAfterTransition
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.modalContent}>
                <h2>Challenge bearbeiten</h2>
                <TextField
                  label="Titel"
                  fullWidth
                  value={newChallenge.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  margin="normal"
                  error={!!validationErrors.title}
                />
                {validationErrors.title && (
                  <div className={styles.errorMessage}>
                    {validationErrors.title}
                  </div>
                )}
                <TextField
                  label="Beschreibung"
                  fullWidth
                  value={newChallenge.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  margin="normal"
                  error={!!validationErrors.description}
                />
                {validationErrors.description && (
                  <div className={styles.errorMessage}>
                    {validationErrors.description}
                  </div>
                )}
                <TextField
                  label="Ziel"
                  fullWidth
                  value={newChallenge.goal}
                  onChange={(e) => handleInputChange("goal", e.target.value)}
                  margin="normal"
                  error={!!validationErrors.goal}
                />
                {validationErrors.goal && (
                  <div className={styles.errorMessage}>
                    {validationErrors.goal}
                  </div>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveChallenge}
                >
                  Speichern
                </Button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
