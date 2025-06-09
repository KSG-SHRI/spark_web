import React from 'react';
import Events from "../Components/Events";

export default function Home() {
  return (
    <div>
    <div className="p-6 bg-transparent ms-5 ml-3">
      
      <header className="text-center my-4">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-50 to-blue-500">
          Spark
        </h1>
        <p className="text-xl font-bold mt-2 text-white">
        👋  An EdTech company providing high-quality teachers for exams like NEET, JEE, and Board Exams.
        </p>
      </header>

      <section className="mt-8 mb-6">
        <h2 className="text-3xl font-semibold text-white underline decoration-cyan-500">Intro</h2>
        <p className="text-lg text-white mt-2 mb-6">
          Spark is a leading EdTech platform focused on delivering top-notch education to students preparing for critical exams like NEET, JEE, and Board Exams.
          We connect students with expert teachers who are passionate about helping them succeed.
        </p>
      </section>

      <section className="mt-8 mb-6">
        <h2 className="text-3xl font-semibold text-white underline decoration-fuchsia-500">Vision</h2>
        <p className="text-lg text-white mt-2 mb-6">
          Our vision is to empower students across the country with accessible, high-quality education. We aim to provide personalized learning experiences
          that enable students to reach their highest potential and achieve their academic goals.
        </p>
      </section>
      
      <section className="mt-8 mb-6">
        <h2 className="text-3xl font-semibold text-white underline decoration-teal-500">Acknowledge</h2>
        <p className="text-lg text-white mt-2 mb-6">
          We acknowledge the hard work and dedication of our teachers, who play a crucial role in shaping the future of our students. Their commitment to
          excellence is the backbone of Spark, and we are proud to provide a platform where they can share their knowledge and inspire the next generation of achievers.
        </p>
        
      </section>
    </div>
    </div>
  );
}
