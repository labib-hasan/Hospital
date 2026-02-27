import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const hduDoctors = [
  {
    id: 1,
    name: "Dr. Mohammad Ali",
    specialization: "Senior Consultant – Critical Care Medicine",
  },
  {
    id: 2,
    name: "Dr. Sarah Ahmed",
    specialization: "Consultant – Pulmonology & Respiratory Medicine",
  },
  {
    id: 3,
    name: "Dr. Kamal Hossain",
    specialization: "Consultant – Anesthesiology & HDU Care",
  },
  {
    id: 4,
    name: "Dr. Fatema Begum",
    specialization: "Associate Specialist – Internal Medicine",
  },
];

// random image generator (same style as your doctors page)
const getDoctorImage = (id) =>
  `https://randomuser.me/api/portraits/${id % 2 === 0 ? "men" : "women"}/${(id * 17) % 90}.jpg`;

export default function HDUPage() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[300px] md:h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
          alt="HDU - High Dependency Unit"
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
              High Dependency Unit (HDU)
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/90 max-w-xl"
            >
              Advanced intermediate care at Ad-din Medical College Hospital
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
              High Dependency Unit Services – Ad-din Medical College Hospital
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The High Dependency Unit (HDU) at Ad-din Medical College Hospital bridges the gap between Intensive Care Unit (ICU) and general wards. Commonly located near the ICU, the HDU ensures patients with high-risk conditions receive prompt intervention and specialized care. Our HDU provides comprehensive intermediate care for recovering patients who require more monitoring than a general ward can offer but do not need full ICU support.
            </p>
          </motion.div>

          {/* HDU SERVICES & FEATURES GRID */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              HDU Services & Features
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Intermediate Care",
                  text: "Bridges the gap between ICU and general wards for recovering patients who need closer observation than general wards provide.",
                },
                {
                  title: "High-Level Monitoring",
                  text: "Continuous surveillance of vital signs and cardiac monitoring for patients with unstable conditions.",
                },
                {
                  title: "Specialized Staffing",
                  text: "Higher nurse-to-patient ratios compared to general wards, ensuring personalized care and quick response to changes in patient condition.",
                },
                {
                  title: "Strategic Location",
                  text: "Commonly located near the ICU for immediate access to ICU-level interventions when needed.",
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

          {/* TREATMENTS PROVIDED */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Treatments Provided
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Post-operative Care",
                  desc: "Recovery from major or complex surgeries with dedicated monitoring",
                },
                {
                  title: "Respiratory Support",
                  desc: "High-flow oxygen and Bi-Pap machines for breathing difficulties",
                },
                {
                  title: "Acute Care",
                  desc: "Management of severe infections requiring IV antibiotics",
                },
                {
                  title: "Renal Dialysis",
                  desc: "Dialysis support for patients with kidney complications",
                },
                {
                  title: "Step-down Care",
                  desc: "For patients improving from ICU but still needing close monitoring",
                },
                {
                  title: "Step-up Care",
                  desc: "For patients deteriorating on general wards requiring closer observation",
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
                "Advanced cardiac monitors",
                "Multiparameter monitors",
                "High-flow oxygen therapy",
                "Bi-Pap & CPAP ventilators",
                "Infusion pumps & syringe drivers",
                "Continuous ECG monitoring",
                "Arterial blood gas analysis",
                "Portable X-ray & ultrasound",
                "Bedside dialysis capability",
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

          {/* WHY CHOOSE OUR HDU */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Why Choose Our HDU?
            </h3>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <ul className="space-y-4">
                {[
                  "24/7 dedicated nursing staff with specialized HDU training",
                  "Immediate access to ICU team for rapid escalation if needed",
                  "Individual patient rooms for infection control and privacy",
                  "Family-friendly visitation hours with comfortable waiting areas",
                  "Integrated care approach with specialists from multiple departments",
                  "Modern infrastructure meeting international healthcare standards",
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

          {/* HDU SPECIALISTS – SAME STYLE AS DOCTORS PAGE */}
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
                HDU Specialist Doctors
              </h2>
              <p className="text-gray-600 mt-2">
                Highly experienced critical care and HDU specialists
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {hduDoctors.map((doctor) => (
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
              <h3 className="text-2xl font-bold mb-4">Need HDU Care?</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Our HDU team is ready to provide comprehensive care for patients requiring intermediate critical care. Contact us for more information about our services.
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
