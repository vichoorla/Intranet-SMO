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
  const { consultas, createConsulta, updateConsulta, deleteConsulta } = useCrud()
  const [form, setForm] = useState(initialForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(initialForm)
    setEditingId(null)
    setMessage("")
    setMessageType(null)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Validaciones cliente
    const nombre = form.nombre?.trim() ?? ""
    const apellido = form.apellido?.trim() ?? ""
    const correo = form.correo?.trim() ?? ""
    const telefonoRaw = form.telefono?.trim() ?? ""
    const telefonoDigits = telefonoRaw.replace(/\D/g, "")

    if (nombre.length < 3) {
      setMessage("El nombre debe tener al menos 3 caracteres")
      setMessageType("error")
      setTimeout(() => { setMessage(""); setMessageType(null) }, 4000)
      return
    }

    if (apellido.length < 3) {
      setMessage("El apellido debe tener al menos 3 caracteres")
      setMessageType("error")
      setTimeout(() => { setMessage(""); setMessageType(null) }, 4000)
      return
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(correo)) {
      setMessage("Ingresa un correo electrónico válido")
      setMessageType("error")
      setTimeout(() => { setMessage(""); setMessageType(null) }, 4000)
      return
    }

    if (telefonoDigits.length < 7) {
      setMessage("El teléfono debe contener al menos 7 dígitos numéricos")
      setMessageType("error")
      setTimeout(() => { setMessage(""); setMessageType(null) }, 4000)
      return
    }
    if (editingId) {
      updateConsulta(editingId, form)
      setMessage("Consulta actualizada correctamente")
      setMessageType("success")
    } else {
      createConsulta(form)
      setMessage("Consulta guardada correctamente")
      setMessageType("success")
    }

    resetForm()
    setTimeout(() => { setMessage(""); setMessageType(null) }, 3000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Gestor de Consultas</h1>
        <p className={styles.userInfo}>Usuario: <strong>{auth?.user?.email ?? "invitado"}</strong></p>
      </div>

      <div className={styles.formSection}>
        <h2>Cotizacion</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <input className={styles.input} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
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
            <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>
              {editingId ? "Actualizar Consulta" : "Guardar Consulta"}
            </button>
            {editingId && (
              <button type="button" className={`${styles.button} ${styles.buttonSecondary}`} onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
          {message && (
            <div className={`${styles.message} ${messageType === "error" ? styles.messageError : styles.messageSuccess}`}>
              {message}
            </div>
          )}
        </form>
      </div>

      <div className={styles.listSection}>
        <h2>Consultas Registradas</h2>
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
                  <span>Correo: {consulta.correo}</span>
                  <span>Teléfono: {consulta.telefono}</span>
                  <span>Fecha: {consulta.fecha}</span>
                </div>
                <div className={styles.consultaMensaje}>{consulta.mensaje}</div>
                <div className={styles.consultaActions}>
                  <button type="button" className={styles.linkButton} onClick={() => {
                    setEditingId(consulta.id)
                    setForm({
                      nombre: consulta.nombre,
                      apellido: consulta.apellido,
                      correo: consulta.correo,
                      telefono: consulta.telefono,
                      mensaje: consulta.mensaje,
                      fecha: consulta.fecha,
                    })
                  }}>
                    Editar
                  </button>
                  <button type="button" onClick={() => {
                    deleteConsulta(consulta.id)
                    if (editingId === consulta.id) resetForm()
                  }} className={styles.linkButtonDanger}>
                    Eliminar
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
