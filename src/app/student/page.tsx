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
  linkedIn?: string;
  github?: string;
  resumeURL?: string;
  offers?: string[];
}

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const [showAllSkills, setShowAllSkills] = useState(false);

  const visibleSkills = showAllSkills ? student.skills : student.skills.slice(0, 6);

  return (
    <div className="bg-white p-6 dark:bg-slate-800 shadow-md rounded-lg p-5 flex flex-col items-center text-center hover:shadow-xl transition dark:hover:shadow-slate-700">
      {/* Profile Photo */}
      <img
        src={`https://avatars.dicebear.com/api/initials/${student.name}.svg`}
        alt={student.name}
        className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-slate-200 dark:border-slate-600"
      />

      {/* Name & Info */}
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        {student.name}
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">{student.currentStatus}</p>
      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">
        {student.branch} • Batch {student.batch}
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500">Roll No: {student.rollNo}</p>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-1 mt-3">
        {visibleSkills.length > 0 ? (
          visibleSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-400">No skills listed</span>
        )}
      </div>
      {student.skills.length > 6 && (
        <button
          onClick={() => setShowAllSkills(!showAllSkills)}
          className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {showAllSkills ? "Show less" : "Read more"}
        </button>
      )}

      {/* Links */}
      <div className="flex gap-3 mt-4">
        {student.linkedIn && (
          <a
            href={student.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            LinkedIn
          </a>
        )}
        {student.github && (
          <a
            href={student.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-lg text-sm font-medium bg-slate-700 text-white hover:bg-slate-900 transition"
          >
            GitHub
          </a>
        )}
        {student.resumeURL && (
          <a
            href={student.resumeURL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition"
          >
            Resume
          </a>
        )}
      </div>

      {/* Offers */}
      {student.offers && student.offers.length > 0 && (
        <div className="mt-3 text-left w-full">
          <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400">Offers:</h3>
          <ul className="list-disc list-inside text-xs text-slate-500 dark:text-slate-400">
            {student.offers.map((offer, idx) => (
              <li key={idx}>{offer}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Email */}
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 break-words">
        📧 {student.email}
      </p>
    </div>
  );
};

const StudentGrid: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("https://atpac-backend-2.onrender.com/api/students");
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
    return <p className="text-center py-10 dark:text-slate-300">Loading students...</p>;
  }

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 mt-20">
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {students.map((student) => (
            <StudentCard key={student._id} student={student} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentGrid;
