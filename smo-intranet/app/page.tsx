import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>CRUD de Consultas de Clientes</h1>
          <p>Gestiona las consultas que envían tus clientes con nombre, apellido, correo, teléfono, mensaje y fecha.</p>
          <Link href="/consultas" className={styles.primary}>
            Ir a Consultas
          </Link>
        </div>
      </main>
    </div>
  );
}
