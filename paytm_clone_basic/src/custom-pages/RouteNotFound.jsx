import { useNavigate } from "react-router-dom";
import LaunchCard from "../custom-components/LaunchCard";
import { useSetRecoilState } from "recoil";
import { userEmailId, userFirstName, userLastName, userPassword } from "../recoil-state-store/SignUpStateAtoms";

export default function RouteNotFound() {
    const navigate = useNavigate();
    const setFirstName = useSetRecoilState(userFirstName);
    const setLastName = useSetRecoilState(userLastName);
    const setEmailId = useSetRecoilState(userEmailId);
    const setPassword = useSetRecoilState(userPassword);
    return <LaunchCard>
        <div className="flex justify-center text-4xl">ROUTE NOT FOUND :(</div>
        <div className="flex justify-center my-10 text-4xl">
            <div>Haven't registered yet ? Go To </div>
            <button className="bg-white text-black rounded-xl px-4 mx-3 py-3" onClick={() => {
                setFirstName(undefined);
                setLastName(undefined);
                setEmailId(undefined);
                setPassword(undefined);
                navigate("/sign-up")
            }}>Sign-Up Page</button>
        </div>
        <div className="flex justify-center my-3 text-4xl">
            <div>Already a User ? Go To </div>
            <button className="bg-white text-black rounded-xl px-4 mx-3 py-3" onClick={() => {
                setFirstName(undefined);
                setLastName(undefined);
                setEmailId(undefined);
                setPassword(undefined);
                navigate("/sign-in")
            }}>Sign-In Page</button>
        </div>
        <div className="flex justify-center my-3 text-4xl">
            <div>Proceed as demo user ? </div>
            <button className="bg-white text-black rounded-xl px-4 mx-3 py-3" onClick={() => {
                setFirstName(undefined);
                setLastName(undefined);
                setEmailId(undefined);
                setPassword(undefined);
                navigate("/sign-in")
            }}>Login as Demo User</button>
        </div>
    </LaunchCard>
}