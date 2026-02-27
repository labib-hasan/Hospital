import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const paediDoctors = [
  {
    id: 1,
    name: "Dr. Abu Bakar",
    specialization: "Senior Consultant – Pediatrics",
  },
  {
    id: 2,
    name: "Dr. Salma Akter",
    specialization: "Consultant – Pediatric Emergency Care",
  },
  {
    id: 3,
    name: "Dr. Mahbubur Rahman",
    specialization: "Specialist – Pediatric Surgery",
  },
  {
    id: 4,
    name: "Dr. Lipi Das",
    specialization: "Associate Specialist – General Pediatrics",
  },
];

// random image generator (same style as your doctors page)
const getDoctorImage = (id) =>
  `https://randomuser.me/api/portraits/${id % 2 === 0 ? "men" : "women"}/${(id * 17) % 90}.jpg`;

export default function PaediPage() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[300px] md:h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581056771107-24ca5f033842"
          alt="Pediatrics Department"
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
              Pediatrics Department
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/90 max-w-xl"
            >
              Comprehensive child healthcare at Ad-din Medical College Hospital
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
              Pediatric Services – Ad-din Medical College Hospital
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Pediatrics department at Ad-din Medical College Hospital is dedicated to providing comprehensive healthcare services for children from birth through adolescence. Our team of experienced pediatricians and specialists is committed to delivering compassionate, child-friendly care in a comfortable environment, ensuring the health and well-being of every child we serve.
            </p>
          </motion.div>

          {/* PEDIATRIC SERVICES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Pediatric Services We Offer
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "General Pediatrics",
                  text: "Primary care for children, covering acute illness treatment, routine health screenings, vaccinations, and developmental assessments.",
                },
                {
                  title: "Neonatal Intensive Care Unit (NICU)",
                  text: "Specialized care for premature or critically ill newborns with advanced life support and round-the-clock monitoring.",
                },
                {
                  title: "Pediatric Emergency/Urgent Care",
                  text: "Acute care for injuries, sudden illnesses, and urgent medical issues with rapid assessment and treatment.",
                },
                {
                  title: "Specialty Clinics",
                  text: "Dedicated departments for Allergy, Immunology, Rheumatology, Cardiology, Endocrinology, and Infectious Diseases.",
                },
                {
                  title: "Pediatric Surgery",
                  text: "Surgical procedures tailored for children, performed by experienced pediatric surgeons in child-friendly facilities.",
                },
                {
                  title: "Child Life and Play Services",
                  text: "Therapeutic play programs to support emotional health, reduce anxiety, and make hospitalization less stressful for children.",
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

          {/* SPECIALTY CLINICS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Specialty Clinics
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Allergy & Immunology",
                  desc: "Diagnosis and treatment of childhood allergies and immune disorders",
                },
                {
                  title: "Cardiology",
                  desc: "Heart conditions and cardiovascular health for children",
                },
                {
                  title: "Endocrinology",
                  desc: "Hormonal disorders and growth concerns",
                },
                {
                  title: "Infectious Diseases",
                  desc: "Treatment of complex infections in children",
                },
                {
                  title: "Rheumatology",
                  desc: "Joint and autoimmune conditions in children",
                },
                {
                  title: "Neurology",
                  desc: "Brain and nervous system disorders",
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

          {/* CONDITIONS WE TREAT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Common Conditions We Treat
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                "Respiratory Infections",
                "Asthma",
                "Fever and Viral Illnesses",
                "Gastrointestinal Issues",
                "Allergic Reactions",
                "Skin Conditions",
                "Growth & Development Concerns",
                "Nutritional Deficiencies",
                "Childhood Diabetes",
                "Epilepsy",
                "Heart Conditions",
                "Genetic Disorders",
              ].map((condition, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-4 text-sm text-gray-800 shadow hover:shadow-lg transition border border-gray-100"
                >
                  {condition}
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
              Child-Friendly Facilities
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                "Dedicated pediatric wards",
                "NICU with advanced equipment",
                "Emergency department for children",
                "Play therapy rooms",
                "Child life specialist services",
                "Pediatric operating rooms",
                "Vaccination center",
                "Diagnostic imaging for children",
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

          {/* WHY CHOOSE OUR PEDIATRIC DEPARTMENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Why Choose Our Pediatric Department?
            </h3>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <ul className="space-y-4">
                {[
                  "Experienced team of pediatric specialists",
                  "Child-friendly environment designed for comfort",
                  "Advanced diagnostic and treatment facilities",
                  "24/7 emergency care for children",
                  "Comprehensive vaccination program",
                  "Family-centered care approach",
                  "Child life services for emotional support",
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

          {/* PEDIATRIC SPECIALISTS */}
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
                Pediatric Specialists
              </h2>
              <p className="text-gray-600 mt-2">
                Highly experienced pediatricians and child health specialists
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {paediDoctors.map((doctor) => (
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
              <h3 className="text-2xl font-bold mb-4">Pediatric Care for Your Child</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Our pediatric team is dedicated to providing the best possible care for your child. Contact us for appointments and consultations.
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
