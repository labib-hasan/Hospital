import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

const departmentData = {
  "medicine": {
    title: "Department of Medicine",
    subtitle: "Comprehensive Internal Medicine Healthcare Services",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1200",
    intro: "You have a fever and also a little pain in the chest for about a week. Everyone is saying to show the doctor. But do not understand which doctor you have to go to. The kind of doctors we go to in this kind of situation are the doctors of medicine. These reputable physicians treat patients by prescribing medications according to their condition, not in any specific field, and refer to the specialist doctor at a particular specialty. At Medical Center Chattagram, the eight best medicine specialists of Chittagong are providing treatment to patients with dedication and compassion.",
    services: [
      { title: "General Medicine", desc: "Diagnosis and treatment of common illnesses, chronic diseases, and preventive healthcare for adults." },
      { title: "Diabetes & Endocrinology", desc: "Specialized care for diabetes, thyroid disorders, and hormonal conditions." },
      { title: "Infectious Diseases", desc: "Expert management of infectious diseases including tropical diseases and COVID-19." },
      { title: "Rheumatology", desc: "Treatment of arthritis, autoimmune diseases, and musculoskeletal disorders." }
    ],
    facilities: ["24/7 Emergency Medicine", "Inpatient Department", "Outpatient Services", "Diabetes Clinic", "Critical Care Support", "Laboratory Services", "Imaging & Diagnostics", "Pharmacy Services", "Health Check Packages"]
  },
  "neuro-medicine": {
    title: "Department of Neuro Medicine",
    subtitle: "Advanced Neurological Care & Treatment",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200",
    intro: "The brain and nervous system are the most complex parts of the human body.",
    services: [
      { title: "Neurology", desc: "Diagnosis and treatment of brain, spine, and nervous system disorders." },
      { title: "Stroke Management", desc: "Emergency care and rehabilitation for stroke patients." },
      { title: "Epilepsy Treatment", desc: "Comprehensive care for epilepsy and seizure disorders." },
      { title: "Movement Disorders", desc: "Treatment for Parkinson's disease and other movement disorders." }
    ],
    facilities: ["Neuro ICU", "EEG Lab", "EMG/NCV Testing", "Stroke Unit", "Neurorehabilitation", "MRI/CT Imaging", "Sleep Lab", "Neurosurgery Support", "24/7 Emergency"]
  },
  "cardiology": {
    title: "Department of Cardiology",
    subtitle: "Comprehensive Heart Care Services",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200",
    intro: "Heart disease is one of the leading causes of death worldwide.",
    services: [
      { title: "Interventional Cardiology", desc: "Cardiac catheterization, angioplasty, and stent placement." },
      { title: "Non-Invasive Cardiology", desc: "ECG, echocardiography, stress testing, and cardiac CT." },
      { title: "Heart Failure Management", desc: "Comprehensive care for chronic heart failure patients." },
      { title: "Cardiac Surgery", desc: "CABG, valve surgery, and complex cardiac procedures." }
    ],
    facilities: ["Cardiac Cath Lab", "CCU", "Echocardiography", "Treadmill Test", "Holter Monitoring", "Cardiac Rehab", "Structural Heart Program", "Heart Failure Clinic", "24/7 Cardiac Emergency"]
  },
  "gastroenterology": {
    title: "Department of Gastroenterology",
    subtitle: "Advanced Digestive & Liver Care",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200",
    intro: "Digestive health is fundamental to overall well-being.",
    services: [
      { title: "Gastroenterology", desc: "Diagnosis and treatment of digestive system disorders." },
      { title: "Hepatology", desc: "Liver disease management including hepatitis and cirrhosis." },
      { title: "Endoscopy", desc: "Gastroscopy, colonoscopy, and therapeutic endoscopy." },
      { title: "Pancreatology", desc: "Treatment of pancreatic disorders." }
    ],
    facilities: ["Endoscopy Suite", "ERCP", "Liver Clinic", "GI Lab", "Capsule Endoscopy", "Hepatology Unit", "Gastroenterology OPD", "24/7 Emergency", "Day Care"]
  },
  "ent": {
    title: "Department of ENT",
    subtitle: "Ear, Nose, Throat & Head-Neck Surgery",
    image: "https://images.unsplash.com/photo-1584063366292-4c8e9f1a5c0e?w=1200",
    intro: "Ear, Nose, and Throat disorders are extremely common.",
    services: [
      { title: "Otology", desc: "Treatment of ear disorders, hearing loss, and balance problems." },
      { title: "Rhinology", desc: "Management of nasal and sinus conditions." },
      { title: "Laryngology", desc: "Voice and throat disorder treatment." },
      { title: "Head & Neck Surgery", desc: "Surgical treatment of head and neck tumors." }
    ],
    facilities: ["Audiology Lab", "Endoscopy Suite", "Otology OT", "Sinus Surgery", "Hearing Aid Center", "Sleep Apnea Clinic", "Vertigo Clinic", "Speech Therapy", "24/7 Emergency"]
  },
  "gynee-obs": {
    title: "Department of Gynecology & Obstetrics",
    subtitle: "Complete Women's Healthcare",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200",
    intro: "Women's healthcare needs special attention at every stage of life.",
    services: [
      { title: "Obstetrics", desc: "Prenatal care, delivery, and postpartum care." },
      { title: "Gynecology", desc: "Women's reproductive health services." },
      { title: "High-Risk Pregnancy", desc: "Specialized care for complicated pregnancies." },
      { title: "Fertility Treatment", desc: "IVF and reproductive medicine services." }
    ],
    facilities: ["Labor & Delivery", "NICU", "Fetal Medicine Unit", "Gyne Oncology", "Laparoscopic Surgery", "IVF Center", "Antenatal Clinic", "Postnatal Care", "24/7 Emergency"]
  },
  "nephrology": {
    title: "Department of Nephrology",
    subtitle: "Comprehensive Kidney Care",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200",
    intro: "Kidney diseases are often silent until they reach advanced stages.",
    services: [
      { title: "Nephrology", desc: "Kidney disease diagnosis and management." },
      { title: "Dialysis", desc: "Hemodialysis and peritoneal dialysis services." },
      { title: "Kidney Transplantation", desc: "Pre and post-transplant care." },
      { title: "Hypertension", desc: "Blood pressure management and renal hypertension." }
    ],
    facilities: ["Dialysis Center", "Kidney Transplant Unit", "Nephrology ICU", "CAPD Program", "AV Fistula Surgery", "Hypertension Clinic", "Urinalysis Lab", "24/7 Emergency", "Renal Nutrition"]
  },
  "orthopedics": {
    title: "Department of Orthopedics",
    subtitle: "Bone, Joint & Trauma Care",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1200",
    intro: "Bone and joint problems can severely affect mobility and quality of life.",
    services: [
      { title: "Orthopedic Surgery", desc: "Joint replacement, arthroscopy, and trauma surgery." },
      { title: "Spine Surgery", desc: "Treatment of spinal disorders and injuries." },
      { title: "Sports Medicine", desc: "Sports injury treatment and rehabilitation." },
      { title: "Pediatric Orthopedics", desc: "Children's bone and joint care." }
    ],
    facilities: ["Joint Replacement Center", "Spine Surgery OT", "Arthroscopy Suite", "Trauma Center", "Physiotherapy", "Sports Medicine", "Orthopedic Rehab", "24/7 Emergency", "Bone Density"]
  },
  "oncology": {
    title: "Department of Oncology",
    subtitle: "Comprehensive Cancer Care",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200",
    intro: "Cancer is a devastating diagnosis, but early detection can lead to cure.",
    services: [
      { title: "Medical Oncology", desc: "Chemotherapy and cancer medication treatment." },
      { title: "Radiation Oncology", desc: "Advanced radiation therapy for cancer." },
      { title: "Surgical Oncology", desc: "Cancer removal and tumor surgery." },
      { title: "Palliative Care", desc: "Pain management and quality of life care." }
    ],
    facilities: ["Chemotherapy Day Care", "Linear Accelerator", "Brachytherapy", "PET-CT", "Oncology ICU", "Palliative Care", "Cancer Screening", "Genetic Counseling", "24/7 Emergency"]
  },
  "psychiatry": {
    title: "Department of Psychiatry",
    subtitle: "Mental Health & Behavioral Sciences",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200",
    intro: "Mental health is as important as physical health.",
    services: [
      { title: "General Psychiatry", desc: "Diagnosis and treatment of mental disorders." },
      { title: "Child Psychiatry", desc: "Mental health services for children and adolescents." },
      { title: "Addiction Treatment", desc: "Drug and alcohol rehabilitation programs." },
      { title: "Psychotherapy", desc: "Individual and group therapy sessions." }
    ],
    facilities: ["Inpatient Psychiatry", "ECT Therapy", "Psychology Lab", "Addiction Center", "Child Guidance", "Sleep Disorder Clinic", "Outpatient Clinic", "24/7 Crisis Line", "Rehabilitation"]
  },
  "pediatrics": {
    title: "Department of Pediatrics",
    subtitle: "Comprehensive Child Healthcare",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=1200",
    intro: "Children are not small adults; they have unique healthcare needs.",
    services: [
      { title: "General Pediatrics", desc: "Comprehensive healthcare for infants and children." },
      { title: "Pediatric ICU", desc: "Critical care for seriously ill children." },
      { title: "Neonatology", desc: "Care for newborns and premature infants." },
      { title: "Pediatric Surgery", desc: "Surgical services for children." }
    ],
    facilities: ["NICU", "Pediatric ICU", "Well Baby Clinic", "Vaccination Center", "Pediatric Emergency", "Child Development Center", "Neonatal Surgery", "24/7 Pediatric Care", "Ambulance Service"]
  },
  "physical-medicine": {
    title: "Department of Physical Medicine",
    subtitle: "Rehabilitation & Pain Management",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200",
    intro: "Recovery from illness, injury, or surgery often requires rehabilitation.",
    services: [
      { title: "Physiotherapy", desc: "Movement therapy and rehabilitation exercises." },
      { title: "Pain Management", desc: "Chronic pain treatment and intervention." },
      { title: "Occupational Therapy", desc: "Rehabilitation for daily living skills." },
      { title: "Electrotherapy", desc: "Modern pain relief treatments." }
    ],
    facilities: ["Physiotherapy Gym", "Electrotherapy Unit", "Hydrotherapy", "Occupational Therapy", "Pain Clinic", "Sports Rehab", "Stroke Rehab", "Back Pain Center", "24/7 Emergency"]
  },
  "skin-vd": {
    title: "Department of Skin & VD",
    subtitle: "Dermatology & Venereology Care",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200",
    intro: "Skin is the largest organ of the body and reflects overall health.",
    services: [
      { title: "Dermatology", desc: "Skin disease diagnosis and treatment." },
      { title: "Cosmetology", desc: "Skin aesthetic and cosmetic procedures." },
      { title: "Venereology", desc: "Sexually transmitted infection treatment." },
      { title: "Laser Therapy", desc: "Advanced laser treatments for skin conditions." }
    ],
    facilities: ["Dermatology OPD", "Cosmetology Center", "Laser Suite", "STI Clinic", "Skin Biopsy", "Cryotherapy", "Phototherapy", "Allergy Testing", "24/7 Emergency"]
  },
  "surgery": {
    title: "Department of Surgery",
    subtitle: "Comprehensive Surgical Services",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200",
    intro: "Surgery is often the best treatment option for many conditions.",
    services: [
      { title: "General Surgery", desc: "Abdominal and gastrointestinal surgery." },
      { title: "Laparoscopic Surgery", desc: "Minimally invasive surgical techniques." },
      { title: "Vascular Surgery", desc: "Blood vessel and circulation surgery." },
      { title: "Trauma Surgery", desc: "Emergency surgical care for injuries." }
    ],
    facilities: ["Main OT", "Laparoscopic OT", "Recovery Room", "Surgical ICU", "Pre-op Suite", "Post-op Care", "Day Surgery", "24/7 Emergency", "Ambulance"]
  },
  "urology": {
    title: "Department of Urology",
    subtitle: "Comprehensive Urological Care",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1200",
    intro: "Urological problems can affect quality of life.",
    services: [
      { title: "Urology", desc: "Urinary tract and male reproductive system care." },
      { title: "Endourology", desc: "Minimally invasive urinary tract procedures." },
      { title: "Uro-Oncology", desc: "Cancer treatment for urinary system." },
      { title: "Kidney Stone Management", desc: "Stone removal and prevention treatment." }
    ],
    facilities: ["Urology OT", "ESWL Unit", "Urodynamics Lab", "Laser Surgery", "Andrology Lab", "Stone Clinic", "Urology OPD", "24/7 Emergency", "Minor OT"]
  }
};

// Extended fallback doctors for demonstration
const allFallbackDoctors = [
  { id: 1, name: "Prof. Dr. A. S. M. Zahed", specialization: "Senior Consultant", experience_years: 15, degrees: "MBBS, FCPS (Medicine)", designation: "Professor, Medicine", institute: "Chattogram Medical College", department: "Medicine", visiting_days: ["Sunday", "Tuesday", "Thursday"], visiting_time: "4.30 pm to 9 pm", room_no: "308", phone: "+880 1234 567890", serial_note: "Call our hotline" },
  { id: 2, name: "Dr. Sarah Khan", specialization: "Consultant", experience_years: 10, degrees: "MBBS, FCPS (Gynae)", designation: "Associate Professor", institute: "Chattogram Medical College", department: "Gynecology", visiting_days: ["Saturday", "Monday", "Wednesday"], visiting_time: "10 am to 4 pm", room_no: "405", phone: "+880 1234 567891", serial_note: "First come first serve" },
  { id: 3, name: "Dr. Rezaul Islam", specialization: "Specialist", experience_years: 8, degrees: "MBBS, MD (Cardiology)", designation: "Assistant Professor", institute: "National Heart Foundation", department: "Cardiology", visiting_days: ["Sunday", "Monday", "Tuesday", "Thursday"], visiting_time: "8 am to 12 pm", room_no: "201", phone: "+880 1234 567892", serial_note: "Emergency cases prioritized" },
  { id: 4, name: "Dr. Fatema Begum", specialization: "Senior Consultant", experience_years: 12, degrees: "MBBS, MD (Pediatrics)", designation: "Professor & Head", institute: "Chattogram Medical College", department: "Pediatrics", visiting_days: ["Saturday", "Sunday", "Monday"], visiting_time: "9 am to 3 pm", room_no: "108", phone: "+880 1234 567893", serial_note: "Specialized care for children" },
  { id: 5, name: "Dr. Mohammad Hossain", specialization: "Consultant", experience_years: 7, degrees: "MBBS, MS (Surgery)", designation: "Associate Professor", institute: "Chattogram Medical College", department: "Surgery", visiting_days: ["Sunday", "Monday", "Wednesday"], visiting_time: "5 pm to 9 pm", room_no: "502", phone: "+880 1234 567894", serial_note: "Online booking available" },
  { id: 6, name: "Dr. Aysha Rahman", specialization: "Specialist", experience_years: 6, degrees: "MBBS, FCPS (Neuro)", designation: "Assistant Professor", institute: "National Institute of Neuro Sciences", department: "Neuro Medicine", visiting_days: ["Tuesday", "Thursday", "Saturday"], visiting_time: "10 am to 2 pm", room_no: "310", phone: "+880 1234 567895", serial_note: "Referral required" },
  { id: 7, name: "Dr. Kamal Hossain", specialization: "Senior Consultant", experience_years: 18, degrees: "MBBS, MD (Nephrology)", designation: "Professor", institute: "Kidney Foundation", department: "Nephrology", visiting_days: ["Monday", "Wednesday", "Friday"], visiting_time: "3 pm to 7 pm", room_no: "215", phone: "+880 1234 567896", serial_note: "Dialysis patients priority" },
  { id: 8, name: "Dr. Lisa Ferdous", specialization: "Consultant", experience_years: 9, degrees: "MBBS, DGO (Obs & Gynae)", designation: "Associate Professor", institute: "Chattogram Medical College", department: "Gynecology", visiting_days: ["Sunday", "Tuesday", "Thursday"], visiting_time: "8 am to 2 pm", room_no: "412", phone: "+880 1234 567897", serial_note: "Normal delivery specialist" },
  { id: 9, name: "Dr. Ahmed Hassan", specialization: "Specialist", experience_years: 5, degrees: "MBBS, MD (Ortho)", designation: "Assistant Professor", institute: "National Orthopedic Hospital", department: "Orthopedics", visiting_days: ["Monday", "Tuesday", "Wednesday", "Thursday"], visiting_time: "9 am to 1 pm", room_no: "605", phone: "+880 1234 567898", serial_note: "Sports injury expert" }
];

const getDoctorImage = (id) =>
  `https://randomuser.me/api/portraits/${id % 2 === 0 ? "men" : "women"}/${(id * 17) % 90}.jpg`;

const getVisitingDaysArray = (days) => {
  if (!days) return [];
  if (typeof days === 'string') {
    try {
      days = JSON.parse(days);
    } catch {
      return [];
    }
  }
  return Array.isArray(days) ? days : [];
};

export default function DepartmentPage() {
  const router = useRouter();
  const { department } = router.query;
  const [doctors, setDoctors] = useState(allFallbackDoctors);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const { language } = useLanguage();
  
  const t = translations[language] || translations.en;
  const deptConfig = departmentData[department] || departmentData["medicine"];

  const MAX_VISIBLE_DOCTORS = 8;
  const displayedDoctors = showAll ? doctors : doctors.slice(0, MAX_VISIBLE_DOCTORS);
  const hasMoreDoctors = doctors.length > MAX_VISIBLE_DOCTORS;

  useEffect(() => {
    if (department) {
      fetchDoctors();
    }
  }, [department]);

  const fetchDoctors = async () => {
    try {
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors`);
      if (!response.ok) {
        console.log("API response not ok, using fallback data");
        setLoading(false);
        return;
      }
      const data = await response.json();
      
      if (Array.isArray(data)) {
        const deptName = department.replace(/-/g, ' ').replace(/&/g, 'and').toLowerCase();
        const filteredDoctors = data.filter(doc => {
          const docDept = (doc.department || '').toLowerCase();
          const docSpec = (doc.specialization || '').toLowerCase();
          return docDept.includes(deptName) || docSpec.includes(deptName);
        });
        
        if (filteredDoctors.length > 0) {
          setDoctors(filteredDoctors);
        }
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="relative h-[300px] md:h-[420px] overflow-hidden">
        <Image
          src={deptConfig.image}
          alt={deptConfig.title}
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
              {deptConfig.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-white/90 max-w-xl"
            >
              {deptConfig.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Department Introduction */}
          {deptConfig.intro && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12 bg-white rounded-2xl shadow-lg p-8 md:p-10"
            >
              <div className="text-gray-700 text-lg leading-relaxed space-y-4">
                <p>{deptConfig.intro}</p>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center">
              Our Services
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {deptConfig.services.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-600 hover:shadow-lg transition-all"
                >
                  <h3 className="text-base font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center">
              Facilities & Services
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {deptConfig.facilities.map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-xs text-gray-700"
                >
                  {f}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-6">
              <span className="text-sm uppercase tracking-wider text-blue-600 font-semibold">
                {t.ourExperts || "Our Experts"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Specialist Doctors
              </h2>
              <p className="text-gray-500 text-sm mt-1">{doctors.length} doctors available</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : displayedDoctors.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedDoctors.map((doctor, index) => {
                  const visitingDaysArray = getVisitingDaysArray(doctor.visiting_days);
                  const visitingDaysText = visitingDaysArray.length > 0 
                    ? `Only ${visitingDaysArray.join(", ")}` 
                    : "Not specified";
                  
                  return (
                    <motion.div
                      key={doctor.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -3, scale: 1.01 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Left Half - Picture */}
                        <div className="w-full md:w-1/2 h-56 md:h-auto relative bg-gradient-to-br from-blue-600 to-cyan-600">
                          <img
                            src={doctor.image || getDoctorImage(doctor.id || index + 1)}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = getDoctorImage(doctor.id || index + 1); }}
                          />
                          {/* Availability badge */}
                          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            Available
                          </div>
                        </div>

                        {/* Right Half - Information */}
                        <div className="w-full md:w-1/2 p-5">
                          <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wide">
                            {doctor.name}
                          </h2>

                          <div className="mt-3 space-y-1.5 text-sm">
                            <p className="text-blue-700 font-semibold">
                              {doctor.degrees || doctor.specialization}
                            </p>
                            {doctor.designation && (
                              <p className="text-gray-700 font-medium">
                                {doctor.designation}
                              </p>
                            )}
                            {doctor.institute && (
                              <p className="text-gray-600">
                                {doctor.institute}
                              </p>
                            )}
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-sm">
                            <p className="text-gray-600">
                              <span className="font-medium text-gray-800">Room No.:</span> {doctor.room_no || "TBA"}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium text-gray-800">Serial:</span> {doctor.serial_note || "Call our hotline"}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium text-gray-800">Time:</span> {doctor.visiting_time || "9 am to 5 pm"}
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                              ({visitingDaysText})
                            </p>
                          </div>

                          {/* View Profile Button */}
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4">
                            <Link 
                              href={`/doctors/${doctor.id}`}
                              className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-cyan-700 transition shadow-lg shadow-blue-500/25"
                            >
                              View Profile
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                </div>

                {/* View All Button at the end */}
                {hasMoreDoctors && !showAll && (
                  <div className="text-center mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAll(true)}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-cyan-700 transition"
                    >
                      View All ({doctors.length}) Doctors →
                    </motion.button>
                  </div>
                )}
                {showAll && doctors.length > MAX_VISIBLE_DOCTORS && (
                  <div className="text-center mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAll(false)}
                      className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-300 transition"
                    >
                      Show Less ↑
                    </motion.button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl">
                <p className="text-gray-500">No specialists found</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
