import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CustomButton from "./CustomButton";
import { Heading } from "./Heading";
import { InputBox } from "./InputBox";
import LaunchCard from "./LaunchCard";
import { sendAmount, toMoneyAtom } from "../recoil-state-store/TransferMoneyAtom";
import { useNavigate } from "react-router-dom"
import {  currentBalance, userList } from "../recoil-state-store/DashboardAtomState";
import { AlertAtom, isAlert } from "../recoil-state-store/AlertAtom";
import { BACKEND_SERVER } from "../env-store";


export default function TransferMoney() {
    const toUser = useRecoilValue(toMoneyAtom);
    const [amount, setAmount] = useRecoilState(sendAmount);
    const setAlertResponse = useSetRecoilState(AlertAtom);
    const setIsAlert = useSetRecoilState(isAlert);
    const navigate = useNavigate();
    const [useList, setUserList] = useRecoilState(userList);
    const balance = useRecoilValue(currentBalance);
    return <LaunchCard>
        <Heading headingTitle={"Transfer Quick Money"}></Heading>
        <InputBox title={"From"} inpValue={localStorage.getItem("logged_in_user_email")} dis={true}></InputBox>
        <InputBox title={"To"} inpValue={(toUser==undefined?localStorage.getItem("toUser"):toUser)} dis={true}></InputBox>
        <InputBox title={"Available Balance"} inpValue={(balance==undefined?localStorage.getItem("totalBalance"):balance)} dis={true}></InputBox>
        <InputBox title={"Amount To Transfer"} boxtype={"number"} minimum={"1"} onChangeInput={(e) => {
            if (parseInt(e.target.value) <= 0) {
                let errArray = ["Money to be transfered has to be greater than 0 "]
                setIsAlert(false);
                setAlertResponse(errArray);
                setTimeout(() => {
                    setAlertResponse(undefined);
                }, 3000)
                setAmount(undefined);
            } else {
                setAmount(e.target.value);
            }
        }}></InputBox>
        <div className="flex justify-center gap-2">
            <CustomButton btnName={"Cancel"} clickFunction={() => {
                setAmount(undefined);
                setUserList(undefined);
                navigate("/dashboard");
            }}></CustomButton>
            <CustomButton clickFunction={async () => {
                try {
                    const resposne = await fetch(`http://${BACKEND_SERVER}/api/v1/transferMoney/${localStorage.getItem("logged_in_user_email")}/${(toUser==undefined?localStorage.getItem("toUser"):toUser)}/${amount}`,
                        {
                            method: "POST",
                            headers: {
                                'Content-Type': "application/json",
                                'Authorization': `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );
                    const finalResposne = await resposne.json();
                    if (finalResposne.http_status_code == 200) {
                        setAmount(undefined);
                        setUserList(undefined);
                        setIsAlert(true);
                        setAlertResponse(["Money Transfered !!"])
                        setTimeout(() => {
                            setAlertResponse(undefined);
                        }, 3000)
                        navigate("/dashboard")
                    } else {
                        const bckErrors = finalResposne.response.errList; //Array of Errors
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
                    navigate("/dashboard")
                }
            }} btnName={"Send Money"} isDisable={(amount == undefined || amount.trim() == "") ? true : false} ></CustomButton>
        </div>
    </LaunchCard>
}