"use client"

import { useEffect, useState } from "react"

export type Consulta = {
  id: string
  nombre: string
  apellido: string
  correo: string
  telefono: string
  mensaje: string
  fecha: string
}

const STORAGE_KEY = "consultas-clientes"

export function useCrud() {
  const [consultas, setConsultas] = useState<Consulta[]>([])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      setConsultas(JSON.parse(raw))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consultas))
  }, [consultas])

  const createConsulta = (data: Omit<Consulta, "id">) => {
    setConsultas((prev) => [{ id: Date.now().toString(), ...data }, ...prev])
  }

  const updateConsulta = (id: string, data: Omit<Consulta, "id">) => {
    setConsultas((prev) =>
      prev.map((consulta) => (consulta.id === id ? { ...consulta, ...data } : consulta))
    )
  }

  const deleteConsulta = (id: string) => {
    setConsultas((prev) => prev.filter((consulta) => consulta.id !== id))
  }

  const getConsultaById = (id: string | undefined) => {
    return consultas.find((consulta) => consulta.id === id)
  }

  return {
    consultas,
    createConsulta,
    updateConsulta,
    deleteConsulta,
    getConsultaById,
  }
}
