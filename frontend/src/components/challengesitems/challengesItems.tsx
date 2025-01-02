"use client";

import { useEffect, useState } from "react";
import { ChallengeCard } from "../Cards/cards";
import { useSession } from "next-auth/react";
import { fetchChallenges } from "@/utils/api";
import { Challenge } from "@/types/challenges";

export default function ChallengesItems() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

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

  if (loading) return <div>Lädt...</div>;
  if (error) return <div>Fehler: {error}</div>;

  return (
    <>
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          variant="primary"
          challenge={challenge}
        />
      ))}
    </>
  );
}
