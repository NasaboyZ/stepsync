import { useChallengeStore } from "../../store/challengeStore";
import styles from "./challengeCounter.module.css";

export function OpenChallenges() {
  const openChallenges = useChallengeStore((state) => state.openChallenges);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Open challenges</h3>
      <p className={styles.count}>{openChallenges}</p>
    </div>
  );
}
