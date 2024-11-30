import Link from "next/link";
import Style from "./navigationItems.module.css";

interface NavigationItemProps {
  items: { href: string; label: string }[];
}

export default function NavigationItem({ items }: NavigationItemProps) {
  return (
    <ul className={Style["navItem_ul"]}>
      {items.map((item, index) => (
        <li className={Style["navItem_li"]} key={index}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}
