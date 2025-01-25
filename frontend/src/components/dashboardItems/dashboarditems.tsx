import DashboardBmi from "../bmiCard/dashboardBmi";
import ChallengeCounter from "../challengCounter/challengeCounter";
import DashboardCards from "../dashboardCards/dashboardCards";
import ProfileBioCard from "../profileBioCard/profileBioCard";
import WorkoutChart from "../workoutChart/workoutchart";

export default function DashboardItems() {
  return (
    <>
      <ChallengeCounter />
      <WorkoutChart />
      <DashboardBmi />
      <DashboardCards />
      <ProfileBioCard />
    </>
  );
}
