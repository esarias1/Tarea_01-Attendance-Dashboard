import { useState, useEffect } from "react";
import { initialStudents } from "../data/students"; //importamos los datos de los estudiantes

{
  /*
   *Definimos un hook personalizado para organizar la lógica
   *Intentamos cargar students desde localStorage
   *Si no hay nada en localStorage, se utilizan los datos por defecto de los estudiantes (o un array vacío si no hay nada)
   */
}
export const useAttendance = () => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : initialStudents || [];
  });

  const [searchTerm, setSearchTerm] = useState(""); //almacenamos el término de búsqueda, inicialmente vacío

  {
    /*
     *Función que actualiza la asistencia de un estudiante
     *Se recorre la lista, si el estudiante coincide con el ID, se devulve un nuevo objeto con la información
     *anterior y un nuevo registro en attendance con la fecha actual y el status.
     *Si no coincide, se deja igual.
     */
  }
  const updateAttendance = (id, newStatus) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              attendance: [
                ...s.attendance,
                {
                  date: new Date().toISOString().slice(0, 10),
                  status: newStatus,
                },
              ],
            }
          : s
      )
    );
  };
  //Se almacenan los datos en localStorage cuando cambie students
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  //Se calculan los datos de asistencia utilizando el último registro
  const totalStudents = students.length;
  const presentCount = students.filter(
    (s) => s.attendance.at(-1)?.status === "present"
  ).length;
  const absentCount = students.filter(
    (s) => s.attendance.at(-1)?.status === "absent"
  ).length;
  const lateCount = students.filter(
    (s) => s.attendance.at(-1)?.status === "late"
  ).length;

  //Filtra los estudiantes por el término de la búsqueda
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Estado para almacenar el estudiante buscado
  const [selectedStudent, setSelectedStudent] = useState(null);

  //Cada vez que cambia Searchterm o students, se revisa
  useEffect(() => {
    if (filteredStudents.length === 1) {
      setSelectedStudent(filteredStudents[0]);
    } else {
      setSelectedStudent(null);
    }
  }, [searchTerm, students]);

  //Límpia la caja de búsqueda y la tarjeta
  const clearSelection = () => {
    setSearchTerm("");
    setSelectedStudent(null);
  };

  //Calcula las estadísticas de asistencia para el estudiante elegido
  const studentPresent = selectedStudent
    ? selectedStudent.attendance.filter((a) => a.status === "present").length
    : 0;
  const studentAbsent = selectedStudent
    ? selectedStudent.attendance.filter((a) => a.status === "absent").length
    : 0;
  const studentLate = selectedStudent
    ? selectedStudent.attendance.filter((a) => a.status === "late").length
    : 0;

  //Devuelve los diferentes estados y funciones
  return {
    students,
    updateAttendance,
    totalStudents,
    presentCount,
    absentCount,
    lateCount,
    filteredStudents,
    searchTerm,
    setSearchTerm,
    selectedStudent,
    studentPresent,
    studentAbsent,
    studentLate,
    clearSelection,
  };
};
