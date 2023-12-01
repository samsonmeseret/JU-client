import React from "react";
import Navbar from "../Nav/Navbar";
import styles from "./About.module.css";
import Footer from "../Footer/Footer";
const About = () => {
  return (
    <>
      <Navbar />
      <section className="lg:w-[1300px] mx-auto lg:p-40 md:p-32 sm:p-28 pt-28 px-10">
        <h1 className=" text-4xl  pb-7">
          About Jimma University Institute of Health, Faculty of Medical Science
        </h1>
        <div>
          <h3 className="font-semibold py-2">
            Jimma University Institute of Health: Great History and a Bright
            Future
          </h3>
          <p className="py-3">
            Faculty of Medical Science is one of the three Faculties found under
            Jimma University Institute of Health. the establishment of faculty
            of medical science is recent even if history of Jimma institute of
            health traced back to 1983G.C, with the birth of the then Jimma
            Institute of Health Sciences (JIHS). Subsequently, school of
            medicine was established in 1985 G.C.
          </p>
          <p className="py-3">
            Currently the faculty performs both clinical services and academic
            services under different departments (Departments of Biomedical
            Sciences, School Of Medicine, Dentistry, Ophthalmology, Pathology,
            Emergency And Critical Care Medicine, Anesthesia, Radiology,
            Physiotherapy, Health Officer, Pediatrics And Child Health, Internal
            Medicine, Surgery, Gynecology And Obstetrics, Orthopedics,
            Dermatology, Psychiatry, Oncology), two academic units (ENT and
            Forensic Medicine) and four coordinating offices (Academic Quality
            Assurance, Postgraduate and Research, Educational Development Center
            and CBE
          </p>
          <p className="py-3">
            The faculty runs five undergraduate training programs (Medicine,
            Health Officer, Physiotherapy, Anesthesia and Dentistry), five
            graduate programs, fifteen specialty training, five Subspecialty
            training (together with our alumni) and one PhD program. In order to
            enhance the quality educations we deliver, we have three skill
            laboratories, three libraries (two health science libraries, one
            post graduate) and we use Jimma University Medical Center for
            undergraduate, for graduate, for specialty and Subspecialty
            trainings. As one of the nation’s oldest medical school, we aspire
            to be one of best medical school in Africa and renewed in the world.
          </p>
          <p className="mt-10">~ Jimma University, Medical Science</p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
