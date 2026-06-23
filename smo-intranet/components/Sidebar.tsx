"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

export default function Sidebar() {

    const pathname = usePathname();

    return (

        <aside className={styles.sidebar}>

            <h2>Intranet SMO</h2>

            <Link
                className={pathname === "/consultas" ? styles.active : ""}
                href="/consultas">

                📋 Consultas

            </Link>

            <Link
                className={pathname === "/trabajos" ? styles.active : ""}
                href="/trabajos">

                🛠 Trabajos realizados

            </Link>

        </aside>

    );

}