import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const gynaeDoctors = [
  {
    id: 1,
    name: "Dr. Nilufar Yeasmin",
    specialization: "Senior Consultant – Gynecology & Obstetrics",
  },
  {
    id: 2,
    name: "Dr. Shabana Akter",
    specialization: "Consultant – High-Risk Pregnancy",
  },
  {
    id: 3,
    name: "Dr. Fazle Rabbi",
    specialization: "Specialist – Laparoscopic Surgery",
  },
  {
    id: 4,
    name: "Dr. Rina Begum",
    specialization: "Associate Specialist – Reproductive Health",
  },
];

// random image generator (same style as your doctors page)
const getDoctorImage = (id) =>
  `https://randomuser.me/api/portraits/${id % 2 === 0 ? "men" : "women"}/${(id * 17) % 90}.jpg`;

export default function GynaePage() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-[300px] md:h-[420px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
          alt="Gynecology & Obstetrics"
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
              Gynecology & Obstetrics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/90 max-w-xl"
            >
              Comprehensive women's healthcare at Ad-din Medical College Hospital
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
              Gynecology & Obstetrics Services – Ad-din Medical College Hospital
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The Gynecology and Obstetrics department at Ad-din Medical College Hospital provides comprehensive healthcare services for women at every stage of life. Our team of experienced gynecologists and obstetricians offers personalized care using advanced diagnostic and treatment technologies, ensuring the highest quality of women's health services.
            </p>
          </motion.div>

          {/* GYNAECOLOGY SERVICES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Gynecology Services
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Routine & Preventive Care",
                  text: "Annual pelvic exams, breast examinations, cervical cancer screening (Pap smear/HPV tests), and vaccinations for comprehensive women's health.",
                },
                {
                  title: "Reproductive Health",
                  text: "Evaluation and treatment of menstrual disorders (heavy/painful bleeding), hormonal imbalances, and infections.",
                },
                {
                  title: "Specialized Care",
                  text: "Infertility diagnosis, menopause management, and treatment for endometriosis, uterine fibroids, and ovarian cysts.",
                },
                {
                  title: "Gynecological Surgery",
                  text: "Minimally invasive techniques (laparoscopy) for hysterectomy, cyst removal, and colposcopy procedures.",
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

          {/* OBSTETRICS SERVICES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Obstetrics (Maternity) Services
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Pregnancy Management",
                  desc: "Routine, high-risk pregnancy, and comprehensive antenatal care",
                },
                {
                  title: "Delivery Services",
                  desc: "Normal vaginal deliveries and cesarean sections",
                },
                {
                  title: "Postnatal Care",
                  desc: "Care for mother and newborn, including breastfeeding counseling",
                },
                {
                  title: "High-Risk Pregnancy",
                  desc: "Specialized care for complicated pregnancies",
                },
                {
                  title: "Ultrasound Services",
                  desc: "Advanced fetal imaging and diagnostics",
                },
                {
                  title: "Genetic Counseling",
                  desc: "Family planning and genetic risk assessment",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-pink-50 to-blue-100 rounded-xl p-5 text-gray-800 shadow hover:shadow-lg transition"
                >
                  <h4 className="font-semibold text-pink-600 mb-2">{item.title}</h4>
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
              Conditions We Treat
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                "Menstrual Disorders",
                "Endometriosis",
                "Uterine Fibroids",
                "Ovarian Cysts",
                "Polycystic Ovary Syndrome (PCOS)",
                "Infertility Issues",
                "Menopause Symptoms",
                "Cervical Cancer",
                "Breast Conditions",
                "Urinary Incontinence",
                "Pelvic Organ Prolapse",
                "Pregnancy Complications",
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
              Facilities & Technology
            </h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {[
                "Advanced laparoscopic surgery",
                "High-resolution ultrasound",
                "Colposcopy equipment",
                "Fetal monitoring systems",
                "Modern labor & delivery suites",
                "Neonatal intensive care",
                "Egg retrieval & IVF lab",
                "Hormone analysis laboratory",
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

          {/* WHY CHOOSE OUR GYNAE DEPARTMENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
              Why Choose Our Gynecology & Obstetrics Department?
            </h3>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <ul className="space-y-4">
                {[
                  "Experienced team of gynecologists and obstetricians",
                  "State-of-the-art diagnostic and treatment facilities",
                  "Comprehensive care for routine to high-risk pregnancies",
                  "Minimally invasive surgical options for faster recovery",
                  "Supportive and compassionate nursing staff",
                  "Family-centered maternity care approach",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center mt-0.5">
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

          {/* GYNAE SPECIALISTS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8 text-center">
              <span className="text-sm uppercase tracking-wider text-pink-600 font-semibold">
                Our Experts
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                Gynecology & Obstetrics Specialists
              </h2>
              <p className="text-gray-600 mt-2">
                Highly experienced women's health specialists
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {gynaeDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-[30ms] relative overflow-hidden group"
                >
                  {/* Glow effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition" />

                  <div className="relative z-10">
                    <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-pink-100 mb-4">
                      <img
                        src={getDoctorImage(doctor.id)}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800">
                      {doctor.name}
                    </h3>
                    <span className="text-sm text-pink-600 block mt-1">
                      {doctor.specialization}
                    </span>

                    <a
                      href="/appointment"
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-pink-600 text-white text-sm hover:bg-pink-700 transition"
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
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Women's Health Services</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Our Gynecology and Obstetrics department provides comprehensive care for women at every stage of life. Contact us for appointments and consultations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/appointment"
                  className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-full hover:bg-gray-100 transition"
                >
                  Book Appointment
                </a>
                <a
                  href="tel:+8809610818888"
                  className="px-6 py-3 bg-pink-700 text-white font-semibold rounded-full hover:bg-pink-800 transition"
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
