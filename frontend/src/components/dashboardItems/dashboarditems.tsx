import DashboardBmi from "../bmiCard/dashboardBmi";
import ChallengeCounter from "../challengCounter/challengeCounter";

import ProfileBioCard from "../profileBioCard/profileBioCard";
import WorkoutChart from "../workoutChart/workoutchart";
import styles from "./dashboaritems.module.css";

export default function DashboardItems() {
  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.challengeCounterArea}>
        <ChallengeCounter />
      </div>
      <div className={styles.workoutChartArea}>
        <WorkoutChart />
      </div>
      <div className={styles.bmiArea}>
        <DashboardBmi />
      </div>
      <div className={styles.profileArea}>
        <ProfileBioCard />
      </div>
    </div>
  );
}
