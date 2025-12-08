import React from "react";

//Componente que renderiza el header
export const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 h-200">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-blue-500 text-3xl">
          school
        </span>
        <h1>Attendance Dashboard</h1>
      </div>
      <button>
        <span className="material-symbols-outlined bg-gray-100 text-gray-500 rounded-full w-8 h-8 inline-flex items-center justify-center text-2xl">
          person
        </span>
      </button>
    </header>
  );
};
