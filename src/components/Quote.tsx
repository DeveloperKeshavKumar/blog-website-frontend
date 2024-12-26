const Quote = () => {
   return (
      <div className="bg-slate-200 h-screen flex flex-col justify-center items-center ">
         <div className="max-w-max mx-16 md:max-w-lg">
            <div className="text-3xl font-bold">
               "The customer support I received was exceptional. The support team went above and beyond to address my concerns"
            </div>
            <div className="text-xl font-semibold self-start mt-4">
               Julies Winfield
            </div>
            <div className="text-sm text-gray-600 font-semibold self-start mt-1">
               CEO | Acme corp
            </div>
         </div>
      </div>
   );
};

export default Quote;
