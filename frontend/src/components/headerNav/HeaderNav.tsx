import Style from "./HeaderNav.module.css";
import Logo from "../logo/logo";
import NavigationItem from "../navigationItems/navigationItems";

interface NavigationItemProps {
  items: { href: string; label: string }[];
}
export default function HeaderNav({ items }: NavigationItemProps) {
  return (
    <div className={Style["navWrapper"]}>
      <div className={Style["logo"]}>
        <Logo />
      </div>
      <NavigationItem items={items} />
    </div>
  );
}
