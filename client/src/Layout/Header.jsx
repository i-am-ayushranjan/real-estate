import { Link } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import LogoutBtn from "../../Components/LogoutBtn";

export default function Header() {
  const { user } = useUserContext();
  return (
    <header className="bg-transparent shadow-sm shadow-green-800 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-green-700">Luxury</span>
            <span className="text-green-500">Estate</span>
          </h1>
        </Link>

        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline text-green-600 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-green-600 hover:underline">
              About
            </li>
          </Link>
            {user.isAuthenticated ? (
          <div className="relative group">
              <h1 className="h-8 w-8 border-4 border-transparent rounded-full bg-green-400 hover:bg-green-500 cursor-pointer flex items-center justify-center text-lg font-bold text-slate-200">{user.name.charAt(0).toUpperCase()}</h1>
              <div className="absolute p-4 bg-white rounded-md top-9 right-4 hidden group-hover:block transform translate-x-[50%]">
                <button className="px-3 py-1 hover:bg-green-300 rounded">Profile</button>
                <LogoutBtn/>
              </div>
          </div>
            ) : (
            <Link to="/sign-in">
              <li className=" text-green-600 hover:underline">Sign in</li>
            </Link>
            )}
        </ul>
      </div>
    </header>
  );
}
