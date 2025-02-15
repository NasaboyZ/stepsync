import Logo from "@/components/logo/logo";
import Style from "./headerNav.module.css";
import NavigationItem from "../navigationItems/navigationItems";
import { Button, ButtonStyle } from "@/components/button/Button";
import { useSession } from "next-auth/react";
interface NavigationItemProps {
  items: { href: string; label: string }[];
}
export default function HeaderNav({ items }: NavigationItemProps) {
  const { status } = useSession();
  return (
    <div className={Style["contentwrapper"]}>
      <div className={Style["navWrapper"]}>
        <div className={Style["logo"]}>
          <Logo />
        </div>
        <NavigationItem items={items} />
      </div>
      <div className={Style["loginButton"]}>
        {status === "loading" ? null : status === "unauthenticated" ? (
          <Button label="Anmelden" style={ButtonStyle.PRIMARY} href="/login" />
        ) : (
          <Button
            label="Dashboard"
            style={ButtonStyle.PRIMARY}
            href="/dashboard"
          />
        )}
      </div>
    </div>
  );
}
