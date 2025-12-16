import { useEffect, useState } from "react";
import FAQ from "../../components/faq";
import FeaturesSection from "../../components/FeaturesSection";
import HeroSection from "../../components/HeroSection";
import RoomsSection from "../../components/RoomSection";
import TestimonialsSection from "../../components/TestimonialsSection";
import { useRouter } from "next/router";
import { Api } from "../../services/service";
import { toast } from "sonner";

function Home() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetchrooms();
  }, []);

  const fetchrooms = async () => {
    try {
      const res = await Api("get", `rooms/getAll`, "", router);

      if (res?.status) {
        const data = res?.data;
        setRooms(data?.data || []);
      } else {
        toast.error(res?.message || "");
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "An error occurred");
    }
  };

  return (
    <div className="">
      <HeroSection />
      <RoomsSection rooms={rooms} />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQ />
    </div>
  );
}

export default Home;
