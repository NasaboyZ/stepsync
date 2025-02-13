import Link from "next/link";
import Style from "./navigationItems.module.css";
import { usePathname } from "next/navigation";

interface NavigationItemProps {
  items: { href: string; label: string }[];
}

export default function NavigationItem({ items }: NavigationItemProps) {
  const pathname = usePathname();

  return (
    <ul className={Style["navItem_ul"]}>
      {items.map((item, index) => (
        <li className={Style["navItem_li"]} key={index}>
          <Link
            href={item.href}
            className={pathname === item.href ? Style["active"] : ""}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
