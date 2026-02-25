import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLanguage } from "../../context/LanguageContext";
import { translations } from "../../utils/translations";

const getDoctorImage = (id, fallbackId) => {
  if (!id) {
    return `https://randomuser.me/api/portraits/${fallbackId % 2 === 0 ? "men" : "women"}/${(fallbackId * 17) % 90}.jpg`;
  }
  return id;
};

export default function DoctorProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();
  
  const t = translations[language] || translations.en;

  useEffect(() => {
    if (id) {
      fetchDoctor();
    }
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors/${id}`);
      if (!response.ok) {
        throw new Error("Doctor not found");
      }
      const data = await response.json();
      setDoctor(data);
    } catch (err) {
      console.error("Error fetching doctor:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatVisitingDays = (days) => {
    if (!days) return "Not specified";
    if (typeof days === 'string') {
      try {
        days = JSON.parse(days);
      } catch {
        return days;
      }
    }
    if (Array.isArray(days)) {
      return days.join(", ");
    }
    return "Not specified";
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !doctor) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor Not Found</h2>
            <p className="text-gray-600 mb-4">{error || "Unable to load doctor profile"}</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Go back to home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* HERO BANNER */}
      <section className="relative h-[280px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900"></div>
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1200"
            alt="Doctor Profile"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-sm text-blue-300 mb-4"
          >
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/departments/medicine" className="hover:text-white">Departments</Link>
            <span>/</span>
            <span className="text-white">{doctor.name}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Doctor Profile
          </motion.h1>
        </div>
      </section>

      {/* PROFILE CONTENT */}
      <section className="bg-gray-50 py-16 -mt-10 relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* MAIN CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="grid md:grid-cols-12 gap-0">
              
              {/* LEFT - IMAGE SECTION */}
              <div className="md:col-span-4 bg-gradient-to-br from-blue-600 to-cyan-600 p-8 flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                  <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-white/30 shadow-2xl">
                    <img
                      src={getDoctorImage(doctor.image, doctor.id)}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://randomuser.me/api/portraits/${doctor.id % 2 === 0 ? "men" : "women"}/${(doctor.id * 17) % 90}.jpg`;
                      }}
                    />
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-white">{doctor.name}</h2>
                  {doctor.designation && (
                    <p className="text-blue-100 mt-1">{doctor.designation}</p>
                  )}
                  {doctor.department && (
                    <span className="inline-block mt-3 px-4 py-1 bg-white/20 rounded-full text-white text-sm">
                      {doctor.department}
                    </span>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-white">{doctor.experience_years || 0}+</p>
                    <p className="text-blue-100 text-xs">Years Exp.</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-white">
                      {doctor.visiting_days ? (typeof doctor.visiting_days === 'string' ? JSON.parse(doctor.visiting_days).length : doctor.visiting_days.length) : 0}
                    </p>
                    <p className="text-blue-100 text-xs">Days/Week</p>
                  </div>
                </div>
              </div>

              {/* RIGHT - DETAILS SECTION */}
              <div className="md:col-span-8 p-8 md:p-10">
                
                {/* Header */}
                <div className="border-b border-gray-100 pb-6 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Professional Information</h3>
                  <p className="text-gray-500">Complete profile and visiting schedule</p>
                </div>

                {/* Info Grid */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Specialization</p>
                    <p className="text-gray-800 font-semibold">{doctor.specialization || "Not specified"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Degrees</p>
                    <p className="text-gray-800 font-semibold">{doctor.degrees || "Not specified"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Designation</p>
                    <p className="text-gray-800 font-semibold">{doctor.designation || "Not specified"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Department</p>
                    <p className="text-gray-800 font-semibold">{doctor.department || "Not specified"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Hospital/Institute</p>
                    <p className="text-gray-800 font-semibold">{doctor.institute || "Medical Center Chattagram"}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Room No.</p>
                    <p className="text-gray-800 font-semibold">{doctor.room_no || "To be confirmed"}</p>
                  </div>
                </div>

                {/* Visiting Schedule */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Visiting Schedule
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Visiting Time</p>
                      <p className="text-gray-800 font-semibold">{doctor.visiting_time || "9:00 AM - 2:00 PM"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Visiting Days</p>
                      <p className="text-gray-800 font-semibold">{formatVisitingDays(doctor.visiting_days)}</p>
                    </div>
                  </div>
                  {doctor.serial_note && (
                    <div className="mt-4 pt-4 border-t border-blue-100">
                      <p className="text-sm text-gray-500">Serial Information</p>
                      <p className="text-blue-600 font-semibold">{doctor.serial_note}</p>
                    </div>
                  )}
                </div>

                {/* Contact Info */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Information
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {doctor.phone && (
                      <a href={`tel:${doctor.phone}`} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition group">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition">
                          <svg className="w-5 h-5 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-gray-800 font-semibold">{doctor.phone}</p>
                        </div>
                      </a>
                    )}
                    {doctor.email && (
                      <a href={`mailto:${doctor.email}`} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition group">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition">
                          <svg className="w-5 h-5 text-blue-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-gray-800 font-semibold">{doctor.email}</p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description/Bio */}
                {doctor.description && (
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      About
                    </h4>
                    <p className="text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-2xl">
                      {doctor.description}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/appointment" 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center py-4 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Book Appointment
                  </Link>
                  <Link 
                    href={`/departments/${(doctor.department || 'medicine').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}`}
                    className="flex-1 bg-white border-2 border-gray-200 text-gray-700 text-center py-4 rounded-xl font-bold hover:border-blue-500 hover:text-blue-600 transition"
                  >
                    View Department
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>

          {/* BACK LINK */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
