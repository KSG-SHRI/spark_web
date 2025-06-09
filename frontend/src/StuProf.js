import { useEffect } from "react";

export default function StuProf({ names, passcodes }) {
    
   
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="sidebar fixed top-0 bottom-0 left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">✨{names}</h1>
              <i className="bi bi-x cursor-pointer ml-28 lg:hidden" onClick={() => {}}></i>
            </div>
            <div className="my-2 bg-gray-600 h-[1px]"></div>
          </div>
          <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
            <i className="bi bi-search text-sm"></i>
            <input
              type="text"
              placeholder="Search"
              className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-house-door-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <i className="bi bi-bookmark-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Bookmark</span>
          </div>
          <div className="my-4 bg-gray-600 h-[1px]"></div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-3 duration-300 cursor-pointer hover:bg-cyan-500 text-white">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Friends</span>
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-3 duration-300 cursor-pointer hover:bg-purple-600 text-white">
            <i className="bi bi-box-arrow-in-right"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
          </div>
        </div>
  
        <div className="flex-1 bg-slate-800 rounded-2xl p-4 ml-[330px] mr-[50px]">
 
   <div className="container mt-3 d-flex justify-content-start">
    
   <div className="row align-items-center">
          <div className="col-12 col-sm-6">
           <div className=" px-[120px] py-5 rounded-xl shadow-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-slate-50 font-bold justify-center flex items-center" >Mock Test</div> 
          </div>
   </div>
   <div className="row align-items-center">
          <div className="col-12 col-sm-6">
           <div className=" px-[120px] py-5 rounded-xl shadow-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-slate-50 font-bold flex justify-center items-center " >Mock Test</div> 
          </div>
   </div>
   <div className="row align-items-center">
          <div className="col-12 col-sm-6">
           <div className=" px-[120px] py-5 rounded-xl shadow-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-slate-50 font-bold flex flex justify-center items-center" >Mock Text</div> 
          </div>
   </div>
   
   </div>
</div>

        </div>
      
    );
  }
  