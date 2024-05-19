"use client";

import React, { useState } from "react";

import { Plus, ChevronUp, ChevronDown } from "lucide-react";

function Segmento() {
  const [segmentos, setSegmentos] = useState([
    {
      id: 1,
      codigo: "DTM",
      nombre: "Date/Time Reference",
      elementos: 2,
      uso: "O",
      maxUso: 1,
      mostrarDetalle: true,
    },
    {
      id: 2,
      codigo: "DTM01",
      nombre: "Code",
      elementos: null,
      uso: "M",
      maxUso: null,
      mostrarDetalle: false,
    },
    {
      id: 3,
      codigo: "DTM02",
      nombre: "Date",
      elementos: null,
      uso: "M",
      maxUso: null,
      mostrarDetalle: false,
    },
  ]); // Estado inicial de los segmentos

  const agregarSegmento = () => {
    setSegmentos((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        codigo: "",
        nombre: "",
        elementos: null,
        uso: "",
        maxUso: null,
        mostrarDetalle: false,
      },
    ]);
  };

  const toggleDetalle = (id: number) => {
    setSegmentos((prev) =>
      prev.map((seg) =>
        seg.id === id ? { ...seg, mostrarDetalle: !seg.mostrarDetalle } : seg
      )
    );
  };

  return (
    <div>
      {segmentos.map((segmento) => (
        <div key={segmento.id}>
          <div className="flex items-center">
            <button onClick={() => toggleDetalle(segmento.id)}>
              {segmento.mostrarDetalle ? <ChevronUp /> : <ChevronDown />}
            </button>
            {/* Resto de campos del segmento (codigo, nombre, etc.) */}
            {segmento.mostrarDetalle && (
              <div> {segmento.codigo} {segmento.elementos} </div>
            )}
          </div>
        </div>
      ))}
      <button onClick={agregarSegmento}>
        <Plus /> Agregar Segmento
      </button>
    </div>
  );
}

export default Segmento;
