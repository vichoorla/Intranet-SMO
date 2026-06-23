"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

export type Consulta = {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    mensaje: string;
    fecha: string;
    estado: "Pendiente" | "Terminado";
    precio: number;
};

type CrudContextType = {
    consultas: Consulta[];
    createConsulta: (consulta: Omit<Consulta, "id" | "estado">) => void;
    updateConsulta: (consulta: Consulta) => void;
    deleteConsulta: (id: string) => void;
    cambiarEstado: (id: string) => void;
    getConsultaById: (id: string) => Consulta | undefined;
};

const CrudContext = createContext<CrudContextType | null>(null);

export function CrudProvider({ children }: { children: ReactNode }) {

    const [consultas, setConsultas] = useState<Consulta[]>([]);

    // Cargar localStorage
    useEffect(() => {

        const data = localStorage.getItem("consultas");

        if (data) {

            setConsultas(JSON.parse(data));

        }

    }, []);

    // Guardar localStorage
    useEffect(() => {

        localStorage.setItem("consultas", JSON.stringify(consultas));

    }, [consultas]);

    const createConsulta = (
        consulta: Omit<Consulta, "id" | "estado">
    ) => {

        setConsultas((prev) => [

            {

                id: Date.now().toString(),

                estado: "Pendiente",

                ...consulta,

            },

            ...prev,

        ]);

    };

    const updateConsulta = (consulta: Consulta) => {

        setConsultas((prev) =>
            prev.map((c) => (c.id === consulta.id ? consulta : c))
        );

    };

    const deleteConsulta = (id: string) => {

        setConsultas((prev) =>
            prev.filter((consulta) => consulta.id !== id)
        );

    };

    const cambiarEstado = (id: string) => {

        setConsultas((prev) =>
            prev.map((consulta) =>

                consulta.id === id

                    ? {

                          ...consulta,

                          estado:
                              consulta.estado === "Pendiente"
                                  ? "Terminado"
                                  : "Pendiente",

                      }

                    : consulta

            )
        );

    };

    const getConsultaById = (id: string) => {

        return consultas.find((consulta) => consulta.id === id);

    };

    return (

        <CrudContext.Provider
            value={{
                consultas,
                createConsulta,
                updateConsulta,
                deleteConsulta,
                cambiarEstado,
                getConsultaById,
            }}
        >

            {children}

        </CrudContext.Provider>

    );

}

export function useCrud() {

    const context = useContext(CrudContext);

    if (!context) {

        throw new Error("useCrud debe usarse dentro de CrudProvider");

    }

    return context;

}