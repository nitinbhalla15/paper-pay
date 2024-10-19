import {atom, selector} from "recoil"

export const userFirstName = atom({
    key:"userFirstNameAtom",
    default:undefined
})

export const userLastName = atom({
    key:"userLastNameAtom",
    default:undefined
})
export const userEmailId = atom({
    key:"userEmailIdAtom",
    default:undefined
})
export const userPassword = atom({
    key:"userPasswordAtom",
    default:undefined
})

export const userDetailsSelector = selector({
    key:"userDetailsSelector",
    get:({get})=>{
        const firstName = get(userFirstName);
        const lastName = get(userLastName);
        const emailId = get(userEmailId);
        const password = get(userPassword);
        const signUpPayload = {firstName:firstName,
            lastName:lastName,
            emailId:emailId,
            password:password
        }
        return signUpPayload;
    }
})


