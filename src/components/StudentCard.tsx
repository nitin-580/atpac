import React from "react";

interface StudentCardProps {
  photo: string;
  name: string;
  role: string;
  about: string;
  resumeLink: string;
}

const StudentCard: React.FC<StudentCardProps> = ({
  photo,
  name,
  role,
  about,
  resumeLink,
}) => {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
      {/* Profile Photo */}
      <img
        src={photo}
        alt={name}
        className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover mb-4"
      />

      {/* Name & Role */}
      <h2 className="text-xl font-bold text-gray-900">{name}</h2>
      <p className="text-sm text-gray-600 mb-4">{role}</p>

      {/* About Section */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-4">{about}</p>

      {/* Resume Link */}
      <a
        href={resumeLink}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        View Resume
      </a>
    </div>
  );
};

export default StudentCard;
