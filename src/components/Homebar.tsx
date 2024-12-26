import { Link, useNavigate } from "react-router-dom";

export const Homebar = () => {
   const navigate = useNavigate();
   const token = localStorage.getItem("token");

   const handleSignOut = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId")
      navigate("/");
   };

   return (
      <div className="border-b flex items-center justify-between px-32 py-4">
         <Link
            to={"/blogs"}
            className="flex flex-col justify-center cursor-pointer text-2xl font-mono font-extrabold italic hover:underline"
         >
            Blogium
         </Link>
         <div className="flex justify-center">
            {token ? (<>
               <Link
                  to={'/blogs'}
                  className="text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm mr-4 px-5 py-2.5 text-center"
               >
                 All Blogs
               </Link>

               <button
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                  onClick={handleSignOut}
               >
                  Sign Out
               </button>
            </>
            ) : (
               <>
                  <Link to={`/signin`}>
                     <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md rounded-tr-none rounded-br-none border-r-2 text-sm px-5 py-2.5 text-center"
                     >
                        Sign In
                     </button>
                  </Link>

                  <Link to={`/signup`}>
                     <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md rounded-tl-none rounded-bl-none text-sm px-5 py-2.5 text-center"
                     >
                        Sign Up
                     </button>
                  </Link>
               </>
            )}
         </div>
      </div>
   );
};