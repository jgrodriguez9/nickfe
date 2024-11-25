import { FaPrint, FaUser } from "react-icons/fa";
import {
  FaCartShopping,
  FaMasksTheater,
  FaPhotoFilm,
  FaShirt,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed flex h-full w-64 flex-col bg-gray-100 ">
      <div className="p-4 text-lg font-semibold text-black">Dashboard</div>

      <nav className="flex flex-1 flex-col gap-2 p-4 overflow-y-auto border-y border-b-gray-100 max-h-[500px]">
        <Link
          to={"/admin/orders"}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaCartShopping />
          Orders
        </Link>

        <h1 className="text-gray-900 font-[500] text-base pt-7 pb-1">
          Administración
        </h1>
        <hr className="border-t" />
        <Link
          to={`/admin/users`}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaUser />
          Users
        </Link>
        <Link
          to={"/admin/techniques"}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaPrint />
          Techniques
        </Link>
        <Link
          to={"/admin/products"}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaShirt />
          Products
        </Link>
        <Link
          to={"/admin/characters"}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaMasksTheater />
          Characters
        </Link>
        <Link
          to={"/admin/designs"}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaPhotoFilm />
          Designs
        </Link>
        <Link
          to={"/users"}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaUser />
          Additional
        </Link>
      </nav>
      {/* <div className="border-t border-blue-700 p-4">
        <a
          href="#"
          className="block rounded-lg px-4 py-2 text-gray-200 hover:bg-blue-700"
        >
          Logout
        </a>
      </div> */}
    </div>
  );
};

export default Sidebar;
