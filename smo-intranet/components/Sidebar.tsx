"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import styles from "./Sidebar.module.css";


export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    
    // Si no hay sesión o estamos en el login, no mostrar el menú
    if (!user || pathname === "/login") {
        return null;
    }

    return (
        <aside className={styles.sidebar}>
            <h2>Intranet SMO</h2>

            <Link
                className={pathname === "/consultas" ? styles.active : ""}
                href="/consultas"
            >
                📋 Consultas
            </Link>

            <Link
                className={pathname === "/trabajos" ? styles.active : ""}
                href="/trabajos"
            >
                🛠 Trabajos realizados
            </Link>

            <button
                className={styles.logout}
                onClick={async () => {
                    await logout();
                }}
            >
                🚪 Cerrar sesión
            </button>
        </aside>
    );
}