"use client"

import { useEffect, useState } from "react"

export type Trabajo = {
  id: string
  nombreTrabajo: string
  fecha: string
  cliente: string
  descripcion: string
  tipo: string
  precio: string
}

const STORAGE_KEY = "trabajos-realizados"

export function useCrudTrabajos() {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      setTrabajos(JSON.parse(raw))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trabajos))
  }, [trabajos])

  const createTrabajo = (data: Omit<Trabajo, "id">) => {
    setTrabajos((prev) => [{ id: Date.now().toString(), ...data }, ...prev])
  }

  const updateTrabajo = (id: string, data: Omit<Trabajo, "id">) => {
    setTrabajos((prev) =>
      prev.map((trabajo) => (trabajo.id === id ? { ...trabajo, ...data } : trabajo))
    )
  }

  const deleteTrabajo = (id: string) => {
    setTrabajos((prev) => prev.filter((trabajo) => trabajo.id !== id))
  }

  const getTrabajoById = (id: string | undefined) => {
    return trabajos.find((trabajo) => trabajo.id === id)
  }

  return {
    trabajos,
    createTrabajo,
    updateTrabajo,
    deleteTrabajo,
    getTrabajoById,
  }
}