"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/app/context/AuthContext"
import { useCrud } from "@/hooks/useCrud"
import styles from "./consultas.module.css"

const initialForm = {
  nombre: "",
  apellido: "",
  correo: "",
  telefono: "",
  mensaje: "",
  fecha: "",
}

export default function ConsultasPage() {
  const auth = useAuth()
  const { consultas, createConsulta, deleteConsulta } = useCrud()
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createConsulta(form)
    setForm(initialForm)
    setMessage("Consulta guardada correctamente")
    setTimeout(() => setMessage(""), 3000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>📋 Gestión de Consultas</h1>
        <p className={styles.userInfo}>Usuario: <strong>{auth?.user?.email ?? "invitado"}</strong></p>
      </div>

      <div className={styles.formSection}>
        <h2>➕ Nueva Consulta</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <input className={styles.input} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre completo" required />
          </div>
          <div className={styles.formGroup}>
            <input className={styles.input} name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" required />
          </div>
          <div className={styles.formGroup}>
            <input className={styles.input} name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="Correo electrónico" required />
          </div>
          <div className={styles.formGroup}>
            <input className={styles.input} name="telefono" value={form.telefono} onChange={handleChange} placeholder="Número de teléfono" required />
          </div>
          <div className={styles.formGroup}>
            <textarea className={styles.textarea} name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Tu mensaje aquí..." required />
          </div>
          <div className={styles.formGroup}>
            <input className={styles.input} name="fecha" type="date" value={form.fecha} onChange={handleChange} required />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>Guardar Consulta</button>
          </div>
          {message && <div className={`${styles.message} ${styles.messageSuccess}`}>{message}</div>}
        </form>
      </div>

      <div className={styles.listSection}>
        <h2>📌 Consultas Registradas</h2>
        {consultas.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No hay consultas registradas aún</p>
          </div>
        ) : (
          <ul className={styles.consultasList}>
            {consultas.map((consulta) => (
              <li key={consulta.id} className={styles.consultaCard}>
                <div className={styles.consultaName}>{consulta.nombre} {consulta.apellido}</div>
                <div className={styles.consultaMeta}>
                  <span><span className={styles.metaIcon}>✉️</span> {consulta.correo}</span>
                  <span><span className={styles.metaIcon}>📞</span> {consulta.telefono}</span>
                  <span><span className={styles.metaIcon}>📅</span> {consulta.fecha}</span>
                </div>
                <div className={styles.consultaMensaje}>{consulta.mensaje}</div>
                <div className={styles.consultaActions}>
                  <Link href={`/consultas/${consulta.id}`} className={styles.linkButton}>
                    ✏️ Editar
                  </Link>
                  <button type="button" onClick={() => deleteConsulta(consulta.id)} className={styles.linkButtonDanger}>
                    🗑️ Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
