import style from "./HeaderNav.module.css";
import Logo from "../logo/logo";

const HeaderNavigationItem = () => {
  const headerItem = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/product", label: "Product" },
  ];
  return headerItem.map((item, index) => (
    <li key={index}>
      <a href={item.href}>{item.label}</a>
    </li>
  ));
};
export default function HeaderNav() {
  return (
    <div className={style["navWrapper"]}>
      <Logo />
      <div className={style["logo"]}>
        <h2>STEP SYNC</h2>
      </div>
      <HeaderNavigationItem />
    </div>
  );
}
