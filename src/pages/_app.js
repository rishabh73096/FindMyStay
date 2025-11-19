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
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [cartData, setCartData] = useState([]);

  const getUserdetail = () => {
    if (typeof window === "undefined") return;

    const user = localStorage.getItem("userDetail");
    if (user) setUser(JSON.parse(user));

    const cart = localStorage.getItem("addCartDetail");
    if (cart) setCartData(JSON.parse(cart));
  };

  useEffect(() => {
    getUserdetail();
  }, []);



  return (
    <div>
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
              toaster={(t) => {
                if (t.type === "error") toast.error(t.message);
                else if (t.type === "success") toast.success(t.message);
                else toast(t.message);
              }}
              {...pageProps}
              loader={setOpen}
              user={user}
            />
          </Layout>

        </cartContext.Provider>

      </userContext.Provider>

    </div>
  );
}

export default App;
