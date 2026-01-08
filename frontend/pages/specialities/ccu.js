import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ccuDoctors = [
  {
    id: 1,
    name: "Dr. Ahsan Habib",
    specialization: "Senior Consultant – Cardiology",
  },
  {
    id: 2,
    name: "Dr. Farhana Rahman",
    specialization: "Consultant – Critical Care",
  },
  {
    id: 3,
    name: "Dr. Mahmudul Islam",
    specialization: "Interventional Cardiologist",
  },
  {
    id: 4,
    name: "Dr. Rezaul Karim",
    specialization: "Cardiac Electrophysiologist",
  },
];

// random image generator (same style as your doctors page)
const getDoctorImage = (id) =>
  `https://randomuser.me/api/portraits/${id % 2 === 0 ? "men" : "women"}/${(id * 17) % 90}.jpg`;

export default function CCUPage() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[300px] md:h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
          alt="CCU"
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
              Critical Care Unit (CCU)
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/90 max-w-xl"
            >
              Advanced cardiac critical care at Medical Center Chattagram
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
              Critical Care Services – Medical Center Chattagram
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Critical Care services play a vital role in saving the lives of acutely and critically ill patients. Our CCU integrates advanced technology, skilled professionals, and continuous monitoring to deliver world-class cardiac critical care.
            </p>
          </motion.div>

          {/* CCU DETAILS GRID */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: "11-Bed Advanced CCU Facility",
                text: "Fully equipped for interventional cardiac patients including stenting, PCI, ICD, CRT and more.",
              },
              {
                title: "24/7 Cardiac Monitoring",
                text: "Continuous ECG, haemodynamic and invasive monitoring for high-risk cardiac patients.",
              },
              {
                title: "Post-Intervention Care",
                text: "Specialized care for post angioplasty, CABG, valve procedures and heart failure patients.",
              },
              {
                title: "Emergency Cardiac Response",
                text: "Immediate response team for acute myocardial infarction, arrhythmia and cardiac arrest.",
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
                "Central monitoring system",
                "Ultramodern ventilators",
                "Infusion pumps",
                "Arterial blood gas analysis",
                "Intra Aortic Balloon Pump (IABP)",
                "Bedside echocardiography",
                "CRRT dialysis support",
                "Portable X-ray & ultrasound",
                "TPN nutrition support",
              ].map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-sm text-gray-800 shadow hover:shadow-lg transition"
                >
                  {f}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CCU SPECIALISTS – SAME STYLE AS DOCTORS PAGE */}
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
                CCU Specialist Doctors
              </h2>
              <p className="text-gray-600 mt-2">
                Highly experienced cardiac critical care specialists
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {ccuDoctors.map((doctor) => (
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
        </div>
      </section>

      <Footer />
    </>
  );
}
