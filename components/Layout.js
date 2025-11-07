import Footer from "./Footer";
import Navbar from "./Navbar";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { userContext } from "@/pages/_app";

const Layout = ({ children, loader, toaster }) => {
  const [user, setUser] = useContext(userContext);
  const router = useRouter();
  const [opens, setOpens] = useState(true);

  useEffect(() => {
    const handleRouteStart = () => setOpens(false);
    const handleRouteComplete = () => setOpens(true);

    const handleScroll = () => {
      setOpens(window.scrollY <= 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [router]);

  return (
    <div className="flex flex-col bg-white min-h-screen relative">
  
      <div className="fixed w-full top-0 z-50 bg-white transition-all duration-300">
        <Navbar user={user} setUser={setUser} loader={loader} toaster={toaster} opens={opens} />
      </div>

     
      <div className="pt-[88px] md:pt-[170px] max-w-screen overflow-x-hidden z-0">
        <main>{children}</main>
      </div>

      <Footer loader={loader} toaster={toaster} />
    </div>
  );
};

export default Layout;
