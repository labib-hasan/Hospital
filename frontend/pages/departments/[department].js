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
      { title: "Diabetes & Endocrinology", desc: "Specialized care for diabetes, thyroid disorders, and other hormonal conditions." },
      { title: "Infectious Diseases", desc: "Expert management of infectious diseases including tropical diseases and COVID-19." },
      { title: "Rheumatology", desc: "Treatment of arthritis, autoimmune diseases, and musculoskeletal disorders." }
    ],
    facilities: ["24/7 Emergency Medicine", "Inpatient Department", "Outpatient Services", "Diabetes Clinic", "Critical Care Support", "Laboratory Services", "Imaging & Diagnostics", "Pharmacy Services", "Health Check Packages"]
  },
  "neuro-medicine": {
    title: "Department of Neuro Medicine",
    subtitle: "Advanced Neurological Care & Treatment",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200",
    intro: "The brain and nervous system are the most complex parts of the human body. When you experience persistent headaches, dizziness, numbness, or weakness in any part of your body, it could be a neurological condition that requires immediate attention. Our Department of Neuro Medicine at Medical Center Chattagram offers world-class diagnostic and treatment facilities for all neurological disorders. With advanced EEG, EMG/NCV testing, and neuroimaging technologies, our expert neurologists provide comprehensive care for stroke, epilepsy, Parkinson's disease, multiple sclerosis, and other neurological conditions. Our dedicated stroke unit operates 24/7 to provide immediate intervention for stroke patients, minimizing brain damage and maximizing recovery chances.",
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
    intro: "Heart disease is one of the leading causes of death worldwide, and early detection and proper treatment can save lives. If you experience chest pain, shortness of breath, palpitations, or fatigue during physical activity, it could be a sign of heart disease. Medical Center Chattagram's Department of Cardiology is equipped with state-of-the-art cardiac care facilities including cardiac catheterization labs, echocardiography, stress testing, and 24/7 cardiac emergency services. Our team of experienced cardiologists and cardiac surgeons provide comprehensive care ranging from preventive cardiology to complex cardiac surgeries including bypass surgery, valve replacement, and angioplasty. We are committed to providing world-class heart care to help patients return to healthy, active lives.",
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
    intro: "Digestive health is fundamental to overall well-being. Persistent abdominal pain, bloating, indigestion, blood in stool, or unexplained weight loss could indicate gastrointestinal or liver disorders. Our Gastroenterology Department at Medical Center Chattagram provides comprehensive diagnostic and therapeutic services for all digestive system conditions. From common issues like acid reflux and gastritis to complex conditions like inflammatory bowel disease, liver cirrhosis, and pancreatic disorders, our expert gastroenterologists offer world-class care. We have advanced endoscopy suites for diagnostic and therapeutic procedures including gastroscopy, colonoscopy, ERCP, and capsule endoscopy. Our hepatology unit provides specialized care for liver diseases including hepatitis B, hepatitis C, and fatty liver disease.",
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
    intro: "Ear, Nose, and Throat disorders are extremely common and can significantly impact quality of life. From hearing loss and ear infections to sinus problems, sore throat, and voice disorders, our ENT Department provides comprehensive care for all ages. Medical Center Chattagram's ENT specialists treat conditions including chronic sinusitis, tonsillitis, deviated septum, hearing loss, tinnitus, vertigo, and sleep apnea. Our department is equipped with advanced diagnostic tools including audiometry, tympanometry, endoscopic sinus surgery facilities, and a dedicated sleep laboratory. Whether you need medical management or surgical intervention, our team of experienced ENT surgeons provides personalized care using the latest techniques including minimally invasive endoscopic procedures.",
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
    intro: "Women's healthcare needs special attention at every stage of life. From adolescence to pregnancy, childbirth, and menopause, Medical Center Chattagram's Department of Gynecology and Obstetrics provides comprehensive care for all women's health concerns. Our services cover normal and high-risk pregnancies, normal and cesarean deliveries, gynecological checkups, family planning, infertility treatment, and management of menstrual disorders, fibroids, cysts, and cancers. We have state-of-the-art labor delivery rooms, a Level III NICU for premature and sick newborns, and advanced laparoscopic surgery facilities for minimally invasive gynecological procedures. Our team of experienced obstetricians and gynecologists is dedicated to providing compassionate, personalized care to women of all ages.",
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
    intro: "Kidney diseases are often silent until they reach advanced stages. Symptoms like swelling in legs, frothy urine, high blood pressure, and decreased urine output should not be ignored. Our Nephrology Department at Medical Center Chattagram provides comprehensive kidney care including diagnosis and treatment of acute kidney injury, chronic kidney disease, glomerulonephritis, and renal stones. We have a state-of-the-art dialysis center offering both hemodialysis and peritoneal dialysis services. Our kidney transplant program provides pre-transplant evaluation and post-transplant care. With modern dialysis machines, skilled nephrologists, and dedicated nursing staff, we ensure quality care for all kidney patients. We also manage hypertension and diabetic kidney disease, which are leading causes of kidney failure.",
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
    intro: "Bone and joint problems can severely affect mobility and quality of life. Whether it's a sports injury, arthritis, back pain, or a fracture from an accident, our Orthopedics Department at Medical Center Chattagram provides comprehensive musculoskeletal care. Our services cover joint replacement surgeries (hip, knee, shoulder), arthroscopic surgeries, spine surgery, trauma surgery, and treatment of sports injuries. We have dedicated orthopedic operation theaters, advanced imaging facilities, and a full physiotherapy and rehabilitation unit. Our team of experienced orthopedic surgeons uses the latest techniques including minimally invasive surgery and computer-navigated joint replacements to ensure faster recovery and better outcomes for our patients.",
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
    intro: "Cancer is a devastating diagnosis, but early detection and modern treatment can lead to cure or long-term remission. Medical Center Chattagram's Oncology Department provides comprehensive cancer care including medical oncology, radiation oncology, and surgical oncology. Our multidisciplinary team works together to provide personalized treatment plans for all types of cancers including breast cancer, lung cancer, colorectal cancer, liver cancer, and blood cancers. We have modern chemotherapy day care units, advanced radiation therapy facilities, and palliative care services for advanced cancer patients. Our cancer screening and early detection programs help identify cancer at early, treatable stages. We believe in holistic care that addresses not just the physical but also the emotional and psychological needs of cancer patients and their families.",
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
    intro: "Mental health is as important as physical health, yet it is often overlooked. Depression, anxiety, stress, sleep disorders, and other mental health conditions can significantly impact daily life. Our Psychiatry Department at Medical Center Chattagram provides comprehensive mental health services for patients of all ages. Our services include evaluation and treatment of depression, anxiety disorders, bipolar disorder, schizophrenia, panic attacks, phobias, OCD, PTSD, and addiction to alcohol and drugs. We offer both inpatient and outpatient treatment programs, individual and group psychotherapy, and modern treatments including ECT (Electroconvulsive Therapy) for severe cases. Our compassionate team of psychiatrists and psychologists creates a supportive environment where patients can feel safe to discuss their concerns and work towards recovery.",
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
    intro: "Children are not small adults; they have unique healthcare needs that require specialized care. Our Pediatrics Department at Medical Center Chattagram provides comprehensive healthcare for infants, children, and adolescents from birth to 18 years. Our services include well-baby care, vaccination, treatment of childhood illnesses, management of chronic conditions like asthma and diabetes, and specialized care for premature and critically ill newborns in our Level III NICU. Our pediatric specialists cover all subspecialties including pediatric cardiology, pediatric surgery, pediatric neurology, and developmental pediatrics. We believe in preventive healthcare and parent education to ensure healthy growth and development of every child. Our child-friendly environment and caring staff make hospital visits less frightening for young patients.",
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
    intro: "Recovery from illness, injury, or surgery often requires rehabilitation to restore function and mobility. Our Physical Medicine and Rehabilitation Department at Medical Center Chattagram helps patients regain their independence and quality of life. We provide comprehensive rehabilitation services for stroke patients, orthopedic patients, neurological conditions, sports injuries, and chronic pain conditions. Our services include physiotherapy, occupational therapy, speech therapy, and advanced pain management treatments. We have well-equipped physiotherapy gyms, electrotherapy units, hydrotherapy facilities, and specialized programs for stroke rehabilitation, cardiac rehabilitation, and sports injury recovery. Our team of physiatrists and therapists work together to create individualized rehabilitation programs that help patients achieve their maximum potential.",
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
    intro: "Skin is the largest organ of the body and reflects overall health. Skin problems can range from simple rashes to serious conditions that require specialized treatment. Our Dermatology and Venereology Department at Medical Center Chattagram provides comprehensive skin care services for all ages. We treat acne, eczema, psoriasis, vitiligo, fungal infections, hair loss, and other skin conditions. Our services also include treatment of sexually transmitted infections in a confidential and non-judgmental environment. We offer advanced cosmetic dermatology services including laser therapy, chemical peels, and anti-aging treatments. Our dermatologists use the latest technologies and evidence-based treatments to help patients achieve healthy, beautiful skin.",
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
    intro: "Surgery is often the best treatment option for many conditions when conservative measures fail. Our Surgery Department at Medical Center Chattagram provides comprehensive surgical services across multiple specialties. Our experienced surgeons perform all types of general surgeries including appendectomy, gallbladder removal, hernia repair, thyroid surgery, and bowel surgery. We also offer laparoscopic (minimally invasive) surgery which results in less pain, smaller scars, and faster recovery. Our operation theaters are equipped with modern surgical equipment, advanced anesthesia machines, and full monitoring systems. Our surgical team includes experienced anesthesiologists, OT nurses, and support staff who ensure safe surgery and smooth recovery. We provide thorough pre-operative evaluation and post-operative care to ensure the best outcomes for our patients.",
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
    intro: "Urological problems can affect quality of life and should not be ignored. Problems with urination, blood in urine, kidney stones, prostate issues, and male infertility require specialized care. Our Urology Department at Medical Center Chattagram provides comprehensive urological services for men, women, and children. We treat urinary tract infections, kidney stones, enlarged prostate, urinary incontinence, and cancers of the kidney, bladder, and prostate. Our department is equipped with advanced urological equipment including ESWL (Extracorporeal Shock Wave Lithotripsy) for kidney stone treatment, laser surgery facilities, and urodynamics lab. Our experienced urologists provide both medical and surgical treatment using the latest techniques including minimally invasive endoscopic procedures.",
    services: [
      { title: "Urology", desc: "Urinary tract and male reproductive system care." },
      { title: "Endourology", desc: "Minimally invasive urinary tract procedures." },
      { title: "Uro-Oncology", desc: "Cancer treatment for urinary system." },
      { title: "Kidney Stone Management", desc: "Stone removal and prevention treatment." }
    ],
    facilities: ["Urology OT", "ESWL Unit", "Urodynamics Lab", "Laser Surgery", "Andrology Lab", "Stone Clinic", "Urology OPD", "24/7 Emergency", "Minor OT"]
  }
};

const fallbackDoctors = [
  { id: 1, name: "Dr. Mohammad Ali", specialization: "Senior Consultant", experience_years: 15 },
  { id: 2, name: "Dr. Sarah Khan", specialization: "Consultant", experience_years: 10 },
  { id: 3, name: "Dr. Rezaul Islam", specialization: "Specialist", experience_years: 8 },
  { id: 4, name: "Dr. Fatema Begum", specialization: "Assistant Professor", experience_years: 12 }
];

const getDoctorImage = (id) =>
  `https://randomuser.me/api/portraits/${id % 2 === 0 ? "men" : "women"}/${(id * 17) % 90}.jpg`;

export default function DepartmentPage() {
  const router = useRouter();
  const { department } = router.query;
  const [doctors, setDoctors] = useState(fallbackDoctors);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  
  const t = translations[language] || translations.en;
  const deptConfig = departmentData[department] || departmentData["medicine"];

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

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Department Introduction */}
          {deptConfig.intro && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16 bg-white rounded-2xl shadow-lg p-8 md:p-12"
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
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-8 text-center">
              Our Services
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {deptConfig.services.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-2xl transition-all"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">
              Facilities & Services
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {deptConfig.facilities.map((f, i) => (
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-8 text-center">
              <span className="text-sm uppercase tracking-wider text-blue-600 font-semibold">
                {t.ourExperts || "Our Experts"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
                Specialist Doctors
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            ) : doctors.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                {doctors.map((doctor, index) => (
                  <motion.div
                    key={doctor.id || index}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition" />
                    <div className="relative z-10">
                      <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-blue-100 mb-4">
                        <img
                          src={doctor.image || getDoctorImage(doctor.id || index + 1)}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = getDoctorImage(doctor.id || index + 1); }}
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                      <span className="text-sm text-blue-600 block mt-1">{doctor.specialization}</span>
                      {doctor.experience_years && (
                        <span className="text-xs text-gray-500 block mt-1">{doctor.experience_years} years</span>
                      )}
                      <Link href={`/doctors/${doctor.id}`} className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition">
                        {t.viewProfile || "View Profile"} <span>→</span>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
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
