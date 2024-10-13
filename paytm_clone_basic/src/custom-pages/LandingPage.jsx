import { useNavigate } from "react-router-dom"

export default function LandingPage() {
    const navigate = useNavigate();
    return <div className="grid grid-cols-3">
        <div className="bg-slate-700 h-screen col-span-2">
            <div className="flex flex-col p-6">
                <div className="text-white text-3xl font-bold">
                    PaperPAY $
                </div>
                <div className="text-white flex flex-col justify-center my-20 ">
                    <div className="flex justify-center text-4xl">
                        {/* Image / Animation for the landing page */}
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-black h-screen text-white flex flex-col justify-center p-6 text-2xl font-semibold">
            <div className="flex justify-center">
                Get Started
            </div>
            <div className="flex justify-center p-2 my-10">
                <button className=" flex justify-center bg-purple-950 p-4 rounded-xl w-1/2 mx-2" onClick={() => {
                    navigate("/sign-in")
                }}>Login</button>
                <button className=" flex justify-center bg-purple-950 p-4 rounded-xl w-1/2 mx-2" onClick={() => {
                    navigate("/sign-up")
                }}>Sign-Up</button>
            </div>
            <div className="flex justify-center">
                <button className=" flex justify-center bg-purple-950 p-4 rounded-xl w-1/2 mx-2" onClick={()=>{
                    console.log("Need to open dashboard as a demo user")
                }}>Try As Demo User</button>
            </div>
        </div>
    </div>
}