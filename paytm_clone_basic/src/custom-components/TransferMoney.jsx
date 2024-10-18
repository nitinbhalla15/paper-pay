import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import CustomButton from "./CustomButton";
import { Heading } from "./Heading";
import { InputBox } from "./InputBox";
import LaunchCard from "./LaunchCard";
import { sendAmount, toMoneyAtom } from "../recoil-state-store/transferMoney";
import { useNavigate } from "react-router-dom"
import { currentBalane, userDetailsAtom } from "../recoil-state-store/DashboardAtomState";
import { ErrorAtom } from "../recoil-state-store/ErrorAtom";
import { BACKEND_SERVER } from "../env-store";


export default function TransferMoney() {
    const userDetails = useRecoilValue(userDetailsAtom);
    const toUser = useRecoilValue(toMoneyAtom);
    const [amount, setAmount] = useRecoilState(sendAmount);
    const setErrorResponse = useSetRecoilState(ErrorAtom);
    const [currentBalance, setCurrentBalance] = useRecoilState(currentBalane);
    const navigate = useNavigate()
    return <LaunchCard>
        <Heading headingTitle={"Transfer Quick Money"}></Heading>
        <InputBox title={"From"} inpValue={userDetails.userEmail} dis={true}></InputBox>
        <InputBox title={"To"} inpValue={toUser} dis={true}></InputBox>
        <InputBox title={"Available Balance"} inpValue={currentBalance == undefined ? userDetails.currentBalance : currentBalance} dis={true}></InputBox>
        <InputBox title={"Amount To Transfer"} boxtype={"number"} minimum={"1"} onChangeInput={(e) => {
            if (parseInt(e.target.value) <= 0) {
                let errArray = ["Money to be transfered has to be greater than 0 "]
                setErrorResponse(errArray);
                setTimeout(() => {
                    setErrorResponse(undefined);
                }, 3000)
                setAmount(undefined);
            } else {
                setAmount(e.target.value);
            }
        }}></InputBox>
        <CustomButton clickFunction={() => {
            fetch(`http://${BACKEND_SERVER}/api/v1/transferMoney/${userDetails.userEmail}/${toUser}/${amount}`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
                .then(async (res) => {
                    const response = await res.json();
                    if (response.http_status_code == 200) {
                        setCurrentBalance(response.response.avl_balance);
                        setAmount(undefined);
                        navigate("/dashboard")
                    } else {
                        const bckErrors = response.response.errList; //Array of Errors
                        setErrorResponse(bckErrors);
                        setTimeout(() => {
                            setErrorResponse(undefined);
                        }, 3000)
                    }
                })
        }} btnName={"Send Money"} isDisable={(amount == undefined || amount.trim() == "") ? true : false} ></CustomButton>
    </LaunchCard>
}