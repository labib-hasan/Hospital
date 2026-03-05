import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchDoctors } from "../utils/api";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

export default function Doctors() {
  const { language } = useLanguage();
  const t = translations[language];
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data || []);
        setFilteredDoctors(data || []);
      } catch (error) {
        console.error("Failed to fetch doctors", error);
      } finally {
        setLoading(false);
      }
    };
    loadDoctors();
  }, []);

  useEffect(() => {
    let result = doctors;
    if (searchTerm) {
      result = result.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (specialtyFilter) {
      result = result.filter(doc => doc.specialization === specialtyFilter);
    }
    setFilteredDoctors(result);
  }, [searchTerm, specialtyFilter, doctors]);

  const specialties = [...new Set(doctors.map(d => d.specialization))];

  return (
    <>
      <Head>
        <title>{language === "en" ? "Doctors - Medical Center" : "ডাক্তারবৃন্দ - মেডিকেল সেন্টার"}</title>
      </Head>
      <Navbar />
      
      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-600 py-16 px-4">
          <div className="max-w-7xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === "en" ? "Meet Our Doctors" : "আমাদের ডাক্তারবৃন্দ"}
            </h1>
            <p className="text-lg opacity-90">
              {language === "en" 
                ? "Experienced professionals dedicated to your health" 
                : "আপনার স্বাস্থ্যের জন্য নিবেদিত অভিজ্ঞ পেশাদার"}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filters */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder={language === "en" ? "Search doctors..." : "ডাক্তার খুঁজুন..."}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
            >
              <option value="">{language === "en" ? "All Specialties" : "সকল বিশেষত্ব"}</option>
              {specialties.map((spec, i) => (
                <option key={i} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
                  <div className="h-64 bg-gray-200 relative">
                    <img
                      src={doctor.image || "/placeholder-doctor.jpg"}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => e.target.src = "/placeholder-doctor.jpg"}
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{doctor.specialization}</p>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{doctor.degrees}</p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <Link 
                        href={`/doctors/${doctor.id}`}
                        className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {language === "en" ? "View Profile" : "প্রোফাইল দেখুন"}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
