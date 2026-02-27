import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const sduDoctors = [
  {
    id: 1,
    name: "Dr. Muhammad Yusuf",
    specialization: "Senior Consultant – General Surgery",
  },
  {
    id: 2,
    name: "Dr. Amina Khatun",
    specialization: "Consultant – Post-operative Care",
  },
  {
    id: 3,
    name: "Dr. Abdullah Al-Mamun",
    specialization: "Specialist – Trauma Care",
  },
  {
    id: 4,
    name: "Dr. Jesmin Akter",
    specialization: "Associate Specialist – Surgical Recovery",
  },
];

// random image generator (same style as your doctors page)
const getDoctorImage = (id) =>
  `https://randomuser.me/api/portraits/${id % 2 === 0 ? "men" : "women"}/${(id * 17) % 90}.jpg`;

export default function SDUPage() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[300px] md:h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581595220892-b0739db338c5"
          alt="SDU - Step Down Unit"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold text-white mb-3"
            >
              Step Down Unit (SDU)
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/90 max-w-xl"
            >
              Specialized post-critical care at Ad-din Medical College Hospital
            </motion.p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">

          {/* INTRO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
              Step Down Unit Services – Ad-din Medical College Hospital
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Step Down Unit (SDU) at Ad-din Medical College Hospital provides specialized care for patients transitioning from intensive care to general wards. Our SDU serves as a crucial bridge in the recovery journey, offering continuous monitoring and specialized nursing care for patients in or recovering from trauma and high-dependency situations. The unit efficiently manages patient flow for further investigation before discharge or after transferring from ICU.
            </p>
          </motion.div>

          {/* SDU SERVICES & FEATURES GRID */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              SDU Services & Features
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Intermediate Monitoring",
                  text: "Continuous observation of vital signs for patients with unstable conditions, including cardiac, respiratory, or post-surgical recovery patients.",
                },
                {
                  title: "Specialized Care",
                  text: "Tailored nursing care for patients in or recovering from trauma and high-dependency situations with individualized treatment plans.",
                },
                {
                  title: "Efficient Transition",
                  text: "Acts as a specialized emergency portal to manage patient flow, either for further investigation before discharge or after transferring from ICU.",
                },
                {
                  title: "Targeted Specialities",
                  text: "Some units focus specifically on surgical recovery (Surgical Step Down Unit) or acute, high-level observation for various medical conditions.",
                },
                {
                  title: "Reduced Length of Stay",
                  text: "Our SDU helps reduce overall hospital stay by providing appropriate care levels that accelerate recovery while maintaining safety.",
                },
                {
                  title: "Multidisciplinary Approach",
                  text: "Team-based care involving physicians, nurses, therapists, and care coordinators for comprehensive patient management.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-2xl transition-all duration-[30ms]"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* PATIENT TYPES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Patients We Care For
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Post-Surgical Patients",
                  desc: "Recovery from major surgeries requiring close monitoring",
                },
                {
                  title: "Cardiac Patients",
                  desc: "Heart patients needing continuous cardiac observation",
                },
                {
                  title: "Respiratory Patients",
                  desc: "Patients recovering from severe respiratory conditions",
                },
                {
                  title: "Trauma Recovery",
                  desc: "Patients recovering from traumatic injuries",
                },
                {
                  title: "Post-ICU Transfer",
                  desc: "Patients transitioning from intensive care",
                },
                {
                  title: "Complex Medical Cases",
                  desc: "Patients requiring specialized monitoring",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 text-gray-800 shadow hover:shadow-lg transition"
                >
                  <h4 className="font-semibold text-blue-700 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FACILITIES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Facilities & Technology
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                "Continuous cardiac monitoring",
                "Pulse oximetry",
                "Blood pressure monitoring",
                "Temperature monitoring",
                "IV therapy equipment",
                "Oxygen therapy support",
                "Wound care supplies",
                "Pain management systems",
                "Rehabilitation equipment",
              ].map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-xl p-4 text-sm text-gray-800 shadow hover:shadow-lg transition"
                >
                  {f}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* WHY CHOOSE OUR SDU */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Why Choose Our SDU?
            </h3>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <ul className="space-y-4">
                {[
                  "Experienced nursing staff specialized in post-critical care",
                  "Close proximity to ICU for rapid escalation if needed",
                  "Individual patient rooms for comfort and privacy",
                  "Family involvement in care planning and education",
                  "Integrated rehabilitation services for faster recovery",
                  "Focus on reducing hospital length of stay while ensuring safe discharge",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* SDU SPECIALISTS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8 text-center">
              <span className="text-sm uppercase tracking-wider text-blue-600 font-semibold">
                Our Experts
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                SDU Specialist Doctors
              </h2>
              <p className="text-gray-600 mt-2">
                Highly experienced specialists in post-critical care and surgical recovery
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {sduDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-[30ms] relative overflow-hidden group"
                >
                  {/* Glow effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition" />

                  <div className="relative z-10">
                    <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-blue-100 mb-4">
                      <img
                        src={getDoctorImage(doctor.id)}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800">
                      {doctor.name}
                    </h3>
                    <span className="text-sm text-blue-600 block mt-1">
                      {doctor.specialization}
                    </span>

                    <a
                      href="/appointment"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                    >
                      View Profile <span>→</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CONTACT SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-16"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Need SDU Care?</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Our SDU team provides specialized care for patients transitioning from critical care to recovery. Contact us for more information about our step-down services.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/appointment"
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition"
                >
                  Book Appointment
                </a>
                <a
                  href="tel:+8809610818888"
                  className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition"
                >
                  Call: +8809610-818888
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
