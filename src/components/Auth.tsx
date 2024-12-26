import { SignupInput } from "@developerkeshavkumar/blog-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


const Auth = ({ type }: { type: "signup" | "signin" }) => {
   const navigate = useNavigate();
   const [postInputs, setPostInputs] = useState<SignupInput>({ name: "", email: "", password: "" });
   const [error, setError] = useState({ bool: false, msg: '' });

   async function sendRequest(e: React.FormEvent<HTMLFormElement>) {
      setError({ bool: false, msg: '' });
      e.preventDefault();
      try {
         const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/user/${type === "signup" ? "signup" : "signin"}`,
            postInputs
         );
         localStorage.setItem("token", response.data.jwt);
         localStorage.setItem("userId", response.data.id);
         navigate("/blogs");
      } catch (e: any) {
         setError({ bool: true, msg: e?.response?.data?.error });
      }
   }
   return (
      <div className="h-screen flex flex-col justify-center items-center">
         <div className="max-w-lg md:w-[60%] border rounded-md p-4">
            <div className="text-3xl text-center font-bold ">
               {
                  type === 'signup' ? "Create an Account" : "Login to Your Account"
               }
            </div>
            <div className="text-slate-500 text-sm text-center ">
               {type === "signin" ? "Don't have an account?" : "Already have an account?"}
               <Link to={type === 'signup' ? '/signin' : '/signup'} className="pl-2 underline font-semibold" >
                  {type === 'signup' ? 'Signin' : 'Signup'}
               </Link>
            </div>
            <form onSubmit={sendRequest}>
               {
                  type === 'signup' &&
                  <LabelledInput
                     label={"Name"}
                     placeholder={"John Doe"}
                     value={postInputs?.name}
                     onChange={(e) => setPostInputs({ ...postInputs, name: e.currentTarget.value })}
                  />
               }

               <LabelledInput
                  label={"Email"}
                  placeholder={"johndoe@gmail.com"}
                  value={postInputs.email}
                  onChange={(e) => setPostInputs({ ...postInputs, email: e.currentTarget.value })}
               />

               <LabelledInput
                  label={"Password"}
                  type="password"
                  placeholder={"DJ#$@(8ane"}
                  value={postInputs.password}
                  onChange={(e) => setPostInputs({ ...postInputs, password: e.currentTarget.value })}
               />

               <button
                  className="w-full bg-black py-3 rounded-lg text-white mt-5 font-semibold text-lg"
                  type="submit"
               >{type === 'signup' ? 'Signup' : 'Signin'}</button>
            </form>
            {error.bool &&
               <div className="text-red-500 text-center font-semibold border border-red-500 mt-4 py-2 rounded-md">
                  {error.msg}
               </div>}
         </div>
      </div>
   )
}

interface LabelledInputType {
   label: string,
   placeholder: string,
   onChange: (event: ChangeEvent<HTMLInputElement>) => void,
   value: string | undefined,
   type?: string
}

const LabelledInput = ({ label, placeholder, onChange, value, type }: LabelledInputType) => {
   return (
      <div>
         <label htmlFor={label} className="block mb-1 mt-4 text-sm font-medium">{label}</label>
         <input
            className="bg-slate-50 border border-gray-300
                        text-gray-900 text-sm rounded-lg 
                        block w-full p-2.5"
            type={type || "text"}
            id={label}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required />
      </div>
   )
}

export default Auth