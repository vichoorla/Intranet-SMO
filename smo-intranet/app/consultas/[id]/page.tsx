"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useAuth } from "@/app/context/AuthContext"
import { useCrud } from "@/hooks/useCrud"
import styles from "../consultas.module.css"

const initialForm = {
  nombre: "",
  apellido: "",
  correo: "",
  telefono: "",
  mensaje: "",
  fecha: "",
}

export default function ConsultaDetallePage() {
  const auth = useAuth()
  const params = useParams()
  const consultaId = params?.id
  const { getConsultaById, updateConsulta, deleteConsulta } = useCrud()
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState("")
  const [deleted, setDeleted] = useState(false)

  const consulta = getConsultaById(consultaId)

  useEffect(() => {
    if (consulta) {
      setForm(consulta)
    }
  }, [consulta])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!consultaId) return
    updateConsulta(consultaId, form)
    setMessage("Consulta actualizada correctamente")
    setTimeout(() => setMessage(""), 3000)
  }

  const handleDelete = () => {
    if (!consultaId) return
    deleteConsulta(consultaId)
    setDeleted(true)
  }

  if (deleted) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>✅ Consulta Eliminada</h1>
          <p className={styles.userInfo}>La consulta ha sido eliminada exitosamente</p>
        </div>
        <div className={styles.formSection}>
          <Link href="/consultas" className={styles.link}>
            ← Volver a la lista de consultas
          </Link>
        </div>
      </div>
    )
  }

  if (!consultaId || !consulta) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>⚠️ Consulta No Encontrada</h1>
        </div>
        <div className={styles.formSection}>
          <Link href="/consultas" className={styles.link}>
            ← Volver a la lista
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>✏️ Editar Consulta</h1>
        <p className={styles.userInfo}>Usuario: <strong>{auth?.user?.email ?? "invitado"}</strong></p>
      </div>

      <div className={styles.formSection}>
        <form onSubmit={handleUpdate} className={styles.form}>
          <div className={styles.formGroup}>
            <input className={styles.input} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
          </div>
          <div className={styles.formGroup}>
            <input className={styles.input} name="apellido" value={form.apellido} onChange={handleChange} placeholder="Apellido" required />
          </div>
          <div className={styles.formGroup}>
            <input className={styles.input} name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="Correo" required />
          </div>
          <div className={styles.formGroup}>
            <input className={styles.input} name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" required />
          </div>
          <div className={styles.formGroup}>
            <textarea className={styles.textarea} name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Mensaje" required />
          </div>
          <div className={styles.formGroup}>
            <input className={styles.input} name="fecha" type="date" value={form.fecha} onChange={handleChange} required />
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>💾 Guardar Cambios</button>
            <button type="button" onClick={handleDelete} className={`${styles.button} ${styles.buttonDanger}`}>
              🗑️ Eliminar
            </button>
          </div>
          {message && <div className={`${styles.message} ${styles.messageSuccess}`}>{message}</div>}
        </form>
      </div>

      <div className={styles.backSection}>
        <Link href="/consultas" className={styles.link}>
          ← Volver a la lista de consultas
        </Link>
      </div>
    </div>
  )
}
