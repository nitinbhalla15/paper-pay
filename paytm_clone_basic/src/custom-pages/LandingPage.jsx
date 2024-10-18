import { useNavigate } from "react-router-dom"

export default function LandingPage() {
    const navigate = useNavigate();
    return <div className="h-screen bg-white grid grid-cols-2">
        <div className="">
            <div className="p-4 text-3xl font-bold">
                Paper Pay $
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex justify-center text-4xl font-bold">
                    <div className="max-w-lg">
                        <div>
                           {/* Quote Component will be implemented here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-slate-400">
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <div className="max-w-md">
                        <div className="text-4xl font-bold">
                            Get Started
                        </div>
                        <div className="bg-black p-4 text-white text-center my-4 rounded-md cursor-pointer" onClick={()=>{
                            navigate("/sign-in")
                        }}>
                            <button>Login</button>
                        </div>
                        <div className="bg-black p-4 text-white text-center my-4 rounded-md cursor-pointer" onClick={()=>{
                            navigate("/sign-up")
                        }}>
                            <button>Sign Up</button>
                        </div>
                        <div className="bg-black p-4 text-white text-center my-4 rounded-md cursor-pointer" onClick={()=>{
                            alert("Login as Demo User needs to be implemented")
                        }}>
                            <button>Login as Demo User</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>

}