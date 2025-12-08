import React from "react";
import { Header } from "./components/Header.jsx";
import { Student } from "./components/Student.jsx";
import { CVCard } from "./components/CVCard.jsx";
import { useAttendance } from "./hooks/useAttendance.jsx";

//Importamos los componentes y el hook

export default function App() {
  //Desestructuramos el hook
  const {
    students,
    updateAttendance,
    totalStudents,
    presentCount,
    absentCount,
    lateCount,
    searchTerm,
    setSearchTerm,
    selectedStudent,
    studentPresent,
    studentAbsent,
    studentLate,
    clearSelection,
  } = useAttendance();

  return (
    <>
      {/*Añadimos los componentes y los props necesarios*/}
      <Header />
      <main className="bg-gray-50">
        <div>
          {/* Tarjetas de datos calculados */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-around p-4">
            <CVCard
              title="Total Students"
              value={totalStudents}
              color="text-black"
            />
            <CVCard
              title="Present"
              value={presentCount}
              color="text-green-500"
            />
            <CVCard title="Absent" value={absentCount} color="text-red-500" />
            <CVCard title="Late" value={lateCount} color="text-yellow-500" />
          </section>

          {/* Buscador
           *Actualiza el estado cuando introduce cualquier palabra
           */}
          <section>
            <div className="items-center flex justify-center lg:justify-end p-4">
              <label className="w-full lg:w-auto">
                <div className="bg-white flex rounded-lg shadow px-3 py-2 lg:w-80">
                  <span className="material-symbols-outlined mr-2">search</span>
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search student name..."
                    className="flex-1 outline-none bg-transparent"
                  />
                </div>
              </label>
            </div>
          </section>

          {/* Tarjeta del estudiante buscado
           * Sólo se muestra cuando hay un único resultado de búsqueda (selectedStudent existe)
           * Muestra la foto, nombre e ID del estudiante + estadísticas personales de asistencia
           */}
          {selectedStudent && (
            <div className="bg-white rounded-lg shadow p-4 mb-4 relative">
              <button
                onClick={clearSelection}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              <div className="flex items-center mb-2">
                <img
                  src={selectedStudent.image}
                  alt={selectedStudent.name}
                  className="w-12 h-12 rounded-full mr-2"
                />
                <div>
                  <p className="font-bold">{selectedStudent.name}</p>
                  <p className="text-sm">{`ID: ${selectedStudent.id}`}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <CVCard
                  title="Present"
                  value={studentPresent}
                  color="text-green-500"
                />
                <CVCard
                  title="Absent"
                  value={studentAbsent}
                  color="text-red-500"
                />
                <CVCard
                  title="Late"
                  value={studentLate}
                  color="text-yellow-500"
                />
              </div>
            </div>
          )}

          {/* Lista de estudiantes
           * Recorre la lista de estudiantes y renderiza un componente Student por cada uno
           *OnUpdateStatus permite que cada estudiante pueda actualizar su asistencia
           */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-around p-4">
              {students.map((student) => (
                <Student
                  key={student.id}
                  student={student}
                  onUpdateStatus={updateAttendance}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
