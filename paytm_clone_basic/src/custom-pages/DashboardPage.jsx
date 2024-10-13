import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import BalanceComponent from "../custom-components/BalanceComponent";
import { InputBox } from "../custom-components/InputBox";
import TopBar from "../custom-components/TopBar";
import UserList from "../custom-components/UserListComp";
import SearchBox from "../custom-components/SearchBox";
import { currentBalane, userDetailsAtom, userList, userNotFoundAtom } from "../recoil-state-store/DashboardAtomState";
import { userEmailId } from "../recoil-state-store/SignUpStateAtoms";
import { BACKEND_SERVER } from "../env-store";

export default function DashboardPage() {
    const userDetails = useRecoilValue(userDetailsAtom);
    const [useList,setUserList] = useRecoilState(userList);
    const [userNotFound,setUserNotFound] = useRecoilState(userNotFoundAtom);
    const userEmail = useRecoilValue(userEmailId);
    const currentBalance = useRecoilValue(currentBalane);
    let clock;
    return <div className="bg-slate-700 h-screen">
        <TopBar username={userDetails.userName}></TopBar>
        <BalanceComponent currentBalance={currentBalance==undefined?userDetails.currentBalance:currentBalance}></BalanceComponent>
        <InputBox title={"Search Friends -> Transfer Money"} onChangeInput={(e) => {
            clearTimeout(clock);
            {
                e.target.value.trim() != "" ?
                clock = setTimeout(() => {
                    fetch(`https://${BACKEND_SERVER}/api/v1/searchUsers/${e.target.value}`, {
                        method: "GET",
                        headers: {
                            'Content-Type': "application/json",
                            'Authorization': `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                        .then(async (res) => {
                            const resposne = await res.json();
                            console.log("Response post searching users : ",resposne)
                            if (resposne.response.userList.length > 0) {
                                setUserList(resposne.response.userList);
                                setUserNotFound(undefined)
                            } else {
                                setUserNotFound("No user Found :(")
                                setUserList(undefined)
                            }
                        })
                }, 300) : setUserList(undefined); setUserNotFound(undefined);
            }
        }} ></InputBox>
        <SearchBox> {userNotFound != undefined ? <div className="flex justify-center text-4xl font-bold">{userNotFound}</div> : (useList != undefined && useList.map(element => {
            const userShowDetails = { initial: element.friendName, userName: element.friendName, emailId: element.emailId };
            return <UserList user={userShowDetails} loggedInUser={userEmail}></UserList>
        }))}
        </SearchBox>
    </div>
} 