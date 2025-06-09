
import { useNavigate } from 'react-router-dom';

export default function Regorlog() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-screen bg-gray-800">
            {/* Container with 40% height */}
            <div className="flex flex-col items-center justify-center" style={{ height: "60%" }}>
                <div className="flex items-center space-x-8">
                <div
        className="transform  rounded-xl h-30 w-30 sm:h-64 sm:w-64 bg-white shadow-xl transition duration-300 hover:scale-105">
        <div className="flex h-full justify-center items-center" onClick={()=>{navigate("/login")}}>
            <span className="font-bold text-cyan-500 text-2xl" >Student</span>
        </div>
    </div>
                    <h1 className="text-white">or</h1>
                    <div
        className="transform  rounded-xl h-30 w-30 sm:h-64 sm:w-64 bg-white shadow-xl transition duration-300 hover:scale-105">
        <div className="flex h-full justify-center items-center" onClick={()=>{navigate("/memlogin")}}>
            <span className="font-bold text-teal-500 text-2xl">Member</span>
        </div>
    </div>
                </div>
            </div>
            {/* Remaining 60% height */}
            <div className="flex-1"></div>
        </div>
    );
}
