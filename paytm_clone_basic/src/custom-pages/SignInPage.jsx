import { useRecoilValue, useSetRecoilState } from "recoil";
import CustomButton from "../custom-components/CustomButton";
import { Heading } from "../custom-components/Heading";
import { InputBox } from "../custom-components/InputBox";
import LaunchCard from "../custom-components/LaunchCard";
import { userDetailsSelector, userEmailId, userPassword } from "../recoil-state-store/AccountCreationAtom";
import { Link, useNavigate } from "react-router-dom";
import { AlertAtom, isAlert} from "../recoil-state-store/AlertAtom";
import { BACKEND_SERVER } from "../env-store";

export default function SignInPage() {
    const userDetails = useRecoilValue(userDetailsSelector);
    const setAlertResponse = useSetRecoilState(AlertAtom);
    const setIsAlert = useSetRecoilState(isAlert);
    const setUserEmailId = useSetRecoilState(userEmailId);
    const setUserPassword = useSetRecoilState(userPassword);
    const navigate = useNavigate();
    return <LaunchCard>
        <Heading headingTitle="Sign In"></Heading>
        <InputBox onChangeInput={(e) => {
            setUserEmailId(e.target.value);
        }} title="Email"></InputBox>
        <InputBox onChangeInput={(e) => {
            setUserPassword(e.target.value);
        }} title="Password" boxtype={"password"}></InputBox>
        <CustomButton clickFunction={async () => {
            const signInPayload = { email: userDetails.emailId, password: userDetails.password };
            try {
                const resposne = await fetch(`http://${BACKEND_SERVER}/auth/login`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': localStorage.getItem("token")
                    },
                    body: JSON.stringify(signInPayload)
                });
                const finalResponse = await resposne.json();
                if (finalResponse.http_status_code == 200) {
                    localStorage.clear();
                    localStorage.setItem("token", finalResponse.response.token);
                    localStorage.setItem("logged_in_user_email", finalResponse.response.userEmail);
                    setIsAlert(true);
                    setAlertResponse(["Signed In"]);
                    setTimeout(() => {
                        setAlertResponse(undefined);
                    }, 3000)
                    navigate("/dashboard");
                } else {
                    const bckErrors = finalResponse.response.errList;
                    setIsAlert(false);
                    setAlertResponse(bckErrors);
                    setTimeout(() => {
                        setAlertResponse(undefined);
                    }, 3000)
                }
            } catch (error) {
                const exp = ["System is down as of now kindly try after some time"];
                setIsAlert(false);
                setAlertResponse(exp);
                setTimeout(() => {
                    setAlertResponse(undefined);
                }, 3000)
            }
        }} btnName="Log In" isDisable={(userDetails.emailId == undefined || userDetails.password == undefined || userDetails.emailId.trim() == ""
            || userDetails.password.trim() == ""
        ) ? true : false}></CustomButton>
        <div className="flex justify-center mt-10">
            <div>Haven't registered yet ? Go To </div>
            <Link className="text-black underline mx-3" to={"/sign-up"} onClick={() => {
                setUserEmailId(undefined);
                setUserPassword(undefined);
            }}>Sign Up</Link>
        </div>

    </LaunchCard>
}