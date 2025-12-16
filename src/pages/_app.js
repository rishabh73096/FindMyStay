import { createContext, useState, useEffect } from "react";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Loader from "../../components/loader";
import { Toaster as SonnerToaster, toast } from "sonner";

export const userContext = createContext();
export const cartContext = createContext();

function App({ Component, pageProps }) {
  const router = useRouter();

  const [user, setUser] = useState(null);        // ✅ FIX 1
  const [loading, setLoading] = useState(true); // ✅ FIX 2
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("userDetail");
    const storedCart = localStorage.getItem("addCartDetail");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedCart) setCartData(JSON.parse(storedCart));

    setLoading(false); // ✅ FIX 3
  }, []);

  if (loading) return null; // ✅ FIX 4 (no flicker)

  return (
    <>
      <SonnerToaster position="top-center" richColors closeButton />

      <userContext.Provider value={[user, setUser]}>
        <cartContext.Provider value={[cartData, setCartData]}>
          <Layout
            loader={setOpen}
            constant={data}
            toaster={(t) => {
              if (t.type === "error") toast.error(t.message);
              else if (t.type === "success") toast.success(t.message);
              else toast(t.message);
            }}
          >
            {open && <Loader open={open} />}

            <Component
              {...pageProps}
              loader={setOpen}
              user={user}
              toaster={(t) => {
                if (t.type === "error") toast.error(t.message);
                else if (t.type === "success") toast.success(t.message);
                else toast(t.message);
              }}
            />
          </Layout>
        </cartContext.Provider>
      </userContext.Provider>
    </>
  );
}

export default App;
