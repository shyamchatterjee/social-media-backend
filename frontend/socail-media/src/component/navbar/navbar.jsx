import { useContext } from "react";
import { Link } from "react-router";
import { Context } from "../../context/context";

export default function Navbar() {
  let { logout } = useContext(Context);
  return (
    <>
      <nav className="  bg-white   shadow-md p-2.5 md:p-4 flex justify-between  items-center sticky top-0 z-50 rounded-2xl">
        <h1 className=" text-[4vw] md:text-2xl font-bold text-blue-600">
          SocialApp
        </h1>

        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Link to="/">Home</Link>
          </button>
          <button
            className="px-2 py-2  border border-gray-400 rounded-lg"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
