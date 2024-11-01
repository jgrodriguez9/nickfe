import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed flex h-full w-64 flex-col bg-gray-100 ">
      <div className="p-4 text-lg font-semibold text-black">Dashboard</div>

      <nav className="flex flex-1 flex-col gap-2 p-4 overflow-y-auto border-y border-b-gray-100 max-h-[500px]">
        <Link
          to={"/users"}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaUser />
          Users
        </Link>
        <Link
          to={"/users"}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaUser />
          Orders
        </Link>
        <Link
          to={"/users"}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaUser />
          Products
        </Link>
        <Link
          to={"/users"}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaUser />
          Arts
        </Link>
        <Link
          to={"/users"}
          className="flex flex-row gap-4 items-center hover:text-gray-900 text-gray-600 text-base font-[500]"
        >
          <FaUser />
          Additional
        </Link>
        {/* <a
          href="#"
          className="block rounded-lg px-4 py-2 text-gray-200 hover:bg-blue-700"
        >
          Home
        </a>
        <a
          href="#"
          className="block rounded-lg px-4 py-2 text-gray-200 hover:bg-blue-700"
        >
          Analytics
        </a>
        <a
          href="#"
          className="block rounded-lg px-4 py-2 text-gray-200 hover:bg-blue-700"
        >
          Settings
        </a> */}
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
