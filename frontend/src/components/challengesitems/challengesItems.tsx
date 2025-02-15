"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Challenge } from "@/types/interfaces/challenges";
import { Modal, TextField, Typography, Tabs, Tab } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./challengesItems.module.css";
import { CreateChallenge } from "@/types/interfaces/challenges";
import { ChallengesCard } from "../challengersCard/challengesCard";
import { challengesSchema } from "@/validations/challenges-shema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createChallenge, updateChallenge } from "@/services/servicesChallenge";
import { useSnackbarStore } from "@/store/snackbarStore";
import { Button, ButtonStyle } from "../button/Button";
import { useChallenges } from "@/context/challenges-context-proivder";
import EmptyState from "../emptystate/emptystateComponent";

const emptyChallenge: CreateChallenge = {
  title: "",
  description: "",
};

export default function ChallengesItems() {
  const {
    challenges,
    loading,
    error,
    refreshChallenges,
    updateChallengeInState,
  } = useChallenges();

  const { data: session } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChallenge, setNewChallenge] = useState<Challenge | CreateChallenge>(
    emptyChallenge
  );
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});
  const [selectedTab, setSelectedTab] = useState(0);
  const { showSnackbar } = useSnackbarStore();

  useEffect(() => {
    refreshChallenges();
  }, [refreshChallenges]);

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
      challengesSchema.parse(newChallenge);
      setValidationErrors({});

      if ("id" in newChallenge && newChallenge.id !== undefined) {
        await updateChallenge(
          {
            id: newChallenge.id.toString(),
            title: newChallenge.title,
            description: newChallenge.description,
            status: newChallenge.status || "pending",
          },
          session.accessToken,
          router,
          () => {
            setIsModalOpen(false);
            updateChallengeInState(newChallenge as Challenge);

            if (newChallenge.status === "completed") {
              showSnackbar(
                "Challenge erfolgreich abgeschlossen! 🎉",
                "success"
              );
            } else if (newChallenge.status === "failed") {
              showSnackbar(
                "Challenge nicht geschafft. Beim nächsten Mal klappt es bestimmt! 💪",
                "info"
              );
            }
          }
        );
      } else {
        await createChallenge(
          {
            title: newChallenge.title,
            description: newChallenge.description,
            status: "pending",
          },
          session.accessToken,
          router,
          () => {
            setIsModalOpen(false);
            showSnackbar("Neue Challenge erstellt! 🎯", "success");
            refreshChallenges();
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
        showSnackbar("Bitte überprüfen Sie Ihre Eingaben", "error");
      } else {
        console.error("Fehler beim Speichern der Challenge:", error);
        showSnackbar("Fehler beim Speichern der Challenge", "error");
      }
    }
  };

  const handleEditChallenge = (challenge: Challenge) => {
    setNewChallenge(challenge);
    setIsModalOpen(true);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const getFilteredChallenges = () => {
    switch (selectedTab) {
      case 0:
        return challenges.filter((challenge) => challenge.status === "pending");
      case 1:
        return challenges.filter(
          (challenge) => challenge.status === "accepted"
        );
      default:
        return challenges;
    }
  };

  const renderContent = () => {
    if (loading) return <div>Lädt...</div>;
    if (error) return <div>Fehler: {error}</div>;

    if (getFilteredChallenges().length === 0) {
      return (
        <EmptyState
          title="Keine Challenges vorhanden"
          description={
            selectedTab === 0
              ? "Erstelle deine Persönliche Challenge und beginne deine Fitness-Reise!"
              : "Du hast noch keine laufenden Challenges. Nimm eine Challenge an und leg los!"
          }
          buttonText="Challenge erstellen"
          onButtonClick={handleOpenModal}
        />
      );
    }

    return (
      <div className={styles.challengesList}>
        {getFilteredChallenges().map((challenge) => (
          <div className={styles.challengeItem} key={challenge.id}>
            <ChallengesCard
              variant="primary"
              challenge={challenge}
              onEdit={() => handleEditChallenge(challenge)}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Typography component="h1" className={styles.challengeHeader}>
        Challenges
      </Typography>

      <div className={styles.tabsContainer}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="challenge periods"
          className={styles.tabs}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Offene Challenges"
            className={`${styles.tab} ${
              selectedTab === 0 ? styles.selected : ""
            }`}
          />
          <Tab
            label="Laufende Challenges"
            className={`${styles.tab} ${
              selectedTab === 1 ? styles.selected : ""
            }`}
          />
        </Tabs>

        <div className={styles.buttonContainer}>
          <Button
            label="Neue Challenge"
            onClick={handleOpenModal}
            style={ButtonStyle.PRIMARY_DARK}
          />
        </div>
      </div>

      {renderContent()}

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
                  className={styles.labeltextfield}
                  sx={{
                    "& .MuiFormLabel-root": {
                      color: "white",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiFormLabel-root.Mui-focused": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
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
                  className={styles.labeltextfield}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                />
                {validationErrors.description && (
                  <div className={styles.errorMessage}>
                    {validationErrors.description}
                  </div>
                )}
                <Button
                  label="Speichern"
                  style={ButtonStyle.PRIMARY_DARK}
                  onClick={handleSaveChallenge}
                />
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
