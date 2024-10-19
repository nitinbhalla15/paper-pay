import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import BalanceComponent from "../custom-components/BalanceComponent";
import { InputBox } from "../custom-components/InputBox";
import TopBar from "../custom-components/TopBar";
import UserList from "../custom-components/UserListComp";
import SearchBox from "../custom-components/SearchBox";
import {currentBalance, userList, userNotFoundAtom } from "../recoil-state-store/DashboardAtomState";
import { userEmailId } from "../recoil-state-store/AccountCreationAtom";
import { BACKEND_SERVER } from "../env-store";
import { useEffect, useState } from "react";
import { AlertAtom, isAlert } from "../recoil-state-store/AlertAtom";

export default function DashboardPage() {
    let clock;
    const [userInfo, setUserInfo] = useState({
        accBalance: undefined,
        username: undefined
    });
    const setAlertResponse = useSetRecoilState(AlertAtom);
    const setIsAlert = useSetRecoilState(isAlert);
    const [useList, setUserList] = useRecoilState(userList);
    const [userNotFound, setUserNotFound] = useRecoilState(userNotFoundAtom);
    const userEmail = useRecoilValue(userEmailId);
    const setCurrentBalance = useSetRecoilState(currentBalance);
    useEffect(() => {
        localStorage.removeItem("toUser");
        fetch(`http://${BACKEND_SERVER}/api/v1/checkBalance/${localStorage.getItem("logged_in_user_email")}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(async (res) => {
            const response = await res.json();
            console.log("response : ", response);
            setCurrentBalance(response.response.accBalance);
            localStorage.setItem("totalBalance",response.response.accBalance);
            const bckResponse = {
                accBalance: response.response.accBalance,
                username: response.response.userName
            }
            setUserInfo(bckResponse);
        })
        return () => {

        }
    }, [])
    return <div className="bg-slate-400 h-screen p-4">
        <TopBar username={userInfo.username}></TopBar>
        <BalanceComponent currentBalance={userInfo.accBalance}></BalanceComponent>
        <InputBox placeholder={"Search Users"} title={"Search Friends -> Transfer Money"} onChangeInput={(e) => {
            //debouncing 
            clearTimeout(clock);
            {
                (e.target.value==undefined ||e.target.value.trim() != "")?
                    clock = setTimeout(async () => {
                        try {
                            const response = await fetch(`http://${BACKEND_SERVER}/api/v1/searchUsers/${e.target.value}/${localStorage.getItem("logged_in_user_email")}`, {
                                method: "GET",
                                headers: {
                                    'Content-Type': "application/json",
                                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                                }
                            })
                            const finalResponse = await response.json();
                            if (finalResponse.response.userList.length > 0) {
                                setUserList(finalResponse.response.userList);
                                setUserNotFound(undefined)
                            } else {
                                setUserNotFound("No user Found :(")
                                setUserList(undefined)
                            }
                        } catch (error) {
                            const exp = ["System is down as of now kindly try after some time"];
                            setIsAlert(false);
                            setAlertResponse(exp);
                            setTimeout(() => {
                                setAlertResponse(undefined);
                            }, 3000)
                        }
                    }, 300) : setUserList(undefined); setUserNotFound(undefined)
            }
        }} ></InputBox>
        <SearchBox>
            {userNotFound != undefined ? <div className="flex justify-center text-xl font-bold">{userNotFound}</div> : (useList != undefined && useList.map(element => {
                const userShowDetails = { initial: element.friendName, userName: element.friendName, emailId: element.emailId };
                return <UserList user={userShowDetails} loggedInUser={userEmail}></UserList>
            }))}
        </SearchBox>
    </div>
} 