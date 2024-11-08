import { Outlet, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { clearMessage } from "../../../redux/messageSlice";
import scrollUp from "../../../utils/scrollUp";
import Sidebar from "./Sidebar";
import Header from "./Header";
import useBrand from "../../../hook/useBrand";

const AdminLayout = () => {
  const dispatch = useAppDispatch();
  const { theme } = useBrand();
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
      <div className={`flex h-screen ${theme}`}>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <Sidebar />

        <div className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pl-64 lg:pr-2 lg:pt-2 bg-gray-100">
          <div className="bg-white rounded-lg shadow border border-gray-200 flex h-full flex-col">
            <Header />
            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
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

export default AdminLayout;
