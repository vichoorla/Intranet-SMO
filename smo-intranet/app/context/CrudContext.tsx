"use client";



import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { db } from "@/firebase/firebase";

import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore";



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
    createConsulta: (consulta: Omit<Consulta, "id" | "estado">) => Promise<void>;
    updateConsulta: (consulta: Consulta) => Promise<void>;
    deleteConsulta: (id: string) => Promise<void>;
    cambiarEstado: (id: string) => Promise<void>;
    getConsultaById: (id: string) => Consulta | undefined;
};

const CrudContext = createContext<CrudContextType | null>(null);

export function CrudProvider({ children }: { children: ReactNode }) {

    const [consultas, setConsultas] = useState<Consulta[]>([]);
    useEffect(() => {
    const unsubscribe = onSnapshot(
        collection(db, "consultas"),
        (snapshot) => {
            const datos: Consulta[] = snapshot.docs.map((documento) => ({
                id: documento.id,
                ...(documento.data() as Omit<Consulta, "id">),
            }));
            setConsultas(datos);
        }
    );
    return () => unsubscribe();
}, []);

    const createConsulta = async (
    consulta: Omit<Consulta, "id" | "estado">
) => {
    await addDoc(collection(db, "consultas"), {
        ...consulta,
        estado: "Pendiente",
    });
};

    
    const updateConsulta = async (consulta: Consulta) => {
    const referencia = doc(db, "consultas", consulta.id);
    await updateDoc(referencia, {
        nombre: consulta.nombre,
        apellido: consulta.apellido,
        correo: consulta.correo,
        telefono: consulta.telefono,
        mensaje: consulta.mensaje,
        fecha: consulta.fecha,
        estado: consulta.estado,
        precio: consulta.precio,
    });

};

    const deleteConsulta = async (id: string) => {
    await deleteDoc(doc(db, "consultas", id));
};

    const cambiarEstado = async (id: string) => {
    const consulta = consultas.find(c => c.id === id);
    if (!consulta) return;
    await updateDoc(doc(db, "consultas", id), {
        estado:
            consulta.estado === "Pendiente"
                ? "Terminado"
                : "Pendiente",
    });
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