import { Link, useNavigate } from "react-router-dom";
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
        <div className="text-2xl font-bold">ROUTE NOT FOUND :(</div>
        <div className=" flex justify-center my-2 text-lg">
            <div>Haven't registered yet ? Go To </div>
            <Link className="underline text-slate-600 mx-2" onClick={() => {
                setFirstName(undefined);
                setLastName(undefined);
                setEmailId(undefined);
                setPassword(undefined);
            }} to={'/sign-up'}>Sign Up</Link>
        </div>
        <div className="flex justify-center my-2 text-lg">
            <div>Already a User ? Go To </div>
            <Link className="underline text-slate-600 mx-2" onClick={() => {
                setFirstName(undefined);
                setLastName(undefined);
                setEmailId(undefined);
                setPassword(undefined);
            }} to={'/sign-in'}>Sign In</Link>
        </div>
        <div className="flex justify-center my-2 text-lg">
            <div>Proceed as demo user ? </div>
            <Link className="underline text-slate-600 mx-2" onClick={() => {
                setFirstName(undefined);
                setLastName(undefined);
                setEmailId(undefined);
                setPassword(undefined);
            }} to={'/sign-in'}>Sign In</Link>
        </div>
    </LaunchCard>
}