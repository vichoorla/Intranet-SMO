"use client";

import { useState } from "react";
import styles from "./trabajos.module.css";
import { useCrud } from "@/app/context/CrudContext";

export default function TrabajosPage() {
    const {
        consultas,
        deleteConsulta,
        cambiarEstado,
        updateConsulta,
    } = useCrud();

    const [editandoId, setEditandoId] = useState<string | null>(null);

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        mensaje: "",
        fecha: "",
        precio: 0,
    });

    const pendientes = consultas.filter(
        (c) => c.estado === "Pendiente"
    ).length;

    const terminados = consultas.filter(
        (c) => c.estado === "Terminado"
    ).length;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Trabajos realizados</h1>
                <p>Administra las solicitudes de los clientes.</p>
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
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {consultas.map((consulta) => (
                            <>
                                <tr key={consulta.id}>
                                    <td>
                                        <strong>
                                            {consulta.nombre} {consulta.apellido}
                                        </strong>
                                    </td>
                                    <td>{consulta.correo}</td>
                                    <td>{consulta.telefono}</td>
                                    <td>{consulta.fecha}</td>
                                    <td>${consulta.precio > 0
                                        ? `${consulta.precio.toLocaleString("es-CL")}`
                                        : '-'
                                    }</td>
                                    <td>
                                        <span
                                            className={
                                                consulta.estado === "Pendiente"
                                                    ? styles.badgePendiente
                                                    : styles.badgeTerminado
                                            }
                                        >
                                            {consulta.estado}
                                        </span>
                                    </td>

                                    <td>
                                        <div className={styles.actions}>
                                            <button
                                                className={`${styles.button} ${styles.estado}`}
                                                onClick={() =>
                                                    cambiarEstado(consulta.id)
                                                }
                                            >
                                                Estado
                                            </button>

                                            <button
                                                className={`${styles.button} ${styles.editar}`}
                                                onClick={() => {
                                                    if (
                                                        editandoId === consulta.id
                                                    ) {
                                                        setEditandoId(null);
                                                        return;
                                                    }

                                                    setEditandoId(consulta.id);

                                                    setForm({
                                                        nombre: consulta.nombre,
                                                        apellido:
                                                            consulta.apellido,
                                                        correo: consulta.correo,
                                                        telefono:
                                                            consulta.telefono,
                                                        mensaje:
                                                            consulta.mensaje,
                                                        fecha: consulta.fecha,
                                                        precio:
                                                            consulta.precio,
                                                    });
                                                }}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className={`${styles.button} ${styles.eliminar}`}
                                                onClick={() =>
                                                    deleteConsulta(consulta.id)
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {editandoId === consulta.id && (
                                    <tr>
                                        <td colSpan={6}>
                                            <div className={styles.editor}>

                                                <h2>Editar trabajo</h2>

                                                <div className={styles.formGrid}>

                                                    <input
                                                        className={styles.input}
                                                        value={form.nombre}
                                                        placeholder="Nombre"
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                nombre:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />

                                                    <input
                                                        className={styles.input}
                                                        value={form.apellido}
                                                        placeholder="Apellido"
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                apellido:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />

                                                    <input
                                                        className={styles.input}
                                                        value={form.correo}
                                                        placeholder="Correo"
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                correo:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />

                                                    <input
                                                        className={styles.input}
                                                        value={form.telefono}
                                                        placeholder="Teléfono"
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                telefono:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />

                                                    <input
                                                        className={styles.input}
                                                        type="date"
                                                        value={form.fecha}
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                fecha:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />

                                                    <input
                                                        className={styles.input}
                                                        type="number"
                                                        placeholder="Precio"
                                                        value={form.precio}
                                                        onChange={(e) =>
                                                            setForm({
                                                                ...form,
                                                                precio: Number(
                                                                    e.target
                                                                        .value
                                                                ),
                                                            })
                                                        }
                                                    />
                                                </div>

                                                <label className={styles.label}>
                                                    Mensaje del cliente
                                                </label>

                                                <textarea
                                                    className={styles.textarea}
                                                    value={form.mensaje}
                                                    readOnly
                                                />

                                                <div
                                                    className={styles.actions}
                                                    style={{
                                                        marginTop: "20px",
                                                    }}
                                                >
                                                    <button
                                                        className={`${styles.button} ${styles.estado}`}
                                                        onClick={() => {
                                                            updateConsulta({
                                                                id: consulta.id,
                                                                estado:
                                                                    consulta.estado,
                                                                ...form,
                                                            });

                                                            setEditandoId(null);
                                                        }}
                                                    >
                                                        Guardar cambios
                                                    </button>

                                                    <button
                                                        className={`${styles.button} ${styles.eliminar}`}
                                                        onClick={() =>
                                                            setEditandoId(null)
                                                        }
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}