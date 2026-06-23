"use client";

import Link from "next/link";
import { useCrud } from "@/app/context/CrudContext";

export default function TrabajosPage(){

    const {
        consultas,
        deleteConsulta,
        cambiarEstado
    } = useCrud();

console.log("consultas:", consultas);

    return(

        <div>

            <h1>Trabajos realizados</h1>

            <table border={1} cellPadding={8}>

                <thead>

                    <tr>

                        <th>Cliente</th>

                        <th>Correo</th>

                        <th>Estado</th>

                        <th>Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    {consultas.map((consulta)=>(

                        <tr key={consulta.id}>

                            <td>

                                {consulta.nombre} {consulta.apellido}

                            </td>

                            <td>

                                {consulta.correo}

                            </td>

                            <td>

                                {consulta.estado}

                            </td>

                            <td>

                                <button
                                onClick={()=>cambiarEstado(consulta.id)}
                                >

                                    Cambiar estado

                                </button>

                                <button
                                onClick={()=>deleteConsulta(consulta.id)}
                                >

                                    Eliminar

                                </button>

                                <Link
                                href={`/trabajos/${consulta.id}`}
                                >

                                    Editar

                                </Link>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}