import { useRecoilValue, useSetRecoilState } from "recoil";
import CustomButton from "../custom-components/CustomButton";
import { Heading } from "../custom-components/Heading";
import { InputBox } from "../custom-components/InputBox";
import LaunchCard from "../custom-components/LaunchCard";
import { userDetailsSelector, userEmailId, userFirstName, userLastName, userPassword } from "../recoil-state-store/AccountCreationAtom";
import { Link, useNavigate } from "react-router-dom"
import { AlertAtom, isAlert} from "../recoil-state-store/AlertAtom";
import { BACKEND_SERVER } from "../env-store";

export default function SignUpPage() {
    const signUpPayload = useRecoilValue(userDetailsSelector);
    const setAlertResponse = useSetRecoilState(AlertAtom);
    const setFirstName = useSetRecoilState(userFirstName);
    const setLastName = useSetRecoilState(userLastName);
    const setEmailId = useSetRecoilState(userEmailId);
    const setPassword = useSetRecoilState(userPassword);
    const setIsAlert = useSetRecoilState(isAlert);
    const navigate = useNavigate();
    return <LaunchCard>
        <Heading headingTitle="Sign Up"></Heading>
        <InputBox title="First Name" onChangeInput={(e) => {
            setFirstName(e.target.value);
        }}></InputBox>
        <InputBox title="Last Name" onChangeInput={(e) => {
            setLastName(e.target.value);
        }}></InputBox>
        <InputBox title="Email" onChangeInput={(e) => {
            setEmailId(e.target.value);
        }}></InputBox>
        <InputBox title="Password" boxtype={"password"} onChangeInput={(e) => {
            setPassword(e.target.value);
        }}></InputBox>
        <CustomButton clickFunction={async () => {
            try {
                const resposne = await fetch(`http://${BACKEND_SERVER}/auth/signup`,
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify(signUpPayload)
                    });

                const finalResponse = await resposne.json();
                if (finalResponse.http_status_code == 200) {
                    localStorage.clear();
                    localStorage.setItem("token", finalResponse.response.token);
                    localStorage.setItem("logged_in_user_email", finalResponse.response.userEmail);
                    setIsAlert(true);
                    setAlertResponse(["Signed Up"]);
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
                setAlertResponse(exp);
                setIsAlert(false);
                setAlertResponse(exp);
                setTimeout(() => {
                    setAlertResponse(undefined);
                }, 3000)
            }
        }} btnName="Sign Up" isDisable={(signUpPayload.emailId == undefined || signUpPayload.password == undefined || signUpPayload.firstName == undefined || signUpPayload.lastName == undefined || signUpPayload.emailId.trim() == ""
            || signUpPayload.password.trim() == "" || signUpPayload.firstName.trim() == "" || signUpPayload.lastName.trim() == ""
        ) ? true : false}></CustomButton>
        <div className="flex justify-center mt-10">
            <div>Already a User ? Go To </div>
            <Link className="text-black underline mx-3" to={"/sign-in"} onClick={() => {
                setFirstName(undefined);
                setLastName(undefined);
                setEmailId(undefined);
                setPassword(undefined);
            }}>Sign In</Link>
        </div>
    </LaunchCard>
}