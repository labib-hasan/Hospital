import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchDoctors, fetchServices, fetchDepartments } from "../utils/api";

import HeroImageUpload from "../components/HeroImageUpload";
// Add FeatureCard here or import from components/FeatureCard.js
function FeatureCard({ bg, icon, title, text, link }) {
  return (
    <a
      href={link}
      className={`${bg} text-white rounded-lg p-8 transform hover:scale-105 transition duration-300 block`}
    >
      <Image src={icon} alt={title} width={64} height={64} unoptimized className="mx-auto h-16 mb-4" />
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm">{text}</p>
    </a>
  );
}
const mockDoctors = [
  { id: 1, name: "Dr. Sarah Ahmed", specialization: "Cardiologist" },
  { id: 2, name: "Dr. James Miller", specialization: "Neurologist" },
  { id: 3, name: "Dr. Ayesha Rahman", specialization: "Dermatologist" },
  { id: 4, name: "Dr. Michael Lee", specialization: "Orthopedic" },
];


// random image generator
const getDoctorImage = (id) =>
  `https://randomuser.me/api/portraits/${id % 2 === 0 ? "men" : "women"}/${(id * 13) % 90}.jpg`;

export default function HomePage() {
  const [doctors, setDoctors] = useState(mockDoctors);
const [services, setServices] = useState([]);
const [departments, setDepartments] = useState([]);

useEffect(() => {
  const loadData = async () => {
    try {
      const doctorsData = await fetchDoctors();
      if (doctorsData && doctorsData.length > 0) {
        setDoctors(doctorsData);
      } else {
        setDoctors(mockDoctors);
      }

      const servicesData = await fetchServices();
      setServices(servicesData || []);

      const departmentsData = await fetchDepartments();
      setDepartments(departmentsData || []);

    } catch (error) {
      console.error("API failed, using fallback doctors:", error);
      setDoctors(mockDoctors);
    }
  };

  loadData();
}, []);

  
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative md:pt-17 pt-14 "> {/* pt-16 to offset navbar height */}
        <HeroImageUpload isAdmin={true} />
      </section>

     {/* Quick Access Tiles – Modern HomeBridge */}
<section className="care-tiles ">
  <div className="care-tiles-wrap  ">

    <Link href="/departments" className="care-tile">
      <span className="tile-glow" />
      <Image
        src="https://i0.wp.com/parkview.com.bd/wp-content/uploads/2015/09/icon_tree_white.png"
        alt="Departments"
        width={60}
        height={60}
        unoptimized
      />
      <h3>Departments</h3>
      <p>The backbone of our clinic</p>
    </Link>

    <Link href="/services" className="care-tile">
      <span className="tile-glow" />
      <Image
        src="https://i0.wp.com/parkview.com.bd/wp-content/uploads/2015/09/icon_med_book_white.png"
        alt="Medical Services"
        width={60}
        height={60}
        unoptimized
      />
      <h3>Medical Services</h3>
      <p>All available treatments</p>
    </Link>

    <Link href="/doctors" className="care-tile">
      <span className="tile-glow" />
      <Image
        src="https://i0.wp.com/parkview.com.bd/wp-content/uploads/2015/09/icon_doctor1.png"
        alt="Find a Doctor"
        width={60}
        height={60}
        unoptimized
      />
      <h3>Find a Doctor</h3>
      <p>Browse our specialists</p>
    </Link>

    <Link href="/appointment" className="care-tile">
      <span className="tile-glow" />
      <Image
        src="https://i0.wp.com/parkview.com.bd/wp-content/uploads/2015/09/icon_help_desk1.png"
        alt="Appointment"
        width={60}
        height={60}
        unoptimized
      />
      <h3>Appointment</h3>
      <p>Book or request online</p>
    </Link>

  </div>
</section>

      <section className="dept-modern">
  <div className="dept-wrap">

    {/* HEADER */}
    <div className="dept-head">
      <span className="dept-eyebrow">OUR CAPABILITIES</span>
      <h2>Medical Departments</h2>
      <p>The core pillars that power our hospital excellence</p>
    </div>

    {/* BODY */}
    <div className="dept-grid">

      {/* LEFT – DEPARTMENTS */}
      <div className="dept-cards">
        {[
          {
            title: "Surgery",
            img: "/sur.jpg",
          },
          {
            title: "Radiology & Imaging",
            img: "/rad.jpg",
          },
          {
            title: "Pathology",
            img: "/pat.jpg",
          },
        ].map((d, i) => (
          <div className="dept-card-modern" key={i}>
            {/* Background Image */}
            <div
              className="dept-bg"
              style={{
                backgroundImage: `url(${d.img})`,
              }}
            />

            {/* Dark Overlay */}
            <div className="dept-overlay" />

            {/* Content */}
            <div className="dept-content">
              <h3>{d.title}</h3>
              <button className="dept-more">Explore</button>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT – INFO */}
      <div className="dept-panel">
        <h3>Advanced Medical Infrastructure</h3>

        <p>
          Our departments are equipped with next-generation medical
          technology, led by experienced specialists, and supported by a
          deeply patient-centered care philosophy.
        </p>

        <ul className="dept-points">
          <li>✓ High-precision diagnostic systems</li>
          <li>✓ International treatment protocols</li>
          <li>✓ Continuous emergency readiness</li>
        </ul>

        <a href="#" className="dept-cta">
          View All Departments →
        </a>
      </div>

    </div>
  </div>
</section>


      {/* Services Section */}
   <section className="services-pro">
      <div className="services-wrapper">
        {/* HEADER */}
        <div className="services-header">
          <span className="badge">OUR SPECIALITIES</span>
          <h2>Healthcare Services That Truly Care</h2>
          <p>
            Advanced medical solutions delivered with compassion, precision,
            and world-class expertise.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="services-grid">
          {/* SERVICE CARDS */}
          <div className="cards">
            {[
              {
                title: "Dialysis Unit",
                desc: "Safe, modern & patient-focused renal care.",
                icon: "🩺",
              },
              {
                title: "Physiotherapy",
                desc: "Advanced recovery with smart equipment.",
                icon: "🏃‍♂️",
              },
              {
                title: "Emergency Care",
                desc: "24/7 rapid response & trauma support.",
                icon: "🚑",
              },
            ].map((s, i) => (
              <div className="pro-card" key={i}>
                <div className="icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>

                <button className="pro-btn">
                  Explore <span>→</span>
                </button>
               </div>
            ))}
          </div>

          {/* WORKING HOURS */}
          <div className="hours-box">
            <h3>Working Hours</h3>

            <div className="hours-list">
              {[
                "Saturday",
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ].map((day) => (
                <div className="hour-row" key={day}>
                  <span>{day}</span>
                  <strong>07:00 – 11:00</strong>
                </div>
              ))}
            </div>

            <div className="emergency">
              <h4>Emergency Services</h4>
              <p>
                Open <strong>24 Hours</strong> with fully equipped ambulance
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Doctors Section */}
    <section className="doctors-section">
  <div className="doctors-container">

    {/* HEADER */}
    <div className="doctors-header">
      <span className="doctors-eyebrow">OUR EXPERTS</span>
      <h2>Meet Our Doctors</h2>
      <p>Highly skilled medical professionals you can trust.</p>
    </div>

    {/* GRID */}
    <div className="doctors-grid">
      {doctors.map((doctor) => (
        <div className="doctor-card" key={doctor.id}>
          <div className="doctor-avatar">
            <img
              src={getDoctorImage(doctor.id)}
              alt={doctor.name}
            />
          </div>

          <h3>{doctor.name}</h3>
          <span className="doctor-role">{doctor.specialization}</span>

          <a href="/appointment" className="doctor-btn">
            View Profile
             <span>→</span>
          </a>
        </div>
      ))}
    </div>

  </div>
 </section>


     {/* Appointment CTA Section */}
<section className="cta-texture-zone">
  {/* Background Text Layer */}



  {/* YOUR EXISTING CTA – UNTOUCHED */}
  <section className="cta-float">
    <div className="cta-float-wrap">
      <div className="cta-float-left">
        <span className="cta-dot" />
        <div>
          <h4>Book an Appointment</h4>
          <p>Expert doctors • Trusted care • Quick booking</p>
        </div>
      </div>
      
      <a href="/appointment" className="cta-float-btn">
        Book Now
        <span>→</span>
      </a>
    </div>
  </section>
</section>


      {/* Footer */}
      <Footer />
    </>
  );
}
