import Logo from "@/components/logo/Logo";
import Style from "./headerNav.module.css";
import NavigationItem from "../navigationItems/NavigationItems";
import SwitchLoginComponent from "@/components/switchlogin/switchlogincomponents";

interface NavigationItemProps {
  items: { href: string; label: string }[];
}
export default function HeaderNav({ items }: NavigationItemProps) {
  return (
    <div className={Style["contentwrapper"]}>
      <div className={Style["navWrapper"]}>
        <div className={Style["logo"]}>
          <Logo />
        </div>
        <NavigationItem items={items} />
      </div>
      <SwitchLoginComponent />
    </div>
  );
}
