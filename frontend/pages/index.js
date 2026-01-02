import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchDoctors } from "../utils/api";
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

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors().then((data) => setDoctors(data));
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative md:pt-17 pt-14 "> {/* pt-16 to offset navbar height */}
        <HeroImageUpload isAdmin={true} />
      </section>

      {/* Folded Section as in the image */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-lg mx-auto
        mt-9
        ">
          <div
            className="flex-1 bg-blue-600 flex flex-col items-center justify-center p-6 md:p-8 text-white relative
            transform hover:scale-115 transition duration-300"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 40px) 0, 100% 50%, calc(100% - 40px) 100%, 0 100%)",
            }}
          >
            <Image
              src="https://i0.wp.com/parkview.com.bd/wp-content/uploads/2015/09/icon_tree_white.png?fit=99%2C100&amp;#038;ssl=1"
              alt="Departments"
              width={64}
              height={64}
              unoptimized
              className="h-12 md:h-16 mb-3 md:mb-4"
            />
            <h3 className="font-bold uppercase text-lg md:text-xl">Departments</h3>
            <p className="text-xs md:text-sm mt-1">The Backbone of our Clinic</p>
          </div>
          <div
            className="flex-1 bg-blue-500 flex flex-col items-center justify-center p-6 md:p-8 text-white relative
            transform hover:scale-115 transition duration-300"
            style={{
              clipPath:
                "polygon(40px 0, 100% 0, 100% 100%, 40px 100%, 0 50%)",
            }}
          >
            <Image
              src="https://i0.wp.com/parkview.com.bd/wp-content/uploads/2015/09/icon_med_book_white.png?fit=103%2C100&amp;#038;ssl=1"
              alt="Medical Services"
              width={64}
              height={64}
              unoptimized
              className="h-12 md:h-16 mb-3 md:mb-4"
            />
            <h3 className="font-bold uppercase text-lg md:text-xl">Medical Services</h3>
            <p className="text-xs md:text-sm mt-1">A list of all available</p>
          </div>
          <div
            className="flex-1 bg-blue-700 flex flex-col items-center justify-center p-6 md:p-8 text-white relative
            transform hover:scale-115 transition duration-300"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 40px) 0, 100% 50%, calc(100% - 40px) 100%, 0 100%)",
            }}
          >
            <Image
              src="https://i0.wp.com/parkview.com.bd/wp-content/uploads/2015/09/icon_doctor1.png?fit=94%2C100&amp;#038;ssl=1"
              alt="Find a doctor"
              width={64}
              height={64}
              unoptimized
              className="h-12 md:h-16 mb-3 md:mb-4"
            />
            <h3 className="font-bold uppercase text-lg md:text-xl">Find a doctor</h3>
            <p className="text-xs md:text-sm mt-1">All our staff by department</p>
          </div>
          <div
            className="flex-1 bg-blue-400 flex flex-col items-center justify-center p-6 md:p-8 text-white relative
            transform hover:scale-115
             transition duration-300"
            style={{
              clipPath:
                "polygon(40px 0, 100% 0, 100% 100%, 40px 100%, 0 50%)",
            }}
          >
            <Image
              src="https://i0.wp.com/parkview.com.bd/wp-content/uploads/2015/09/icon_help_desk1.png?fit=130%2C100&amp;#038;ssl=1"
              alt="Request an appointment"
              width={64}
              height={64}
              unoptimized
              className="h-12 md:h-16 mb-3 md:mb-4"
            />
            <h3 className="font-bold uppercase text-lg md:text-xl">Request an appointment</h3>
            <p className="text-xs md:text-sm mt-1">Call us or fill in a form</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
          <p className="mt-4 text-gray-600">
            We provide top-notch medical services in multiple specialties.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3
          ">
            <div className="bg-white shadow rounded p-0 hover:shadow-lg transform hover:scale-105 transition duration-300">
              <img
                src="https://www.future-doctor.de/wp-content/uploads/2024/08/shutterstock_2480850611.jpg"
                className="mx-auto w-full mb-4"
                alt=""
              />
              <h3 className="font-semibold text-xl text-gray-600">Qualified Doctors</h3>
              <p className="mt-2 text-gray-600 mb-4">
                Expert healthcare professionals for your care.
              </p>
            </div>

            <div className="bg-white shadow rounded p-0 hover:shadow-lg transform hover:scale-105 transition duration-300">
              <img
                src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/675c2e9acec1c9001d59693a.jpg"
                className="mx-auto  mb-4 w-full"
                alt=""
              />
              <h3 className="font-semibold text-xl text-gray-600">Advanced Facilities</h3>
              <p className="mt-2 text-gray-600 mb-4">
                Modern equipment and treatment for all patients.
              </p>
            </div>

            <div className="bg-white shadow rounded p-0 hover:shadow-lg transform hover:scale-105 transition duration-300">
              <img
                src="https://sttheresashospital.com/assets/img/sth-imgs/24_7_emergency_services.png"
                className="mx-auto w-full mb-4"
                alt=""
              />
              <h3 className="font-semibold text-xl text-gray-600">24/7 Emergency</h3>
              <p className="mt-2 text-gray-600 mb-4">
                Emergency services available around the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white-800">Our Departments</h2>
          <p className="mt-4 text-gray-600">
            Explore our specialized medical departments.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-rows-1 md:grid-cols-3">
            <div className="bg-white shadow rounded p-0 hover:shadow-lg transform hover:scale-105 transition duration-300">
              <img
                src="https://southdenver.com/wp-content/uploads/2021/09/invasive-cardiology.jpg"
                className="mx-auto w-full mb-4"
                alt=""
              />
              <h3 className="font-semibold text-xl text-gray-800">Cardiology</h3>
              <p className="mt-2 text-gray-600 mb-4">
                Heart health treatments and checkups.
              </p>
            </div>

            <div className="bg-white shadow rounded p-0 hover:shadow-lg transform hover:scale-105 transition duration-300">
              <img
                src="https://idreamcareer.com/wp-content/uploads/2023/04/how-to-become-a-neurologist.webp"
                className=" w-full mb-4"
                alt=""
              />
              <h3 className="font-semibold text-xl text-gray-800">Neurology</h3>
              <p className="mt-2 text-gray-600  mb-4">Brain and nervous system care.</p>
            </div>

            <div className="bg-white shadow rounded p-0 hover:shadow-lg transform hover:scale-105 transition duration-300">
              <img
                src="https://medical.rossu.edu/sites/g/files/krcnkv261/files/styles/atge_3_2_crop_md/public/2022-04/Pediatrician.jpg?h=f9d06ff2&itok=RIN6zAjk"
                className="mx-auto w-full mb-4"
                alt=""
              />
              <h3 className="font-semibold text-xl text-gray-800">Pediatrics</h3>
              <p className="mt-2 text-gray-600  mb-4">
                Health care for children and infants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800">Meet Our Doctors</h2>
          <p className="mt-4 text-gray-600">
            Highly skilled medical professionals.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white shadow rounded p-6 hover:shadow-lg transition"
              >
                <img
                  src={doctor.image}
                  className="mx-auto h-32 w-32 rounded-full mb-4 object-cover"
                  alt={doctor.name}
                />
                <h3 className="font-semibold text-xl">{doctor.name}</h3>
                <p className="mt-1 text-gray-600">{doctor.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Book an Appointment</h2>
          <p>Schedule your visit with our expert doctors.</p>
          <a
            href="/appointment"
            className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Book Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
