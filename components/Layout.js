import Footer from "./Footer.js";
import Navbar from "./Navbar.js"
import { useEffect, useState, useContext, Suspense } from "react";
import { useRouter } from "next/router.js";
import { userContext } from "@/pages/_app.js";

const Layout = ({ children, loader, toaster }) => {
  const [user, setUser] = useContext(userContext);
  const router = useRouter();
  const [opens, setOpens] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setOpens(false);
        setShowAnnouncement(false); // Hide on scroll
      } else {
        setOpens(true);
        setShowAnnouncement(true); // Show at top
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, []);

  return (
    <>
      <div className="flex-1 flex-col bg-white relative">
        <div className="fixed w-full top-0 z-50 bg-white transition-all duration-300">

          <div
            className={`transition-all duration-500 ease-in-out transform`}
          >
           

          </div>
          <Suspense fallback={<div>Loading.....</div>}>
            <Navbar
              user={user}
              setUser={setUser}
              loader={loader}
              toaster={toaster}
              opens={opens}
            />
          </Suspense>
         
        </div>

        <div className="pt-[88px] md:pt-[170px] max-w-screen overflow-x-hidden z-0">
          <main className="flex-1">{children}</main>
        </div>

        <Footer loader={loader} toaster={toaster} />

    
      </div>
    </>
  );
};

export default Layout;
