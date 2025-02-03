"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useChallengeStore } from "@/store/challengeStore";
import { CompletedChallenges } from "./completedChallenges";
import { OpenChallenges } from "./openChallenges";
import { TotalChallenges } from "./totalChallenges";
import { PassedChallenges } from "./passedChallenges";

import styles from "./challengeCounter.module.css";

export default function ChallengeCounter() {
  const { data: session } = useSession();
  const fetchChallengeStats = useChallengeStore(
    (state) => state.fetchChallengeStats
  );

  useEffect(() => {
    if (session?.accessToken) {
      fetchChallengeStats(session.accessToken);
    }
  }, [session, fetchChallengeStats]);

  return (
    <div className={styles.container}>
      <CompletedChallenges />
      <OpenChallenges />
      <TotalChallenges />
      <PassedChallenges />
    </div>
  );
}
