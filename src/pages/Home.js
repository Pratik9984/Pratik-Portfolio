import React from "react";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import ProjectsSection from "../components/ProjectsSection";
import ContactSection from "../components/ContactSection";


function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}

export default Home;
