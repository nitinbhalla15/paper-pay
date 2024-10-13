import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useSetRecoilState } from "recoil";
import { userEmailId, userFirstName, userLastName, userPassword } from "../recoil-state-store/SignUpStateAtoms";

export default function TopBar({username}) {
    const navigate = useNavigate();
    const setFirstName = useSetRecoilState(userFirstName);
    const setLastName = useSetRecoilState(userLastName);
    const setEmailId = useSetRecoilState(userEmailId);
    const setPassword = useSetRecoilState(userPassword);
    return <div className="p-4 border-b-2 border-black border-dashed flex justify-between text-white">
        <div className="text-4xl font-bold">
            Payments Simple
        </div>
        <div className="flex justify-around text-4xl font-bold text-white">
            <div>
                Hello , 
            </div>
            <div className="rounded-full ml-2 text-white">
                {username} :)
            </div>
            <div className="bg-black text-xl p-3 flex justify-center rounded-2xl mx-4">
                <button onClick={()=>{
                    localStorage.clear();
                    setFirstName(undefined);
                setLastName(undefined);
                setEmailId(undefined);
                setPassword(undefined);
                    navigate("/sign-in")
                }}>LogOut</button>
            </div>
        </div>
    </div>
}