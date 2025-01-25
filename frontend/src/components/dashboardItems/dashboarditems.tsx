import DashboardBmi from "../bmiCard/dashboardBmi";
import DashboardCards from "../dashboardCards/dashboardCards";
import ProfileBioCard from "../profileBioCard/profileBioCard";
import WorkoutChart from "../workoutChart/workoutchart";

export default function DashboardItems() {
  return (
    <>
      <WorkoutChart />
      <DashboardBmi />
      <DashboardCards />
      <ProfileBioCard />
    </>
  );
}
