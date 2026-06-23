"use client";

import Link from "next/link";
import styles from "./trabajos.module.css";
import { useCrud } from "@/app/context/CrudContext";

export default function TrabajosPage() {
    const {
        consultas,
        deleteConsulta,
        cambiarEstado
    } = useCrud();
    const pendientes = consultas.filter(c => c.estado === "Pendiente").length;
    const terminados = consultas.filter(c => c.estado === "Terminado").length;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Trabajos realizados</h1>
                <p>
                    Administra las solicitudes de los clientes.
                </p>
            </div>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <h3>Total consultas</h3>
                    <span>{consultas.length}</span>
                </div>
                <div className={styles.card}>
                    <h3>Pendientes</h3>
                    <span>{pendientes}</span>
                </div>
                <div className={styles.card}>
                    <h3>Terminadas</h3>
                    <span>{terminados}</span>
                </div>
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {consultas.map((consulta)=>(
                            <tr key={consulta.id}>
                                <td>
                                    <strong>
                                        {consulta.nombre} {consulta.apellido}
                                    </strong>
                                </td>
                                <td>
                                    {consulta.correo}
                                </td>
                                <td>
                                    {consulta.telefono}
                                </td>
                                <td>
                                    {consulta.fecha}
                                </td>
                                <td>
                                    <span
                                        className={
                                            consulta.estado==="Pendiente"
                                            ?
                                            styles.badgePendiente
                                            :
                                            styles.badgeTerminado
                                        }
                                    >
                                        {consulta.estado}
                                    </span>
                                </td>

                                <td>
                                    <div className={styles.actions}>
                                        <button
                                            className={`${styles.button} ${styles.estado}`}
                                            onClick={()=>cambiarEstado(consulta.id)}
                                        >
                                            Estado
                                        </button>
                                        <Link
                                            href={`/trabajos/${consulta.id}`}
                                            className={`${styles.button} ${styles.editar}`}
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            className={`${styles.button} ${styles.eliminar}`}
                                            onClick={()=>deleteConsulta(consulta.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}