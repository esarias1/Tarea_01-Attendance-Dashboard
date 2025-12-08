import React from "react";

//Título de la CVCard, valor y color para el texto
export const CVCard = ({ title, value, color }) => {
  return (
    <div className="bg-white flex flex-col p-4 rounded-lg shadow">
      <p>{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
};
