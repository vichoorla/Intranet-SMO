"use client";

import { useParams } from "next/navigation";
import { useCrud } from "@/app/context/CrudContext";

export default function EditarTrabajo(){

    const params = useParams();

    const { getConsultaById } = useCrud();

    const consulta = getConsultaById(params.id as string);

    if(!consulta){

        return <h2>Cargando...</h2>;

    }

    return(

        <div>

            <h1>Editar trabajo</h1>

            <p><b>Nombre:</b> {consulta.nombre}</p>

            <p><b>Apellido:</b> {consulta.apellido}</p>

            <p><b>Correo:</b> {consulta.correo}</p>

            <p><b>Teléfono:</b> {consulta.telefono}</p>

            <p><b>Mensaje:</b> {consulta.mensaje}</p>

            <p><b>Estado:</b> {consulta.estado}</p>

        </div>

    );

}