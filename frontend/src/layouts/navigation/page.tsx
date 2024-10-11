import styles from './layout-navbar.modules.css';

export default function NavigationBar() {

    
    return (
        <nav className={styles["nav"]}>
            <ul className={styles["ul"]}>
                <li><a href="#">home</a></li>
                <li><a href="#">about</a></li>
                <li><a href="#">product</a></li>
            </ul>

            <div>
                <li><a href="#">login</a></li>
                <li><a href="#">regristration</a></li>
            </div>
        </nav>
    );
}
