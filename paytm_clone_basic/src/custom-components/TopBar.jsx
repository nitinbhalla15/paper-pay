import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useSetRecoilState } from "recoil";
import { userEmailId, userFirstName, userLastName, userPassword } from "../recoil-state-store/AccountCreationAtom";
import { userList } from "../recoil-state-store/DashboardAtomState";

export default function TopBar({ username }) {
    const navigate = useNavigate();
    const setFirstName = useSetRecoilState(userFirstName);
    const setLastName = useSetRecoilState(userLastName);
    const setEmailId = useSetRecoilState(userEmailId);
    const setPassword = useSetRecoilState(userPassword);
    const setUserList = useSetRecoilState(userList);
    return <div className="border-b border-black flex justify-between p-2">
        <div className="text-2xl font-bold flex flex-col justify-center">
            Paper PAY
        </div>
        <div className="flex justify-around text-2xl font-bold">
            <div className="flex flex-col justify-center">
                Hey ,
            </div>
            <div className="ml-2 flex flex-col justify-center">
                {username}
            </div>
            <div className="bg-black text-white text-lg p-2 flex flex-col justify-center rounded-md mx-4 cursor-pointer" onClick={() => {
                localStorage.clear();
                setFirstName(undefined);
                setLastName(undefined);
                setEmailId(undefined);
                setPassword(undefined);
                setUserList(undefined);
                navigate("/sign-in")
            }}>
                LogOut
            </div>
        </div>
    </div>
}