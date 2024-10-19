import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { useEffect } from "react";
import { clearMessage } from "../../redux/messageSlice";
import scrollUp from "../../utils/scrollUp";
import { Helmet } from "react-helmet";
import useBrand from "../../hook/useBrand";

const DefaultLayout = () => {
  const { title, theme } = useBrand();
  const dispatch = useAppDispatch();
  const { type, message } = useAppSelector((state) => state.message);
  const { pathname } = useLocation();

  useEffect(() => {
    if (type) {
      switch (type) {
        case "success":
          toast.success(message, {
            onClose: () => {
              dispatch(clearMessage());
            },
          });
          break;
        case "error":
          toast.error(message, {
            onClose: () => {
              dispatch(clearMessage());
            },
          });
          break;
        case "warning":
          toast.warning(message, {
            onClose: () => {
              dispatch(clearMessage());
            },
          });
          break;
        case "info":
          toast.info(message, {
            onClose: () => {
              dispatch(clearMessage());
            },
          });
          break;
        default:
          break;
      }
    }
  }, [type, message, dispatch]);

  useEffect(() => {
    scrollUp("main");
  }, [pathname]);

  return (
    <>
      <main className={`flex flex-col min-h-screen ${theme}`}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Header />
        <main className="flex flex-grow">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </main>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default DefaultLayout;
