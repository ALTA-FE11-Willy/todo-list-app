import { Link } from "react-router-dom";
import { SiTodoist } from "react-icons/si";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 dark:bg-gray-700 justify-between px-6">
      <div className="flex w-full justify-center md:justify-start ">
        <SiTodoist className="w-9 h-9 mr-3" />
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl text-black dark:text-white"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
