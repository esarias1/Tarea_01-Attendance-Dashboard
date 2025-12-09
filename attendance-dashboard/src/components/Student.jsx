import React from "react";

export const Student = ({ student, onUpdateStatus }) => {
  //Devolvemos null si recibimos undefined o null
  if (!student) return null;

  //Desestructuramos student con la información que necesitamos
  const { id, name, image, attendance } = student;

  //Comprobamos si hay un historial de asistencia. Si no es así, devolvemos null
  const currentStatus =
    attendance.length > 0 ? attendance[attendance.length - 1].status : null;

  //Función para actualizar el estado al hacer clic.
  const handleClick = (status) => {
    if (onUpdateStatus) {
      onUpdateStatus(id, status);
    }
  };

  //Función para determinar el estilo dinámico de los botones
  const getButtonClass = (status) => {
    const base = "rounded-lg px-4 py-2 w-24 h-10 ";
    if (status === "present") {
      return currentStatus === "present"
        ? base + "bg-blue-500 text-white hover:bg-blue-600"
        : base + "bg-gray-200 text-black hover:bg-gray-300";
    }
    if (status === "absent") {
      return currentStatus === "absent"
        ? base + "bg-red-500 text-white hover:bg-red-600"
        : base + "bg-gray-200 text-black hover:bg-gray-300";
    }
    if (status === "late") {
      return currentStatus === "late"
        ? base + "bg-yellow-400 text-white hover:bg-yellow-500"
        : base + "bg-gray-200 text-black hover:bg-gray-300";
    }
    return base + "bg-gray-200 text-black hover:bg-gray-300";
  };

  // Badge visual según el estado actual
  const getBadge = () => {
    if (currentStatus === "present")
      return {
        bg: "rgb(232,244,234)",
        color: "rgb(40,167,69)",
        text: "Present",
      };
    if (currentStatus === "absent")
      return {
        bg: "rgb(248,215,218)",
        color: "rgb(220,53,69)",
        text: "Absent",
      };
    if (currentStatus === "late")
      return { bg: "rgb(255,243,205)", color: "rgb(255,193,7)", text: "Late" };
    return { bg: "rgb(220,220,220)", color: "rgb(100,100,100)", text: "N/A" };
  };

  const badge = getBadge();

  //Añadimos los elementos dinámicos y las llamadas de los botones
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex flex-row justify-between p-4">
        <div className="flex">
          <img
            className="w-12 h-12 rounded-full object-cover mr-2"
            alt={`Avatar of ${name}`}
            src={image}
          />
          <div>
            <p className="font-bold text-xl">{name}</p>
            <p className="text-sm">{`ID: ${id}`}</p>
          </div>
        </div>
        <span
          className="self-end  rounded-full p-2 text-xs"
          style={{ backgroundColor: badge.bg, color: badge.color }}
        >
          {badge.text}
        </span>
      </div>
      <div className="flex flex-row justify-between p-2">
        <button
          className={getButtonClass("present")}
          onClick={() => handleClick("present")}
        >
          Present
        </button>
        <button
          className={getButtonClass("absent")}
          onClick={() => handleClick("absent")}
        >
          Absent
        </button>
        <button
          className={getButtonClass("late")}
          onClick={() => handleClick("late")}
        >
          Late
        </button>
      </div>
    </div>
  );
};
