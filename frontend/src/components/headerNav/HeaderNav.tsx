import style  from "./HeaderNav.module.css";


const HeaderNavigationItem = ()=>{
    const headerItem =[
        {href: "/", label: "Home"},
        {href: "/about", label: "About"},
        {href: "/product", label: "Product"}
    ]
    return(
        headerItem.map((item, index)=>(
            <li key={index}>
                <a href={item.href}>{item.label}</a>
            </li>
        ))
    );
};
export defult function HeaderNav(){
    return(
            <div className={style["navWrapper"]}>
      <div className={style["logo"]}>
        <h2>STEP SYNC</h2>
      </div>
      <HeaderNavigationItem/>
    </div>
    );
}