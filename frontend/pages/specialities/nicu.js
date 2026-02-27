import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const nicuDoctors = [
  {
    id: 1,
    name: "Dr. Farida Yesmin",
    specialization: "Senior Consultant – Neonatology",
  },
  {
    id: 2,
    name: "Dr. Mohammad Shahid",
    specialization: "Consultant – Pediatric Neonatal Care",
  },
  {
    id: 3,
    name: "Dr. Amina Rahman",
    specialization: "Specialist – Neonatal Intensive Care",
  },
  {
    id: 4,
    name: "Dr. Rafiqur Rahman",
    specialization: "Associate Specialist – Newborn Care",
  },
];

// random image generator (same style as your doctors page)
const getDoctorImage = (id) =>
  `https://randomuser.me/api/portraits/${id % 2 === 0 ? "men" : "women"}/${(id * 17) % 90}.jpg`;

export default function NICUPage() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[300px] md:h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9"
          alt="NICU - Neonatal Intensive Care Unit"
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
              Neonatal Intensive Care Unit (NICU)
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/90 max-w-xl"
            >
              Specialized care for newborns at Ad-din Medical College Hospital
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
              Neonatal Intensive Care Services – Ad-din Medical College Hospital
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Neonatal Intensive Care Unit (NICU) at Ad-din Medical College Hospital provides comprehensive specialized care for newborns who need intensive attention. Our NICU is equipped with state-of-the-art technology and staffed by a dedicated team of neonatologists, neonatal nurses, and specialists who work around the clock to provide the highest quality care for premature and critically ill newborns.
            </p>
          </motion.div>

          {/* NICU SERVICES & FEATURES GRID */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              NICU Services & Features
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Respiratory Support",
                  text: "Mechanical ventilation, nasal CPAP (oxygen delivery), and specialized respiratory therapists providing advanced breathing support for newborns.",
                },
                {
                  title: "Specialized Care",
                  text: "Treatment for birth defects, infections, and surgical procedures provided by experienced pediatric surgeons and neonatal specialists.",
                },
                {
                  title: "Nutritional Support",
                  text: "Feeding via tubes or intravenous methods and lactation support for mothers to ensure proper nutrition for growing babies.",
                },
                {
                  title: "Monitoring & Technology",
                  text: "Advanced incubators, 24/7 monitoring of vital signs, and advanced diagnostic imaging for comprehensive newborn care.",
                },
                {
                  title: "Developmental Care",
                  text: "Strategies to promote growth, such as noise reduction, careful handling, and individualized care plans for each baby.",
                },
                {
                  title: "Support Services",
                  text: "Social workers, spiritual advisors, and translators to assist families throughout their NICU journey.",
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

          {/* CONDITIONS WE TREAT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Conditions We Treat
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Premature Births",
                  desc: "Babies born before 37 weeks of pregnancy",
                },
                {
                  title: "Low Birth Weight",
                  desc: "Newborns weighing less than 2.5 kg",
                },
                {
                  title: "Respiratory Distress",
                  desc: "Breathing difficulties requiring ventilation",
                },
                {
                  title: "Birth Defects",
                  desc: "Congenital conditions needing immediate care",
                },
                {
                  title: "Infections",
                  desc: "Neonatal sepsis and other infections",
                },
                {
                  title: "Jaundice",
                  desc: "Severe neonatal jaundice requiring treatment",
                },
                {
                  title: "Surgical Needs",
                  desc: "Post-operative care for newborns",
                },
                {
                  title: "Metabolic Disorders",
                  desc: "Genetic and metabolic conditions",
                },
                {
                  title: "Twin/Multiple Births",
                  desc: "Special care for multiple pregnancies",
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
                "Advanced neonatal incubators",
                "Ventilators & CPAP machines",
                "24/7 cardiac monitoring",
                "Pulse oximetry",
                "Phototherapy units",
                "Infusion pumps",
                "Neonatal echocardiography",
                "Portable ultrasound",
                "Brain monitoring (aEEG)",
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

          {/* FAMILY SUPPORT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Family Support Services
            </h3>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <ul className="space-y-4">
                {[
                  "Open visitation for parents 24/7",
                  "Lactation consultants and breastfeeding support",
                  "Social work services for emotional support",
                  "Spiritual care and counseling",
                  "Multilingual staff and translation services",
                  "Parent education programs",
                  "Discharge planning and follow-up care",
                  "Bereavement support for families",
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

          {/* NICU SPECIALISTS */}
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
                NICU Specialist Doctors
              </h2>
              <p className="text-gray-600 mt-2">
                Highly experienced neonatologists and pediatric specialists
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {nicuDoctors.map((doctor) => (
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
              <h3 className="text-2xl font-bold mb-4">Need NICU Care?</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Our NICU team provides specialized care for premature and critically ill newborns. Contact us for more information about our neonatal services.
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
