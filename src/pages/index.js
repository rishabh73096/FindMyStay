

import FAQ from "../../components/faq";
import FeaturesSection from "../../components/FeaturesSection";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import Navbar from "../../components/Navbar";
import RoomsSection from "../../components/RoomSection";
import TestimonialsSection from "../../components/TestimonialsSection";

function Home() {
  return (
    <div
      className=""
    >
      <HeroSection />
      <RoomsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQ />
    </div>
  );
}

export default Home;
