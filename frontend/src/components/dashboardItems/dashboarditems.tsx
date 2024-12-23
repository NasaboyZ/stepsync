import DashboardBmi from "../bmiCard/dashboardBmi";
import DashboardCards from "../dashboardCards/dashboardCards";
import ProfileBioCard from "../profileBioCard/profileBioCard";

export default function DashboardItems() {
  return (
    <>
      <DashboardBmi />
      <DashboardCards />
      <ProfileBioCard />
    </>
  );
}
