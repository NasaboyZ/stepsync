import { useEffect, useState } from "react";
import { ChallengeCard } from "../Cards/cards";
import { useSession } from "next-auth/react";

interface Challenge {
  id: number;
  title: string;
  description: string;
  goal: string;
  status: boolean;
  start_date: string;
  end_date: string;
}

export default function ChallengesItems() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/challenges`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Fehler beim Laden der Challenges: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        const challengesData = data.challenges || data;
        setChallenges(Array.isArray(challengesData) ? challengesData : []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ein Fehler ist aufgetreten"
        );
      } finally {
        setLoading(false);
      }
    };

    if (session?.accessToken) {
      fetchChallenges();
    }
  }, [session]);

  if (loading) return <div>Lädt...</div>;
  if (error) return <div>Fehler: {error}</div>;

  return (
    <>
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          variant="secondary"
          challenge={challenge}
        />
      ))}
    </>
  );
}
