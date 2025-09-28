"use client";

import React, { useEffect, useState } from "react";

interface Student {
  _id: string;
  name: string;
  rollNo: string;
  email: string;
  branch: string;
  batch: number;
  currentStatus: string;
  skills: string[];
}

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition">
      {/* Profile Photo (using initials) */}
      <img
        src={`https://avatars.dicebear.com/api/initials/${student.name}.svg`}
        alt={student.name}
        className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-200"
      />

      {/* Name & Role */}
      <h2 className="text-lg font-semibold">{student.name}</h2>
      <p className="text-sm text-gray-500">{student.currentStatus}</p>
      <p className="text-xs text-indigo-600 font-medium mt-1">{student.branch}</p>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-1 mt-2">
        {student.skills.length > 0 ? (
          student.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400">No skills listed</span>
        )}
      </div>
    </div>
  );
};

const StudentGrid: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("https://atpac-backend-2.onrender.com//api/students");
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading students...</p>;
  }

  return (
    <section className="py-8 bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {students.map((student) => (
            <StudentCard key={student._id} student={student} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentGrid;
