import Image from "next/image";

const features = [
  {
    title: "Academics",
    description:
      "Providing a rigorous and world-class academic experience with the help of distinguished faculty, amazing peer groups and carefully designed coursework.",
    icon: "/logo.png",
  },
  {
    title: "Ranking",
    description:
      "SVNIT is ranked among the top engineering colleges in India by the National Institutional Ranking Framework (NIRF).",
    icon: "/nirf.png",
  },
  {
    title: "Alumni",
    description:
      "Our alumni have made their mark globally, occupying leading positions in corporate, academia & the government.",
    icon: "/aalogo.png",
  },
  {
    title: "Selection Process",
    description:
      "SVNIT is home to the brightest individuals in India who are accepted through rigorous entrance procedures like JEE and GATE.",
    icon: "/jee.png",
  },
  {
    title: "Research and Development",
    description:
      "Access to the latest and pioneering advances in technology with the aim of exposing students to innovation.",
    icon: "/logo.png",
  },
  {
    title: "All-Round Development",
    description:
      "Promoting overall development of students through cultural, sports activities, fests, competitions and clubs.",
    icon: "/logo.png",
  },
];

export default function Why() {
  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Why Choose SVNIT?
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Discover what makes us one of the top engineering institutes in India.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={80}
              height={80}
              className="mb-4"
            />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
